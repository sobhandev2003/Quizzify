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
exports.getAllQuizQuestion = exports.createNewQuestion = void 0;
const question_schema_1 = require("../models/question-schema");
const quiz_schema_1 = __importDefault(require("../models/quiz-schema"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.createNewQuestion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { QuestionNumber, Question, Description, Option, CorrectOption, Marks } = req.body;
    const quizId = req.query.quizId;
    if (!QuestionNumber ||
        !Question ||
        !Option ||
        !CorrectOption ||
        !Marks ||
        Marks < 1 ||
        !Array.isArray(Option) ||
        Option.length !== 4) {
        res.status(400);
        throw new Error("Input not valid.");
    }
    const quiz = yield quiz_schema_1.default.findById(quizId);
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found");
    }
    //NOTE - Check Quiz crater usr and Who want to add quest are same
    const userId = req.user.id;
    if (userId.toString() !== quiz.User_Id.toString()) {
        res.status(401);
        throw new Error("User nit authorized.");
    }
    const quizQuestion = yield question_schema_1.QuizQuestionModel.findOne({ QuizId: quizId });
    if (!quizQuestion) {
        res.status(404);
        throw new Error("Quiz not found");
    }
    if (quiz.NumberOfQuestion == quizQuestion.AllQuestion.length) {
        res.status(405);
        throw new Error("All questions are created.");
    }
    const questionData = {
        QuestionNumber: QuestionNumber, // Provide appropriate values here
        Question: Question,
        Description: Description,
        Option: Option,
        CorrectOption: CorrectOption,
        Marks: Marks
    };
    const question = new question_schema_1.QuestionModel(questionData);
    quizQuestion.AllQuestion.push(question);
    yield quizQuestion.save();
    res.json(quizQuestion);
}));
//NOTE - get all quiz question
exports.getAllQuizQuestion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizId = req.query.quizId;
    const quiz = yield quiz_schema_1.default.findById(quizId);
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found.");
    }
    const quizQuestion = yield question_schema_1.QuizQuestionModel.findOne({ QuizId: quizId });
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz Question not found.");
    }
    res.status(200).json(quizQuestion === null || quizQuestion === void 0 ? void 0 : quizQuestion.AllQuestion);
}));
//# sourceMappingURL=question-controllers.js.map