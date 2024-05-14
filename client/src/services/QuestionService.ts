import axios from "axios";
import { QuestionType } from "..";
import { handelServerRequestError } from "../utils/handelServerRequestError";
import toast from "react-hot-toast";
import { AppDispatch } from "../redux/store";
import { updateQuizQuestionDet } from "../redux/reducer/QuizReducer";
//NOTE - Create new Question for a quiz
export const addQuestion = (quizId: string, questionData: QuestionType) => async (dispatch: AppDispatch) => {
    // console.log(questionId, questionData);

    const tostId = toast.loading('Adding...');
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/question/create?quizId=${quizId}`, questionData,
            {
                withCredentials: true

            }
        )
        dispatch(getAllQuestion(quizId))
        toast.success(response.data.message, {
            id: tostId
        })


    } catch (error) {
        handelServerRequestError(error, tostId)
    }

}
//NOTE - Get All question from DB
export const getAllQuestion = (quizId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/question/get?quizId=${quizId}`, {
            withCredentials: true
        })
        // console.log(response.data);
        dispatch(updateQuizQuestionDet(response.data))

    } catch (error) {
        handelServerRequestError(error)
    }
}

//NOTE - Update a Question

export const updateQuestion = (quizId: string, questionId: string, updatedQuestion: any,setQuestionToUpdate:any) => async (dispatch: AppDispatch) => {
    const toastId = toast.loading("Updating...")
    try {
        console.log(quizId, questionId, updatedQuestion);

        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/question/update?quizId=${quizId}&questionId=${questionId}`,
            updatedQuestion,
            {
                withCredentials: true
            }
        )

        // console.log(response.data);
        toast.success(response.data.message, {
            id: toastId
        })
        setQuestionToUpdate(null)
        dispatch(getAllQuestion(quizId))

    } catch (error) {
        handelServerRequestError(error, toastId)
    }
}

//NOTE - Delete Question
export const deleteQuestion = (quizId: string, questionId: string) => async (dispatch: AppDispatch) => {
    const tostId = toast.loading('Deleting...');
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/question/delete?quizId=${quizId}&questionId=${questionId}`, {
            withCredentials: true
        })
        // console.log(response.data);

        toast.success(response.data.message, {
            id: tostId
        })
        dispatch(getAllQuestion(quizId))

    } catch (error) {
        handelServerRequestError(error, tostId)
    }
}