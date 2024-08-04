import React, { useContext, useEffect, useState } from 'react';
import ResultContext from '../context/ResultContext';
import Answer from '../components/Answer';
import { Link } from 'react-router-dom';
import '../styles/Result.css';
import Spinner from '../components/Spinner';
import Categories from '../components/Categories';
import Navbar from '../components/Navbar';

export default function Result() {
    const formatDate = (timestamp) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const compareDates = (a, b) => {
        return new Date(b.date) - new Date(a.date);
    };

    const HOST = process.env.REACT_APP_HOST_NAME;

    const [quizes, setQuizes] = useState(null);
    const fetchData = async () => {
        try {
            const response = await fetch(HOST + 'api/getallquizes', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch quizzes');
            }
            const data = await response.json();
            // Sort the quizzes based on date in descending order
            const sortedQuizzes = data.sort(compareDates);
            setQuizes(sortedQuizzes);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    const { quizData, score, responses } = useContext(ResultContext);


    useEffect(() => {
        fetchData();
        if (quizes && quizData) {
            setQuizes(quizes.filter(quiz => quiz._id !== quizData._id))
        }
    }, []);


    // Render a message if quizData is not yet loaded or responses are empty
    if (!quizData || responses.length === 0) {
        return <div className="center-container">Start a Quiz First!!</div>;
    }

    return (
        <>
        <Navbar />
            <div className="result-container">
                <h1 className="result-heading">Quiz Result</h1>
                <div className="score-container">
                    <h2 className="score-text">Your Score: {score}/{quizData.questions.length}</h2>
                </div>
                <div className="quiz-container">
                    {quizData.questions.map((question, id) => (
                        <div key={id} className="question-container">
                            <Answer
                                question={question}
                                id={id}
                                selected={responses[id]}
                                answer={quizData.questions[id].answer}
                            />
                        </div>
                    ))}
                </div>
                <h1 className="text-center">See More Tests</h1>
                {!quizes ? <Spinner /> :
                    <ul className="list-group">
                        {quizes.slice(0, 7).map(quiz => (
                            <>
                                <Link to={`/start/${quiz._id}`} key={quiz._id} className="text-decoration-none">
                                    <li className="list-group-item d-flex justify-content-between align-items-center my-2 p-3">
                                        <div className="d-flex align-items-center">
                                            {/* <img src={!quiz.imageUrl ? "https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/test_series_y3kecu.jpg" : quiz.imageUrl} alt="" height="65px" width="100px" className="me-3" /> */}
                                            <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/test_series_y3kecu.jpg" alt="" height="65px" width="100px" className="me-3" />
                                            <div>
                                                <strong>{quiz.subject}</strong><br />
                                                <strong>{formatDate(quiz.date)}</strong>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            </>
                        ))}
                    </ul>
                }

                <Categories />


            </div>
            {/* <SubHero /> */}
        </>
    );
}
