import React, { useEffect, useState } from 'react';  
import Navbar from '../components/Navbar';  
import Footer from '../components/Footer';  
import { Link } from 'react-router-dom';  
import Spinner from '../components/Spinner';  
import '../styles/PremiumPage.css';  
import EnglishVocabImg from '../assets/EnglishVocab.jpeg';  
import ResultContext from '../context/ResultContext';  
import { useContext } from 'react';  
  
export default function AdminPremiumBatches() {  
    const { setAlertContext } = useContext(ResultContext);  
    const showAlert = (message, status) => {  
        setAlertContext({  
            isActive: true,  
            message: message,  
            status: status  
        });  
        setTimeout(() => {  
            setAlertContext(prevState => ({ ...prevState, isActive: false }));  
        }, 2000);  
    };  
  
    const deleteBatch = async (id) => {  
        const url = `${HOST}api/delete-premium-batch/${id}`;  
        try {  
            const response = await fetch(url, {  
                method: "DELETE",  
                headers: {  
                    "Content-Type": "application/json",  
                    "admin-token": localStorage.getItem("admin-token")  
                }  
            });  
  
            const { success } = await response.json();  
            if (success) {  
                let newBatches = batches.filter((batch) => batch._id !== id);  
                setBatches(newBatches);  
                showAlert('Batch Deleted Successfully!!!', 'success');  
            } else {  
                throw new Error('Failed to delete batch');  
            }  
        } catch (error) {  
            showAlert('Error in deleting Batch!!!', 'danger');  
            console.log(error);  
        }  
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
    const [batches, setBatches] = useState([{ "_id": 1, "name": "English Vocabulary Test Series", "imageUrl": EnglishVocabImg, "descr": "Batch starting from 1 Mar 2025." }]);  
    const [loading, setLoading] = useState(false);  
  
    const fetchData = async () => {  
        setLoading(true);  // Set loading to true when fetching data  
        try {  
            const response = await fetch(`${HOST}api/fetch-premium-batches`, {  
                method: "GET",  
                headers: {  
                    "Content-Type": "application/json"  
                }  
            });  
            if (!response.ok) {  
                throw new Error('Failed to fetch batches');  
            }  
            const data = await response.json();  
            setBatches(data);  
        } catch (error) {  
            console.error('Error fetching batches:', error);  
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
                                                        <img src={details.imageUrl ? details.imageUrl : EnglishVocabImg} className="card-img-top" alt="..." style={{ height: "250px" }} />  
                                                        <div className="card-body">  
                                                            <h5 className="card-title">{details.name}</h5>  
                                                            <h5 className="card-text">Subject: {details.subject}</h5>  
                                                            <h5 className="card-text">{details.description}</h5>  
                                                            <Link className="btn btn-sm btn-dark" to={`/premium-tests`} style={{ fontSize: '1.25rem', padding: '10px 20px' }}>GO TO BATCH</Link>  
                                                            <Link className="btn btn-sm btn-warning" to={`/update-batch/${details._id}`} style={{ fontSize: '1.25rem', padding: '10px 20px', marginLeft: '10px' }}>Update Batch</Link>  
                                                            <button className="btn btn-sm btn-danger" onClick={() => { deleteBatch(details._id) }} style={{ fontSize: '1.25rem', padding: '10px 20px', marginLeft: '10px' }}>Delete Batch</button>  
                                                        </div>  
                                                    </div>  
                                                </div>  
                                            </div>  
                                        </React.Fragment>  
                                    ))}  
                                </div>  
                            </div>  
                        )}  
                    </div>  
                </div>  
            </div>  
            <Footer />  
        </>  
    );  
}  