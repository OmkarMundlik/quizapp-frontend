import React, { useContext, useEffect, useState } from 'react';
import Question from '../components/Question';
import '../styles/Quiz.css'
import ResultContext from '../context/ResultContext';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import '../styles/ArticleMain.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import DisplayAd from '../components/DisplayAd';
import YoutubeEmbed from '../components/YoutubeEmbed';



export default function LatestUpdate(props) {
  const getYouTubeEmbedId = (url) => {
    // Updated regex to match youtube.com or youtu.be URLs, including query parameters
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/[^\n\s]*\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    
    // Match the URL with the regular expression
    const match = url.match(youtubeRegex);
  
    if (match && match[1]) {
      return match[1]; // Return the 11-character video ID
    }
    return null; // Return null if no valid ID is found
  };

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
            {/* <img src={updateData.imageUrl} alt="Image" className="image" />
             */}
            {updateData.youtubeVid ? <YoutubeEmbed embedId={getYouTubeEmbedId(updateData.youtubeVid)} autoplay={true} mute={false} /> : <YoutubeEmbed embedId={getYouTubeEmbedId("https://youtu.be/LIosS8bppQI?feature=shared")} autoplay={true} mute={true}/>}
            <p className='articleDate'>{formatDate(updateData.date)}</p>
            <h1 className="heading">{updateData.headline}</h1>
            <p className="text">
              <p className="text">
                {updateData.mainText.split(/<br\s*\/?>/i).map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </p>
            <DisplayAd />
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
      <Categories />
      <DisplayAd />
      <Footer />
    </>
  );
}

