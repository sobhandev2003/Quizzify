import { Request, Response } from "express";
import { QuestionInterface, QuestionModel, QuizQuestionModel } from "../models/question-schema";
import Quiz from "../models/quiz-schema";
import asyncHandler from "express-async-handler";
export const createNewQuestion = asyncHandler(async (req: Request, res: Response) => {
    //TODO - 
    const { QuestionNumber, Question, Option, CorrectOption, Marks }: QuestionInterface = req.body
    const quizId = req.query.quizId
    if (!QuestionNumber ||
        !Question ||
        !Option ||
        !CorrectOption ||
        !Marks ||
        Marks < 5 ||
        !Array.isArray(Option) ||
        Option.length !== 4
    ) {

        res.status(400);
        throw new Error("Input not valid.")
    }


    const quizQuestion = await QuizQuestionModel.findOne({QuizId:quizId});
    if (!quizQuestion) {
        res.status(404);
        throw new Error("Quiz not found");
    }
   
    const questionData = {
        QuestionNumber: QuestionNumber, // Provide appropriate values here
        Question: Question,
        Option: Option,
        CorrectOption: CorrectOption,
        Marks: Marks
    };
    const question: QuestionInterface = new QuestionModel(questionData);
    quizQuestion.AllQuestion.push(question);
    await quizQuestion.save();

    res.json(quizQuestion)
})
