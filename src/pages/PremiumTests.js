import React, { useEffect, useState } from 'react';  
import Navbar from '../components/Navbar';  
import { Link } from 'react-router-dom';  
import Spinner from '../components/Spinner';  
import Footer from '../components/Footer';  
import InfeedAd from '../components/InfeedAd';  
import DisplayAd from '../components/DisplayAd';  
import { Helmet } from 'react-helmet';  
import '../styles/PremiumTests.css'
import EnglishVocabImg from '../assets/EnglishVocab.jpeg'
  
export default function PremiumTests(props) {  
  const formatDate = (timestamp) => {  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
    const date = new Date(timestamp);  
    const day = date.getDate();  
    const month = months[date.getMonth()];  
    const year = date.getFullYear();  
    return `${day} ${month} ${year}`;  
  };  
  
//   const handleCategoryClick = (categoryList) => {  
//     setSelectedCategories(categoryList);  
//     filterBySubjects(categoryList);  
//   };  
  
//   const filterBySubjects = (selectedCategories) => {  
//     if (quizes) {  
//       if (selectedCategories.includes('All')) {  
//         setFiltered_data(quizes);  
//         return;  
//       }  
//       const lowercasedCategories = selectedCategories.map(category => category.toLowerCase());  
//       const filtered = quizes.filter(quiz =>  
//         lowercasedCategories.some(category => quiz.subject.toLowerCase().includes(category))  
//       );  
//       setFiltered_data(filtered);  
//     }  
//   };  
  
  const HOST = process.env.REACT_APP_HOST_NAME;  
  const [quizes, setQuizes] = useState(null);  
  const [filtered_data, setFiltered_data] = useState(null);  
//   const [selectedCategories, setSelectedCategories] = useState(['All']);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);  
  const [loading, setLoading] = useState(true);  
//   const [code, setCode] = useState('');  
//   const [codeEntered, setCodeEntered] = useState(false);  
//   const correctCode = 'ASDFGHJ'; // Replace with your static code  
  
  const fetchData = async (page = 1) => {  
    setLoading(true);  // Set loading to true when fetching data  
    try {  
      const response = await fetch(`${HOST}api/get-premium-quizes?page=${page}&limit=15`, {  
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
  
//   const categories = [['All'], ['भूगोल', 'GEOGRAPHY'], ['चालू घडामोडी'], ['इतिहास', 'History'], ['गणित', 'Math'], ['मराठी व्याकरण'], ['विज्ञान', 'Science', 'GS'], ['राज्यशास्त्र', 'POLITY']];  
  
  const handleNextPage = () => {  
    // setSelectedCategories(['All']);  // Reset the selected categories to 'All' on next page  
    setCurrentPage(currentPage + 1);  
  };  
  
  const handlePrevPage = () => {  
    setCurrentPage(currentPage - 1);  
  };  

  
  return (  
    <div className="quizes-page">  
      <Helmet>  
        <title>Premium Test Series - Spardhaweb</title>  
        <meta name="description" content="Access free MPSC test series on Spardha Web. Boost your preparation with comprehensive test series and daily quizzes. Start your free test series now!" />  
        <meta name="keywords" content="free MPSC test series, MPSC preparation, free test series, MPSC exam practice" />  
        <meta property="og:title" content="Free MPSC Test Series - Spardha Web" />  
        <meta property="og:description" content="Access free MPSC test series on Spardha Web. Boost your preparation with comprehensive test series and daily quizzes. Start your free test series now!" />  
        <meta property="og:image" content="%PUBLIC_URL%/logo_.jpg" />  
        <meta property="og:url" content="https://spardhaweb.com/premium-tests" />  
      </Helmet>  

      {/* {!codeEntered ? (  
        <div className="code-entry-container">  
          <h2>Enter Code</h2>  
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />  
          <button onClick={handleCodeSubmit}>Enter</button>  
        </div>  
      ) :  */}
          <Navbar />  
          <h1 className="text-center mt-4">60 Days of English Vocabulary</h1>  
          <div className="container">  
            {/* <div className="row justify-content-center">  
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
            </div>   */}
          </div>  

          <div className="container-fluid">  
            <div className="row">  
              <div className="col-md-12 quizzes-container">  
                {loading ? (  
                  <Spinner />  // Show spinner if loading is true  
                ) : (  
                    <div className="container my-3 flex-grow-1">  
                    <div className="row">  
                      {filtered_data.map((quiz) => (  
                        <React.Fragment key={quiz._id}>  
                          <div className="col-md-4">  
                            <div className="my-3">  
                              <Link to={`/get-premium-quiz/${quiz._id}`} className="card-link">  
                                <div className="card" style={{ cursor: 'pointer' }}>  
                                  <img  
                                    src={EnglishVocabImg}  
                                    className="card-img-top"  
                                    alt="..."  
                                  />  
                                  <div className="card-body">  
                                    <h5 className="card-title">Date: {formatDate(quiz.date)}</h5>  
                                    <h5 className="card-title">{quiz.subject}</h5>  
                                    <p className="card-text my-2">  
                                      <small className="text-muted">  
                                        By team@spardhaweb on {new Date(quiz.date).toUTCString()}  
                                      </small>  
                                    </p>  
                                    <Link  
                                      className="btn btn-sm btn-dark"  
                                      to={`/get-premium-quiz/${quiz._id}`}  
                                      onClick={(e) => e.stopPropagation()}  
                                      style={{ fontSize: '1.25rem', padding: '10px 20px' }}  
                                    >  
                                      Start Test  
                                    </Link>  
                                  </div>  
                                </div>  
                              </Link>  
                            </div>  
                          </div>  
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