var nodemailer = require('nodemailer');
import User from "../models/users-schema";

export const sendAccountVerificationEmail=(userId: String, VerificationToken: String, Email: String) => {
    const VerificationLink = `http://localhost:3000/users/verify-email/${userId}/${VerificationToken}`
    SendEmail(Email, "Email from quizzify", "Welcome to quizzify", VerificationLink,"verify Your quizzify account","5 minutes");
    setTimeout(async () => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { VerificationToken: '' },
                { new: true } 
            );
        } catch (error) {
            console.error("Error clearing VerificationToken:", error);
        }
    }, 5*60 * 1000);
}

export const senForgotPasswordLink=(userId:String,VerificationToken:String,Email:String)=>{
   
    const VerificationLink = `http://localhost:3000/users/reset-password/${userId}/${VerificationToken}`
    SendEmail(Email, "Email from quizzify", "Welcome to quizzify", VerificationLink,"Forgot your quizzify account password","20 minutes");

    setTimeout(async () => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { VerificationToken: '' },
                { new: true } 
            );
        } catch (error) {
            console.error("Error clearing VerificationToken:", error);
        }
    }, 20*60 * 1000);
}

export const SendEmail = (userEmail: String, Subject: String, text: String, link: String,linkText:String,linkAcitveTime:String) => {
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
            subject: Subject,
            text: text,
            html: `
        <div>
        <p>Active your account click bellow link 👇</p>
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
        console.error(error);
    }
}