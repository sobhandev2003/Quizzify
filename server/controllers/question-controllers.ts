import { Request, Response } from "express";
import { OptionInterface, OptionModel, QuestionInterface, QuestionModel, QuizQuestionModel } from "../models/question-schema";
import Quiz from "../models/quiz-schema";
import asyncHandler from "express-async-handler";
import { CustomRequest } from "../middiliwer/tokenValidator";
import mongoose from "mongoose";
//NOTE - Create new Question
export const createNewQuestion = asyncHandler(async (req: Request, res: Response) => {
    // console.log(req.body);
    const { QuestionNumber, Question, Description, Option, CorrectOption, Marks }: QuestionInterface = req.body
    const quizId = req.query.quizId
    // console.log(quizId);

    if (typeof quizId === "string" && !mongoose.Types.ObjectId.isValid(quizId)) {
        res.status(400)
        throw new Error("Quiz id not valid.")
    }
    if (!QuestionNumber ||
        !Question ||
        !Option ||
        !CorrectOption ||
        Marks < 0 ||
        !Number.isInteger(Marks)
    ) {

        res.status(400);
        throw new Error("Input not valid.")
    }
    if (!Option || !Option.A || !Option.B || !Option.C || !Option.D) {
        res.status(400);
        throw new Error("Option not valid.")
    }

  
    if (![Option.A, Option.B, Option.C, Option.D].includes(CorrectOption)) {
        res.status(400);
        throw new Error("Correct Option not valid.");
    }
    

    const userId = (req as CustomRequest).user.id;
    const quiz = await Quiz.findOne({ _id: quizId, User_Id: userId });
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found");
    }
    //NOTE - Check Quiz crater usr and Who want to add quest are same
    // if (userId.toString() !== quiz.User_Id.toString()) {
    //     res.status(401);
    //     throw new Error("User nit authorized.")
    // }

    const quizQuestion = await QuizQuestionModel.findOne({ User_Id: userId, QuizId: quizId });
    if (!quizQuestion) {
        res.status(404);
        throw new Error("Quiz not found");
    }

    if (quiz.NumberOfQuestion === quizQuestion.AllQuestion.length) {

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
    if (Number(quizQuestion.RemainingScore) - Marks < 0) {
        res.status(400)
        throw new Error(`Only ${Number(quizQuestion.RemainingScore)} score remaining `)
    }
    quizQuestion.RemainingScore = Number(quizQuestion.RemainingScore) - Marks;
    quizQuestion.AllQuestion.push(question);
    // console.log("ch3")
    await quizQuestion.save();
    // quizQuestion.AllQuestion.length
    // console.log(quizQuestion.AllQuestion.length,quiz.NumberOfQuestion)

    if (quizQuestion.AllQuestion.length === quiz.NumberOfQuestion) {
        quiz.isValid = true;
        await quiz.save()
    }

    res.json({ success: true, message: "Question successfully add", quizQuestion })
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

//NOTE - Update question
export const updateQuestion = asyncHandler(async (req: Request, res: Response) => {
    const { quizId, questionId } = req.query
    const { QuestionNumber, Question, Description, Option, CorrectOption, Marks }: QuestionInterface = req.body
    //NOTE - Check quiz id and question id
    if (!quizId || !questionId) {
        res.status(400)
        throw new Error("Invalid request")
    }
    //NOTE - Check update data
    if (!QuestionNumber &&
        !Question &&
        !Marks &&
        !Option &&
        !CorrectOption &&
        !Description
    ) {

        res.status(400);
        throw new Error("Input input ")
    }
    const userId = (req as CustomRequest).user.id;
    const quizQuestion = await QuizQuestionModel.findOne({ QuizId: quizId, User_Id: userId });
    if (!quizQuestion) {
        res.status(404)
        throw new Error("Quiz not found")
    }
    // console.log(quizQuestion.AllQuestion);
    const questionToUpdate = quizQuestion.AllQuestion.find((el) => {
        // console.log(el._id);
        return el.id === questionId;

    })

    if (!questionToUpdate) {
        res.status(404)
        throw new Error("Question not found")
    }
    // Update option A of the question
    // questionToUpdate.Option.A = "Updated";
    // Save the changes
    //NOTE - Update Question Number
    if (QuestionNumber && QuestionNumber !== questionToUpdate.QuestionNumber) {
        questionToUpdate.QuestionNumber = QuestionNumber
    }
    //NOTE - Update Question 
    if (Question && Question !== questionToUpdate.Question) {
        questionToUpdate.Question = Question
    }
    //NOTE - Update Question Description
    if (Description && Description !== questionToUpdate.Description) {
        questionToUpdate.Description = Description
    }
    //NOTE - Update Question Option
    if (Option && Option.A && Option.A !== questionToUpdate.Option.A) {
        questionToUpdate.Option.A = Option.A
    }
    if (Option && Option.B && Option.B !== questionToUpdate.Option.B) {
        questionToUpdate.Option.B = Option.B
    }
    if (Option && Option.C && Option.C !== questionToUpdate.Option.C) {
        questionToUpdate.Option.C = Option.C
    }
    if (Option && Option.D && Option.D !== questionToUpdate.Option.D) {
        questionToUpdate.Option.D = Option.D
    }
    //NOTE - Update Question Correct Options
    if (CorrectOption && CorrectOption !== questionToUpdate.CorrectOption) {
        if (![questionToUpdate.Option.A, questionToUpdate.Option.B, questionToUpdate.Option.C, questionToUpdate.Option.D].includes(CorrectOption)) {
            res.status(400);
            throw new Error("Correct Option not valid.");
        }
        questionToUpdate.CorrectOption = CorrectOption
    }
    if (Marks && Marks > 0 && Marks !== questionToUpdate.Marks) {
        if (Marks > Number(quizQuestion.RemainingScore)) {
            res.status(400)
            throw new Error("Marks not valid")
        }
        quizQuestion.RemainingScore = (Number(quizQuestion.RemainingScore) + Number(questionToUpdate.Marks)) - Marks
        questionToUpdate.Marks = Marks
    }
    await quizQuestion.save();

    res.status(200).json({ success: true, message: "Successfully updated", questionToUpdate })

})

//NOTE - Delete a quiz question
export const deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
    const { quizId, questionId } = req.query
    const userId = (req as CustomRequest).user.id;
    if (!quizId || !questionId) {
        res.status(400)
        throw new Error("Invalid request")
    }


    const quizQuestion = await QuizQuestionModel.findOne({ QuizId: quizId, User_Id: userId });
    if (!quizQuestion) {
        res.status(404)
        throw new Error("Quiz not found")
    }
    // console.log(quizQuestion.AllQuestion);
    const questionIndex = quizQuestion.AllQuestion.findIndex(question => question.id === questionId);
    if (questionIndex === -1) {
        res.status(404)
        throw new Error("Question Not found")
    }

    // Add the marks of the question to the RemainingScore
    quizQuestion.RemainingScore = Number(quizQuestion.RemainingScore) + quizQuestion.AllQuestion[questionIndex].Marks;

    // Remove the question from the AllQuestion array
    quizQuestion.AllQuestion.splice(questionIndex, 1);

    // Save the changes
    await quizQuestion.save();

    res.status(200).json({ success: true, message: "Question deleted" })
})


