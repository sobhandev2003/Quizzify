import { useNavigate } from 'react-router-dom';
import '../css/CreateQuiz.css'
import { createQuiz } from '../services/QuizService';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useAppSelector } from '../redux/store';
import createQuizBg from '../assets/create-quize-bg.jpg'
function CreateQuiz() {

    const navigate = useNavigate();

    const loginDetails = useAppSelector(state => state.userAccountReducer.loginUser)
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
        createQuiz(value, navigate, loginDetails.id)
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
            <img src={createQuizBg} alt="" className='background-img'/>
            <form className='quiz-create-form' onSubmit={formik.handleSubmit} >
                <div>
                    <label >
                        <span>Name</span>
                        <input type='text' name='Name' className='' onChange={formik.handleChange} value={formik.values.Name} required />
                    </label>
                    {formik.errors.Name && formik.touched.Name && <span className='error'>{formik.errors.Name}</span>}

                </div>

                <div>
                    <label >
                        <span>Description</span>
                        <input type='text' name='Description' onChange={formik.handleChange} value={formik.values.Description} required />
                    </label>
                    {formik.errors.Description && formik.touched.Description && <span className='error'>{formik.errors.Description}</span>}

                </div>
                <div>
                    <label >
                        <span>Category</span>
                        <input type='text' name='Category' onChange={formik.handleChange} value={formik.values.Category} required />
                    </label>
                    {formik.errors.Category && formik.touched.Category && <span className='error'>{formik.errors.Category}</span>}
                </div>
                <div>
                    <label >
                        <span>Topic</span>
                        <input type='text' name='Topic' onChange={formik.handleChange} value={formik.values.Topic} />
                    </label>
                    {formik.errors.Topic && formik.touched.Topic && <span className='error'>{formik.errors.Topic}</span>}
                </div>

                <div>
                    <label >
                        <span>Number of question</span>
                        <input type='text' name='NumberOfQuestion' onChange={formik.handleChange} value={formik.values.NumberOfQuestion} required />
                    </label>
                    {formik.errors.NumberOfQuestion && formik.touched.NumberOfQuestion && <span className='error'>{formik.errors.NumberOfQuestion}</span>}
                </div>

                <div>
                    <label >
                        <span>Total score</span>
                        <input type='text' name='TotalScore' onChange={formik.handleChange} value={formik.values.TotalScore} required />
                    </label>
                    {formik.errors.TotalScore && formik.touched.TotalScore && <span className='error'>{formik.errors.TotalScore}</span>}
                </div>
                <div>
                    <label >
                        <span>Maximum number of attend</span>
                        <input type='text' name='NumberOfAttendByAnyone' onChange={formik.handleChange} value={formik.values.NumberOfAttendByAnyone} />
                    </label>
                    {formik.errors.NumberOfAttendByAnyone && formik.touched.NumberOfAttendByAnyone && <span className='error'>{formik.errors.NumberOfAttendByAnyone
                    }</span>}
                </div>

                <div>
                    <label >
                        <span>Passing marks</span>
                        <input type='text' name='PassingScore' onChange={formik.handleChange} value={formik.values.PassingScore} />
                    </label>
                    {formik.errors.PassingScore && formik.touched.PassingScore && <span className='error'>{formik.errors.PassingScore}</span>}
                </div>
                <div>
                    <label >
                        <span>Poster</span>
                        <input type="file" name="poster"
                            onChange={(e) => formik.setFieldValue("poster", e.target.files![0])}
                        />
                    </label>
                    {formik.errors.poster && formik.touched.poster && <span className='error'>{formik.errors.poster}</span>}
                </div>

                <button className="create-btn" type="submit">Create</button>
            </form>

        </div>
    )
}

export default CreateQuiz