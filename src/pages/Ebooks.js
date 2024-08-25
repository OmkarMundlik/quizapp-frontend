import React, { useEffect, useState } from 'react';
import '../styles/articlecard.css';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import { Helmet } from 'react-helmet';


function Ebooks() {

  const compareDates = (a, b) => {
    return new Date(b.date) - new Date(a.date);
  };
  const HOST = process.env.REACT_APP_HOST_NAME;
  const [materials, setmaterials] = useState(null);

  // TODO : Write function to call api and fetch details
  const fetchData = async () => {
    try {
      const response = await fetch(HOST + 'api/getallmaterial', {
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
      const sortedMaterial = data.sort(compareDates);
      setmaterials(sortedMaterial);
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
        <title>MPSC Study Material - Spardhaweb</title>
        <meta name="description" content="Find comprehensive MPSC study material on Spardha Web. Access well-organized resources, practice tests, and guides to aid your MPSC exam preparation." />
        <meta name="keywords" content="MPSC study material, MPSC preparation resources, MPSC guides, exam practice material" />
        <meta property="og:title" content="MPSC Study Material - Spardha Web" />
        <meta property="og:description" content="Find comprehensive MPSC study material on Spardha Web. Access well-organized resources, practice tests, and guides to aid your MPSC exam preparation." />
        <meta property="og:image" content="%PUBLIC_URL%/logo_.jpg" />
        <meta property="og:url" content="https://spardhaweb.com/ebooks" />
      </Helmet>
        <Navbar />
        <br />
        <br />
        <h1 className="text-center">E-books and Study Material</h1>

        {!materials ? <Spinner /> :
          <div className="container my-3 flex-grow-1">
            <div className="row">
              {materials.map(material => (
                <div className="col-md-4" key={material._id}>
                  <div className="my-3">
                    <div className="card">
                      <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                        {/* <span className="badge rounded-pill bg-danger p-2 px-3">
                          IMP
                          <span className="visually-hidden">unread messages</span>
                        </span> */}
                      </div>
                      {/* <img src={!material.imageUrl ? "https://t4.ftcdn.net/jpg/05/81/84/71/360_F_581847176_eF540XqFGHDdGPZxyh5NtWHNzgs0XFk6.jpg" : material.imageUrl} className="card-img-top" alt="..." /> */}
                      <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/studymaterial_jervxl.jpg" className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{material.headline}</h5>
                        {/* <p className="card-text">{article.text}</p> */}
                        <a href={material.contentViewUrl}  className="btn btn-sm btn-dark" target="_blank">View PDF</a>
                        &#160;&#160;&#160;&#160;
                        <a href={material.contentUrl} className="btn btn-sm btn-dark">Download Now</a>
                        <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(material.date).toUTCString()}</small></p>
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

export default Ebooks;
