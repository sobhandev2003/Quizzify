
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AttendQuizDetails } from "../..";
export interface UserDetails{
    id:string;
    email:string;
    userName:string;
    phoneNumber:string
    profilePhotoId:string;
    AttendQuizzes:AttendQuizDetails[] |[];
    LikedList?:string[] 
    DisLikedList?:string[] 
}

export interface userAccountState{
    loginUser:UserDetails
}

const initialState:userAccountState={
        loginUser:{
            id:"",
            email:"",
            userName:"",
            phoneNumber:"",
            profilePhotoId:"",
            AttendQuizzes:[] ,
            LikedList:[],
            DisLikedList:[],
        }
}

export const userAccountSlice=createSlice({
    name:"User",
    initialState,
    reducers:{
        updateLoginUser:(state,action)=>{
            // console.log(action.payload);   
            state.loginUser=action.payload
        }
    }
}) 

export const {updateLoginUser}=userAccountSlice.actions
export default userAccountSlice.reducer