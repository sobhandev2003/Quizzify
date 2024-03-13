import mongoose, { Schema, Document } from "mongoose";
// import quizSchema from "./quiz-schema";

export interface Question extends Document {
    QuestionNumber: number;
    Question: string;
    Option: string[];
    CorrectOption: string;
    Marks: number;
}

export interface QuizQuestion extends Document {
    QuizId: mongoose.Types.ObjectId;
    AllQuestion: Question[];
    RemainingQuestion:Number;
    RemainingScore:Number;
}

const QuestionSchema: Schema = new Schema({
    QuestionNumber: {
        type: Number,
        required: [true,"Question number required."]
    },
    Question: {
        type: String,
        required: [true,"Quest required."]
    },
    Option: {
        type: [String],
        required: [true,"Option required."]
    },
    CorrectOption: {
        type: String,
        required: [true,"Correct option required."]
    },
    Marks: {
        type: Number,
        required: true
    }
});

const QuizQuestionSchema: Schema = new Schema({
    QuizId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    AllQuestion: {
        type: [QuestionSchema],
        required: true
    },
    RemainingScore:{

    }
});

// Calculate default marks per question before saving
// QuizQuestionSchema.pre<QuizQuestion>("save", async function(next) {
//     const quiz=await quizSchema.findById(this.QuizId);
//     const totalMarks = quiz?.TotalScore!;
//     const AllQuestion = this.AllQuestion;
//     const totalQuestions=AllQuestion.length

//     const defaultMarksPerQuestion = totalMarks / totalQuestions;
//     this.AllQuestion.forEach((question) => {
//         question.Marks = defaultMarksPerQuestion;
//     });
//     next();
// });

export const QuestionModel = mongoose.model<Question>("Question", QuestionSchema);
export const QuizQuestionModel = mongoose.model<QuizQuestion>("QuizQuestion", QuizQuestionSchema);
