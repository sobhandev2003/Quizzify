import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { addQuestionSchema, updateQuestionSchema } from '../utils/validationSchema';
import { QuestionType } from '..';
import { addQuestion, deleteQuestion, getAllQuestion, updateQuestion } from '../services/QuestionService';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import QuestionTemplate from '../components/QuestionTemplet';
import PopupModel from '../components/PopupModel';
import CloseIcon from '@mui/icons-material/Close';

function AllQuestions() {
    const dispatch = useAppDispatch()
    const params = useParams();
    const quizId = params.id
    const formRef = useRef<HTMLFormElement>(null)
    const [isQuestionAdd, setIsQuestionAdd] = useState<boolean>(false);
    const [questionToUpdate, setQuestionToUpdate] = useState<QuestionType | null>(null);
    const [questions, setQuestions] = useState<QuestionType[] | null>(null);
    const allQuestion = useAppSelector(state => state.quizReducer.allQuestion);
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
        setQuestions(allQuestion)
    }, [allQuestion])

    useEffect(() => {
        dispatch(getAllQuestion(quizId!))
    }, [])

    //NOTE - Model for add a new Question
    const addQuestionModel = (
        <PopupModel >
            <button onClick={() => setIsQuestionAdd(false)}><CloseIcon /></button>
            <div>
                <Formik
                    initialValues={{
                        QuestionNumber: "",
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
                                <input type="text" name="QuestionNumber" onChange={handleChange} value={values.QuestionNumber} required />
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
                                <span>CorrectOption</span>
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
                                <input type="text" name="QuestionNumber" onChange={handleChange} value={values.QuestionNumber} />
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
            {/* <div>
                <Formik
                    initialValues={{
                        QuestionNumber: "",
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
                                <input type="text" name="QuestionNumber" onChange={handleChange} value={values.QuestionNumber} required />
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
                                <span>CorrectOption</span>
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
            </div> */}
            {isQuestionAdd && addQuestionModel}
            <button onClick={() => setIsQuestionAdd(true)}> ADD </button>
            <div>
                {
                    questions && questions.map((question, index) => (
                        <div key={question._id} >
                            <span>{index + 1}</span>
                            <QuestionTemplate question={question} />
                            <span>{question.CorrectOption}</span>
                            <button onClick={() => setQuestionToUpdate(question)}>Update</button>
                            <button onClick={() => handelQuestionDelete(question._id!)}>Delete</button>
                            <hr />
                        </div>
                    ))

                }
            </div>
            {questionToUpdate && updateQuestionModel}
        </>
    )
}

export default AllQuestions