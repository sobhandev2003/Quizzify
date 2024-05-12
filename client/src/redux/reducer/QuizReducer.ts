import { createSlice } from "@reduxjs/toolkit";
import { number } from "yup";
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
    isUpdate: false,
    // quizQuestion: [],
    allQuestion: [],
    userAns: [] as string[],
    marks:undefined as number|undefined
}

export const quizSlice = createSlice({
    name: "Quiz",
    initialState,
    reducers: {
        setCurrentQuiz: (state, action) => {

            state.quiz = action.payload
            // console.log(state.quiz);
        },
        setIsUpdate: (state, action) => {
            state.isUpdate = action.payload
        },

        updateAllQuestion: (state, action) => {
            state.allQuestion = action.payload;

            state.userAns = Array(state.allQuestion.length).fill(null);


        },
        updateUserAns: (state, action) => {
            const { index, ans } = action.payload;
            state.userAns[index] = ans;
        },
        updateMarks:(state,action)=>{
            state.marks=action.payload;
        }
    }
})

export const { setCurrentQuiz,
    setIsUpdate,
    // setQuestion,
    updateAllQuestion,
    updateUserAns,
    updateMarks } = quizSlice.actions
export default quizSlice.reducer