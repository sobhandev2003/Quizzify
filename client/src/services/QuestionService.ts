import axios from "axios";
import { QuestionType } from "..";
import { handelServerRequestError } from "../utils/handelServerRequestError";
import toast from "react-hot-toast";

export const addQuestion = async (questionId: string, questionData: QuestionType) => {
    // console.log(questionId, questionData);

    try {
        const response = axios.post(`${import.meta.env.VITE_BASE_URL}/question/create?quizId=${questionId}`, questionData,
            {
                withCredentials: true

            }
        )

        // console.log(response.data);
        return response


    } catch (error) {
        handelServerRequestError(error)
    }

}