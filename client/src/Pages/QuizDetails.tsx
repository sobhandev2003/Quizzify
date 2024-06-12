import { useEffect, useState } from "react"
import { Quiz, QuizUpdateDetails } from ".."
import { useAppDispatch, useAppSelector } from "../redux/store";
import { drivePhotoBaseUrl } from "../App";
import Avatar from 'react-avatar'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteQuizById, getMyQuizById, getQuizById, updateLike, updateQuizById, updateUnlike } from "../services/QuizService";

import { getAllQuestion } from "../services/QuestionService";
import { SlLike, SlDislike } from "react-icons/sl";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import PopupModel from "../components/PopupModel";
import { Formik, useFormik } from "formik";
import { updateQuizSchema } from "../utils/validationSchema";
import CloseIcon from '@mui/icons-material/Close';
import SomethingWrong from "../components/SomethingWrong";
function QuizDetails() {
    const location = useLocation();
    // console.log(location.state);

    const navigate = useNavigate();
    const params = useParams();

    const dispatch = useAppDispatch();
    // console.log(params.userId);

    const [quiz, setQuiz] = useState<Quiz>();

    const [isQuizUpdate, setIsQuizUpdate] = useState<boolean>()
    const [questions, setQuestions] = useState<any[] | null>(null)

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isUnLiked, setIsUnLiked] = useState<boolean>(false)
    const [updateQuiz, setUpdateQuiz] = useState<Quiz | null>(null);
    //FIXME - 
    // const currentQuiz = useAppSelector(state => state.quizReducer.quiz);
    // const isUpdateResponse = useAppSelector(state => state.quizReducer.isUpdate);

    const quizQuestionDet = useAppSelector(state => state.quizReducer.quizQuestionDet);
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
    const handelQuizUpdate = (value: QuizUpdateDetails): void => {
        // navigate(`/quiz/update/${quiz?._id}`)
        updateQuiz && dispatch(updateQuizById(updateQuiz?._id, value, setUpdateQuiz))
    }
    const handleQuizDelete = () => {
        dispatch(deleteQuizById(params.id!, navigate))
    }

    const handelQuizStartNavigation = () => {
        navigate(`/quiz/start/${quiz?._id}`)
    }

    //SECTION - Template



    const updateQuizTemplate = (
        updateQuiz && <PopupModel>
            <button onClick={() => setUpdateQuiz(null)}><CloseIcon /></button>
            <Formik
                initialValues={{
                    Title: updateQuiz?.Name,
                    Description: updateQuiz?.Description,
                    NumberOfAttendByAnyone: Number(updateQuiz?.NumberOfAttendByAnyone)
                }}
                validationSchema={updateQuizSchema}
                onSubmit={(value) => {
                    handelQuizUpdate(value)
                    // console.log(value);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Quiz Name</span>
                            <input type="text" name="Title" value={values.Title} readOnly disabled />

                        </label>
                        <label>
                            <span>Description</span>
                            <input type="text" name="Description" value={values.Description} onChange={handleChange} />
                            {errors.Description && touched.Description && <span className="error">{errors.Description}</span>}
                        </label>
                        <label>
                            <span>Maximum no. of attend</span>
                            <input type="number" name="NumberOfAttendByAnyone" value={values.NumberOfAttendByAnyone} onChange={handleChange} />
                            {errors.NumberOfAttendByAnyone && touched.NumberOfAttendByAnyone && <span className="error">{errors.NumberOfAttendByAnyone}</span>}
                        </label>
                        <button type="submit">UPDATE</button>
                    </form>
                )}
            </Formik>
        </PopupModel>
    )

    //SECTION - useEffect
    //NOTE - sett all question
    useEffect(() => {
        setQuestions(quizQuestionDet.allQuestion)
    }, [quizQuestionDet.allQuestion])

    //NOTE - Update like and unLike
    useEffect(() => {
        setIsLiked(quiz?.LikeBy?.includes(loginDetails.id)!)
        setIsUnLiked(quiz?.UnLikeBy?.includes(loginDetails.id)!)
    }, [loginDetails, quiz])

    //NOTE - When page load run just that time
    useEffect(() => {
        if (location.state) {
            setQuiz(location.state.quiz)
            setIsQuizUpdate(location.state.isUpdate)
            location.state.quiz && dispatch(getAllQuestion(location.state.quiz._id))
        }
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
                                <button onClick={() => setUpdateQuiz(quiz)} style={{ border: "1px solid red" }} >Update</button>
                                <button onClick={() => navigate(`/question/add/${quiz._id}`)}>Add Question</button>
                                <br />
                                <br />

                                <button onClick={handleQuizDelete}>DELETE</button>
                            </> : <>
                                <button onClick={handelQuizStartNavigation} style={{ border: "1px solid red" }}>Start</button>
                            </>
                        }

                    </div>
                    <div>
                        <button onClick={handelLike}>{isLiked ? <AiFillLike /> : <SlLike />}</button>
                        <button onClick={handelUnlike}>{isUnLiked ? <AiFillDislike /> : <SlDislike />}</button>
                    </div>
                </> : <>
                <SomethingWrong/>
                </>
            }
            {/* {isQuestionAdd && addQuestionModel} */}
            {updateQuiz && updateQuizTemplate}
        </div>
    )
}

export default QuizDetails