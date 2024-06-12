


import axios, { isAxiosError } from "axios";
import { AttendQuizDetails, LoginDetails, UserRegisterDetails } from "..";
import toast from 'react-hot-toast';
import { updateLoginUser } from "../redux/reducer/userAccount";
import { handelServerRequestError } from "../utils/handelServerRequestError";
import { AppDispatch } from "../redux/store";


//SECTION - Register new user account
export const registerNewAccount = async (userData: UserRegisterDetails) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/`, userData);
        const data = await response.data
        toast.success(data.message)
        return data.success
    } catch (error) {
        handelServerRequestError(error)
    }
}

//SECTION - Login Existing User
export const loginExistingUser = (loginData: LoginDetails) => async (dispatch: AppDispatch) => {

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/login`,
            loginData,
            {
                withCredentials: true
            })

        if (response.data) {
            // getUserDetails(dispatch)
            dispatch(getUserDetails())
            toast.success("Successfully login.")

        }

    } catch (error) {
        handelServerRequestError(error)
    }
}

//SECTION - Logout current login user account

export const logoutLoginUser = (navigate: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            withCredentials: true,
        })

        if (response.data.success) {
            dispatch(updateLoginUser(response.data.userDetails))
            toast.success("log out")
            navigate("/login")
        }

    } catch (error) {
        handelServerRequestError(error)
    }
}

//SECTION - Gate user details
export const getUserDetails = () => async (dispatch: AppDispatch) => {
    try {

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`, {
            withCredentials: true
        })
        if (response.data.success) {
            // console.log(response.data);

            dispatch(updateLoginUser(response.data.userDetails))
        }
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(error.response?.data.message);
        }
        else {
            // Other error types
            console.error(error);
            toast.error("Something wrong.");
        }
    }
}


export const updateProfilePhoto = (photo: File) => async (dispatch: AppDispatch) => {
    try {

        const formData = new FormData()
        formData.append('photo', photo)
        console.log(`${import.meta.env.VITE_BASE_URL}/users/profile-photo`);

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/profile-photo`,
            formData,
            {
                withCredentials: true, // include cookies
            }
        );
        console.log(response);

        const data = response.data

        if (data.success) {
            toast.success("Successfully update profile photo")
            dispatch(getUserDetails())
        }
        else {
            toast.error(data.message)
        }

    } catch (error) {
        handelServerRequestError(error)
    }
}

//SECTION - Add current submit quiz details
export const addCurrentSubmitQuizDetails = (quizDetails: AttendQuizDetails) => async (dispatch: AppDispatch) => {
    try {

        const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/quiz/attend`, quizDetails, {
            withCredentials: true, // include cookies
        })
        // console.log(response.data);
        dispatch(getUserDetails())


    } catch (error) {
        handelServerRequestError(error)
    }
}