import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import EmailVerification from './Pages/EmailVerification'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

function App() {

  
  return (
    <>
    <Routes>
      <Route path='/users/verify-email/:userId/:VerificationToken' element={<EmailVerification/>}/>
      <Route path='/forget-password' element={<ForgotPassword/>}/>
      <Route path='/users/reset-password/:userId/:VerificationToken' element={<ResetPassword/>}/>
      
    </Routes>
    </>
  )
}

export default App
