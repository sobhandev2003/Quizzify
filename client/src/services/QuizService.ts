import axios, { isAxiosError } from "axios";
import { Quiz, QuizUpdateDetails } from "..";
import toast from "react-hot-toast";
import { handelServerRequestError } from "../utils/handelServerRequestError";
import { AppDispatch } from "../redux/store";
import { setCurrentQuiz, setIsUpdate } from "../redux/reducer/QuizReducer";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "./userAcoount";

//NOTE - Create a new Quiz
export const createQuiz = async (quizDetaisl: Quiz, navigate: ReturnType<typeof useNavigate>, userId: string) => {
    const toastId = toast.loading("Creating...", {
        duration: 60000
    })
    try {
        // console.log(quizDetaisl);
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

        // console.log(response.data);
        if (response.data.success) {
            toast.success(response.data.message, {
                id: toastId,
                duration: 1500
            })
            navigate(`/quiz/${userId}/${response.data.newQuiz._id}`)
        }


    } catch (error) {
        handelServerRequestError(error, toastId)
    }
}

//NOTE - Update Quiz by id

export const updateQuizById = (quizId: string, updateDetails: QuizUpdateDetails, setUpdateQuiz: any) => async (dispatch: AppDispatch) => {
    const toastId = toast.loading("updating...")
    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/quiz/update?quizId=${quizId}`, updateDetails, {
            withCredentials: true
        })
        // console.log(response.data);
        toast.success(response.data.message, {
            id: toastId,
        })
        dispatch(getMyQuizById(quizId))
        setUpdateQuiz(null)

    } catch (error) {
        handelServerRequestError(error, toastId)
    }
}
//NOTE - Delete by Id
export const deleteQuizById = (quizId: string,navigate: ReturnType<typeof useNavigate>) => async (dispatch: AppDispatch) => {
    const toastId = toast.loading("deleting...")
    try {
        const response=await axios.delete(`${import.meta.env.VITE_BASE_URL}/quiz/delete?quizId=${quizId}`,{
            withCredentials:true
        });

        // console.log(response.data);
        toast.success(response.data.message, {
            id: toastId,
        })
        navigate("/quiz/my-quiz")
        
    } catch (error) {
        handelServerRequestError(error, toastId)
    }
}

//NOTE - Get All quiz which are not created by login user
export const getAllQuiz = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/get`,
            { withCredentials: true }
        );
        // console.log(response.data);

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
//NOTE - Get all quiz which ar created by login user
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
//Get a quiz by id
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
//NOTE -  Get a quiz by id which is created by login user
export const getMyQuizById = (quizId: string) => async (dispatch: AppDispatch) => {
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

//NOTE - update a quiz some details [Description,NumberOfAttendByAnyone]

//TODO - 
// export const update



//NOTE -Update like 
export const updateLike = (quizId: string) => async (dispatch: AppDispatch) => {
    try {
// console.log(quizId);

        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/quiz/like?quizId=${quizId}`, {}, {
            withCredentials: true
        })
        // console.log(response.data);
    //   dispatch(getUserDetails())


    } catch (error) {
        handelServerRequestError(error)
    }
}
//NOTE - Update unLike
export const updateUnlike = (quizId: string) => async (dispatch: AppDispatch) => {
    try {

        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/quiz/unlike?quizId=${quizId}`, {}, {
            withCredentials: true
        })
        console.log(response.data);


    } catch (error) {
        handelServerRequestError(error)
    }
}
