


import axios, { isAxiosError } from "axios";
import { LoginDetails, UserRegisterDetails } from "..";
import toast from 'react-hot-toast';
import { updateLoginUser } from "../redux/reducer/userAccount";


//SECTION - Register new user account
export const registerNewAccount = async (userData: UserRegisterDetails) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/`, userData);
        const data = await response.data
        toast.success(data.message)
        return data.success
    } catch (error) {
        if (isAxiosError(error)) {
            // Axios error
            toast.error(error.response?.data.message);
            return false;
        } else {
            // Other error types
            console.error(error);
            toast.error("Something wrong.");
            return false;
        }
    }
}

//SECTION - Login Existing User
export const loginExistingUser = async (loginData: LoginDetails, dispatch: any) => {

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/users/login`,
            loginData,
            {
                withCredentials: true
            })

        if (response.data) {
            getUserDetails(dispatch)
            toast.success("Successfully login.")

        }

    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error);
            
            toast.error(error.response?.data.message);
        }
        else {
            // Other error types
            console.error(error);
            toast.error("Something wrong.");
        }
    }
}

//SECTION - Logout current login user account

export const logoutLoginUser = async (dispatch: any, navigate: any) => {
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

//SECTION - Gate user details
export const getUserDetails = async (dispatch: any) => {
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


export const updateProfilePhoto = async (photo: File, dispatch: any) => {
    try {

        const formData = new FormData()
        formData.append('photo', photo)
            console.log( `${import.meta.env.VITE_BASE_URL}/users/profile-photo`);
            
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
            getUserDetails(dispatch)
        }
        else {
            toast.error(data.message)
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