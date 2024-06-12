import  { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { AttendQuizDetails, QuestionType } from '..';
import { getAllQuestion } from '../services/QuestionService';
import {  useNavigate, useParams } from 'react-router-dom';
import QuestionTemplate from '../components/QuestionTemplet';
import { getQuizById } from '../services/QuizService';
import { addCurrentSubmitQuizDetails } from '../services/userAcoount';

function AttendQuiz() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const params = useParams();
    const quizId = params.id;
    const [questions, setQuestions] = useState<QuestionType[] | null>(null)
    const [question, setQuestion] = useState<QuestionType | null>(null);
    const [qIndex, setQIndex] = useState<number>(-1);
    const currentQuiz = useAppSelector(state => state.quizReducer.quiz);
    const quizQuestionDet = useAppSelector(state => state.quizReducer.quizQuestionDet);
    const ans = useAppSelector(state => state.quizReducer.userAns)
    const handleEvaluationResult = () => {
        let marks = 0;
        questions?.forEach((question, index) => {
            if (question.CorrectOption === ans[index]) {
                marks += question.Marks;
            } 
        })

        const quizDetails:AttendQuizDetails = {
            Quiz_ID: quizId!,
            Quiz_Name: currentQuiz.Name,
            Quiz_Category: currentQuiz.Category,
            Score: marks,
            IsPassed: marks >= Number(currentQuiz.PassingScore)
        }
        // console.log(marks);
        dispatch(addCurrentSubmitQuizDetails(quizDetails))
        navigate(`/result/${quizId}`,{state:{quiz:currentQuiz,marks}})
    }
    const handelRenderNextQuestion = () => {
        if (qIndex < questions?.length! - 1)
            setQIndex(qIndex + 1)
    }
    const handelRenderPreviousQuestion = () => {
        if (qIndex > 0)
            setQIndex(qIndex - 1)
    }

    useEffect(() => {
        setQuestions(quizQuestionDet.allQuestion);
        setQIndex(0)
        setQuestion(quizQuestionDet.allQuestion[0])
        // console.log(allQuestion);

    }, [quizQuestionDet.allQuestion])
    useEffect(() => {
        questions && setQuestion(questions[qIndex])
    }, [qIndex])
    useEffect(() => {
        // console.log(quizId);
        dispatch(getQuizById(quizId!));
        dispatch(getAllQuestion(quizId!))
    }, [])
    return (
        <div>
            {/* <h1>Start Quiz</h1> */}

            {question && <>  <QuestionTemplate question={question} index={qIndex} />
                {qIndex > 0 && <button onClick={handelRenderPreviousQuestion}>Previous</button>}
                {qIndex < questions?.length! - 1 && <button onClick={handelRenderNextQuestion}>Next</button>}
                {qIndex === questions?.length! - 1 && <button onClick={handleEvaluationResult}>Submit</button>}

            </>
            }
        </div>
    )
}

export default AttendQuiz