import { useState } from 'react'
import '../css/CreateQuiz.css'
import { Quiz } from '..'
import { createQuiz } from '../services/QuizService';

function CreateQuiz() {
    //NOTE - 
    const [quizDetails, setQuizDetails] = useState<Quiz>(
        {
            Name: "",
            Description: "",
            Category: "",
            Topic: "",
            NumberOfQuestion: "",
            TotalScore: "",
            NumberOfAttendByAnyone: "",
            PassingScore: "-1",
            poster: null,
        });

    //NOTE - 
    const handelCreateQuizRequest = (e: React.FormEvent) => {
        e.preventDefault()
        // console.log(quizDetails);
        createQuiz(quizDetails)

    }
    //NOTE - 
    const handelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        // let inputValue:string|File= files ?files[0]:value.charAt(0).toUpperCase+value.slice(1) 
        let inputValue: string | File = files ? files[0] : value.charAt(0).toUpperCase() + value.slice(1);
        // console.log(inputValue);
        // console.log(name);


        if (quizDetails && inputValue) {
            setQuizDetails({
                ...quizDetails,
                [name]: inputValue
            })
        }

    }
    return (
        <div className='create-quiz'>
            <form onSubmit={handelCreateQuizRequest}>
                <label >
                    <input type='text' name='Name' onChange={handelInputChange} value={quizDetails.Name} required />
                    <span>Name</span>
                </label>

                <label >
                    <input type='text' name='Description' onChange={handelInputChange} value={quizDetails.Description} required />
                    <span>Description</span>
                </label>

                <label >
                    <input type='text' name='Category' onChange={handelInputChange} value={quizDetails.Category} required />
                    <span>Category</span>
                </label>

                <label >
                    <input type='text' name='Topic' onChange={handelInputChange} value={quizDetails.Topic} />
                    <span>Topic</span>
                </label>

                <label >
                    <input type='text' name='NumberOfQuestion' onChange={handelInputChange} value={quizDetails.NumberOfQuestion} required />
                    <span>Number of question</span>
                </label>

                <label >
                    <input type='text' name='TotalScore' onChange={handelInputChange} value={quizDetails.TotalScore} required />
                    <span>Total score</span>
                </label>

                <label >
                    <input type='text' name='NumberOfAttendByAnyone' onChange={handelInputChange} value={quizDetails.NumberOfAttendByAnyone} />
                    <span>Maximum nuber of attend</span>
                </label>
                <label >
                    <input type='text' name='PassingScore' onChange={handelInputChange} value={quizDetails.PassingScore} />
                    <span>Passing marks</span>
                </label>

                <label >
                    <input type="file" name='poster' onChange={handelInputChange} />
                    <span>Poster</span>
                </label>
                <button type="submit">Create</button>
            </form>

        </div>
    )
}

export default CreateQuiz