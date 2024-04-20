"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidator = exports.phoneNumberValidator = exports.emailValidator = exports.userNameValidator = void 0;
const userNameValidator = (userName) => {
    if (userName.length < 3) {
        throw new Error(` '${userName}'  is not a valid use Name.User name length must be gater then 2`);
    }
    return true;
};
exports.userNameValidator = userNameValidator;
const emailValidator = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        throw new Error(` '${email}'  is not a valid email`);
    }
    return true;
};
exports.emailValidator = emailValidator;
const phoneNumberValidator = (phoneNumber) => {
    const phoneNumberRegex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
        throw new Error(` '${phoneNumber}'  is not a valid phone number`);
    }
    return true;
};
exports.phoneNumberValidator = phoneNumberValidator;
const PasswordValidator = (Password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d#@$!%*?&]{6,}$/;
    if (!passwordRegex.test(Password)) {
        throw new Error(` '${Password}'  is not a valid password`);
    }
    return true;
};
exports.PasswordValidator = PasswordValidator;
//# sourceMappingURL=validator.js.map