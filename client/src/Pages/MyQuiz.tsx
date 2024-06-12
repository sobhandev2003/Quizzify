import { useEffect, useState } from 'react'
import { getMyQuiz } from '../services/QuizService'
import { Quiz } from '..'
import QuizCard from '../components/QuizCard'
import { useNavigate } from 'react-router-dom';
import {  useAppSelector } from '../redux/store';

function MyQuiz() {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const loginDetails = useAppSelector(state => state.userAccountReducer.loginUser);

  const handelNavigate = (quiz: Quiz): void => {
 
    navigate(`/quiz/${loginDetails.id}/${quiz._id}`,{state:{quiz,isUpdate:true}})
  }
  useEffect(() => {
    getMyQuiz().then((res): void => {
      setQuizzes(res)
    })
  }, [])
  return (
    <div>
      {quizzes ? <>

        {quizzes.map((quiz) => (
          <div key={quiz._id} onClick={()=>handelNavigate(quiz)}>
            <QuizCard
              _id={quiz._id}
              user_id={quiz.User_Id}
              name={quiz.Name}
              category={quiz.Category}
              topic={quiz.Topic}
              description={quiz.Description}
              posterId={quiz.PosterId}
              likeBy={quiz.LikeBy!}
              unlikeBy={quiz.UnLikeBy!}
              isValid={quiz.isValid}
            />
          </div>
        ))}
      </> : <></>}
    </div>
  )
}

export default MyQuiz