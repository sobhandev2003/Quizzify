import { useEffect, useState } from 'react'
import { getMyQuiz } from '../services/QuizService'
import { Quiz } from '..'
import QuizCard from '../components/QuizCard'
import { setCurrentQuiz, setIsUpdate } from '../redux/reducer/QuizReducer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';

function MyQuiz() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const loginDetails = useAppSelector(state => state.userAccountReducer.loginUser);

  const handelNavigate = (quiz: Quiz, index: number): void => {
    dispatch(setCurrentQuiz(quiz))
    dispatch(setIsUpdate(true))
    navigate(`/quiz/${loginDetails.id}/${quiz._id}`)
  }
  useEffect(() => {
    getMyQuiz().then((res): void => {
      setQuizzes(res)
    })
  }, [])
  return (
    <div>
      {quizzes ? <>

        {quizzes.map((quiz, index) => (
          <div key={quiz._id} onClick={()=>handelNavigate(quiz,index)}>
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