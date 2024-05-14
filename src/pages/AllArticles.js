import React, { useEffect, useState } from 'react';
import '../styles/articlecard.css';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import Alert from '../components/Alert';

function AllArticles() {
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

  const [articles, setArticles] = useState(null);

  // TODO : Write function to call api and fetch details
  const fetchData = async () => {
    try {
      const response = await fetch('https://quiz-app-backend-delta.vercel.app/api/articles', {
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
            {articles.map(article => (
              <div className="col-md-4" key={article._id}>
                <div className="my-3">
                  <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}
                    >
                      <span className=" badge rounded-pill bg-danger p-2 px-3">
                        IMP
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </div>
                    <img src={!article.imageUrl ? "https://t4.ftcdn.net/jpg/05/81/84/71/360_F_581847176_eF540XqFGHDdGPZxyh5NtWHNzgs0XFk6.jpg" : article.imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <Link to={`/article/${article._id}`} style={{ textDecoration: "none", color: "#000" }}><h5 className="card-title">{article.heading}</h5></Link>
                      <p className="card-text">{article.text}</p>
                      <Link rel="noreferrer" to={`/article/${article._id}`} className="btn btn-sm btn-dark">Read More</Link>
                      <p className="card-text my-2"><small className="text-muted">By {"anonymous"} on {new Date(article.date).toUTCString()}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default AllArticles;
