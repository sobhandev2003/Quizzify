import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { addQuestionSchema, updateQuestionSchema } from '../utils/validationSchema';
import { QuestionType, Quiz } from '..';
import { addQuestion, deleteQuestion, getAllQuestion, updateQuestion } from '../services/QuestionService';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import PopupModel from '../components/PopupModel';
import CloseIcon from '@mui/icons-material/Close';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { getMyQuizById } from '../services/QuizService';
function AllQuestions() {
    const dispatch = useAppDispatch()
    const params = useParams();
    const quizId = params.id
    const formRef = useRef<HTMLFormElement>(null)
    const [quiz, setQuiz] = useState<Quiz>();
    const [isQuestionAdd, setIsQuestionAdd] = useState<boolean>(false);
    const [questionToUpdate, setQuestionToUpdate] = useState<QuestionType | null>(null);
    const [questions, setQuestions] = useState<QuestionType[] | null>(null);
    const quizQuestionDet = useAppSelector(state => state.quizReducer.quizQuestionDet);
    const currentQuiz = useAppSelector(state => state.quizReducer.quiz);
    //NOTE -Handle create new Question
    const createQuestion = async (question: QuestionType) => {
        dispatch(addQuestion(quizId!, question));
    }
    //NOTE -Handle update a Question by id
    const handleUpdateQuestion = (question: any) => {
        dispatch(updateQuestion(quizId!, questionToUpdate?._id!, question, setQuestionToUpdate))
    }

    //NOTE -Handle Delete a Question by id
    const handelQuestionDelete = (questionId: string) => {
        // console.log(quizId!,questionId);
        dispatch(deleteQuestion(quizId!, questionId))
    }

    //SECTION - UseEffect
    useEffect(() => {
        setIsQuestionAdd(false)
        setQuestions(quizQuestionDet.allQuestion)
    }, [quizQuestionDet])

    useEffect(()=>{
        setQuiz(currentQuiz)
    },[currentQuiz])

    useEffect(() => {
        dispatch(getAllQuestion(quizId!))
        !quiz && dispatch(getMyQuizById(quizId!))
    }, [])
   


    //NOTE - Model for add a new Question
    const addQuestionModel = (
        <PopupModel >
            <button onClick={() => setIsQuestionAdd(false)}><CloseIcon /></button>
            <div>
                <Formik
                    initialValues={{
                        QuestionNumber: String(questions?.length!+1),
                        Question: "",
                        Description: "",
                        Option: {
                            A: "",
                            B: "",
                            C: "",
                            D: ""
                        },
                        CorrectOption: "",
                        Marks: 0
                    }}

                    validationSchema={addQuestionSchema}
                    onSubmit={(value) => createQuestion(value)}
                >
                    {({ values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit
                    }) => (
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <label>
                                <input type="text" name="QuestionNumber" onChange={handleChange} value={values.QuestionNumber} required  readOnly/>
                                <span>Question Number</span>
                                {errors.QuestionNumber && touched.QuestionNumber && <span className='error'>{errors.QuestionNumber}</span>}
                            </label>
                            <label>
                                <input type="text" name="Question" onChange={handleChange} value={values.Question} required />
                                <span>Question </span>
                                {errors.Question && touched.Question && <span className='error'>{errors.Question}</span>}
                            </label>
                            <label>
                                <input type="text" name="Description" onChange={handleChange} value={values.Description} required />
                                <span>Description</span>
                                {errors.Description && touched.Description && <span className='error'>{errors.Description}</span>}
                            </label>

                            <label>
                                <input type="text" name="Option.A" onChange={handleChange} value={values.Option.A} required />
                                <span>Option A</span>
                                {errors.Option?.A && touched.Option?.A && <span className='error'>{errors.Option.A}</span>}
                            </label>
                            <label>
                                <input type="text" name="Option.B" onChange={handleChange} value={values.Option.B} required />
                                <span>Option B</span>
                                {errors.Option?.B && touched.Option?.B && <span className='error'>{errors.Option.B}</span>}
                            </label>
                            <label>
                                <input type="text" name="Option.C" onChange={handleChange} value={values.Option.C} required />
                                <span>Option C</span>
                                {errors.Option?.C && touched.Option?.C && <span className='error'>{errors.Option.C}</span>}
                            </label>
                            <label>
                                <input type="text" name="Option.D" onChange={handleChange} value={values.Option.D} required />
                                <span>Option D</span>
                                {errors.Option?.D && touched.Option?.D && <span className='error'>{errors.Option.D}</span>}
                            </label>

                            <label>
                                <input type="text" name="CorrectOption" onChange={handleChange} value={values.CorrectOption} required />
                                <span>Correct Answer</span>
                                {errors.CorrectOption && touched.CorrectOption && <span className='error'>{errors.CorrectOption}</span>}
                            </label>
                            <label>
                                <input type="number" name="Marks" onChange={handleChange} value={values.Marks} required />
                                <span>Marks</span>
                                {errors.Marks && touched.Marks && <span className='error'>{errors.Marks}</span>}
                            </label>
                            <button type="submit" className="register px-4 rounded-md">Add</button>
                        </form>
                    )}

                </Formik>
            </div>
        </PopupModel>
    )
    //NOTE -Model for  Update question
    const updateQuestionModel = (
        questionToUpdate && <PopupModel >
            <button onClick={() => setQuestionToUpdate(null)}><CloseIcon /></button>
            <div>
                <Formik
                    initialValues={{
                        QuestionNumber: questionToUpdate.QuestionNumber,
                        Question: questionToUpdate.Question,
                        Description: questionToUpdate.Description,
                        Option: {
                            A: questionToUpdate.Option.A,
                            B: questionToUpdate.Option.B,
                            C: questionToUpdate.Option.C,
                            D: questionToUpdate.Option.D
                        },
                        CorrectOption: questionToUpdate.CorrectOption,
                        Marks: questionToUpdate.Marks
                    }}

                    validationSchema={updateQuestionSchema}
                    onSubmit={(value) => { handleUpdateQuestion(value) }
                    }
                >
                    {({ values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit
                    }) => (
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <label>
                                <input type="text" name="QuestionNumber" onChange={handleChange} value={values.QuestionNumber} readOnly/>
                                <span>Question Number</span>
                                {errors.QuestionNumber && touched.QuestionNumber && <span className='error'>{errors.QuestionNumber}</span>}
                            </label>
                            <label>
                                <input type="text" name="Question" onChange={handleChange} value={values.Question} />
                                <span>Question </span>
                                {errors.Question && touched.Question && <span className='error'>{errors.Question}</span>}
                            </label>
                            <label>
                                <input type="text" name="Description" onChange={handleChange} value={values.Description} />
                                <span>Description</span>
                                {errors.Description && touched.Description && <span className='error'>{errors.Description}</span>}
                            </label>

                            <label>
                                <input type="text" name="Option.A" onChange={handleChange} value={values.Option.A} />
                                <span>Option A</span>
                                {errors.Option?.A && touched.Option?.A && <span className='error'>{errors.Option.A}</span>}
                            </label>
                            <label>
                                <input type="text" name="Option.B" onChange={handleChange} value={values.Option.B} />
                                <span>Option B</span>
                                {errors.Option?.B && touched.Option?.B && <span className='error'>{errors.Option.B}</span>}
                            </label>
                            <label>
                                <input type="text" name="Option.C" onChange={handleChange} value={values.Option.C} />
                                <span>Option C</span>
                                {errors.Option?.C && touched.Option?.C && <span className='error'>{errors.Option.C}</span>}
                            </label>
                            <label>
                                <input type="text" name="Option.D" onChange={handleChange} value={values.Option.D} />
                                <span>Option D</span>
                                {errors.Option?.D && touched.Option?.D && <span className='error'>{errors.Option.D}</span>}
                            </label>

                            <label>
                                <input type="text" name="CorrectOption" onChange={handleChange} value={values.CorrectOption} />
                                <span>CorrectOption</span>
                                {errors.CorrectOption && touched.CorrectOption && <span className='error'>{errors.CorrectOption}</span>}
                            </label>
                            <label>
                                <input type="number" name="Marks" onChange={handleChange} value={values.Marks} />
                                <span>Marks</span>
                                {errors.Marks && touched.Marks && <span className='error'>{errors.Marks}</span>}
                            </label>
                            <button type="submit" className="register px-4 rounded-md">UPDATE</button>
                        </form>
                    )}

                </Formik>
            </div>
        </PopupModel>
    )



    return (
        <>
            {isQuestionAdd && addQuestionModel}
            <button onClick={() => setIsQuestionAdd(true)}> ADD </button>
            <div>
            {questions && (quizQuestionDet.RemainingScore!==0 ||(Number(quiz?.NumberOfQuestion) - questions?.length)!==0) && <p className='text-red-600'><span><strong>Note:</strong>{Number(quiz?.NumberOfQuestion) - questions?.length} question missing.</span> <b>&&</b> <span>{quizQuestionDet.RemainingScore} to achieve total score.</span> </p>}
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Question No.</th>
                            <th>Question</th>
                            <th>Description</th>
                            <th>Option A</th>
                            <th>Option B</th>
                            <th>Option C</th>
                            <th>Option D</th>
                            <th>Correct Option </th>
                            <th>Marks </th>
                            <th>Update </th>
                            <th>Delete </th>


                        </tr>
                    </thead>
                    <tbody>
                    {
                        questions && questions.map((question, index) => (
                            <tr key={question._id} >
                                <td>{index }</td>
                                <td>{question.QuestionNumber}</td>
                                <td>{question.Question}</td>
                                <td>{question.Description}</td>
                                <td>{question.Option.A}</td>
                                <td>{question.Option.B}</td>
                                <td>{question.Option.C}</td>
                                <td>{question.Option.D}</td>
                                <td>{question.CorrectOption}</td>
                                <td>{question.Marks}</td>
                                <td><RiEdit2Fill onClick={() => setQuestionToUpdate(question)} /></td>
                                <td><MdDeleteForever  onClick={() => handelQuestionDelete(question._id!)} /></td>
                                {/* <button onClick={() => setQuestionToUpdate(question)}>Update</button>
                                <button onClick={() => handelQuestionDelete(question._id!)}>Delete</button> */}
                               
                            </tr>
                        ))

                    }
                    </tbody>
                </table>

            </div>
            {questionToUpdate && updateQuestionModel}
        </>
    )
}

export default AllQuestions