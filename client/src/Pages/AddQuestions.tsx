import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react'
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
import { MdAddCircle } from "react-icons/md";
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

    useEffect(() => {
        setQuiz(currentQuiz)
    }, [currentQuiz])

    useEffect(() => {
        dispatch(getAllQuestion(quizId!))
        !quiz && dispatch(getMyQuizById(quizId!))
    }, [])




    //NOTE -Model for  Update question
    const updateQuestionModel = (
        questionToUpdate && <PopupModel >
            <div className="relative p-4">
                <button className=" absolute top-0 right-0 text-red-700" onClick={() => setQuestionToUpdate(null)}><CloseIcon /></button>

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
                        <form className="flex flex-col gap-4 items-start" ref={formRef} onSubmit={handleSubmit}>
                            <div>
                                <label className="flex gap-2">
                                    <span>Question Number</span>
                                    <input type="text" name="QuestionNumber" onChange={handleChange} value={values.QuestionNumber} readOnly />
                                </label>
                                {errors.QuestionNumber && touched.QuestionNumber && <span className='error'>{errors.QuestionNumber}</span>}
                            </div>
                            <div>
                                <label className="flex gap-2">
                                    <span>Question </span>
                                    <input type="text" name="Question" onChange={handleChange} value={values.Question} />
                                </label>
                                {errors.Question && touched.Question && <span className='error'>{errors.Question}</span>}
                            </div>
                            <div>
                                <label className="flex gap-2">
                                    <span>Description</span>
                                    <input type="text" name="Description" onChange={handleChange} value={values.Description} />
                                </label>
                                {errors.Description && touched.Description && <span className='error'>{errors.Description}</span>}
                            </div>

                            <div>
                                <label className="flex gap-2">
                                    <span>Option A</span>
                                    <input type="text" name="Option.A" onChange={handleChange} value={values.Option.A} />
                                </label>
                                {errors.Option?.A && touched.Option?.A && <span className='error'>{errors.Option.A}</span>}
                            </div>
                            <div className="flex gap-2">
                                <label className="flex gap-2">
                                    <span>Option B</span>
                                    <input type="text" name="Option.B" onChange={handleChange} value={values.Option.B} />
                                </label>
                                {errors.Option?.B && touched.Option?.B && <span className='error'>{errors.Option.B}</span>}
                            </div>

                            <div>
                                <label className="flex gap-2">
                                    <span>Option C</span>
                                    <input type="text" name="Option.C" onChange={handleChange} value={values.Option.C} />
                                </label>
                                {errors.Option?.C && touched.Option?.C && <span className='error'>{errors.Option.C}</span>}
                            </div>
                            <div>
                                <label className="flex gap-2">
                                    <span>Option D</span>
                                    <input type="text" name="Option.D" onChange={handleChange} value={values.Option.D} />
                                </label>
                                {errors.Option?.D && touched.Option?.D && <span className='error'>{errors.Option.D}</span>}
                            </div>

                            <div>
                                <label className="flex gap-2">
                                    <span>CorrectOption</span>
                                    <input type="text" name="CorrectOption" onChange={handleChange} value={values.CorrectOption} />
                                </label>
                                {errors.CorrectOption && touched.CorrectOption && <span className='error'>{errors.CorrectOption}</span>}
                            </div>

                            <div>
                                <label className="flex gap-2">
                                    <span>Marks</span>
                                    <input type="number" name="Marks" onChange={handleChange} value={values.Marks} />
                                </label>
                                {errors.Marks && touched.Marks && <span className='error'>{errors.Marks}</span>}
                            </div>
                            <button type="submit" className="register px-4 rounded-md self-center">UPDATE</button>
                        </form>
                    )}

                </Formik>
            </div>
        </PopupModel>
    )



    return (
        <div className='flex flex-col gap-16 items-center p-4'>

            {!isQuestionAdd && <button className='mt-8 button-88 flex gap-3' onClick={() => setIsQuestionAdd(true)}><MdAddCircle fontSize={20} /> <span>Add New Question</span> </button>}
            {isQuestionAdd && <div className='relative p-4'>

                <Formik
                    initialValues={{
                        QuestionNumber: String(questions?.length! + 1),
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
                        <form className='add-question-form flex flex-col gap-2 items-start ' ref={formRef} onSubmit={handleSubmit}>
                            <div >
                                <label className='flex gap-2 items-center min-w-fit'>
                                    <span>Question Number</span>
                                    <input type="text" name="QuestionNumber" onChange={handleChange} value={values.QuestionNumber} required readOnly />
                                </label>
                                {errors.QuestionNumber && touched.QuestionNumber && <span className='error'>{errors.QuestionNumber}</span>}
                            </div>
                            <div>
                                <label className='flex gap-2 items-center min-w-fit'>
                                    <span>Question </span>
                                    <input type="text" name="Question" onChange={handleChange} value={values.Question} required />
                                </label>
                                {errors.Question && touched.Question && <span className='error'>{errors.Question}</span>}
                            </div>
                            <div>
                                <label className='flex gap-2 items-center min-w-fit'>
                                    <span>Description</span>
                                    <input type="text" name="Description" onChange={handleChange} value={values.Description} required />
                                </label>
                                {errors.Description && touched.Description && <span className='error'>{errors.Description}</span>}
                            </div>
                            <div>
                                <label className='flex gap-2 items-center min-w-fit'>
                                    <span>Option A</span>
                                    <input type="text" name="Option.A" onChange={handleChange} value={values.Option.A} required />
                                </label>
                                {errors.Option?.A && touched.Option?.A && <span className='error'>{errors.Option.A}</span>}
                            </div>
                            <div>
                                <label className='flex gap-2 items-center min-w-fit'>
                                    <span>Option B</span>
                                    <input type="text" name="Option.B" onChange={handleChange} value={values.Option.B} required />
                                </label>
                                {errors.Option?.B && touched.Option?.B && <span className='error'>{errors.Option.B}</span>}
                            </div>
                            <div>
                                <label className='flex gap-2 items-center min-w-fit'>
                                    <span>Option C</span>
                                    <input type="text" name="Option.C" onChange={handleChange} value={values.Option.C} required />
                                </label>
                                {errors.Option?.C && touched.Option?.C && <span className='error'>{errors.Option.C}</span>}
                            </div>
                            <div>
                                <label className='flex gap-2 items-center min-w-fit'>
                                    <span>Option D</span>
                                    <input type="text" name="Option.D" onChange={handleChange} value={values.Option.D} required />
                                </label>
                                {errors.Option?.D && touched.Option?.D && <span className='error'>{errors.Option.D}</span>}
                            </div>

                            <div>
                                <label className='flex gap-2 items-center min-w-fit'>
                                    <span>Correct Answer</span>
                                    <input type="text" name="CorrectOption" onChange={handleChange} value={values.CorrectOption} required />
                                </label>
                                {errors.CorrectOption && touched.CorrectOption && <span className='error'>{errors.CorrectOption}</span>}
                            </div>
                            <div>
                                <label className='flex gap-2 items-center min-w-fit'>
                                    <span>Marks</span>
                                    <input type="number" name="Marks" onChange={handleChange} value={values.Marks} required />
                                </label>
                                {errors.Marks && touched.Marks && <span className='error'>{errors.Marks}</span>}
                            </div>
                            <div className='flex gap-8 justify-center mt-5' >
                                <button className='button-37 flex gap-3' type="submit" >Add</button>
                                <button className="text-red-700" onClick={() => setIsQuestionAdd(false)}><CloseIcon /> <span> Cancel</span></button>

                            </div>
                        </form>
                    )}

                </Formik>
            </div>}
            <div>
                {questions && (quizQuestionDet.RemainingScore !== 0 || (Number(quiz?.NumberOfQuestion) - questions?.length) !== 0) && <p className='text-red-600'><span><strong>Note:</strong>{Number(quiz?.NumberOfQuestion) - questions?.length} question missing.</span> <b>&&</b> <span>{quizQuestionDet.RemainingScore} to achieve total score.</span> </p>}
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
                                    <td>{index}</td>
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
                                    <td><MdDeleteForever onClick={() => handelQuestionDelete(question._id!)} /></td>
                                    {/* <button onClick={() => setQuestionToUpdate(question)}>Update</button>
                                <button onClick={() => handelQuestionDelete(question._id!)}>Delete</button> */}

                                </tr>
                            ))

                        }
                    </tbody>
                </table>

            </div>
            {questionToUpdate && updateQuestionModel}
        </div>
    )
}

export default AllQuestions