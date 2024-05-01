import { Formik } from "formik";
import "../css/Registration.css";
import * as yup from 'yup';
import { UserRegisterDetails } from "..";
import { registerNewAccount } from "../services/userAcoount";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { useEffect } from "react";
function Register() {
  const navigate=useNavigate()
  const LoginDetails = useAppSelector(state => state.userAccountReducer.loginUser);
  //NOTE - User schema 
  const userSchema = yup.object({
    UserName: yup.string().min(3).required(),
    Email: yup.string().email().required(),
    phoneNumber: yup.string().matches(/^\d+$/, 'Only numbers are allowed').length(10).required(),
    Password: yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
      'Password must contain one uppercase , one lowercase , one number, and one special character'
    ).required().min(6)
  })
  const registerUser = async(data:UserRegisterDetails) => {
    
    if (await registerNewAccount(data)) {
      navigate("/login")
    }
  }

  useEffect(() => {
    console.log(LoginDetails);
    if (LoginDetails.email.length>0) {
      navigate("/")
    }
}, [LoginDetails])
  return (
    <div>
      <div>
        <h1 className="ml-5 text-2xl text-blue-500">Register user account</h1>
        <Formik
          initialValues={{ UserName: "", Email: "", phoneNumber: "", Password: "" }}
          validationSchema={userSchema}
          onSubmit={(value) => registerUser(value)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,

            /* and other goodies */
          }) => (
            <form className='registration-from' onSubmit={handleSubmit}>
              <label>
                <input type="text"
                  name="UserName"
                  placeholder=""
                  onChange={handleChange}
                  value={values.UserName}
                  required />
                <span className="placeholder">User Name</span>
                {errors.UserName && touched.UserName && <span className="error">{errors.UserName}</span>}
              </label>

              <label>
                <input
                  type="email"
                  name="Email"
                  placeholder=""
                  onChange={handleChange}
                  value={values.Email}
                  required />
                <span className="placeholder">Email</span>
                {errors.Email && touched.Email && <span className="error">{errors.Email}</span>}
              </label>

              <label>
                <input type="text"
                  name="phoneNumber"
                  placeholder=""
                  onChange={handleChange}
                  value={values.phoneNumber}
                  required />
                <span className="placeholder">Phone Number</span>
                {errors.phoneNumber && touched.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
              </label>

              <label>
                <input type="password"
                  name="Password"
                  placeholder=""
                  onChange={handleChange}
                  value={values.Password}
                  required />
                <span className="placeholder">Password</span>
                {errors.Password && touched.Password && <span className="error">{errors.Password}</span>}
              </label>
              <button type="submit" className="register">Register</button>
            </form>

          )}
        </Formik>
      </div>

    </div>

  )
}

export default Register