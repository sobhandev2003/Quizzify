import { NextFunction, Request, Response } from 'express';
import User, { IUser } from "../models/users-schema";
import bcrypt from "bcrypt"
import fs from 'fs'
import path from "path";

import {
    PasswordValidator,
    emailValidator,
    phoneNumberValidator,
    userNameValidator
} from '../validator';
import { senForgotPasswordLink, sendAccountVerificationEmail } from '../utils/sendEmail';
import randomBytes from "randombytes";
import jwt from "jsonwebtoken";
import { CustomRequest } from '../middiliwer/tokenValidator';
import { uploadImageInGoogleDrive } from '../utils/uploadImageInDrive';
import { imageMimeTypes } from '../assets/imagefiletype';



//SECTION - Register new User
//NOTE - route '/users/'
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { UserName, Email, phoneNumber, Password } = req.body;
        if (!UserName || !Email || !phoneNumber || !Password) {
            res.status(400)
            throw new Error("Not vail input")
        }
        userNameValidator(UserName)
        emailValidator(Email);
        phoneNumberValidator(phoneNumber)
        PasswordValidator(Password);
        //NOTE - Check user email exist or not
        let existUser = await User.findOne({ Email });

        if (existUser) {
            res.status(409);
            throw new Error("This email already register");
        }

        existUser = await User.findOne({ phoneNumber });
        if (existUser) {
            res.status(409);
            throw new Error("This phone number already register");
        }

        //NOTE - create new user
        const VerificationToken = randomBytes(20).toString('hex')
        const hashPassword = await bcrypt.hash(Password, Number(process.env.SALT_ROUND))
        const user = await User.create({
            UserName, Email, phoneNumber, Password: hashPassword, VerificationToken
        });

        // if (!user.VerificationToken) {
        //     user.VerificationToken=
        // }
        await sendAccountVerificationEmail(user.id, user.VerificationToken!, user.Email!);

        res.json({ success: true, message: "Successfully Register account" })

    } catch (error) {
        next(error)
    }
}

//SECTION - Verify user Email and set User account verified
export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, token } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User account not found.")
        }
        if (user.IsVerified) {
            // Token is not valid or user is already verified
            res.status(404)
            throw new Error('User is already verified.');
        }

        if (user!.VerificationToken !== token || user!.VerificationToken === null) {
            res.status(400);
            throw new Error("Verification Link expire.")

        }

        if (token === user!.VerificationToken) {
            user!.IsVerified = true;
            user!.VerificationToken = '';
            await user?.save()
            res.json({ success: true, message: "Email verified" })

        }

    } catch (error) {
        next(error)
    }
}
//SECTION - Request to Forget user account password .
export const forgetPasswordRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const { email } = req.body;
        if (!email) {
            res.status(400)
            throw new Error("Not vail input")
        }
        emailValidator(email)
        const user = await User.findOne({ Email: email });
        if (!user) {
            res.status(404);
            throw new Error("Email not register")
        }
        if (!user.IsVerified) {
            res.status(400);
            throw new Error("This Account is not active")
        }
        const VerificationToken = randomBytes(20).toString('hex')
        user.VerificationToken = VerificationToken;
        await user.save();
        await senForgotPasswordLink(user.id, user.VerificationToken, user.Email);
        res.status(200).json({ success: true, message: "Password reset link send on your email" })

    } catch (error) {
        next(error)
    }
}
//SECTION - Reset User account password
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { userId, VerificationToken, newPassword } = req.body;

        if (!userId || !VerificationToken || !newPassword) {
            res.status(400)
            throw new Error("Input not valid")
        }

        PasswordValidator(newPassword);
        const user = await User.findById(userId);
        if (!user) {
            res.status(404);
            throw new Error("User account not Found")
        }
        if (!user.IsVerified) {
            res.status(400);
            throw new Error("This Account is not active")
        }

        if (VerificationToken !== user.VerificationToken) {
            res.status(400);
            throw new Error("Password reset token not valid")
        }

        const hashPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUND));
        user.Password = hashPassword;

        user.VerificationToken = "";
        await user.save();
        res.status(200).json({ success: true, message: "Password reset successful" })
    } catch (error) {
        next(error)
    }

}

