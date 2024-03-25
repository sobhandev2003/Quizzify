import { useEffect, useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import EmailVerification from './Pages/EmailVerification'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Register from './Pages/Register'
import Navbar from './components/Navbar'
import Login from './Pages/Login'
import Home from './Pages/Home'
// import logo from 'https://drive.google.com/file/d/1FG18bt3PW3F14iI6pMaYfvqv-2u-1Y9B/view'
function App() {

  
  
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
    </Routes>
    </>
  )
}

export default App
