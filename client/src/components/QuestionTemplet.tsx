import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/store'
import { QuestionType } from '..';

function QuestionTemplate({ question }: { question: QuestionType }) {
    // const [questions, setQuestions] = useState<QuestionType[] | null>(null);
    // const allQuestion = useAppSelector(state => state.quizReducer.allQuestion);
    // useEffect(() => {
    //     setQuestions(allQuestion)
    // }, [allQuestion])

    return (
        <div>
            {
                question ? <>
                    <h3>{question.Question}</h3>
                    <p>{question.Description}</p>
                    <p>{question.Marks}</p>
                    <label>
                        <input type="radio" name="option" value={question.Option.A} />
                        <span>{question.Option.A}</span>
                    </label>
                    <label>
                        <input type="radio" name="option" value={question.Option.B} />
                        <span>{question.Option.B}</span>
                    </label>
                    <label>
                        <input type="radio" name="option" value={question.Option.C} />
                        <span>{question.Option.C}</span>
                    </label>
                    <label>
                        <input type="radio" name="option" value={question.Option.D} />
                        <span>{question.Option.D}</span>
                    </label>

                </> : <></>
            }

        </div>
    )
}

export default QuestionTemplate