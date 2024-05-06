import { useEffect} from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import EmailVerification from './Pages/EmailVerification'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Register from './Pages/Register'
import Navbar from './components/Navbar'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { getUserDetails } from './services/userAcoount';
import { useDispatch } from 'react-redux';
import Profile from './Pages/Profile';
import CreateQuiz from './components/CreateQuiz';
import QuizDetails from './Pages/QuizDetails';
import MyQuiz from './Pages/MyQuiz'

export const drivePhotoBaseUrl="https://drive.google.com/thumbnail?id="
// import logo from 'https://drive.google.com/file/d/1FG18bt3PW3F14iI6pMaYfvqv-2u-1Y9B/view'
function App() {
const dispatch=useDispatch()
  useEffect(() => {
    getUserDetails(dispatch)
  }, []);


  
  return (
    <>
    <Navbar/>

    <Routes>
      <Route   path='/users/verify-email/:userId/:VerificationToken' element={<EmailVerification/>}/>
      <Route path='/users/reset-password/:userId/:VerificationToken' element={<ResetPassword/>}/>

      <Route  path='/' element={<Home/>}/>
      <Route  path='/forget-password' element={<ForgotPassword/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route  path='/:user-name' element={<Profile/>}/>
      <Route path='/quiz'>
      <Route path='create' element={<CreateQuiz/>}/>
      <Route path='detail/:id' element={<QuizDetails/>}/>
      <Route path='my-quiz' element={<MyQuiz/>}/>
      <Route path=':userId/:id' element={<QuizDetails/>}/>

      </Route>
      {/* <Route path='/create-quiz' element={<CreateQuiz/>}/> */}
      {/* <Route path='/create-quiz' element={<CreateQuiz/>}/> */}
    </Routes>
    </>
  )
}

export default App
