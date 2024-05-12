import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { QuestionType } from '..';
import { updateUserAns } from '../redux/reducer/QuizReducer';

function QuestionTemplate({ question, index }: { question: QuestionType, index?: number }) {
    const [selectedOption, setSelectedOption] = useState<String | null>(null);
    const ans = useAppSelector(state => state.quizReducer.userAns)
    const dispatch = useAppDispatch();
    const handelInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log("ch");
        const value = e.target.value
        setSelectedOption(value);
        if (index != undefined) {
            dispatch(updateUserAns({ index, ans: value ? value : null }))
        }
    }

    useEffect(() => {
        index !== undefined && setSelectedOption(ans[index])
    }, [question]);

    return (
        <div>
            {
                question ? <>
                    <h3>{question.Question}</h3>
                    <p>{question.Description}</p>
                    <p>{question.Marks}</p>
                    <label>
                        <input type="radio" name="option" value={question.Option.A} checked={selectedOption === question.Option.A} onChange={handelInputChange} />
                        <span>{question.Option.A}</span>
                    </label>
                    <label>
                        <input type="radio" name="option" value={question.Option.B} checked={selectedOption === question.Option.B} onChange={handelInputChange} />
                        <span>{question.Option.B}</span>
                    </label>
                    <label>
                        <input type="radio" name="option" value={question.Option.C} checked={selectedOption === question.Option.C} onChange={handelInputChange} />
                        <span>{question.Option.C}</span>
                    </label>
                    <label>
                        <input type="radio" name="option" value={question.Option.D} checked={selectedOption === question.Option.D} onChange={handelInputChange} />
                        <span>{question.Option.D}</span>
                    </label>

                </> : <>
                </>
            }

        </div>
    )
}

export default QuestionTemplate