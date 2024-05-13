import mongoose, { Document } from "mongoose";

export interface Quiz extends Document {
    User_Id: mongoose.Types.ObjectId;
    Name: string;
    Description: string;
    Category: string;
    Topic?: string;
    NumberOfQuestion: number;
    TotalScore: number;
    PassingScore?: number;
    NumberOfAttendByAnyone?: number;
    PosterId?: string | null;
    TotalNumberOfSubmit?: number;
   
    createdAt?: Date;
    updatedAt?: Date;
    isValid?: boolean
    //User who are like the quiz
    LikeBy?: mongoose.Schema.Types.ObjectId[];

    //User who are unlike the quiz
    UnLikeBy?: mongoose.Schema.Types.ObjectId[];
}

const QuizSchema = new mongoose.Schema<Quiz>({
    User_Id: {
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
    PassingScore: {
        type: Number,
        default: 0
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
   
    LikeBy: {
        type:[mongoose.Schema.Types.ObjectId],
        // unique:[true]
    },
   
    UnLikeBy: {
        type:[mongoose.Schema.Types.ObjectId],
        // unique:[true]
    },
    isValid: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true
    });

export default mongoose.model<Quiz>("QUIZ", QuizSchema);
