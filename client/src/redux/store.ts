
import { configureStore } from "@reduxjs/toolkit";
import userAccountReducer from "./reducer/userAccount";
import quizReducer from "./reducer/QuizReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const store =configureStore({
    reducer:{
        userAccountReducer:userAccountReducer,
        quizReducer:quizReducer
    }
})

export  type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
export const useAppDispatch:()=>typeof store.dispatch =useDispatch

export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector
