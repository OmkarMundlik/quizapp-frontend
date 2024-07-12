import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="quizes-page">
      <Navbar />
      <h1 className="text-center mt-4 mb-5">Test Series 2024</h1>

      {!quizes ? <Spinner /> :
        <div className="container my-3 flex-grow-1">
          <div className="row">
            {quizes.map(quiz => (
              <div className="col-md-4" key={quiz._id}>
                <div className="my-3">
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                    </div>
                    {/* <img src={!quiz.imageUrl ? "https://res.cloudinary.com/dpktfyhbi/image/upload/v1718558408/testkg_ttyz5t.jpg" : quiz.imageUrl} className="card-img-top" alt="..." /> */}
                    <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/test_series_y3kecu.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Date: {formatDate(quiz.date)}</h5>
                      <h5 className="card-title">Subject: {quiz.subject}</h5>
                      <Link className="btn btn-sm btn-dark" to={`/start/${quiz._id}`}>Start Test</Link>
                      <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(quiz.date).toUTCString()}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      }

      <Footer />
    </div>
  );
}