//SECTION - Login user account with valid email and password.
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400)
            throw new Error("Input not valid")
        }

        emailValidator(email);
        const user: IUser | null = await User.findOne({ Email: email });
        if (!user) {
            res.status(404);
            throw new Error("User not found")
        }
        //NOTE - if user account is not verified
        if (!user.IsVerified) {
            res.status(405);
            const VerificationToken = randomBytes(20).toString('hex')
            user.VerificationToken = VerificationToken;
            await user.save();
            await sendAccountVerificationEmail(user.id, user.VerificationToken, user.Email);
            throw new Error("User email not verified.Your email verification link sent on you email");
        }

        if (user && await bcrypt.compare(password, user.Password)) {
            const authorizationToken = jwt.sign({
                user: {
                    id: user.id,
                    userName: user.UserName,
                    email: user.Email,
                },
                expireTime: 10 * 24 * 60 * 60 * 1000
            },
                process.env.JWT_SECRET!,
                {
                    expiresIn: "10d"
                }
            );

            res.cookie("authToken", authorizationToken, {
                expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                // httpOnly: true,
                sameSite: 'none',
                secure:true
            })

            res.status(200).json({ Success: true });
        }
        else {
            res.status(401);
            throw new Error("Email or Password not valid")
        }
    } catch (error) {
        next(error)
    }

}

//SECTION - Logout user
 export const logOutUser =async(req:Request,res:Response)=>{  
     res.clearCookie('authToken',{
        path:'/',
        sameSite:"none",
        httpOnly:true,
        secure:true
    })
    const userDetails = {
        id:"",
        email:"",
        phoneNumber:"",
        ProfilePhotoId:""
    }
    res.status(200).json({success:true,userDetails})
 }

//SECTION -  Get login user details
export const getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as CustomRequest).user;
        const tokenExpireTime = (req as CustomRequest).expireTime;
        const fulUserDetails:IUser|null = await User.findById(user.id);
        if (!fulUserDetails) {
            res.status(404)
            throw new Error("Not found")
        }
        const userDetails = {
            id:fulUserDetails.id||"",
            userName:fulUserDetails.UserName||"",
            email: fulUserDetails.Email||"",
            phoneNumber: fulUserDetails.phoneNumber||"",
            profilePhotoId: fulUserDetails.ProfilePhotoId||""

        }
        res.json({ success: true, userDetails, tokenExpireTime })

    } catch (error) {
        next(error)
    }
}

//SECTION - Change and upload profile photo
export const changeProfilePhoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.file!
        // console.log(file);
        if (!file) {
            res.status(400);
            throw new Error("File is missing.")
        }
        const { buffer, mimetype } = file
        //NOTE - Check mime types
        if (!imageMimeTypes.includes(mimetype)) {
            res.status(400);
            throw new Error("Accept .jpeg, .png, and .webp format.")
        }

        //NOTE - Find user account from User schema
        const user = await User.findById((req as CustomRequest).user.id);
        if (!user) {
            res.status(404);
            throw new Error("User account not found")
        }
        //NOTE - Create file which name save in drive
        const fileName = user.id + user.Email.split("@")[0];
        //NOTE - get folder Id for save photo in this  folder. 
        const folderId = process.env.GOOGLE_DRIVE_PROFILE_PHOTO_FOLDER_ID!
        //NOTE - Get user previous profile phot id
        const ProfilePhotoId: String | null = user.ProfilePhotoId;
        //NOTE - Save profile photo in Google drive
        const fileId = await uploadImageInGoogleDrive(fileName, mimetype, buffer, folderId, ProfilePhotoId)
        //NOTE - Update profile photo id in database
        await User.findByIdAndUpdate(user.id,
            { ProfilePhotoId: fileId },
            { $set: true })

        res.json({ success: true, message: "Successfully update" })

    } catch (error) {
        next(error);
    }
}

