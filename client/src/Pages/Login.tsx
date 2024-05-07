import '../css/Login.css'
import { useFormik } from 'formik';
// import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import { LoginDetails } from '..';
import { loginExistingUser } from '../services/userAcoount';
import {  useDispatch } from 'react-redux';
import {  useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../utils/validationSchema';



//Login
const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const LoginDetails = useAppSelector(state => state.userAccountReducer.loginUser);
  
  //NOTE - Login user 
  const loginAccount = (data: LoginDetails) => {
   
    loginExistingUser(data, dispatch);
  }

  //NOTE - Formik 
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      loginAccount(values)
    },
  });

//NOTE - 
  useEffect(() => {
      console.log(LoginDetails);
      if (LoginDetails.email.length>0) {
        navigate("/")
      }
  }, [LoginDetails])


  return (
    <div className='login-div'>
      <h2 className='text-2xl text-center mb-6 text-red-600'>Log In</h2>
      <form onSubmit={formik.handleSubmit} className='login-from'>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" className='p-10 w-15 mt-10' type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login
