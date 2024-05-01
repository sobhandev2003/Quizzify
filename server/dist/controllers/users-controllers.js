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
exports.changeProfilePhoto = exports.getUserDetails = exports.logOutUser = exports.loginUser = exports.resetPassword = exports.forgetPasswordRequest = exports.verifyEmail = exports.registerUser = void 0;
const users_schema_1 = __importDefault(require("../models/users-schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = require("../validator");
const sendEmail_1 = require("../utils/sendEmail");
const randombytes_1 = __importDefault(require("randombytes"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uploadImageInDrive_1 = require("../utils/uploadImageInDrive");
const imagefiletype_1 = require("../assets/imagefiletype");
//SECTION - Register new User
//NOTE - route '/users/'
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { UserName, Email, phoneNumber, Password } = req.body;
        if (!UserName || !Email || !phoneNumber || !Password) {
            res.status(400);
            throw new Error("Not vail input");
        }
        (0, validator_1.userNameValidator)(UserName);
        (0, validator_1.emailValidator)(Email);
        (0, validator_1.phoneNumberValidator)(phoneNumber);
        (0, validator_1.PasswordValidator)(Password);
        //NOTE - Check user email exist or not
        let existUser = yield users_schema_1.default.findOne({ Email });
        if (existUser) {
            res.status(409);
            throw new Error("This email already register");
        }
        existUser = yield users_schema_1.default.findOne({ phoneNumber });
        if (existUser) {
            res.status(409);
            throw new Error("This phone number already register");
        }
        //NOTE - create new user
        const VerificationToken = (0, randombytes_1.default)(20).toString('hex');
        const hashPassword = yield bcrypt_1.default.hash(Password, Number(process.env.SALT_ROUND));
        const user = yield users_schema_1.default.create({
            UserName, Email, phoneNumber, Password: hashPassword, VerificationToken
        });
        // if (!user.VerificationToken) {
        //     user.VerificationToken=
        // }
        yield (0, sendEmail_1.sendAccountVerificationEmail)(user.id, user.VerificationToken, user.Email);
        res.json({ success: true, message: "Successfully Register account" });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
//SECTION - Verify user Email and set User account verified
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token } = req.params;
        const user = yield users_schema_1.default.findById(id);
        if (!user) {
            throw new Error("User account not found.");
        }
        if (user.IsVerified) {
            // Token is not valid or user is already verified
            res.status(404);
            throw new Error('User is already verified.');
        }
        if (user.VerificationToken !== token || user.VerificationToken === null) {
            res.status(400);
            throw new Error("Verification Link expire.");
        }
        if (token === user.VerificationToken) {
            user.IsVerified = true;
            user.VerificationToken = '';
            yield (user === null || user === void 0 ? void 0 : user.save());
            res.json({ success: true, message: "Email verified" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.verifyEmail = verifyEmail;
//SECTION - Request to Forget user account password .
const forgetPasswordRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400);
            throw new Error("Not vail input");
        }
        (0, validator_1.emailValidator)(email);
        const user = yield users_schema_1.default.findOne({ Email: email });
        if (!user) {
            res.status(404);
            throw new Error("Email not register");
        }
        if (!user.IsVerified) {
            res.status(400);
            throw new Error("This Account is not active");
        }
        const VerificationToken = (0, randombytes_1.default)(20).toString('hex');
        user.VerificationToken = VerificationToken;
        yield user.save();
        yield (0, sendEmail_1.senForgotPasswordLink)(user.id, user.VerificationToken, user.Email);
        res.status(200).json({ success: true, message: "Password reset link send on your email" });
    }
    catch (error) {
        next(error);
    }
});
exports.forgetPasswordRequest = forgetPasswordRequest;
//SECTION - Reset User account password
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, VerificationToken, newPassword } = req.body;
        if (!userId || !VerificationToken || !newPassword) {
            res.status(400);
            throw new Error("Input not valid");
        }
        (0, validator_1.PasswordValidator)(newPassword);
        const user = yield users_schema_1.default.findById(userId);
        if (!user) {
            res.status(404);
            throw new Error("User account not Found");
        }
        if (!user.IsVerified) {
            res.status(400);
            throw new Error("This Account is not active");
        }
        if (VerificationToken !== user.VerificationToken) {
            res.status(400);
            throw new Error("Password reset token not valid");
        }
        const hashPassword = yield bcrypt_1.default.hash(newPassword, Number(process.env.SALT_ROUND));
        user.Password = hashPassword;
        user.VerificationToken = "";
        yield user.save();
        res.status(200).json({ success: true, message: "Password reset successful" });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
