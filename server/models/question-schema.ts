import mongoose, { Schema, Document } from "mongoose";
import quizSchema from "./quiz-schema";
export  interface OptionInterface extends Document{
    A:string,
    B:string,
    C:string,
    D:string,
}
export interface QuestionInterface extends Document {
    QuestionNumber: number;
    Question: string;
    Description:String;
    Option:OptionInterface;
    CorrectOption: string;
    Marks: number;
}

export interface QuizQuestionInterface extends Document {
    User_Id: mongoose.Types.ObjectId;
    QuizId: mongoose.Types.ObjectId;
    AllQuestion: QuestionInterface[];
    TotalScore: Number;
    RemainingScore: Number;

}
const OptionSchema:Schema=new Schema({
    A:{
        type:String,
        required:[true,"Option required"]
    },
    B:{
        type:String,
        required:[true,"Option required"]
    },
    C:{
        type:String,
        required:[true,"Option required"]
    },
    D:{
        type:String,
        required:[true,"Option required"]
    }
})
const QuestionSchema: Schema = new Schema({
    QuestionNumber: {
        type: Number,
        required: [true, "Question number required."]
    },
    Question: {
        type: String,
        required: [true, "Quest required."]
    },
    Description:{
        type: String,
        default:null
    },
    Option: {
        type: OptionSchema,
        required: [true, "Option required."],
       
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
    User_Id:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User Id required."]
    },
    QuizId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    AllQuestion: {
        type: [QuestionSchema],
    },
    TotalScore: {
            type:Number,
            
            require:[true,"TotalScore required"]
    },
    RemainingScore: {
        type:Number,
        require:[true,"TotalScore required"]
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

export const OptionModel=mongoose.model<OptionInterface>("Option",OptionSchema)
export const QuestionModel = mongoose.model<QuestionInterface>("Question", QuestionSchema);
export const QuizQuestionModel = mongoose.model<QuizQuestionInterface>("QuizQuestion", QuizQuestionSchema);
