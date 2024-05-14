import { createSlice } from "@reduxjs/toolkit";
import { number } from "yup";
import { QuestionType } from "../..";
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
    quizQuestionDet: {

        QuizId: "",
        RemainingScore: undefined as undefined | number,
        TotalScore: undefined as undefined | number,
        User_Id: "",
        allQuestion: [] as QuestionType[],
    },

    userAns: [] as string[],
    marks: undefined as number | undefined
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

        updateQuizQuestionDet:(state, action) => {
            // console.log(action.payload);

            state.quizQuestionDet = action.payload;
            state.quizQuestionDet.allQuestion=action.payload.AllQuestion
            // console.log();
            
            state.userAns = Array(state.quizQuestionDet.allQuestion.length).fill(null);


        },
        updateUserAns: (state, action) => {
            const { index, ans } = action.payload;
            state.userAns[index] = ans;
        },
        updateMarks: (state, action) => {
            state.marks = action.payload;
        }
    }
})

export const { setCurrentQuiz,
    setIsUpdate,
    // setQuestion,
    updateQuizQuestionDet,
    updateUserAns,
    updateMarks } = quizSlice.actions
export default quizSlice.reducer