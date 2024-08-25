import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import InfeedAd from '../components/InfeedAd'; // Import the InfeedAd component
import DisplayAd from '../components/DisplayAd';
import { Helmet } from 'react-helmet';

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

  const filterBySubjects = (selectedCategories) => {
    if (quizes) {
      if (selectedCategories.includes('All')) {
        setFiltered_data(quizes);
        return;
      }

      const lowercasedCategories = selectedCategories.map(category => category.toLowerCase());

      const filtered = quizes.filter(quiz =>
        lowercasedCategories.some(category => quiz.subject.toLowerCase().includes(category))
      );

      setFiltered_data(filtered);
    }
  };

  const HOST = process.env.REACT_APP_HOST_NAME;

  const [quizes, setQuizes] = useState(null);
  const [filtered_data, setFiltered_data] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(['All']);

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
      setFiltered_data(sortedQuizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categories = [['All'], ['भूगोल', 'GEOGRAPHY'], ['चालू घडामोडी'], ['इतिहास', 'History'], ['गणित', 'Math'], ['मराठी व्याकरण'], ['विज्ञान', 'Science', 'GS'], ['राज्यशास्त्र', 'POLITY']];

  const handleCategoryClick = (categoryList) => {
    setSelectedCategories(categoryList);
    filterBySubjects(categoryList);
  };

  return (
    <div className="quizes-page">
      <Helmet>
        <title>Free MPSC Test Series - Spardhaweb</title>
        <meta name="description" content="Access free MPSC test series on Spardha Web. Boost your preparation with comprehensive test series and daily quizzes. Start your free test series now!" />
        <meta name="keywords" content="free MPSC test series, MPSC preparation, free test series, MPSC exam practice" />
        <meta property="og:title" content="Free MPSC Test Series - Spardha Web" />
        <meta property="og:description" content="Access free MPSC test series on Spardha Web. Boost your preparation with comprehensive test series and daily quizzes. Start your free test series now!" />
        <meta property="og:image" content="%PUBLIC_URL%/logo_.jpg" />
        <meta property="og:url" content="https://spardhaweb.com/allquizes" />
      </Helmet>

      <Navbar />

      <h1 className="text-center mt-4">MPSC Test Series 2024</h1>

      <div className="container">
        <div className="row justify-content-center">
          {categories.map((categoryList, index) => (
            <div
              key={index}
              className={`col-auto mx-2 p-3 ${categoryList.every(category => selectedCategories.includes(category)) ? 'bg-primary text-white' : 'bg-light'} category`}
              onClick={() => handleCategoryClick(categoryList)}
              style={{ cursor: 'pointer', fontSize: '1.2rem', borderRadius: '8px', fontWeight: 'bold' }}
            >
              {categoryList[0]}
            </div>
          ))}
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 quizzes-container">
            <DisplayAd />
            {!filtered_data ? <Spinner /> :
              <div className="container my-3 flex-grow-1">
                <div className="row">
                  {filtered_data.map((quiz, index) => (
                    <React.Fragment key={quiz._id}>
                      <div className="col-md-4">
                        <div className="my-3">
                          <div className="card">
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

                      {/* Insert the InfeedAd component after every 3 quizzes */}
                      {index != 0 && (index) % 5 == 0 && (
                        <div className="col-md-4">
                          <InfeedAd />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
