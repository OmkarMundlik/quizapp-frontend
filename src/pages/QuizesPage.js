import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function QuizesPage(props) {
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

  const [quizes, setQuizes] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch('https://quiz-app-backend-delta.vercel.app/api/getallquizes', {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="quizes-page">
      <Navbar />
      <h1 className="text-center mt-4 mb-5">Test Series 2024</h1>

      <div className="container">
        <div className="row justify-content-center">
          {quizes.length !== 0 && quizes.map((quiz, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Date: {formatDate(quiz.date)}</h5>
                  <p className="card-text">Subject: {quiz.subject}</p>
                  <Link to={`/start/${quiz._id}`} className="btn btn-primary">Start Quiz</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
