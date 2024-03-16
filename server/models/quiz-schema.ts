import mongoose, { Document } from "mongoose";

export interface Quiz extends Document {
    User_Id: mongoose.Types.ObjectId;
    Name: string;
    Description: string;
    Category: string;
    Topic?: string;
    NumberOfQuestion: number;
    TotalScore: number;
    NumberOfAttendByAnyone?: number;
    PosterId?: string | null;
    TotalNumberOfSubmit?: number;
    Like?: number;
    Unlike?: number;
    createdAt?: Date;
    updatedAt?: Date;
    isValid?:boolean
}

const QuizSchema = new mongoose.Schema<Quiz>({
    User_Id:{
        type: mongoose.Schema.Types.ObjectId,
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
    isValid:{
        type:Boolean,
        default:false
    }

},
{
    timestamps: true
});

export default mongoose.model<Quiz>("QUIZ", QuizSchema);
