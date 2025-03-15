// import React, { useContext, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import ResultContext from '../context/ResultContext';
// import Navbar from '../components/Navbar';

// function AdminAllquizes() {
//     const formatDate = (timestamp) => {
//         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//         const date = new Date(timestamp);
//         const day = date.getDate();
//         const month = months[date.getMonth()];
//         const year = date.getFullYear();
//         return `${day} ${month} ${year}`;
//     };
//     const HOST = process.env.REACT_APP_HOST_NAME;
//     const compareDates = (a, b) => {
//         return new Date(b.date) - new Date(a.date);
//     };

// const { setAlertContext } = useContext(ResultContext);
// const showAlert = (message, status) => {
//     setAlertContext({
//         isActive: true,
//         message: message,
//         status: status
//     })
//     setTimeout(() => {
//         setAlertContext(prevState => ({ ...prevState, isActive: false }));
//     }, 2000);
// }


//     const [quizes, setQuizes] = useState([]);
//     // const [quiz, setQuiz] = useState(null);
//     const fetchData = async () => {
//         try {
//             const response = await fetch(HOST + 'api/getallquizes', {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to fetch quizzes');
//             }
//             const data = await response.json();

//             // Sort the quizzes based on date in descending order
//             const sortedQuizzes = data.sort(compareDates);
//             setQuizes(sortedQuizzes);
//         } catch (error) {
//             console.error('Error fetching quizzes:', error);
//             showAlert('Unable to fetch quizes!', 'danger');
//         }
//     };

// const deleteQuiz = async (id) => {
//     const url = HOST + 'api/auth/deletequiz/' + id;
//     try {
//         const response = await fetch(url, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 "admin-token": localStorage.getItem("admin-token")
//             }
//         });

//         const { success } = await response.json();
//         // // console.log(success)
//         let newQuizes = quizes.filter((quiz) => quiz._id !== id);
//         setQuizes(newQuizes)
//         showAlert('Quiz Deleted Successfully!!!', 'success');
//     } catch (error) {
//         showAlert('Error in deleting Quiz!!!', 'danger');
//         // console.log(error);
//     }
// }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <div className="quizes-page">
//             <Navbar />
// <h1 className="text-center mt-4 mb-5">Test Series 2025</h1>
// <div className="container">
//     <div className="row justify-content-center">
//         {quizes.length !== 0 && quizes.map((quiz, index) => (
//             <div key={index} className="col-md-4 mb-4">
//                 <div className="card h-100">
//                     <div className="card-body my-2">
//                         <h5 className="card-title">Date: {formatDate(quiz.date)}</h5>
//                         <p className="card-text">Subject: {quiz.subject}</p>
//                         <button className="btn btn-primary my-3" onClick={()=>{deleteQuiz(quiz._id)}}>Delete Quiz</button>
//                         <Link to={`/start/${quiz._id}`} className="btn btn-primary my-3">Start Quiz</Link>
//                     </div>
//                 </div>
//             </div>
//         ))}
//     </div>
// </div>
//         </div>
//     );

// }

// export default AdminAllquizes


import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import InfeedAd from '../components/InfeedAd';
import DisplayAd from '../components/DisplayAd';
import { Helmet } from 'react-helmet';
import ResultContext from '../context/ResultContext';



