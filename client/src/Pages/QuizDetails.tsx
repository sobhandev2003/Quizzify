import { useEffect, useState } from "react"
import { Quiz } from ".."
import { useAppDispatch, useAppSelector } from "../redux/store";
import { drivePhotoBaseUrl } from "../App";
import Avatar from 'react-avatar'
import { useNavigate, useParams } from "react-router-dom";
import { getMyQuizById, getQuizById, updateLike, updateUnlike } from "../services/QuizService";

import { getAllQuestion } from "../services/QuestionService";
import { SlLike, SlDislike } from "react-icons/sl";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
function QuizDetails() {
    const navigate = useNavigate();
    const params = useParams();

    const dispatch = useAppDispatch();
    // console.log(params.userId);

    const [quiz, setQuiz] = useState<Quiz>();
    const [isQuizUpdate, setIsQuizUpdate] = useState<boolean>()
    const [questions, setQuestions] = useState<any[] | null>(null)

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isUnLiked, setIsUnLiked] = useState<boolean>(false)

    const currentQuiz = useAppSelector(state => state.quizReducer.quiz);
    const isUpdateResponse = useAppSelector(state => state.quizReducer.isUpdate);
    const quizQuestion = useAppSelector(state => state.quizReducer.allQuestion);
    const loginDetails = useAppSelector(state => state.userAccountReducer.loginUser);

    //SECTION - 

    const handelLike = () => {
        // console.log(params.id);
        setIsLiked(!isLiked)
        setIsUnLiked(false)
        dispatch(updateLike(params.id!))
    }
    const handelUnlike = () => {
        // console.log(params.id);
        setIsUnLiked(!isUnLiked)
        setIsLiked(false)
        dispatch(updateUnlike(params.id!))
    }
    //SECTION - Navigation
    const handleUpdateNavigate = (): void => {
        navigate(`/quiz/update/${quiz?._id}`)
    }

    const handelQuizStartNavigation = () => {
        navigate(`/quiz/start/${quiz?._id}`)
    }

    //SECTION - Template

    //SECTION - useEffect
    useEffect(() => {
        setQuiz(currentQuiz)
        setIsQuizUpdate(isUpdateResponse)
        if (currentQuiz._id) {
            dispatch(getAllQuestion(currentQuiz._id))
        }
    }, [currentQuiz, isUpdateResponse])

    useEffect(() => {
        setQuestions(quizQuestion)

    }, [quizQuestion])
    //NOTE - 
    useEffect(() => {
  
        setIsLiked(quiz?.LikeBy?.includes(loginDetails.id)!)
        setIsUnLiked(quiz?.UnLikeBy?.includes(loginDetails.id)!)
    }, [loginDetails,quiz])
    //NOTE - Call if page reload after 1st time open
    useEffect(() => {
        !currentQuiz?.Name && params?.id && params?.userId
            ? dispatch(getMyQuizById(params.id))
            : dispatch(getQuizById(params.id!));


    }, [])



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
                        <p><b>Total Score:</b>{quiz.TotalScore}</p>
                        <p><b>Maximum no. of  attend:</b>{quiz.NumberOfAttendByAnyone && Number(quiz.NumberOfAttendByAnyone) > 0 && quiz.NumberOfAttendByAnyone}</p>
                        <p><b>Created At:</b>{quiz.createdAt && new Date(quiz.createdAt).toLocaleString()} </p>
                        <p><b>Total number of submit:</b>{quiz.TotalNumberOfSubmit}</p>

                    </div>
                    <div>
                        {
                            isQuizUpdate ? <>
                                {/* //NOTE - If your created quiz then only update and add question */}
                                {questions && <p><b>Note</b>{Number(quiz.NumberOfQuestion) - questions?.length} question missing</p>}
                                <button style={{ border: "1px solid red" }}>Update</button>
                                <button onClick={() => navigate(`/question/add/${quiz._id}`)}>Add Question</button>
                            </> : <>
                                <button onClick={handelQuizStartNavigation} style={{ border: "1px solid red" }}>Start</button>
                            </>
                        }

                    </div>
                    <div>
                        <button onClick={handelLike}>{isLiked ? <AiFillLike /> : <SlLike />}</button>
                        <button onClick={handelUnlike}>{isUnLiked ? <AiFillDislike /> : <SlDislike />}</button>
                    </div>
                </> : <></>
            }
            {/* {isQuestionAdd && addQuestionModel} */}
        </div>
    )
}

export default QuizDetails