"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = require("../validator");
//!SECTION
const AttendQuizDetails = new mongoose_1.default.Schema({
    Quiz_ID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "Quiz id mandatory."]
    },
    Score: {
        type: Number,
        required: [true, "Score mandatory."]
    },
    NumberOfAttend: {
        type: Number,
        default: 0
    },
    isPassed: {
        type: Boolean,
        required: [true, "Passing status mandatory."]
    }
}, {
    timestamps: true
});
const usersSchema = new mongoose_1.default.Schema({
    UserName: {
        type: String,
        minLength: 3,
        required: [true, "User Name mandatory "]
    },
    Email: {
        type: String,
        validate: {
            validator: validator_1.emailValidator,
            message: (props) => `${props.value} is not valid email.`
        },
        required: [true, "Email mandatory"],
        unique: [true, "This email address already register"]
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: validator_1.phoneNumberValidator,
            message: (props) => `${props.value} is not valid phone number `
        },
        required: [true, "Phone number mandatory"],
        unique: [true, "This phone number already register"]
    },
    ProfilePhotoId: {
        type: String,
        default: null
    },
    Password: {
        type: String,
        required: [true, "Password mandatory"]
    },
    VerificationToken: {
        type: String,
        expireAfterSeconds: 10,
        default: null
    },
    IsVerified: {
        type: Boolean,
        default: false
    },
    TotalAttendNumberOfQuiz: {
        type: Number,
        default: 0
    },
    AttendQuiz: [AttendQuizDetails],
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", usersSchema);
//# sourceMappingURL=users-schema.js.map