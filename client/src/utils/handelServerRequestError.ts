import { isAxiosError } from "axios"
import toast from "react-hot-toast"

export const handelServerRequestError = async(error: any,tostId:string|undefined=undefined) => {
    // console.log(error);

    tostId && toast.error("",{id:tostId,duration:1000})
    if (isAxiosError(await error)) {
       tostId? toast.error(error.response?.data.message,{id:tostId,duration:1500}):toast.error(error.response?.data.message)
        // toast.error(error.message)
        
    }
    else {
        tostId? toast.error("Something wrong",{id:tostId,duration:1500}):toast.error("Something wrong")
    }
}