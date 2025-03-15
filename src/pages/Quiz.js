import React, { useContext, useEffect, useState } from 'react';
import Question from '../components/Question';
import '../styles/Quiz.css'
import ResultContext from '../context/ResultContext';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import InfeedAd from '../components/InfeedAd'
import DisplayAd from '../components/DisplayAd';
import Cookies from 'js-cookie';


export default function Quiz(props) {
    
    const formatDate = (timestamp) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      };
    
    const HOST = process.env.REACT_APP_HOST_NAME;
    const {quizId} = useParams();
    const [id, setId] = useState(quizId);
    const {quizData, setQuizData} = useContext(ResultContext);
    // const [userdata, setUserdata] = useState(null);
    const [startTime, setStartTime] = useState(null); // Initialize startTime

    const fetchData = async()=>{
        try {
            const response = await fetch(HOST + `api/getquiz/${id}`, {
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
        setStartTime(Date.now());
    }, [])

    useEffect(() => {
        if(quizData != null){
            setlocalResponse(Array(quizData.questions.length).fill("0"));
        }
    }, [quizData])
    

    const navigate = useNavigate();
    const handleAnswerSelected = (option, id) => {
        // This function is called whenever a user selects an answer
        let copyRes = localResponse;
        copyRes[id] = option;
        setlocalResponse(copyRes);
    };


    const onSubmit = async () => {
        let tempScore = 0;
    
        // Calculate score based on the user's responses
        for (let i = 0; i < localResponse.length; i++) {
            if (localResponse[i] === quizData.questions[i].answer) {
                tempScore++;
            }
        }
    
        setScore(tempScore);
        setResponses(localResponse);
    
        const endTime = Date.now();
        const timeTaken = Math.round((endTime - startTime) / 1000); // Time in seconds
    
        const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    
        if (userData) {
            try {
                const response = await fetch(`${process.env.REACT_APP_HOST_NAME}api/submitquiz`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'token': `Bearer ${Cookies.get('jwtoken')}` 
                    },
                    body: JSON.stringify({
                        userId: userData._id,  // User ID from the logged-in user's data
                        quizId: quizData._id,  // ID of the quiz
                        score: tempScore * 2,  // Calculate final score
                        totalQuestions: quizData.questions.length,
                        correctAnswers: tempScore,
                        timeTaken: timeTaken
                    }),
                });
    
                // Check if the request was successful
                if (!response.ok) throw new Error('Failed to submit quiz attempt');
                
                const result = await response.json();  // Parse the response JSON
                // console.log('Quiz attempt submitted successfully:', result);
    
            } catch (error) {
                console.error('Error submitting quiz attempt:', error);
            }
        } else {
            // console.log('User is not logged in. Quiz result will not be stored.');
        }
    
        // Redirect the user to the result page
        navigate('/result');
    }
        

    return (
        <>
            <Navbar />
            <DisplayAd />
            {!quizData ? <Spinner /> : <>
                <h1>Daily Quiz : {formatDate(quizData.date)}</h1>
                <h3 style={{ textAlign: "center" }}>Subject : {quizData.subject}</h3>
                <div className="quiz-container">
                    {quizData.questions.map((question, id) => (
                        <React.Fragment key={id}>
                            <Question question={question} onAnswerSelected={handleAnswerSelected} id={id} />
                            {id!=0 && id%3==0 && <InfeedAd />}
                        </React.Fragment>
                    ))}
                    <div className="center-container">
                        <button className='btn btn-primary' onClick={onSubmit} style={{}}>Submit Responses</button>
                    </div>
                </div>
            </>}
        </>
    );

}
