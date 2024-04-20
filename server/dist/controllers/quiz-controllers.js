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
exports.submitQuiz = exports.updateUnlike = exports.updateLike = exports.deleteQuiz = exports.createNewQuiz = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_schema_1 = __importDefault(require("../models/users-schema"));
const quiz_schema_1 = __importDefault(require("../models/quiz-schema"));
const question_schema_1 = require("../models/question-schema");
const uploadImageInDrive_1 = require("../utils/uploadImageInDrive");
const imagefiletype_1 = require("../assets/imagefiletype");
//SECTION -  - Create new Quiz
exports.createNewQuiz = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Name, Description, Category, Topic, NumberOfQuestion, TotalScore, PassingScore, NumberOfAttendByAnyone } = req.body;
    // console.log(req.body);
    //NOTE - set poster file details if its exits 
    const file = req.file;
    let filePath = null;
    let mimetype = null;
    let buffer = null;
    if (file) {
        mimetype = file.mimetype;
        buffer = file.buffer;
        if (mimetype && !imagefiletype_1.imageMimeTypes.includes(mimetype)) {
            res.status(400);
            throw new Error("Accept .jpeg, .png, and .webp format.");
        }
    }
    //NOTE - Throw Error if all necessary data not given  
    if (!Name || !Description || !Category || !NumberOfQuestion || !TotalScore) {
        res.status(400);
        if (filePath) {
        }
        throw new Error("Input not valid");
    }
    if (Number(NumberOfQuestion) < 5) {
        res.status(400);
        if (filePath) {
        }
        throw new Error("Number of question must geterr than 4.");
    }
    if (Number(TotalScore) < 5) {
        res.status(400);
        if (filePath) {
        }
        throw new Error("Total score must geterr than 4.");
    }
    //NOTE - Check user account exit or not who want to create Quiz.
    const userId = req.user.id;
    const user = yield users_schema_1.default.findById(userId);
    if (!user) {
        res.status(404);
        if (filePath) {
        }
        throw new Error("User account not found");
    }
    //NOTE - Create new Quiz and save DB
    const newQuiz = yield quiz_schema_1.default.create({
        User_Id: userId,
        Name,
        Description,
        Category,
        Topic,
        NumberOfQuestion: Number(NumberOfQuestion),
        TotalScore: Number(TotalScore),
        PassingScore,
        NumberOfAttendByAnyone: Number(NumberOfAttendByAnyone)
    });
    yield question_schema_1.QuizQuestionModel.create({ QuizId: newQuiz.id });
    //NOTE - if poster given then save it google drive and update quiz poster id.
    if (buffer && mimetype && newQuiz) {
        const filename = newQuiz.Name + newQuiz.id;
        const folderId = process.env.GOOGLE_DRIVE_QUIZ_POSTER_FOLDER_ID;
        const fileId = yield (0, uploadImageInDrive_1.uploadImageInGoogleDrive)(filename, mimetype, buffer, folderId, null);
        newQuiz.PosterId = fileId;
        yield newQuiz.save();
    }
    res.json({ success: true, message: "Quiz created successfully." });
}));
//SECTION - Delete exiting quiz
exports.deleteQuiz = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = req.query.quizId || null;
    if (!quizId) {
        res.status(400);
        throw new Error("Missing quiz id.");
    }
    //NOTE - Check user account exit or not who want to delete Quiz.
    const user = yield users_schema_1.default.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User account not found");
    }
    //NOTE - 
    const quiz = yield quiz_schema_1.default.findById(quizId);
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz details not found.");
    }
    if (quiz.PosterId) {
        uploadImageInDrive_1.googleDrive.files.delete({
            fileId: quiz.PosterId
        });
    }
    const response = yield quiz_schema_1.default.deleteOne({ _id: quizId });
    res.status(200).json({ success: true, message: "Quiz deleted.", response });
}));
//SECTION - Update like in DB
exports.updateLike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_schema_1.default.findById(req.user.id);
    const quizId = req.query.quizId;
    if (!user) {
        res.status(404);
        throw new Error("User account not found.");
    }
    const quiz = yield quiz_schema_1.default.findById(quizId);
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found.");
    }
    quiz.Like += 1;
    yield quiz.save();
    res.status(200).json({ success: true, message: "Like added." });
}));
//SECTION - Update Unlike in DB
exports.updateUnlike = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_schema_1.default.findById(req.user.id);
    const quizId = req.query.quizId;
    if (!user) {
        res.status(404);
        throw new Error("User account not found.");
    }
    const quiz = yield quiz_schema_1.default.findById(quizId);
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found.");
    }
    quiz.Unlike += 1;
    yield quiz.save();
    res.status(200).json({ success: true, message: "Unlike added." });
}));
exports.submitQuiz = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_schema_1.default.findById(req.user.id);
    const quizId = req.query.quizId;
    if (!user) {
        res.status(404);
        throw new Error("User account not found.");
    }
    const quiz = yield quiz_schema_1.default.findById(quizId);
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found.");
    }
    quiz.TotalNumberOfSubmit += 1;
}));
//# sourceMappingURL=quiz-controllers.js.map