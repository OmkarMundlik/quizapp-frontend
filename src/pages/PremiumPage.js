import React, { useEffect, useState } from 'react';  
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer';  
import { Link } from 'react-router-dom';  
import Spinner from '../components/Spinner';  
import '../styles/PremiumPage.css';  
import EnglishVocabImg from '../assets/EnglishVocab.jpeg'

export default function PremiumPage() {  
    const [batches, setBatches] = useState([{ "_id": 1, "name": "English Vocabulary Test Series", "imageUrl": EnglishVocabImg, "descr": "Batch starting from 1 Mar 2025."}]);  
    // const [currentPage, setCurrentPage] = useState(1);  
    // const [totalPages, setTotalPages] = useState(1);  
    const [loading, setLoading] = useState(false);  
    const HOST = process.env.REACT_APP_HOST_NAME;

    const fetchData = async () => {
        setLoading(true); 
        try {
            const response = await fetch(`${HOST}api/fetch-premium-batches`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch quizzes');
            }
            const data = await response.json();

            setBatches(data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        } finally {
            setLoading(false);  // Set loading to false after fetching is done
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (  
        <>  
            <Navbar />  
            <div className="container-fluid premium-page">  
                <div className="row">  
                    <div className="col-md-12 text-center">  
                        <br />
                        <h1 className="premium-heading">Welcome to Spardhaweb Premium Courses</h1>  
                        {/* <p className="premium-description">  
                            Unlock exclusive quizzes and batches that are designed to help you excel. Our premium content is curated by experts to ensure you get the best learning experience.  
                        </p>   */}
                    </div>  
                </div>  
                <div className="row">  
                    <div className="col-md-12 quizzes-container">  
                        {loading ? (  
                            <Spinner />  // Show spinner if loading is true  
                        ) : (  
                            <div className="container my-3 flex-grow-1">  
                                <div className="row">  
                                    {batches.map((details) => (  
                                        <React.Fragment key={details._id}>  
                                            <div className="col-md-4">  
                                                <div className="my-3">  
                                                    <div className="card">  
                                                        <img src={details.imageUrl? details.imageUrl : EnglishVocabImg} className="card-img-top" alt="..." style={{height:"250px"}}/>  
                                                        <div className="card-body">  
                                                            <h5 className="card-title">{details.name}</h5>  
                                                            <h5 className="card-text">Subject: {details.subject}</h5>  
                                                            <h5 className="card-text">{details.description}</h5>  

                                                            <Link className="btn btn-sm btn-dark" to={`/premium-tests`} style={{ fontSize: '1.25rem', padding: '10px 20px' }}>GO TO BATCH</Link>  
                                                            {/* <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(details.date).toUTCString()}</small></p> */}  
                                                        </div>  
                                                    </div>  
                                                </div>  
                                            </div>  
                                        </React.Fragment>  
                                    ))}  
                                </div>  
                            </div>  
                        )}  
                        {/* Pagination buttons can be added here if needed */}  
                        {/* <div className="d-flex justify-content-center my-4">  
                            <button  
                                onClick={handlePrevPage}  
                                disabled={currentPage === 1}  
                                className="btn btn-primary me-3"  
                            >  
                                Previous  
                            </button>  
                            <span className="align-self-center">Page {currentPage} of {totalPages}</span>  
                            <button  
                                onClick={handleNextPage}  
                                disabled={currentPage === totalPages}  
                                className="btn btn-primary ms-3"  
                            >  
                                Next  
                            </button>  
                        </div> */}  
                    </div>  
                </div>  
            </div>  
            <Footer />  
        </>  
    );  
}  