export default function AdminAllquizes(props) {
    const { setAlertContext } = useContext(ResultContext);
    const showAlert = (message, status) => {
        setAlertContext({
            isActive: true,
            message: message,
            status: status
        })
        setTimeout(() => {
            setAlertContext(prevState => ({ ...prevState, isActive: false }));
        }, 2000);
    }
    const deleteQuiz = async (id) => {
        const url = HOST + 'api/auth/deletequiz/' + id;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "admin-token": localStorage.getItem("admin-token")
                }
            });

            const { success } = await response.json();
            // // console.log(success)
            let newQuizes = quizes.filter((quiz) => quiz._id !== id);
            setQuizes(newQuizes)
            showAlert('Quiz Deleted Successfully!!!', 'success');
        } catch (error) {
            showAlert('Error in deleting Quiz!!!', 'danger');
            // console.log(error);
        }
    }

    const formatDate = (timestamp) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleCategoryClick = (categoryList) => {
        setSelectedCategories(categoryList);
        filterBySubjects(categoryList);
    };

    const filterBySubjects = (selectedCategories) => {
        if (quizes) {
            if (selectedCategories.includes('All')) {
                setFiltered_data(quizes);
                return;
            }

            const lowercasedCategories = selectedCategories.map(category => category.toLowerCase());

            const filtered = quizes.filter(quiz =>
                lowercasedCategories.some(category => quiz.subject.toLowerCase().includes(category))
            );

            setFiltered_data(filtered);
        }
    };

    const HOST = process.env.REACT_APP_HOST_NAME;
    const [quizes, setQuizes] = useState(null);
    const [filtered_data, setFiltered_data] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState(['All']);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchData = async (page = 1) => {
        setLoading(true);  // Set loading to true when fetching data
        try {
            const response = await fetch(`${HOST}api/getallquizes?page=${page}&limit=15`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch quizzes');
            }
            const data = await response.json();

            setQuizes(data.quizzes);
            setFiltered_data(data.quizzes);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        } finally {
            setLoading(false);  // Set loading to false after fetching is done
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const categories = [['All'], ['भूगोल', 'GEOGRAPHY'], ['चालू घडामोडी'], ['इतिहास', 'History'], ['गणित', 'Math'], ['मराठी व्याकरण'], ['विज्ञान', 'Science', 'GS'], ['राज्यशास्त्र', 'POLITY']];

    const handleNextPage = () => {
        setSelectedCategories(['All']);  // Reset the selected categories to 'All' on next page
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="quizes-page">
            <Helmet>
                <title>Free MPSC Test Series - Spardhaweb</title>
                <meta name="description" content="Access free MPSC test series on Spardha Web. Boost your preparation with comprehensive test series and daily quizzes. Start your free test series now!" />
                <meta name="keywords" content="free MPSC test series, MPSC preparation, free test series, MPSC exam practice" />
                <meta property="og:title" content="Free MPSC Test Series - Spardha Web" />
                <meta property="og:description" content="Access free MPSC test series on Spardha Web. Boost your preparation with comprehensive test series and daily quizzes. Start your free test series now!" />
                <meta property="og:image" content="%PUBLIC_URL%/logo_.jpg" />
                <meta property="og:url" content="https://spardhaweb.com/allquizes" />
            </Helmet>

            <Navbar />

            <h1 className="text-center mt-4">MPSC Test Series 2025</h1>

            <div className="container">
                <div className="row justify-content-center">
                    {categories.map((categoryList, index) => (
                        <div
                            key={index}
                            className={`col-auto mx-2 p-3 ${categoryList.every(category => selectedCategories.includes(category)) ? 'bg-primary text-white' : 'bg-light'} category`}
                            onClick={() => handleCategoryClick(categoryList)}
                            style={{ cursor: 'pointer', fontSize: '1.2rem', borderRadius: '8px', fontWeight: 'bold' }}
                        >
                            {categoryList[0]}
                        </div>
                    ))}
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 quizzes-container">
                        <DisplayAd />
                        {loading ? (
                            <Spinner />  // Show spinner if loading is true
                        ) : (
                            <div className="container my-3 flex-grow-1">
                                <div className="row">
                                    {filtered_data.map((quiz, index) => (
                                        <React.Fragment key={quiz._id}>
                                            <div className="col-md-4">
                                                <div className="my-3">
                                                    <div className="card">
                                                        <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/test_series_y3kecu.jpg" className="card-img-top" alt="..." />
                                                        <div className="card-body">
                                                            <h5 className="card-title">Date: {formatDate(quiz.date)}</h5>
                                                            <h5 className="card-title">Subject: {quiz.subject}</h5>
                                                            <Link className="btn btn-sm btn-dark" to={`/start/${quiz._id}`} style={{ fontSize: '1.25rem', padding: '10px 20px' }} >Start Test</Link>
                                                            <button className="btn btn-primary my-3" onClick={() => { deleteQuiz(quiz._id) }}>Delete Quiz</button>

                                                            <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(quiz.date).toUTCString()}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Insert the InfeedAd component after every 3 quizzes */}
                                            {index !== 0 && index % 5 === 0 && (
                                                <div className="col-md-4">
                                                    <InfeedAd />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="d-flex justify-content-center my-4">
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
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}