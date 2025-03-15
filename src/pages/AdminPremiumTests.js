// import React, { useEffect, useState } from 'react';  
// import Navbar from '../components/Navbar';  
// import { Link, useParams } from 'react-router-dom';  
// import Spinner from '../components/Spinner';  
// import Footer from '../components/Footer';  
// import { Helmet } from 'react-helmet';  
// import '../styles/PremiumTests.css';  
// import EnglishVocabImg from '../assets/EnglishVocab.jpeg';  
  
// export default function AdminPremiumTests(props) {  
//     const formatDate = (timestamp) => {  
//         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
//         const date = new Date(timestamp);  
//         const day = date.getDate();  
//         const month = months[date.getMonth()];  
//         const year = date.getFullYear();  
//         return `${day} ${month} ${year}`;  
//     };  
  
//     const { batchId } = useParams();  
//     const HOST = process.env.REACT_APP_HOST_NAME;  
//     const [filtered_data, setFiltered_data] = useState(null);  
//     const [batchName, setBatchName] = useState(""); // State for batch name  
//     const [currentPage, setCurrentPage] = useState(1);  
//     const [totalPages, setTotalPages] = useState(1);  
//     const [loading, setLoading] = useState(true);  
  
//     // Fetch batch details  
//     const fetchBatchDetails = async () => {  
//         try {  
//             const response = await fetch(`${HOST}api/get-premium-batch/${batchId}`, { // Fetch batch details using provided API  
//                 method: "GET",  
//                 headers: {  
//                     "Content-Type": "application/json"  
//                 }  
//             });  
//             if (!response.ok) {  
//                 throw new Error('Failed to fetch batch details');  
//             }  
//             const data = await response.json();  
//             setBatchName(data.name); // Set batch name  
//         } catch (error) {  
//             console.error('Error fetching batch details:', error);  
//         }  
//     };  
  
//     // Fetch quiz data  
//     const fetchData = async (page = 1) => {  
//         setLoading(true); // Set loading to true when fetching data  
//         try {  
//             const response = await fetch(`${HOST}api/get-premium-quizes/${batchId}?page=${page}&limit=15`, { // Add batchId to the URL  
//                 method: "GET",  
//                 headers: {  
//                     "Content-Type": "application/json"  
//                 }  
//             });  
//             if (!response.ok) {  
//                 throw new Error('Failed to fetch quizzes');  
//             }  
//             const data = await response.json();  
//             setFiltered_data(data.quizzes);  
//             setTotalPages(data.totalPages);  
//             setCurrentPage(data.currentPage);  
//         } catch (error) {  
//             console.error('Error fetching quizzes:', error);  
//         } finally {  
//             setLoading(false); // Set loading to false after fetching is done  
//         }  
//     };  
  
//     useEffect(() => {  
//         fetchBatchDetails(); // Fetch batch details when component mounts  
//         fetchData(currentPage); // Fetch quiz data when component mounts  
//     }, [currentPage]);  
  
//     const handleNextPage = () => {  
//         setCurrentPage(currentPage + 1);  
//     };  
  
//     const handlePrevPage = () => {  
//         setCurrentPage(currentPage - 1);  
//     };  
  
//     return (  
//         <div className="quizes-page">  
//             <Helmet>  
//                 <title>{batchName} - Spardhaweb</title> {/* Use fetched batchName */}  
//                 <meta name="description" content="Access free MPSC test series on Spardha Web. Boost your preparation with comprehensive test series and daily quizzes. Start your free test series now!" />  
//                 <meta name="keywords" content="free MPSC test series, MPSC preparation, free test series, MPSC exam practice" />  
//                 <meta property="og:title" content="Free MPSC Test Series - Spardha Web" />  
//                 <meta property="og:description" content="Access free MPSC test series on Spardha Web. Boost your preparation with comprehensive test series and daily quizzes. Start your free test series now!" />  
//                 <meta property="og:image" content="%PUBLIC_URL%/logo_.jpg" />  
//                 <meta property="og:url" content="https://spardhaweb.com/premium-tests" />  
//             </Helmet>  
  
