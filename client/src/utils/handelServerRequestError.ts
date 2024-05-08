import { isAxiosError } from "axios"
import toast from "react-hot-toast"

export const handelServerRequestError = async(error: any,tostId:string|undefined=undefined) => {
    console.log(error);

    if (isAxiosError(await error)) {

       tostId? toast.error(error.response?.data.message,{id:tostId}):toast.error(error.response?.data.message)
        // toast.error(error.message)
    }
    else {
        tostId? toast.error("Something wrong",{id:tostId}):toast.error("Something wrong")
    }
}