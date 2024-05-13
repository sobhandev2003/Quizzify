import mongoose, { Document, Schema } from "mongoose";
import { emailValidator, phoneNumberValidator } from "../validator";



export interface IAttendQuizDetails {

    Quiz_Id: string;
    Quiz_Name: string;
    Quiz_Category: string;
    Score: number;
    IsPassed: boolean;

}

export interface IUser extends Document {
    UserName: string;
    Email: string;
    phoneNumber: string;
    ProfilePhotoId: string | null;
    Password: string;
    VerificationToken: string | null;
    IsVerified: boolean;
    TotalAttendNumberOfQuiz: number;
    AttendQuizList: IAttendQuizDetails[];
   
    createdAt: Date;
    updatedAt: Date;
}



const AttendQuizDetailsSchema: Schema = new mongoose.Schema({
    Quiz_ID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Quiz id mandatory."]
    },
    Quiz_Name: {
        type: String,
        required: [true, "Quiz name mandatory."]
    },
    Quiz_Category: {
        type: String,
        required: [true, "Quiz category mandatory."]
    },
    Score: {
        type: Number,
        required: [true, "Score mandatory."]

    },
    IsPassed: {
        type: Boolean,
        required: [true, "Passing status mandatory."]
    },

}, {
    timestamps: true
})


const usersSchema = new mongoose.Schema({
    UserName: {
        type: String,
        minLength: 3,
        required: [true, "User Name mandatory "]
    },
    Email: {

        type: String,
        validate: {
            validator: emailValidator,
            message: (props: any) => `${props.value} is not valid email.`
        },

        required: [true, "Email mandatory"],
        unique: [true, "This email address already register"]

    },
    phoneNumber: {
        type: String,
        validate: {
            validator: phoneNumberValidator,
            message: (props: any) => `${props.value} is not valid phone number `
        },
        required: [true, "Phone number mandatory"],
        unique: [true, "This phone number already register"]
    },
    ProfilePhotoId: {
        type: String,
        default: null
    },
    Password: {
        type: String,
        required: [true, "Password mandatory"]
    },

    VerificationToken: {
        type: String,
        expireAfterSeconds: 10,
        default: null
    },
    IsVerified: {
        type: Boolean,
        default: false
    },
    TotalAttendNumberOfQuiz: {
        type: Number,
        default: 0
    },
    AttendQuizList: [AttendQuizDetailsSchema],

},
    { timestamps: true }
)


export const AttendQuizDetails = mongoose.model<IAttendQuizDetails>("AttendQuizDetails", AttendQuizDetailsSchema);
export default mongoose.model("User", usersSchema);