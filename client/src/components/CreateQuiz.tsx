import { useNavigate } from 'react-router-dom';
import '../css/CreateQuiz.css'
import { createQuiz } from '../services/QuizService';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppSelector } from '../redux/store';

function CreateQuiz() {

    const navigate=useNavigate();

    const loginDetails=useAppSelector(state=>state.userAccountReducer.loginUser)
    //NOTE - 
  
    const quizSchema = Yup.object({
        Name: Yup.string().required('Name is required'),

        Description: Yup.string().required('Description is required'),

        Category: Yup.string().required('Category is required'),

        Topic: Yup.string(),

        NumberOfQuestion: Yup.string().required('Number of questions is required').test('min-value', 'Number of questions must be greater than 4', (v) => {
            return Number(v) >= 5
        }),

        TotalScore: Yup.string().required('Total score is required').test('min-value', 'Total score must be greater than 4', (v) => {
            return Number(v) >= 5
        }),

        NumberOfAttendByAnyone: Yup.string().required('Number of attendees is required').test('min-value', 'Number of attend must be non-negative', (v) => {
            return Number(v) >= 0
        }),

        PassingScore: Yup.string().test('min-value', 'Passing score must be non-negative', (v) => {
            return Number(v) >= 0
        }),

        poster: Yup.mixed().nullable().test('is-valid-image', 'Only png , jpeg or webp images are allowed', (value) => {
            if (!value) return true; // if no file is uploaded, return true
            const acceptedFormats = ['image/png', 'image/jpeg', "image/webp"];
            return acceptedFormats.includes((value as File).type);
        }),
    });



    //NOTE - 
    const handelCreateQuizRequest = (value: any) => {
        // console.log(quizDetails);
        createQuiz(value,navigate,loginDetails.id)
    }


    const formik = useFormik({
        initialValues: {
            Name: "",
            Description: "",
            Category: "",
            Topic: "",
            NumberOfQuestion: "",
            TotalScore: "",
            NumberOfAttendByAnyone: "",
            PassingScore: "0",
            poster: null,
        },
        validationSchema: quizSchema,
        onSubmit: (value) => {
            // console.log(value);
            handelCreateQuizRequest(value)
        }
    })

    return (
        <div className='create-quiz' >
            <form className='quiz-create-form' onSubmit={formik.handleSubmit} >

                <label >
                    <input type='text' name='Name' onChange={formik.handleChange} value={formik.values.Name} required />
                    <span>Name</span>
                    {formik.errors.Name && formik.touched.Name && <span className='error'>{formik.errors.Name}</span>}
                </label>

                <label >
                    <input type='text' name='Description' onChange={formik.handleChange} value={formik.values.Description} required />
                    <span>Description</span>
                    {formik.errors.Description && formik.touched.Description && <span className='error'>{formik.errors.Description}</span>}
                </label>

                <label >
                    <input type='text' name='Category' onChange={formik.handleChange} value={formik.values.Category} required />
                    <span>Category</span>
                    {formik.errors.Category && formik.touched.Category && <span className='error'>{formik.errors.Category}</span>}
                </label>

                <label >
                    <input type='text' name='Topic' onChange={formik.handleChange} value={formik.values.Topic} />
                    <span>Topic</span>
                    {formik.errors.Topic && formik.touched.Topic && <span className='error'>{formik.errors.Topic}</span>}
                </label>

                <label >
                    <input type='text' name='NumberOfQuestion' onChange={formik.handleChange} value={formik.values.NumberOfQuestion} required />
                    <span>Number of question</span>
                    {formik.errors.NumberOfQuestion && formik.touched.NumberOfQuestion && <span className='error'>{formik.errors.NumberOfQuestion}</span>}
                </label>

                <label >
                    <input type='text' name='TotalScore' onChange={formik.handleChange} value={formik.values.TotalScore} required />
                    <span>Total score</span>
                    {formik.errors.TotalScore && formik.touched.TotalScore && <span className='error'>{formik.errors.TotalScore}</span>}
                </label>

                <label >
                    <input type='text' name='NumberOfAttendByAnyone' onChange={formik.handleChange} value={formik.values.NumberOfAttendByAnyone} />
                    <span>Maximum number of attend</span>
                    {formik.errors.NumberOfAttendByAnyone && formik.touched.NumberOfAttendByAnyone && <span className='error'>{formik.errors.NumberOfAttendByAnyone
                    }</span>}
                </label>
                <label >
                    <input type='text' name='PassingScore' onChange={formik.handleChange} value={formik.values.PassingScore} />
                    <span>Passing marks</span>
                    {formik.errors.PassingScore && formik.touched.PassingScore && <span className='error'>{formik.errors.PassingScore}</span>}
                </label>

                <label >
                    <input type="file" name="poster"
                        onChange={(e) => formik.setFieldValue("poster", e.target.files![0])}
                    />
                    <span>Poster</span>
                    {formik.errors.poster && formik.touched.poster && <span className='error'>{formik.errors.poster}</span>}
                </label>

                <button type="submit">Create</button>
            </form>

        </div>
    )
}

export default CreateQuiz