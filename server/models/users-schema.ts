import mongoose from "mongoose";
import { emailValidator, phoneNumberValidator } from "../validator";

const usersSchema=new mongoose.Schema({
    UserName:{
        type:String,
        minLength:3,
        required:[true,"User Name mandatory "]
    },
    Email:{
        type:String,
            validate:{
                validator:emailValidator,
                message:(props:any)=>`${props.value} is not valid email.`
            },
            
        required:[true,"Email mandatory"],
        unique:[true,"This email address already register"]

    },
    phoneNumber:{
        type:String,
        validate:{
            validator:phoneNumberValidator,
            message:(props:any)=>`${props.value} is not valid phone number `
        },
        required:[true,"Phone number mandatory"],
            unique:[true,"This phone number already register"]
    },
    Password:{
        type:String,
        required:[true,"Password mandatory"]
    },
    
    AccountActiveToken:{
        type:String,
        expireAfterSeconds:10,
        default:null
    },
    IsVerified:{
        type:Boolean,
        default:false
    }

})

export default mongoose.model("User",usersSchema);