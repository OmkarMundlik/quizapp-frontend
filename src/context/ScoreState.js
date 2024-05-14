import { useState } from "react";
import ResultContext from "./ResultContext";

const ScoreState = (props)=>{
    const [score, setScore] = useState(0);
    const [responses, setResponses] = useState([]);
    const [quizData, setQuizData] = useState(null);
    const [alertContext, setAlertContext] = useState({
        'isActive':false,
        'status' : '',
        'message':''
    });

    return (
        <ResultContext.Provider value={{score, setScore, responses, setResponses, quizData, setQuizData, alertContext, setAlertContext}}>
            {props.children}
        </ResultContext.Provider>
    )
}
 
export default ScoreState;