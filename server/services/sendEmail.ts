var nodemailer = require('nodemailer');
import User from "../models/users-schema";

export const sendAccountVerificationEmail=(userId: String, VerificationToken: String, Email: String) => {
    const VerificationLink = `http://127.0.0.1:5001/users/verify-email/${userId}/${VerificationToken}`
    SendEmail(Email, "Email from quizzify", "Welcome to quizzify", VerificationLink);
    setTimeout(async () => {
    // console.log("ch");
    
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { VerificationToken: '' },
                { new: true } // To return the updated document
            );
            // console.log("Clear");
            
        
        } catch (error) {
            console.error("Error clearing VerificationToken:", error);
        }
    }, 5*60 * 1000);
}


export const SendEmail = (userEmail: String, Subject: String, text: String, link: String) => {
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
        <a href=${link}>verify Your quizzify account</a>
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