//             <Navbar />  
  
//             <h1 className="text-center mt-4">{batchName}</h1> {/* Use fetched batchName */}  
//             <div className="container"></div>  
  
//             <div className="container-fluid">  
//                 <div className="row">  
//                     <div className="col-md-12 quizzes-container">  
//                         {loading ? (  
//                             <Spinner />  
//                         ) : (  
//                             <div className="container my-3 flex-grow-1">  
//                                 <div className="row">  
//                                     {filtered_data.map((quiz) => (  
//                                         <React.Fragment key={quiz._id}>  
//                                             <div className="col-md-4">  
//                                                 <div className="my-3">  
//                                                     <Link to={`/get-premium-quiz/${batchId}/${quiz._id}`} className="card-link">  
//                                                         <div className="card" style={{ cursor: 'pointer' }}>  
//                                                             <img  
//                                                                 src={EnglishVocabImg}  
//                                                                 className="card-img-top"  
//                                                                 alt="..."  
//                                                             />  
//                                                             <div className="card-body">  
//                                                                 <h5 className="card-title">Date: {formatDate(quiz.date)}</h5>  
//                                                                 <h5 className="card-title">{quiz.subject}</h5>  
//                                                                 <p className="card-text my-2">  
//                                                                     <small className="text-muted">  
//                                                                         By team@spardhaweb on {new Date(quiz.date).toUTCString()}  
//                                                                     </small>  
//                                                                 </p>  
//                                                                 <Link  
//                                                                     className="btn btn-sm btn-dark"  
//                                                                     to={`/get-premium-quiz/${batchId}/${quiz._id}`}  
//                                                                     onClick={(e) => e.stopPropagation()}  
//                                                                     style={{ fontSize: '1.25rem', padding: '10px 20px' }}  
//                                                                 >  
//                                                                     Start Test  
//                                                                 </Link>  
//                                                             </div>  
//                                                         </div>  
//                                                     </Link>  
//                                                 </div>  
//                                             </div>  
//                                         </React.Fragment>  
//                                     ))}  
//                                 </div>  
//                             </div>  
//                         )}  
//                         <div className="d-flex justify-content-center my-4">  
//                             <button  
//                                 onClick={handlePrevPage}  
//                                 disabled={currentPage === 1}  
//                                 className="btn btn-primary me-3"  
//                             >  
//                                 Previous  
//                             </button>  
//                             <span className="align-self-center">Page {currentPage} of {totalPages}</span>  
//                             <button  
//                                 onClick={handleNextPage}  
//                                 disabled={currentPage === totalPages}  
//                                 className="btn btn-primary ms-3"  
//                             >  
//                                 Next  
//                             </button>  
//                         </div>  
//                     </div>  
//                 </div>  
//             </div>  
//             <Footer />  
//         </div>  
//     );  
// }  


import React, { useEffect, useState } from 'react';  
import Navbar from '../components/Navbar';  
import { Link, useParams } from 'react-router-dom';  
import Spinner from '../components/Spinner';  
import Footer from '../components/Footer';  
import { Helmet } from 'react-helmet';  
import '../styles/PremiumTests.css';  
import EnglishVocabImg from '../assets/EnglishVocab.jpeg';  

