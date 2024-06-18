import React, { useContext, useEffect, useState } from 'react';
import Question from '../components/Question';
import '../styles/Quiz.css'
import ResultContext from '../context/ResultContext';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import '../styles/ArticleMain.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



export default function LatestUpdate(props) {
  const formatDate = (timestamp) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const HOST = process.env.REACT_APP_HOST_NAME;
  const { updateId } = useParams();
  const [id, setId] = useState(updateId);
  const [updateData, setUpdateData] = useState(null)

  const fetchData = async () => {
    try {
      const response = await fetch(HOST + `api/update-by-id/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch quizzes');
      }
      const data = await response.json();
      setUpdateData(data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  useEffect(() => {
    setId(updateId);
    fetchData();
  }, [])


  const navigate = useNavigate();
  // const text_lines = updateData.mainText.split('<br>');
  return (
    <>
      <Navbar />
      {!updateData ? <Spinner /> : <>
        <div className="article-main-container">
          <div className="image-with-text-container">
            <img src={updateData.imageUrl} alt="Image" className="image" />
            <p className='articleDate'>{formatDate(updateData.date)}</p>
            <h1 className="heading">{updateData.headline}</h1>
            <p className="text">
              {updateData.mainText.split('<br>').map((line, index) => (
                // Render each line with a <br> tag
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  {updateData.linksArray.map((link, index) => (
                    <tr key={index}>
                      <td>{link.linkHeadline}</td>
                      <td><a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className="container">
          <img src={updateData.imageUrl} alt="Headline" className="img-fluid" />
          <h2>{updateData.headline}</h2>
          <p>{updateData.mainText}</p>
          <div className="table-responsive">
            <table className="table table-bordered">
              <tbody>
                {updateData.linksArray.map((link, index) => (
                  <tr key={index}>
                    <td>{link.linkHeadline}</td>
                    <td><a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}

      </>}
      <Footer />
    </>
  );
}

