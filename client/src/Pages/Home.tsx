import '../css/Home.css'
import { useEffect, useState } from 'react'
import { getAllQuiz } from '../services/QuizService'
import toast from 'react-hot-toast';
import { Quiz } from '..';
import QuizCard from '../components/QuizCard';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import BeforeLoginHomePage from '../components/BeforeLoginHomePage';


function Home() {
  const navigate = useNavigate()

  const [quizzes, setAllQuizzes] = useState<Quiz[] | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const handelNavigate = (quiz: Quiz, index: number): void => {
    // dispatch(setCurrentQuiz(quiz))
    navigate(`/quiz/detail/${quiz._id}`, { state: { quiz, isUpdate: false } })
  }
  const loginDetails = useAppSelector(state => state.userAccountReducer.loginUser);

  useEffect(() => {
    setIsLogin(loginDetails.email.length > 0)
  }, [loginDetails]);

  useEffect(() => {
    getAllQuiz().then((res): void => {
      setAllQuizzes(res)
      // console.log(res[0]);

    }).catch((): void => {
      toast("some thing wrong")
    })
  }, [])

  //NOTE - Before login
  if (!isLogin) {
    return (
      <>
        <BeforeLoginHomePage />
      </>

    )
  }

  //NOTE - After login
  return (
    <div className='home'>
      {
        quizzes && <>
          {
            quizzes.map((quiz, index) => (
              quiz.isValid && <div key={quiz._id} className='quizzes-container' onClick={() => handelNavigate(quiz, index)}>
                <QuizCard
                  user_id={quiz.User_Id}
                  _id={quiz._id}
                  name={quiz.Name}
                  description={quiz.Description}
                  topic={quiz.Topic}
                  category={quiz.Category}
                  posterId={quiz.PosterId}
                  likeBy={quiz.LikeBy!}
                  unlikeBy={quiz.UnLikeBy!}
                />
              </div>

            ))
          }
        </>
      }
    </div>
  )
}

export default Home