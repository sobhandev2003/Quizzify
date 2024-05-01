"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuizSchema = new mongoose_1.default.Schema({
    User_Id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "User Id required."]
    },
    Name: {
        type: String,
        required: [true, "Quiz name mandatory."],
        minlength: 3
    },
    Description: {
        type: String,
        required: [true, "Quiz description required."],
        minlength: 5
    },
    Category: {
        type: String,
        required: [true, "Quiz category required."]
    },
    Topic: {
        type: String,
        default: "All"
    },
    NumberOfQuestion: {
        type: Number,
        min: 5,
        required: [true, "Number of Question in Quiz required."]
    },
    TotalScore: {
        type: Number,
        min: 5,
        required: [true, "Total Score in Quiz required."]
    },
    PassingScore: {
        type: Number,
        default: 0
    },
    NumberOfAttendByAnyone: {
        type: Number,
        default: 0,
        min: 0
    },
    PosterId: {
        type: String,
        default: null,
    },
    TotalNumberOfSubmit: {
        type: Number,
        default: 0,
        min: 0
    },
    Like: {
        type: Number,
        default: 0
    },
    Unlike: {
        type: Number,
        default: 0
    },
    isValid: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("QUIZ", QuizSchema);
//# sourceMappingURL=quiz-schema.js.map