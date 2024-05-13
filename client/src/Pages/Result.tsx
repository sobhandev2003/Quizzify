import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { updateLike, updateUnlike } from '../services/QuizService';
function Result() {
  const param=useParams()
  const dispatch=useAppDispatch()
    const quiz=useAppSelector(state=>state.quizReducer.quiz);
    const marks=useAppSelector(state=>state.quizReducer.marks);
    const [userScore,setUserScore]=useState<number|undefined>(undefined)
    const [passingMarks,setPassingMarks]=useState<number>(-1)

    const handelLike=()=>{
      // console.log(param.id);
      
        dispatch(updateLike(param.id!))
    }
    const handelUnlike=()=>{
      // console.log(param.id);
      dispatch(updateUnlike(param.id!))
    }

    useEffect(()=>{
        setUserScore(marks);
        setPassingMarks(Number(quiz.PassingScore));
    },[quiz,marks])
  return (
    <div>
        <h1>Result</h1>
        <p>{userScore && userScore>=passingMarks?"Passed":"Failed"}</p>
        <p>Your score : {userScore}  </p>
        <button onClick={handelLike}><AiOutlineLike/></button>
        <button onClick={handelUnlike}><AiOutlineDislike/></button>
    </div>
  )
}

export default Result