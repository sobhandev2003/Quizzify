
import { Request, Response } from "express";
import asyncHandler from "express-async-handler"
import { CustomRequest } from "../middiliwer/tokenValidator";
import User from "../models/users-schema";
import Quiz from "../models/quiz-schema";
import { QuizQuestionModel } from "../models/question-schema";

import { googleDrive, uploadImageInGoogleDrive } from "../utils/uploadImageInDrive";
import { Buffer } from "buffer";
import { imageMimeTypes } from "../assets/imagefiletype";
//SECTION -  - Create new Quiz
export const createNewQuiz = asyncHandler(async (req: Request, res: Response) => {
    const { Name,
        Description,
        Category,
        Topic,
        NumberOfQuestion,
        TotalScore,
        PassingScore,
        NumberOfAttendByAnyone } = req.body;
        // console.log(req.body);
        
    //NOTE - set poster file details if its exits 
    const file = req.file;
    let filePath: string | null = null;
    let mimetype: string | null = null;
    let buffer: Buffer | null = null;
    if (file) {
        mimetype = file.mimetype
        buffer = file.buffer
        if (mimetype && !imageMimeTypes.includes(mimetype)) {
            res.status(400);
            throw new Error("Accept .jpeg, .png, and .webp format.")
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
    const userId = (req as CustomRequest).user.id
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        if (filePath) {
        }
        throw new Error("User account not found")
    }
    //NOTE - Create new Quiz and save DB
    const newQuiz = await Quiz.create(
        {
            User_Id: userId,
            Name,
            Description,
            Category,
            Topic,
            NumberOfQuestion:Number(NumberOfQuestion) ,
            TotalScore:Number(TotalScore),
            PassingScore,
            NumberOfAttendByAnyone:Number(NumberOfAttendByAnyone)
        }
    )

    await QuizQuestionModel.create(
        { QuizId: newQuiz.id }
    )




    //NOTE - if poster given then save it google drive and update quiz poster id.
    if (buffer && mimetype && newQuiz) {
        const filename = newQuiz.Name + newQuiz.id;
        const folderId = process.env.GOOGLE_DRIVE_QUIZ_POSTER_FOLDER_ID!;
        const fileId = await uploadImageInGoogleDrive(filename, mimetype, buffer, folderId, null);
        newQuiz.PosterId = fileId;
        await newQuiz.save();
    }

    res.json({ success: true, message: "Quiz created successfully." })
})

//NOTE -  Get All Quiz
export const getAllQuiz=asyncHandler(async(req: Request, res: Response)=>{
const allQuiz=await Quiz.find();
// console.log(allQuiz);

res.json(allQuiz)

})
//SECTION - Delete exiting quiz
export const deleteQuiz = asyncHandler(async (req: Request, res: Response) => {
    const quizId = req.query.quizId || null
    if (!quizId) {
        res.status(400)
        throw new Error("Missing quiz id.");
    }
    //NOTE - Check user account exit or not who want to delete Quiz.
    const user = await User.findById((req as CustomRequest).user.id);
    if (!user) {
        res.status(404);
        throw new Error("User account not found")
    }

    //NOTE - 
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz details not found.")
    }
    if (quiz.PosterId) {
        googleDrive.files.delete({
            fileId: quiz.PosterId
        })
    }


    const response = await Quiz.deleteOne({ _id: quizId })

    res.status(200).json({ success: true, message: "Quiz deleted.", response })
})

//SECTION - Update like in DB
export const updateLike = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById((req as CustomRequest).user.id);
    const quizId = req.query.quizId;
    if (!user) {
        res.status(404);
        throw new Error("User account not found.");
    }
    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found.");
    }

    quiz.Like! += 1;
    await quiz.save();
    res.status(200).json({ success: true, message: "Like added." });
})

//SECTION - Update Unlike in DB
export const updateUnlike = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById((req as CustomRequest).user.id);
    const quizId = req.query.quizId;
    if (!user) {
        res.status(404);
        throw new Error("User account not found.");
    }
    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found.");
    }

    quiz.Unlike! += 1;
    await quiz.save();
    res.status(200).json({ success: true, message: "Unlike added." });
});

export const submitQuiz = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById((req as CustomRequest).user.id);
    const quizId = req.query.quizId;
    if (!user) {
        res.status(404);
        throw new Error("User account not found.");
    }
    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
        res.status(404);
        throw new Error("Quiz not found.");
    }
    quiz.TotalNumberOfSubmit! += 1;
})