import React, { useEffect, useState } from 'react';
import '../styles/articlecard.css';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';


function LatestUpdates() {

  const compareDates = (a, b) => {
    return new Date(b.date) - new Date(a.date);
  };
  const HOST = process.env.REACT_APP_HOST_NAME;
  const [allupdates, setAllUpdates] = useState(null);

  // TODO : Write function to call api and fetch details
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
        <Navbar />
        <br />
        <br />
        <h1 className="text-center">Latest Updates</h1>

        {!allupdates ? <Spinner /> :
          <div className="container my-3">
            <div className="row">
              {allupdates.map(update => (
                <div className="col-md-4" key={update._id}>
                  <div className="my-3">
                    <div className="card">
                      <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}
                      >
                        {/* <span className=" badge rounded-pill bg-danger p-2 px-3">
                        IMP
                        <span className="visually-hidden">unread messages</span>
                      </span> */}
                      </div>
                      {/* <img src={!update.imageUrl ? "https://t4.ftcdn.net/jpg/05/81/84/71/360_F_581847176_eF540XqFGHDdGPZxyh5NtWHNzgs0XFk6.jpg" : update.imageUrl} className="card-img-top" alt="..." /> */}
                      <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720804964/latest_updates_aq4tlu.jpg" className="card-img-top" alt="..." />
                      <div className="card-body">
                        <Link to={`/latest-update/${update._id}`} style={{ textDecoration: "none", color: "#000" }}><h5 className="card-title">{update.headline}</h5></Link>
                        <p className="card-text">
                          {update.mainText.length <= 50 ? update.mainText : update.mainText.substring(0, 50) + "..."}
                        </p>
                        <Link to={`/latest-update/${update._id}`} className="btn btn-sm btn-dark">Go To Link</Link>
                        <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(update.date).toUTCString()}</small></p>
                      </div>
                    </div>

                  </div>
                </div>
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
