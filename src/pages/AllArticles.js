import React, { useEffect, useState } from 'react';
import '../styles/articlecard.css';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Categories from '../components/Categories';
import InfeedAd from '../components/InfeedAd';
// import Footer from '../components/Footer';
// import Alert from '../components/Alert';

function AllArticles() {
  // const formatDate = (timestamp) => {
  //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  //   const date = new Date(timestamp);
  //   const day = date.getDate();
  //   const month = months[date.getMonth()];
  //   const year = date.getFullYear();
  //   return `${day} ${month} ${year}`;
  // };

  const compareDates = (a, b) => {
    return new Date(b.date) - new Date(a.date);
  };
  const HOST = process.env.REACT_APP_HOST_NAME;
  const [articles, setArticles] = useState(null);

  // TODO : Write function to call api and fetch details
  const fetchData = async () => {
    try {
      const response = await fetch(HOST + 'api/articles', {
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
      const sortedArticles = data.sort(compareDates);
      setArticles(sortedArticles);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!articles ? <Spinner /> :
        <div className="container my-3">
          <div className="row">
            {articles.map((article, index) => (
              <React.Fragment key={article._id}>
                <div className="col-md-4">
                  <div className="my-3">
                    <div className="card">
                      <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720804925/dailycurrafair_uga0y3.jpg" className="card-img-top" alt="..." />
                      <div className="card-body">
                        <Link to={`/article/${article._id}`} style={{ textDecoration: "none", color: "#000" }}>
                          <h5 className="card-title">{article.heading}</h5>
                        </Link>
                        <p className="card-text">{article.text}</p>
                        <Link rel="noreferrer" to={`/article/${article._id}`} className="btn btn-sm btn-dark">Read More</Link>
                        <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(article.date).toUTCString()}</small></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add InfeedAd after every 3 articles */}
                {index !=0 && (index)%3==0 && (
                  <div className="col-4">
                    <InfeedAd />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default AllArticles;
