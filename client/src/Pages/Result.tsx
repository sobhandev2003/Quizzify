import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/store'

function Result() {
    const quiz=useAppSelector(state=>state.quizReducer.quiz);
    const marks=useAppSelector(state=>state.quizReducer.marks);
    const [userScore,setUserScore]=useState<number|undefined>(undefined)
    const [passingMarks,setPassingMarks]=useState<number>(-1)
    useEffect(()=>{
        setUserScore(marks);
        setPassingMarks(Number(quiz.PassingScore));
    },[quiz,marks])
  return (
    <div>
        <h1>Result</h1>
        <p>{userScore && userScore>=passingMarks?"Passed":"Failed"}</p>
        <p>Your score : {userScore}  </p>
    </div>
  )
}

export default Result