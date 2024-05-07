import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import React, { useRef } from 'react'
import { addQuestionSchema } from '../utils/validationSchema';
import {  QuestionType } from '..';
import { addQuestion } from '../services/QuestionService';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function Question() {

    const params=useParams();
const formRef=useRef<HTMLFormElement>(null)
    const createQuestion=async(question:QuestionType)=>{
      const res=addQuestion(params.id!,question);
         toast.promise(res, {
            loading: 'Adding...',
            success: "Added successfully",
            error: "Something wrong",
        })
          
    
    }

    return (
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
                            {errors.QuestionNumber && touched.QuestionNumber && <span>{errors.QuestionNumber}</span>}
                        </label>
                        <label>
                            <input type="text" name="Question" onChange={handleChange} value={values.Question} required />
                            <span>Question </span>
                            {errors.Question && touched.Question && <span>{errors.Question}</span>}
                        </label>
                        <label>
                            <input type="text" name="Description" onChange={handleChange} value={values.Description} required />
                            <span>Description</span>
                            {errors.Description && touched.Description && <span>{errors.Description}</span>}
                        </label>
                        {/* //FIXME -  */}
                        <label>
                            <input type="text" name="Option.A" onChange={handleChange} value={values.Option.A} required />
                            <span>Option A</span>
                            {errors.Option?.A && touched.Option?.A && <span>{errors.Option.A}</span>}
                        </label>
                        <label>
                            <input type="text" name="Option.B" onChange={handleChange} value={values.Option.B} required />
                            <span>Option B</span>
                            {errors.Option?.B && touched.Option?.B && <span>{errors.Option.B}</span>}
                        </label>
                        <label>
                            <input type="text" name="Option.C" onChange={handleChange} value={values.Option.C} required />
                            <span>Option C</span>
                            {errors.Option?.C && touched.Option?.C && <span>{errors.Option.C}</span>}
                        </label>
                        <label>
                            <input type="text" name="Option.D" onChange={handleChange} value={values.Option.D} required />
                            <span>Option D</span>
                            {errors.Option?.D && touched.Option?.D && <span>{errors.Option.D}</span>}
                        </label>
                        {/* //FIXME -  */}
                        <label>
                            <input type="text" name="CorrectOption" onChange={handleChange} value={values.CorrectOption} required />
                            <span>CorrectOption</span>
                            {errors.CorrectOption && touched.CorrectOption && <span>{errors.CorrectOption}</span>}
                        </label>
                        <label>
                            <input type="number" name="Marks" onChange={handleChange} value={values.Marks} required />
                            <span>Marks</span>
                            {errors.Marks && touched.Marks && <span>{errors.Marks}</span>}
                        </label>
                        <button type="submit" className="register px-4 rounded-md">Add</button>
                    </form>
                )}

            </Formik>
        </div>
    )
}

export default Question