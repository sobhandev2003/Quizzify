import { NextFunction, Request, Response } from 'express';
import User from "../models/users-schema";
import bcrypt from "bcrypt"
import {
    PasswordValidator,
    emailValidator,
    phoneNumberValidator,
    userNameValidator
} from '../validator';
import { SendEmail, sendAccountVerificationEmail } from '../services/sendEmail';
import randomBytes from "randombytes";

//SECTION - Register new User
//NOTE - route '/users/'
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { UserName, Email, phoneNumber, Password } = req.body;
        if (!UserName || !Email || !phoneNumber || !Password) {
            console.error("Not vail input");
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
        sendAccountVerificationEmail(user.id, user.VerificationToken, user.Email);

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