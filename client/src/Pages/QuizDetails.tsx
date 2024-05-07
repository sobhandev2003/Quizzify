import { useEffect, useState } from "react"
import { Quiz } from ".."
import { useAppDispatch, useAppSelector } from "../redux/store";
import { drivePhotoBaseUrl } from "../App";
import Avatar from 'react-avatar'
import { useNavigate, useParams } from "react-router-dom";
import { getMyQuizById, getQuestion, getQuizById } from "../services/QuizService";
import { setIsUpdate } from "../redux/reducer/QuizReducer";
import PopupModel from "../components/PopupModel";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { addQuestionSchema } from "../utils/validationSchema";

function QuizDetails() {
    const navigate = useNavigate();
    const params = useParams();

    const dispatch = useAppDispatch();
    // console.log(params.userId);

    const [quiz, setQuiz] = useState<Quiz>();
    const [isQuizUpdate, setIsQuizUpdate] = useState<boolean>()
    const [questions, setQuestions] = useState<any[] | null>(null)
    const [isQuestionAdd, setIsQuestionAdd] = useState<boolean>(false)

    const currentQuiz = useAppSelector(state => state.quizReducer.quiz);
    const isUpdateResponse = useAppSelector(state => state.quizReducer.isUpdate);
    const quizQuestion = useAppSelector(state => state.quizReducer.quizQuestion);
    const loginDetails = useAppSelector(state => state.userAccountReducer.loginUser);

    const handleUpdateNavigate = (): void => {
        navigate(`/quiz/update/${quiz?._id}`)
    }
    //SECTION - Template

    // const addQuestionModel = (
    //     <PopupModel>
    //         <Formik
    //             initialValues={{
    //                 QuestionNumber: "",
    //                 Question: "",
    //                 Description: "",
    //                 Option: [],
    //                 CorrectOption: "",
    //                 Marks: 0
    //             }}

    //             validationSchema={addQuestionSchema}
    //             onSubmit={async(value) => {
    //                 console.log(value);

    //             }}
    //         >
    //             {({ values,
    //                 errors,
    //                 touched,
    //                 handleChange,
    //                 handleSubmit
    //             }) => (
    //                 <form onSubmit={handleSubmit}>
    //                     <label>
    //                         <input type="text" name="QuestionNumber" onChange={handleChange} value={values.QuestionNumber} required />
    //                         <span>Question Number</span>
    //                         {errors.QuestionNumber && touched.QuestionNumber && <span>{errors.QuestionNumber}</span>}
    //                     </label>
    //                     <label>
    //                         <input type="text" name="Question" onChange={handleChange} value={values.Question} required />
    //                         <span>Question </span>
    //                         {errors.Question && touched.Question && <span>{errors.Question}</span>}
    //                     </label>
    //                     <label>
    //                         <input type="text" name="Description" onChange={handleChange} value={values.Description} required />
    //                         <span>Description</span>
    //                         {errors.Description && touched.Description && <span>{errors.Description}</span>}
    //                     </label>
    //                     {/* //FIXME -  */}
                      
    //                     {/* //FIXME -  */}
    //                     <label>
    //                         <input type="text" name="CorrectOption" onChange={handleChange} value={values.CorrectOption} required />
    //                         <span>CorrectOption</span>
    //                         {errors.CorrectOption && touched.CorrectOption && <span>{errors.CorrectOption}</span>}
    //                     </label>
    //                     <label>
    //                         <input type="number" name="Marks" onChange={handleChange} value={values.Marks} required />
    //                         <span>Marks</span>
    //                         {errors.Marks && touched.Marks && <span>{errors.Marks}</span>}
    //                     </label>
    //                     <button type="submit" className="register px-4 rounded-md">Add</button>
    //                 </form>
    //             )}

    //         </Formik>

    //     </PopupModel>
    // )

    //SECTION - useEffect
    useEffect(() => {
        setQuiz(currentQuiz)
        setIsQuizUpdate(isUpdateResponse)
        if (currentQuiz._id) {
            dispatch(getQuestion(currentQuiz._id))
        }
    }, [currentQuiz, isUpdateResponse])

    useEffect(() => {
        setQuestions(quizQuestion)
        // console.log(quizQuestion);
    }, [quizQuestion])
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
                                <button style={{ border: "1px solid red" }}>Start</button>

                            </>
                        }


                    </div>
                </> : <></>
            }
            {/* {isQuestionAdd && addQuestionModel} */}
        </div>
    )
}

export default QuizDetails