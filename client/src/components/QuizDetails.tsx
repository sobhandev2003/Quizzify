import { useEffect, useState } from "react"
import { Quiz } from ".."
import { useAppSelector } from "../redux/store";
import { drivePhotoBaseUrl } from "../App";
import Avatar from 'react-avatar'

function QuizDetails() {
    const [quiz, setQuiz] = useState<Quiz>();
    const currentQuiz = useAppSelector(state => state.quizReducer.quiz);

    useEffect(() => {
        setQuiz(currentQuiz)
    }, [currentQuiz])
    return (
        <div>
            {
                quiz ? <>
                    <div>
                        {quiz.PosterId ? <img src={`${drivePhotoBaseUrl}${quiz.PosterId}`} alt='🧐' /> : <Avatar name={quiz.Name}></Avatar>}
                    </div>
                    <div>
                        <h2><b>Name:</b>{quiz.Name}</h2>
                        <h3><b>Category:</b>{quiz.Category}</h3>
                        <h3><b>Topic:</b>{quiz.Topic}</h3>
                        <p><b>Description:</b>{quiz.Description}</p>
                        <p><b>Number of Question:</b>{quiz.NumberOfQuestion}</p>
                        <p><b>Maximum no. of  attend:</b>{quiz.NumberOfAttendByAnyone && Number(quiz.NumberOfAttendByAnyone) > 0 && quiz.NumberOfAttendByAnyone}</p>
                        <p><b>Created At:</b>{quiz.createdAt && new Date(quiz.createdAt).toLocaleString()} </p>
                        <p><b>Total number of submit:</b>{quiz.TotalNumberOfSubmit}</p>

                    </div>
                    <div>
                        <button style={{ border: "1px solid red" }}>Start</button>
                        {/* {//TODO -  - conditional display implement} */}
                        <button style={{ border: "1px solid red" }}>Update</button>
                    </div>
                </> : <></>
            }

        </div>
    )
}

export default QuizDetails