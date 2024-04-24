import { useState } from "react";
import ResultContext from "./ResultContext";

const ScoreState = (props)=>{
    const [score, setScore] = useState(0);
    const [responses, setResponses] = useState([]);
    const [quizData, setQuizData] = useState(null);
    return (
        <ResultContext.Provider value={{score, setScore, responses, setResponses, quizData, setQuizData}}>
            {props.children}
        </ResultContext.Provider>
    )
}

export default ScoreState;