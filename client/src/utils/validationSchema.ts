import * as yup from 'yup';
//NOTE - For login form
export const loginValidationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
});

//NOTE - For registration form
export const registerUserSchema = yup.object({
    UserName: yup.string().min(3).required(),
    Email: yup.string().email().required(),
    phoneNumber: yup.string().matches(/^\d+$/, 'Only numbers are allowed').length(10).required(),
    Password: yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
        'Password must contain one uppercase , one lowercase , one number, and one special character'
    ).required().min(6)
})

//NOTE -  for question add form
/*QuestionNumber,
Question,
Description:Boolean('false')
Option
CorrectOption
Marks */

//NOTE - Question option
const optionSchema = yup.object().shape({
    A: yup.string().required('Option A is required'),
    B: yup.string().required('Option B is required'),
    C: yup.string().required('Option C is required'),
    D: yup.string().required('Option D is required')
});
//NOTE - Add question
export const addQuestionSchema =  yup.object({
    QuestionNumber: yup.string().max(4, 'Question number must be at most 4 characters').required('Question number is required'),
    Question: yup.string().min(5, 'Question must be at least 5 characters').required('Question is required'),
    Description: yup.string().required('Description is required'),
    Option: optionSchema,
    CorrectOption: yup.string().required('Correct option is required'),
    Marks: yup.number().min(0).required('Marks are required')
});
//NOTE - Update Question
export const updateQuestionSchema =  yup.object({
    // QuestionNumber: yup.string().max(4, 'Question number must be at most 4 characters'),
    Question: yup.string(),
    Description: yup.string(),
    // Option: optionSchema,
    CorrectOption: yup.string(),
    Marks: yup.number().min(0)
});

//NOTE -Update quiz Schema

export const updateQuizSchema=yup.object({
    Description:yup.string().min(5,'Description must be at least 5 characters'),
    NumberOfAttendByAnyone:yup.number().min(0,"Number of attendees must be non-negative.")
})

