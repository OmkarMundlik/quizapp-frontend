import React, { useEffect, useState } from 'react';
import '../styles/articlecard.css';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import InfeedAd from '../components/InfeedAd'; // Import the InfeedAd component
import DisplayAd from '../components/DisplayAd';
import { Helmet } from 'react-helmet';

function LatestUpdates() {
  const compareDates = (a, b) => {
    return new Date(b.date) - new Date(a.date);
  };
  
  const HOST = process.env.REACT_APP_HOST_NAME;
  const [allupdates, setAllUpdates] = useState(null);

  // Function to call API and fetch details
  const fetchData = async () => {
    try {
      const response = await fetch(HOST + 'api/get-all-updates', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch quizzes');
      }
      const data = await response.json();
      const sortedUpdates = data.sort(compareDates);
      setAllUpdates(sortedUpdates);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div>
      <Helmet>
        <title>Latest Updates About MPSC Exam - Spardhaweb</title>
        <meta name="description" content="Get the latest updates and news about the MPSC exam on Spardha Web. Stay informed with the most recent developments, changes, and announcements related to MPSC exams." />
        <meta name="keywords" content="latest MPSC updates, MPSC exam news, MPSC exam changes, MPSC announcements" />
        <meta property="og:title" content="Latest Updates About MPSC Exam - Spardha Web" />
        <meta property="og:description" content="Get the latest updates and news about the MPSC exam on Spardha Web. Stay informed with the most recent developments, changes, and announcements related to MPSC exams." />
        <meta property="og:image" content="%PUBLIC_URL%/logo_.jpg" />
        <meta property="og:url" content="https://spardhaweb.com/latest-updates" />
      </Helmet>

        <Navbar />
        <br />
        <br />
        <h1 className="text-center">Latest Updates</h1>
        <DisplayAd />
        {!allupdates ? <Spinner /> :
          <div className="container my-3">
            <div className="row">
              {allupdates.map((update, index) => (
                <React.Fragment key={update._id}>
                  <div className="col-md-4">
                    <div className="my-3">
                      <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                        </div>
                        <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720804964/latest_updates_aq4tlu.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                          <Link to={`/latest-update/${update._id}`} style={{ textDecoration: "none", color: "#000" }}>
                            <h5 className="card-title">{update.headline}</h5>
                          </Link>
                          <p className="card-text">
                            {update.mainText.length <= 50 ? update.mainText : update.mainText.substring(0, 50) + "..."}
                          </p>
                          <Link to={`/latest-update/${update._id}`} className="btn btn-sm btn-dark">Go To Link</Link>
                          <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(update.date).toUTCString()}</small></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Insert the InfeedAd component after every 3 updates */}
                  {(index)%5 == 0  && (
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
      <Categories />
      <div className="flex-grow-1">
        <Footer />
      </div>
    </div>
  );
}

export default LatestUpdates;
