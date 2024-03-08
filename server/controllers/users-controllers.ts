import { NextFunction, Request, Response } from 'express';
import User from "../models/users-schema";
import bcrypt from "bcrypt"
import fs from 'fs'
import path from "path";
import {
    PasswordValidator,
    emailValidator,
    phoneNumberValidator,
    userNameValidator
} from '../validator';
import { SendEmail, senForgotPasswordLink, sendAccountVerificationEmail } from '../services/sendEmail';
import randomBytes from "randombytes";
import jwt from "jsonwebtoken";
import { CustomRequest } from '../middiliwer/tokenValidator';
import { uploadImageInGoogleDrive } from '../services/uploadImageInDrive';
// import {  } from "../aset/gdriveapi-416606-886986fd7329.json";
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
        const AccountActiveToken = randomBytes(20).toString('hex')
        const hashPassword = await bcrypt.hash(Password, Number(process.env.SALT_ROUND))
        const user = await User.create({
            UserName, Email, phoneNumber, Password: hashPassword, AccountActiveToken
        });
        sendAccountVerificationEmail(user.id, user.AccountActiveToken, user.Email, next);

        res.json({ success: true, message: "Successfully Register account" })

    } catch (error) {
        next(error)
    }
}
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

        if (user!.AccountActiveToken !== token || user!.AccountActiveToken === null) {
            res.status(400);
            throw new Error("Verification Link expire.")

        }

        if (token === user!.AccountActiveToken) {
            user!.IsVerified = true;
            user!.AccountActiveToken = '';
            await user?.save()
            res.json({ success: true, message: "Email verified" })

        }

    } catch (error) {
        next(error)
    }
}

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
        const AccountActiveToken = randomBytes(20).toString('hex')
        user.AccountActiveToken = AccountActiveToken;
        await user.save();
        senForgotPasswordLink(user.id, user.AccountActiveToken, user.Email, next);
        res.status(200).json({ success: true, message: "Password reset link send on your email" })

    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { userId, AccountActiveToken, newPassword } = req.body;
        if (!userId || !AccountActiveToken || !newPassword) {
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

        if (AccountActiveToken !== user.AccountActiveToken) {
            res.status(400);
            throw new Error("Password reset token not valid")
        }

        const hashPassword = await bcrypt.hash(newPassword, Number(process.env.SALT_ROUND));
        user.Password = hashPassword;

        user.AccountActiveToken = "";
        await user.save();
        res.status(200).json({ success: true, message: "Password reset successful" })
    } catch (error) {
        next(error)
    }

}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400)
            throw new Error("Input not valid")
        }

        emailValidator(email);
        const user = await User.findOne({ Email: email });
        if (!user) {
            res.status(404);
            throw new Error("User not found")
        }
        //NOTE - if user account is not verified
        if (!user.IsVerified) {
            res.status(405);
            const AccountActiveToken = randomBytes(20).toString('hex')
            user.AccountActiveToken = AccountActiveToken;
            await user.save();
            sendAccountVerificationEmail(user.id, user.AccountActiveToken, user.Email, next);
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

            res.status(200).send(authorizationToken);
        }
        else {
            res.status(401);
            throw new Error("Email or Password not valid")
        }
    } catch (error) {
        next(error)
    }

}

export const getUserDetails = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as CustomRequest).user;
        const tokenExpireTime = (req as CustomRequest).expireTime;

        res.json({ success: true, user, tokenExpireTime })

    } catch (error) {
        next(error)
    }
}

export const changeProfilePhoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filename, mimetype, originalname } = req.file!
        const user = await User.findById((req as CustomRequest).user.id);
        if (!user) {
            res.status(404);
            throw new Error("User account not found")

        }
        const saveName = user.id + user.Email.split("@")[0];
        // console.log(user.Email.split("@")[0]);

        const folderId = process.env.GOOGLE_DRIVE_PROFILE_PHOTO_FOLDER_ID!
        const ProfilePhotoId: String | null = user.ProfilePhotoId;
        const response = await uploadImageInGoogleDrive(filename, mimetype, saveName, folderId, ProfilePhotoId)

        await User.findByIdAndUpdate(user.id,
            { ProfilePhotoId: response.id },
            { $set: true })

        res.json({ success: true })

    } catch (error) {
        next(error);
    }
}

