import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import EmailVerification from './Pages/EmailVerification'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
// import logo from 'https://drive.google.com/file/d/1FG18bt3PW3F14iI6pMaYfvqv-2u-1Y9B/view'
function App() {

  
  return (
    <>
    <h1>QUIZZIFY</h1>
    <img src="https://drive.google.com/thumbnail?id=1TQutJd8Paxbgeki8cinzmASVf7rLUbHB" alt="None"/>

    <img src={`https://drive.google.com/thumbnail?id=1TQutJd8Paxbgeki8cinzmASVf7rLUbHB`} alt=''/> 
    {/* <iframe src="https://drive.google.com/file/d/1yjrb6S7BQh12R0a6RDGLBDx960FUWja5/preview" width="640" height="480" allow="autoplay"></iframe> */}
    <Routes>
      <Route path='/users/verify-email/:userId/:VerificationToken' element={<EmailVerification/>}/>
      <Route path='/forget-password' element={<ForgotPassword/>}/>
      <Route path='/users/reset-password/:userId/:VerificationToken' element={<ResetPassword/>}/>
    </Routes>
    </>
  )
}

export default App
