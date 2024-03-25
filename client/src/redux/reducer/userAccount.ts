
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface USerDetails{
    id:string;
    email:string;
    userName:string
}

export interface userAccountState{
    loginUser:USerDetails
}

const initialState:userAccountState={
        loginUser:{
            id:"",
            email:"",
            userName:""
        }
}

export const userAccountSlice=createSlice({
    name:"User",
    initialState,
    reducers:{
        updateLoginUser:(state,action)=>{
            state.loginUser=action.payload
        }
    }
}) 

export const {updateLoginUser}=userAccountSlice.actions
export default userAccountSlice.reducer