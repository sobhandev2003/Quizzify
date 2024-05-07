import { Request, Response } from "express";
import { OptionInterface, OptionModel, QuestionInterface, QuestionModel, QuizQuestionModel } from "../models/question-schema";
import Quiz from "../models/quiz-schema";
import asyncHandler from "express-async-handler";
import { CustomRequest } from "../middiliwer/tokenValidator";
import mongoose from "mongoose";
export const createNewQuestion = asyncHandler(async (req: Request, res: Response) => {
    // console.log(req.body);

    const { QuestionNumber, Question, Description, Option, CorrectOption, Marks }: QuestionInterface = req.body
    const quizId = req.query.quizId
    // console.log(quizId);
    
    if ( typeof quizId==="string" && !mongoose.Types.ObjectId.isValid(quizId)) {
        res.status(400)
        throw new Error("Quiz id not valid.")
    }
    if (!QuestionNumber ||
        !Question ||
        !Option ||
        !CorrectOption
        // !Marks 
        // Marks < 1 ||
        // !Array.isArray(Option) 

    ) {

        res.status(400);
        throw new Error("Input not valid.")
    }
    if (!Option || !Option.A || !Option.B || !Option.C || !Option.D) {
        res.status(400);
        throw new Error("Option not valid.")
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found");
    }
    //NOTE - Check Quiz crater usr and Who want to add quest are same
    const userId = (req as CustomRequest).user.id;
    if (userId.toString() !== quiz.User_Id.toString()) {
        res.status(401);
        throw new Error("User nit authorized.")
    }

    const quizQuestion = await QuizQuestionModel.findOne({ QuizId: quizId });
    if (!quizQuestion) {
        res.status(404);
        throw new Error("Quiz not found");
    }

    if (quiz.NumberOfQuestion == quizQuestion.AllQuestion.length) {

        res.status(405);
        throw new Error("All questions are created.")
    }

    const questOption: OptionInterface = new OptionModel(Option)
    const questionData = {
        QuestionNumber: QuestionNumber, // Provide appropriate values here
        Question: Question,
        Description: Description,
        Option: questOption,
        CorrectOption: CorrectOption,
        Marks: Marks
    };
    // console.log("ch1")
    const question: QuestionInterface = new QuestionModel(questionData);
    // console.log("ch2")
    quizQuestion.AllQuestion.push(question);
    // console.log("ch3")
    await quizQuestion.save();
    // quizQuestion.AllQuestion.length
    // console.log(quizQuestion.AllQuestion.length,quiz.NumberOfQuestion)

    if (quizQuestion.AllQuestion.length === quiz.NumberOfQuestion) {
        quiz.isValid = true;
        await quiz.save()
    }

    res.json({success:true,message:"Question successfully add", quizQuestion})
})

//NOTE - get all quiz question
export const getAllQuizQuestion = asyncHandler(async (req: Request, res: Response) => {
    const quizId = req.query.quizId;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found.")
    }
    const quizQuestion = await QuizQuestionModel.findOne({ QuizId: quizId });
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz Question not found.")
    }

    res.status(200).json(quizQuestion?.AllQuestion);
})
