import { useEffect, useState } from 'react'
import { getMyQuiz } from '../services/QuizService'
import { Quiz } from '..'
import QuizCard from '../components/QuizCard'
import { useNavigate } from 'react-router-dom';
import {  useAppSelector } from '../redux/store';
import BackgroundImg from "../assets/New-blog-graphic.jpg";
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
    <div className='w-screen min-h-screen relative'>
      <img src={BackgroundImg}  className=" fixed -z-10 w-full h-full" alt="" />
      {quizzes ? <div className=' p-4'>

        {quizzes.map((quiz) => (
          <div  key={quiz._id} onClick={()=>handelNavigate(quiz)}>
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
      </div> : <></>}
    </div>
  )
}

export default MyQuiz