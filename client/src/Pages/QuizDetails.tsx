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
import { Formik } from "formik";
import { updateQuizSchema } from "../utils/validationSchema";
import CloseIcon from '@mui/icons-material/Close';
import SomethingWrong from "../components/SomethingWrong";
import backgroundImg from '../assets/blogonline.jpg'
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { BsBuildingFillAdd } from "react-icons/bs";
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
            <div className="relative p-4">
            <button className=" absolute top-0 right-0 text-red-700"  onClick={() => setUpdateQuiz(null)}><CloseIcon /></button>
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
                    <form className="flex flex-col gap-4 items-start" onSubmit={handleSubmit} >
                        <label className="flex gap-2">
                            <span>Quiz Name</span>
                            <input type="text" name="Title" value={values.Title} readOnly disabled />

                        </label>
                        <label className="flex gap-2">
                            <span>Description</span>
                            <input type="text" name="Description" value={values.Description} onChange={handleChange} />
                            {errors.Description && touched.Description && <span className="error">{errors.Description}</span>}
                        </label>
                        <label className="flex gap-2">
                            <span>Maximum no. of attend</span>
                            <input type="number" name="NumberOfAttendByAnyone" value={values.NumberOfAttendByAnyone} onChange={handleChange} />
                            {errors.NumberOfAttendByAnyone && touched.NumberOfAttendByAnyone && <span className="error">{errors.NumberOfAttendByAnyone}</span>}
                        </label>
                        <button className=" mt-6 self-center" type="submit">UPDATE</button>
                    </form>
                )}
            </Formik>
            </div>
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
        //FIXME - Fixed this get quiz details by API call 
        if (location.state) {
            setQuiz(location.state.quiz)
            setIsQuizUpdate(location.state.isUpdate)
            location.state.quiz && dispatch(getAllQuestion(location.state.quiz._id))
        }
    }, [])



    return (
        <div className="w-screen flex justify-center">
            <img className="fixed left-0  w-full h-full -z-10" src={backgroundImg} alt="" />
            {/* <img className="fixed left-0  w-full h-full -z-10" src="https://media.istockphoto.com/id/1478776181/video/flying-pink-neon-question-marks-on-a-black-background-3d-animation-question-mark-looping.jpg?s=640x640&k=20&c=5iaBIXjs7ydswVcvKqjjqRySe6ksY2njjWn4h3SYQFQ=" alt="" /> */}
            {
                quiz ? <div className=" text-white  pt-10 flex flex-col gap-8 ">
                    {quiz.PosterId && <div>
                        <img src={`${drivePhotoBaseUrl}${quiz.PosterId}`} alt='🧐' />
                    </div>
                    }

                    <div>
                        <p className=" text-4xl font-semibold text-teal-500">{quiz.Name}</p>
                        <p className=" text-2xl  text-teal-500">{quiz.Category}</p>
                        <p className=" text-2xl  text-teal-500">{quiz.Topic}</p>
                        <p className=" text-lg  text-amber-500">{quiz.Description}</p>
                        <p className=" text-lg flex gap-2  text-amber-500"><b className=" text-slate-400">Number of Question:</b>{quiz.NumberOfQuestion}</p>
                        <p className=" text-lg flex gap-2 text-amber-500"><b className=" text-slate-400">Total Score:</b>{quiz.TotalScore}</p>
                        <p className=" text-lg flex gap-2 text-amber-500"><b className=" text-slate-400">Maximum no. of  attend:</b>{quiz.NumberOfAttendByAnyone && Number(quiz.NumberOfAttendByAnyone) > 0 && quiz.NumberOfAttendByAnyone}</p>
                        <p className=" text-lg flex gap-2 text-amber-500"><b className=" text-slate-400">Created At:</b>{quiz.createdAt && new Date(quiz.createdAt).toLocaleString()} </p>
                        <p className=" text-lg flex gap-2 text-amber-500"><b className=" text-slate-400">Total number of submit:</b>{quiz.TotalNumberOfSubmit}</p>


                    </div>
                    <div>
                        {
                            isQuizUpdate ? <div className="flex flex-col">
                                {/* //NOTE - If your created quiz then only update and add question */}
                                {questions && <p className=" text-orange-400"><b>Note</b>{Number(quiz.NumberOfQuestion) - questions?.length} question missing</p>}
                                <div className="flex gap-4 p-4 flex-wrap">
                                    <button className="flex items-center justify-center gap-2 text-xl font-medium text-orange-500" onClick={() => setUpdateQuiz(quiz)}  ><RiEdit2Fill /> <span>Update</span></button>
                                    <button className="flex items-center justify-center gap-2 text-xl font-medium text-lime-600" onClick={() => navigate(`/question/add/${quiz._id}`)}><BsBuildingFillAdd /><span>Add Question</span> </button>
                                    <button className="flex items-center justify-center gap-2 text-xl font-medium text-red-600" onClick={handleQuizDelete}><MdDeleteForever /><span>DELETE</span></button>
                                </div>

                            </div> : <div>
                                <button onClick={handelQuizStartNavigation} style={{ border: "1px solid red" }}>Start</button>
                            </div>
                        }

                    </div>
                    <div className="flex gap-5">
                        <button className=" text-2xl" onClick={handelLike}>{isLiked ? <AiFillLike /> : <SlLike />}</button>
                        <button className=" text-2xl" onClick={handelUnlike}>{isUnLiked ? <AiFillDislike /> : <SlDislike />}</button>
                    </div>
                </div> : <>
                    <SomethingWrong />
                </>
            }
            {/* {isQuestionAdd && addQuestionModel} */}
            {updateQuiz && updateQuizTemplate}
        </div>
    )
}

export default QuizDetails