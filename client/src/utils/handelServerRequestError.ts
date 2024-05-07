import { isAxiosError } from "axios"
import toast from "react-hot-toast"

export const handelServerRequestError = (error: any) => {
    if (isAxiosError(error)) {
        toast.error(error.response?.data.message)
        // toast.error(error.message)
    }
    else {
        toast.error("Something wrong")
    }
}