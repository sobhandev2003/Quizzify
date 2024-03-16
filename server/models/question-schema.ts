import mongoose, { Schema, Document } from "mongoose";
import quizSchema from "./quiz-schema";

export interface QuestionInterface extends Document {
    QuestionNumber: number;
    Question: string;
    Option: string[];
    CorrectOption: string;
    Marks: number;
}

export interface QuizQuestionInterface extends Document {
    QuizId: mongoose.Types.ObjectId;
    AllQuestion: QuestionInterface[];
    TotalScore?: Number;
    RemainingScore?: Number;

}

const QuestionSchema: Schema = new Schema({
    QuestionNumber: {
        type: Number,
        required: [true, "Question number required."]
    },
    Question: {
        type: String,
        required: [true, "Quest required."]
    },
    Option: {
        type: [String],
        required: [true, "Option required."],
        validate: {
            validator: (value: String[]) => {
                return value.length === 4;
            },
            message: "Number of option 4 required."
        }
    },
    CorrectOption: {
        type: String,
        required: [true, "Correct option required."]
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
    },
    TotalScore: {
            type:Number
    },
    RemainingScore: {
        type:Number
    }
    
});

// Calculate default marks per question before saving
QuizQuestionSchema.pre<QuizQuestionInterface>("save", async function (next) {
    const quiz = await quizSchema.findById(this.QuizId);
    if (this.AllQuestion.length === quiz?.NumberOfQuestion) {
        quiz.isValid = true;
        await quiz.save();
    }
    next();
});

export const QuestionModel = mongoose.model<QuestionInterface>("Question", QuestionSchema);
export const QuizQuestionModel = mongoose.model<QuizQuestionInterface>("QuizQuestion", QuizQuestionSchema);
