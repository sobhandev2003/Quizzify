import axios, { isAxiosError } from "axios";
import { Quiz } from "..";
import toast from "react-hot-toast";


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
        if (isAxiosError(error)) {
            // console.log(error);
            toast.error(error.response?.data.message)
        }
        else {
            console.error(error);

        }
    }
}

export const getAllQuiz = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:5001/quiz/get`);
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