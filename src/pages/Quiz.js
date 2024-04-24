import React, { useContext, useEffect, useState } from 'react';
import Question from '../components/Question';
import style from '../styles/Quiz.css'
import ResultContext from '../context/ResultContext';
import { useNavigate, useParams } from 'react-router-dom';


export default function Quiz(props) {
    const formatDate = (timestamp) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      };
    const {quizId} = useParams();
    const [id, setId] = useState(quizId);
    // const [quizData, setQuizData] = useState(null);
    const {quizData, setQuizData} = useContext(ResultContext);
    const fetchData = async()=>{
        try {
            const response = await fetch(`https://spardhaweb.com/api/getquiz/${id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch quizzes');
            }
            const data = await response.json();
            setQuizData(data);
          } catch (error) {
            console.error('Error fetching quizzes:', error);
          }
    }
    const { score, setScore, responses, setResponses } = useContext(ResultContext);
    const [localResponse, setlocalResponse] = useState([]);

    useEffect(() => {
        setId(quizId);
        fetchData();
    }, [])

    useEffect(() => {
        if(quizData != null){
            setlocalResponse(Array(quizData.questions.length).fill("0"));
        }
    }, [quizData])
    
    // const answers = ["1", "2", "3", "4", "2"];

    const navigate = useNavigate();
    // const [responses, setResponses] = useState(Array(questions.length).fill("0"));
    // setResponses(Array(questions.length).fill("0"));
    const handleAnswerSelected = (option, id) => {
        // This function is called whenever a user selects an answer
        let copyRes = localResponse;
        copyRes[id] = option;
        setlocalResponse(copyRes);
    };

    const onSubmit = () => {
        if (localResponse.includes("0")) {
            alert("Please select all options.");
            return;
        } 
        let tempScore = 0;
        for (let i = 0; i < localResponse.length; i++) {
            if (localResponse[i] === quizData.questions[i].answer) {
                tempScore++;
            }
        }
        setScore(tempScore);
        setResponses(localResponse);
        navigate('/result');
    }
    return (
        <>
        {quizData && <>
            <h1>Daily Quiz : {formatDate(quizData.date)}</h1>
            <h3 style={{ textAlign: "center" }}>Subject : {quizData.subject}</h3>
            <div className="quiz-container">
                { quizData.questions.map((question, id) => (
                    <div key={id}>
                        <Question question={question} onAnswerSelected={handleAnswerSelected} id={id} />
                    </div>
                ))}
                <div className="center-container">
                    <button className='btn btn-primary' onClick={onSubmit} style={{}}>Submit Responses</button>
                </div>
            </div>
        </>}
        </>
    );
}
