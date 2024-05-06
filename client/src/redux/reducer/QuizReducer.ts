import { createSlice } from "@reduxjs/toolkit";
// import { Quiz } from "../..";
// export interface Quiz
const initialState = {
    quiz: {
        _id: "",
        User_Id: "",
        Name: "",
        Description: "",
        Category: "",
        Topic: "",
        NumberOfQuestion: "",
        TotalScore: "",
        PassingScore: "",
        NumberOfAttendByAnyone: "",
        PosterId: null,
        TotalNumberOfSubmit: -1,
        Like: 0,
        Unlike: 0,
        createdAt: undefined,
        updatedAt: undefined,
        isValid: false

    },
    isUpdate:false,
    quizQuestion:[]
    
}

export const quizSlice = createSlice({
    name: "Quiz",
    initialState,
    reducers: {
        setCurrentQuiz: (state, action) => {

            state.quiz = action.payload
            // console.log(state.quiz);
        },
        setIsUpdate:(state,action)=>{
                state.isUpdate=action.payload
        },
        setQuestion:(state,action)=>{
            
            state.quizQuestion=action.payload
            
        }
    }
})

export const { setCurrentQuiz,setIsUpdate,setQuestion } = quizSlice.actions
export default quizSlice.reducer