import '../css/Home.css'
import { useEffect, useState } from 'react'
import { getAllQuiz } from '../services/QuizService'
import toast from 'react-hot-toast';
import { Quiz } from '..';
import QuizCard from '../components/QuizCard';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { setCurrentQuiz } from '../redux/reducer/QuizReducer';

function Home() {
  const navigate = useNavigate()
  const dispatch= useAppDispatch();
  const [quizzes, setAllQuizzes] = useState<Quiz[] | null>(null);

const handelNavigate=(quiz:Quiz,index:number):void=>{
 dispatch(setCurrentQuiz(quiz))
  navigate(`/quiz/detail/${quiz._id}`)
}

  useEffect(() => {
    getAllQuiz().then((res): void => {
      setAllQuizzes(res)
    }).catch((err): void => {
      toast("some thing wrong")
    })
  }, [])

 
  return (
    <div className='home'>
      {/* <h1>hghh</h1> */}
      {
        quizzes && <>
          {
            quizzes.map((quiz, index) => (
              // const {Name}=quiz
              <div key={quiz._id} className='quizzes-container' onClick={() =>handelNavigate(quiz,index)}>
                <QuizCard
                  user_id={quiz.User_Id}
                  _id={quiz._id}
                  name={quiz.Name}
                  description={quiz.Description}
                  topic={quiz.Topic}
                  category={quiz.Category}
                  posterId={quiz.PosterId}
                  like={quiz.Like}
                  unlike={quiz.Unlike}
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