import React, { useEffect, useState } from 'react';
import ArticleComp from '../components/ArticleComp';
import '../styles/ArticleMain.css';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';

const ArticleMain = () => {

  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const formatDate = (timestamp) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const HOST = process.env.REACT_APP_HOST_NAME;
  const fetchData = async () => {
    try {
      const response = await fetch(HOST + `api/article/${articleId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch quizzes');
      }
      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <Navbar />
      {!article ? <Spinner /> :
        <div className="article-main-container">
          <div className="image-with-text-container">
            <img src={article.imageUrl} alt="Image" className="image" />
            <p className='articleDate'>{formatDate(article.date)}</p>
            <h1 className="heading">{article.heading}</h1>
            <p className="text">{article.text}</p>
            {article.subparts && article.subparts.map((subpart, index) => (
              <ArticleComp key={index} subheading={subpart.subheading} text={subpart.text} />
            ))}
          </div>
        </div>
      }
      <Footer />
    </>);

};

export default ArticleMain;
