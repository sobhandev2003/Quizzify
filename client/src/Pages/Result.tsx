import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { useLocation, useParams } from 'react-router-dom';
import { updateLike, updateUnlike } from '../services/QuizService';
import { Quiz } from '..';
import SomethingWrong from '../components/SomethingWrong';
function Result() {
  const location = useLocation();
  const param = useParams()
  const dispatch = useAppDispatch()
  const [quiz, setQuiz] = useState<Quiz>();
  const [marks, setMarks] = useState()
  const [userScore, setUserScore] = useState<number | undefined>(undefined)
  const [passingMarks, setPassingMarks] = useState<number>(-1)

  const handelLike = () => {
    dispatch(updateLike(param.id!))
  }
  const handelUnlike = () => {
    dispatch(updateUnlike(param.id!))
  }

  useEffect(() => {
    setUserScore(marks);
    setPassingMarks(Number(quiz?.PassingScore));
  }, [quiz, marks])

  useEffect(() => {
    if (location.state) {
      setQuiz(location.state.quiz);
      setMarks(location.state.marks);
    }
  }, [])
  return (
    <div>
      {quiz?<>
        <div>
      <h1>Result</h1>
      <p>{userScore && userScore >= passingMarks ? "Passed" : "Failed"}</p>
      <p>Your score : {userScore}  </p>
      <button onClick={handelLike}><AiOutlineLike /></button>
      <button onClick={handelUnlike}><AiOutlineDislike /></button>
    </div>
      </>:<>
      <SomethingWrong/>
      </>}
    </div>

  )
}

export default Result