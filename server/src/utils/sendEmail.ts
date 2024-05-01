var nodemailer = require('nodemailer');
import emailTemplate from "../assets/emailTemplet";
import User from "../models/users-schema";
const clientSiteBaseUrl=process.env.CLIENT_SITE_BASE_URL;
//NOTE - Send account verification Email.
export const sendAccountVerificationEmail = async (userId: String, VerificationToken: String, Email: String) => {
    const VerificationLink = `${clientSiteBaseUrl}/users/verify-email/${userId}/${VerificationToken}`
    
    const reason="active your account"
    SendEmail(Email, reason, VerificationLink, "5 minutes");

    setTimeout(async () => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { AccountActiveToken: '' },
                { new: true }
            );
        } catch (error) {
            throw new Error("Some thing wrong.")
        }
    }, 5 * 60 * 1000);
}
//NOTE - Send forget password mail.
export const senForgotPasswordLink = async (userId: String, VerificationToken: String, Email: String) => {

    const VerificationLink = `${clientSiteBaseUrl}/users/reset-password/${userId}/${VerificationToken}`
        const reason="Reset your account password"

    SendEmail(Email, reason, VerificationLink, "20 minutes");

    setTimeout(async () => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { AccountActiveToken: '' },
                { new: true }
            );
        } catch (error) {
            throw new Error("Some thing wrong.")
        }
    }, 20 * 60 * 1000);
}
//Note send email
export const SendEmail = async (userEmail: String, reason: String, link: String, linkAcitveTime: String) => {
    try {
        //NOTE - Create a new service which use nodemailer to send Email. 
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.QUIZZIFY_EMAIL || '',
                pass: process.env.QUIZZIFY_EMAIL_PASSWORD || ''
            }
        });

//NOTE - Create maliOption or email details - form,to,subject body.
        const mailOptions = {
            from: '"qizzify verify mail "' + process.env.QUIZZIFY_EMAIL || '',
            to: userEmail,
            subject: "Email from quizzify",
            text: "Welcome to quizzify",
            html: emailTemplate(link,linkAcitveTime,reason)
        
        };

        //NOTE - send Email use transport service
        transporter.sendMail(mailOptions, function (error: Error, info: any) {
            if (error) {
                throw new Error(error.message)
            } else {
                // console.log('Email sent.');
            }
        });
    } catch (error) {
        throw new Error("Server Not response")
    }
}