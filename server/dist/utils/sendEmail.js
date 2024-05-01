"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = exports.senForgotPasswordLink = exports.sendAccountVerificationEmail = void 0;
var nodemailer = require('nodemailer');
const emailTemplet_1 = __importDefault(require("../assets/emailTemplet"));
const users_schema_1 = __importDefault(require("../models/users-schema"));
const clientSiteBaseUrl = process.env.CLIENT_SITE_BASE_URL;
//NOTE - Send account verification Email.
const sendAccountVerificationEmail = (userId, VerificationToken, Email) => __awaiter(void 0, void 0, void 0, function* () {
    const VerificationLink = `${clientSiteBaseUrl}/users/verify-email/${userId}/${VerificationToken}`;
    const reason = "active your account";
    (0, exports.SendEmail)(Email, reason, VerificationLink, "5 minutes");
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield users_schema_1.default.findByIdAndUpdate(userId, { AccountActiveToken: '' }, { new: true });
        }
        catch (error) {
            throw new Error("Some thing wrong.");
        }
    }), 5 * 60 * 1000);
});
exports.sendAccountVerificationEmail = sendAccountVerificationEmail;
//NOTE - Send forget password mail.
const senForgotPasswordLink = (userId, VerificationToken, Email) => __awaiter(void 0, void 0, void 0, function* () {
    const VerificationLink = `${clientSiteBaseUrl}/users/reset-password/${userId}/${VerificationToken}`;
    const reason = "Reset your account password";
    (0, exports.SendEmail)(Email, reason, VerificationLink, "20 minutes");
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield users_schema_1.default.findByIdAndUpdate(userId, { AccountActiveToken: '' }, { new: true });
        }
        catch (error) {
            throw new Error("Some thing wrong.");
        }
    }), 20 * 60 * 1000);
});
exports.senForgotPasswordLink = senForgotPasswordLink;
//Note send email
const SendEmail = (userEmail, reason, link, linkAcitveTime) => __awaiter(void 0, void 0, void 0, function* () {
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
            html: (0, emailTemplet_1.default)(link, linkAcitveTime, reason)
        };
        //NOTE - send Email use transport service
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                throw new Error(error.message);
            }
            else {
                // console.log('Email sent.');
            }
        });
    }
    catch (error) {
        throw new Error("Server Not response");
    }
});
exports.SendEmail = SendEmail;
//# sourceMappingURL=sendEmail.js.map