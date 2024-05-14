import React, { useContext } from 'react'
import ResultContext from '../context/ResultContext'
import Answer from '../components/Answer';
import { Link } from 'react-router-dom';
import  '../styles/Result.css'
export default function Result() {
    const {quizData} = useContext(ResultContext);
    const {score, responses} = useContext(ResultContext);
    
    return (
        <>
            {quizData!=null && responses.length > 0 ? <><h1>Your Score :  {score}</h1>
            <div className="quiz-container">
                {quizData.questions.map((question, id) => (
                    <div key={id}>
                        <Answer question={question} id={id} selected={responses[id]} answer={quizData.questions[id].answer} />
                    </div>
                ))}
            </div>
            </> : 
            <div>Start A Quiz First!!</div>}
            
            <div className="center-container">
            <Link className="btn btn-primary" to="/allquizes">Back</Link>
            </div>

        </>
    )
}
