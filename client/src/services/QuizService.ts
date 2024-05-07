import axios, { isAxiosError } from "axios";
import { Quiz } from "..";
import toast from "react-hot-toast";
import { handelServerRequestError } from "../utils/handelServerRequestError";
import { AppDispatch } from "../redux/store";
import { setCurrentQuiz, setIsUpdate, setQuestion } from "../redux/reducer/QuizReducer";


export const createQuiz = async (quizDetaisl: Quiz) => {
    try {
        console.log(quizDetaisl);

        const formData = new FormData();
        const { Name, Description, Category, Topic, TotalScore, NumberOfQuestion, NumberOfAttendByAnyone, PassingScore, poster } = quizDetaisl
        formData.append("Name", Name)
        formData.append("Description", Description);
        formData.append("Category", Category);
        if (Topic) {
            formData.append("Topic", Topic);
        }
        formData.append("TotalScore", TotalScore);
        formData.append("NumberOfQuestion", NumberOfQuestion);
        if (NumberOfAttendByAnyone) {
            formData.append("NumberOfAttendByAnyone", NumberOfAttendByAnyone);
        }
        if (PassingScore) {
            formData.append("PassingScore", PassingScore)
        }
        if (poster) {
            formData.append("poster", poster)
        }

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/quiz`,
            formData,
            { withCredentials: true }
        )

        console.log(response.data);
        if (response.data.success) {
            toast.success(response.data.message)

        }


    } catch (error) {
        handelServerRequestError(error)
    }
}

export const getAllQuiz = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/get`,
            { withCredentials: true }
        );
        // console.log(response.data[0]);

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            toast(error.message)
        }
        else {
            toast("Something wrong")
        }
    }
}

export const getMyQuiz = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/get/my-quiz`,
            {
                withCredentials: true
            });
        // console.log(response.data);
        return response.data
    } catch (error) {
        handelServerRequestError(error)
    }
}

export const getQuizById = (quizId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/get/${quizId}`,
            { withCredentials: true }
        )
        // console.log(response.data.quiz);
        dispatch(setCurrentQuiz(response.data.quiz))
        

    } catch (error) {
        handelServerRequestError(error)
    }
}
export const getMyQuizById=(quizId:string)=>async(dispatch:AppDispatch)=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/get/my-quiz/${quizId}`,
            { withCredentials: true }
        )
        // console.log(response.data);
        dispatch(setCurrentQuiz(response.data.quiz))
        dispatch(setIsUpdate(true))
        
    } catch (error) {
        handelServerRequestError(error)
    }
}

export const getQuestion =  (quizId: string)=>async(dispatch:AppDispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/question/get?quizId=${quizId}`,
            { withCredentials: true }
        )

        // console.log(response.data);
        dispatch(setQuestion(response.data))

    } catch (error) {
        handelServerRequestError(error)
    }
}