//SECTION - Login user account with valid email and password.
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("Input not valid");
        }
        (0, validator_1.emailValidator)(email);
        const user = yield users_schema_1.default.findOne({ Email: email });
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        //NOTE - if user account is not verified
        if (!user.IsVerified) {
            res.status(405);
            const VerificationToken = (0, randombytes_1.default)(20).toString('hex');
            user.VerificationToken = VerificationToken;
            yield user.save();
            yield (0, sendEmail_1.sendAccountVerificationEmail)(user.id, user.VerificationToken, user.Email);
            throw new Error("User email not verified.Your email verification link sent on you email");
        }
        if (user && (yield bcrypt_1.default.compare(password, user.Password))) {
            const authorizationToken = jsonwebtoken_1.default.sign({
                user: {
                    id: user.id,
                    userName: user.UserName,
                    email: user.Email,
                },
                expireTime: 10 * 24 * 60 * 60 * 1000
            }, process.env.JWT_SECRET, {
                expiresIn: "10d"
            });
            res.cookie("authToken", authorizationToken, {
                expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'none',
                secure: true
            });
            res.status(200).json({ Success: true });
        }
        else {
            res.status(401);
            throw new Error("Email or Password not valid");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
//SECTION - Logout user
const logOutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('authToken', {
        path: '/',
        sameSite: "none",
        httpOnly: true,
        secure: true
    });
    const userDetails = {
        id: "",
        email: "",
        phoneNumber: "",
        ProfilePhotoId: ""
    };
    res.status(200).json({ success: true, userDetails });
});
exports.logOutUser = logOutUser;
//SECTION -  Get login user details
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const tokenExpireTime = req.expireTime;
        const fulUserDetails = yield users_schema_1.default.findById(user.id);
        if (!fulUserDetails) {
            res.status(404);
            throw new Error("Not found");
        }
        const userDetails = {
            id: fulUserDetails.id || "",
            userName: fulUserDetails.UserName || "",
            email: fulUserDetails.Email || "",
            phoneNumber: fulUserDetails.phoneNumber || "",
            profilePhotoId: fulUserDetails.ProfilePhotoId || ""
        };
        res.json({ success: true, userDetails, tokenExpireTime });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserDetails = getUserDetails;
//SECTION - Change and upload profile photo
const changeProfilePhoto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        // console.log(file);
        if (!file) {
            res.status(400);
            throw new Error("File is missing.");
        }
        const { buffer, mimetype } = file;
        //NOTE - Check mime types
        if (!imagefiletype_1.imageMimeTypes.includes(mimetype)) {
            res.status(400);
            throw new Error("Accept .jpeg, .png, and .webp format.");
        }
        //NOTE - Find user account from User schema
        const user = yield users_schema_1.default.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User account not found");
        }
        //NOTE - Create file which name save in drive
        const fileName = user.id + user.Email.split("@")[0];
        //NOTE - get folder Id for save photo in this  folder. 
        const folderId = process.env.GOOGLE_DRIVE_PROFILE_PHOTO_FOLDER_ID;
        //NOTE - Get user previous profile phot id
        const ProfilePhotoId = user.ProfilePhotoId;
        //NOTE - Save profile photo in Google drive
        const fileId = yield (0, uploadImageInDrive_1.uploadImageInGoogleDrive)(fileName, mimetype, buffer, folderId, ProfilePhotoId);
        //NOTE - Update profile photo id in database
        yield users_schema_1.default.findByIdAndUpdate(user.id, { ProfilePhotoId: fileId }, { $set: true });
        res.json({ success: true, message: "Successfully update" });
    }
    catch (error) {
        next(error);
    }
});
exports.changeProfilePhoto = changeProfilePhoto;
//# sourceMappingURL=users-controllers.js.map