export default function AdminPremiumTests(props) {  
    const formatDate = (timestamp) => {  
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
        const date = new Date(timestamp);  
        const day = date.getDate();  
        const month = months[date.getMonth()];  
        const year = date.getFullYear();  
        return `${day} ${month} ${year}`;  
    };  

    const { batchId } = useParams();  
    const HOST = process.env.REACT_APP_HOST_NAME;  
    const [filtered_data, setFiltered_data] = useState([]);  
    const [batchName, setBatchName] = useState("");  
    const [currentPage, setCurrentPage] = useState(1);  
    const [totalPages, setTotalPages] = useState(1);  
    const [loading, setLoading] = useState(true);  

    const fetchBatchDetails = async () => {  
        try {  
            const response = await fetch(`${HOST}api/get-premium-batch/${batchId}`);  
            if (!response.ok) throw new Error('Failed to fetch batch details');  
            const data = await response.json();  
            setBatchName(data.name);  
        } catch (error) {  
            console.error('Error fetching batch details:', error);  
        }  
    };  

    const fetchData = async (page = 1) => {  
        setLoading(true);  
        try {  
            const response = await fetch(`${HOST}api/get-premium-quizes/${batchId}?page=${page}&limit=15`);  
            if (!response.ok) throw new Error('Failed to fetch quizzes');  
            const data = await response.json();  
            setFiltered_data(data.quizzes);  
            setTotalPages(data.totalPages);  
            setCurrentPage(data.currentPage);  
        } catch (error) {  
            console.error('Error fetching quizzes:', error);  
        } finally {  
            setLoading(false);  
        }  
    };  

    useEffect(() => {  
        fetchBatchDetails();  
        fetchData(currentPage);  
    }, [currentPage]);  

    const handleDeleteQuiz = async (quizId) => {  
        if (!window.confirm("Are you sure you want to delete this quiz?")) return;  
        try {  
            const response = await fetch(`${HOST}api/delete-premium-quiz/${quizId}`, {  
                method: "DELETE",  
                headers: { "Content-Type": "application/json" }  
            });  
            if (!response.ok) throw new Error('Failed to delete quiz');  
            setFiltered_data(filtered_data.filter(quiz => quiz._id !== quizId));  
            alert("Quiz deleted successfully");  
        } catch (error) {  
            console.error('Error deleting quiz:', error);  
            alert("Failed to delete quiz");  
        }  
    };  

    return (  
        <div className="quizes-page">  
            <Helmet>  
                <title>{batchName} - Spardhaweb</title>  
            </Helmet>  
            <Navbar />  
            <h1 className="text-center mt-4">{batchName}</h1>  
            <div className="container-fluid">  
                <div className="row">  
                    <div className="col-md-12 quizzes-container">  
                        {loading ? <Spinner /> : (  
                            <div className="container my-3 flex-grow-1">  
                                <div className="row">  
                                    {filtered_data.map((quiz) => (  
                                        <div key={quiz._id} className="col-md-4">  
                                            <div className="my-3">  
                                                <div className="card" style={{ cursor: 'pointer' }}>  
                                                    <img src={EnglishVocabImg} className="card-img-top" alt="..." />  
                                                    <div className="card-body">  
                                                        <h5 className="card-title">Date: {formatDate(quiz.date)}</h5>  
                                                        <h5 className="card-title">{quiz.subject}</h5>  
                                                        <p className="card-text my-2">  
                                                            <small className="text-muted">  
                                                                By team@spardhaweb on {new Date(quiz.date).toUTCString()}  
                                                            </small>  
                                                        </p>  
                                                        <div className="d-flex justify-content-between">  
                                                            <Link className="btn btn-sm btn-dark" to={`/get-premium-quiz/${batchId}/${quiz._id}`}>  
                                                                Start Test  
                                                            </Link>  
                                                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteQuiz(quiz._id)}>  
                                                                Delete  
                                                            </button>  
                                                        </div>  
                                                    </div>  
                                                </div>  
                                            </div>  
                                        </div>  
                                    ))}  
                                </div>  
                            </div>  
                        )}  
                        <div className="d-flex justify-content-center my-4">  
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="btn btn-primary me-3">Previous</button>  
                            <span className="align-self-center">Page {currentPage} of {totalPages}</span>  
                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-primary ms-3">Next</button>  
                        </div>  
                    </div>  
                </div>  
            </div>  
            <Footer />  
        </div>  
    );  
}
