var nodemailer = require('nodemailer');
import { NextFunction } from "express";
import User from "../models/users-schema";
 
export const sendAccountVerificationEmail=(userId: String, AccountActiveToken: String, Email: String,next:NextFunction) => {
    const VerificationLink = `http://localhost:3000/users/verify-email/${userId}/${AccountActiveToken}`
    SendEmail(Email,"Active your account click bellow link", VerificationLink,"verify Your quizzify account","5 minutes",next);
    setTimeout(async () => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { AccountActiveToken: '' },
                { new: true } 
            );
        } catch (error) {
            next(error)
        }
    }, 5*60 * 1000);
}

export const senForgotPasswordLink=(userId:String,AccountActiveToken:String,Email:String,next:NextFunction)=>{
   
    const VerificationLink = `http://localhost:3000/users/reset-password/${userId}/${AccountActiveToken}`
    SendEmail(Email, "Reset your account password click bellow link", VerificationLink,"Forgot your quizzify account password","20 minutes",next);

    setTimeout(async () => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { AccountActiveToken: '' },
                { new: true } 
            );
        } catch (error) {
           next(error)
        }
    }, 20*60 * 1000);
}

export const SendEmail = async(userEmail: String,reason:String, link: String,linkText:String,linkAcitveTime:String,next:NextFunction) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.QUIZZIFY_EMAIL || '',
                pass: process.env.QUIZZIFY_EMAIL_PASSWORD || ''
            }
        });


        const mailOptions = {
            from: '"qizzify verify mail "' + process.env.QUIZZIFY_EMAIL || '',
            to: userEmail,
            subject: "Email from quizzify",
            text: "Welcome to quizzify",
            html: `
        <div>
        <p>${reason} 👇</p>
        <a href=${link}>${linkText}</a>
        <br/>
        <b>Link  valid ${linkAcitveTime} from get this email.</b>
        </div>
        `
        };

        transporter.sendMail(mailOptions, function (error: Error, info: any) {
            if (error) {
                throw new Error(error.message)
            } else {
                // console.log('Email sent.');
            }
        });
    } catch (error) {
        next(Error)
    }
}