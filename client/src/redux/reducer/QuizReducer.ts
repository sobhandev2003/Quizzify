import { createSlice } from "@reduxjs/toolkit";
// import { Quiz } from "../..";
// export interface Quiz
const initialState={
    quiz:{
        _id:"",
        User_Id: "",
        Name: "",
        Description: "",
        Category: "",
        Topic: "",
        NumberOfQuestion: "",
        TotalScore: "",
        PassingScore:"",
        NumberOfAttendByAnyone: "",
        PosterId:  null,
        TotalNumberOfSubmit: -1,
        Like:0,
        Unlike: 0,
        createdAt: undefined,
        updatedAt: undefined,
        isValid:false
    
    }
}

export const quizSlice=createSlice({
        name:"Quiz",
        initialState,
        reducers:{
                setCurrentQuiz:(state,action)=>{
                    
                    state.quiz=action.payload
                    // console.log(state.quiz);
                }
        }
})

export const {setCurrentQuiz}=quizSlice.actions
export default quizSlice.reducer