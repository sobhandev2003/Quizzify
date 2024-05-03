import React, { useEffect, useState } from 'react'
import { getAllQuiz } from '../services/QuizService'
import toast from 'react-hot-toast';
import { Quiz } from '..';
import QuizCard from '../components/QuizCard';


function Home() {
  const [quizzes, setAllQuizzes] = useState<Quiz[]|null>(null);
 
  useEffect(() => {
    getAllQuiz().then((res): void => {
      setAllQuizzes(res)
    }).catch((err): void => {
      toast("some thing wrong")
    })
  }, [])
  return (
    <div>
      <h1>hghh</h1>
      {
        quizzes && <>
          {


            quizzes.map((quiz) => (

                // const {Name}=quiz
              <div key={quiz._id}>
             <QuizCard
             _id={quiz._id}
             name={quiz.Name}
             description={quiz.Description}
             topic={quiz.Topic}
             category={quiz.Category}
             posterId={quiz.PosterId}
             
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