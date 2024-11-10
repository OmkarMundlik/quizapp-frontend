import React, { useContext, useEffect, useState } from 'react';
import '../styles/articlecard.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import ResultContext from '../context/ResultContext';

function AllArticles() {
    // const formatDate = (timestamp) => {
    //     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //     const date = new Date(timestamp);
    //     const day = date.getDate();
    //     const month = months[date.getMonth()];
    //     const year = date.getFullYear();
    //     return `${day} ${month} ${year}`;
    // };
    const HOST = process.env.REACT_APP_HOST_NAME;
    const compareDates = (a, b) => {
        return new Date(b.date) - new Date(a.date);
    };

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

    const [articles, setArticles] = useState([]);

    const deleteArticle = async (id) => {
        try {
            const response = await fetch(HOST + `api/deletearticle/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'admin-token': localStorage.getItem("admin-token")
                    // You may need to include additional headers such as authorization token
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                showAlert("Internal Server Error!!", "danger");
                throw new Error(errorData.message || 'Failed to delete article');
            }
            // Article deleted successfully, you can handle any UI updates here if needed
            setArticles(prevArticles => prevArticles.filter(article => article._id !== id));
            showAlert("Article Deleted successfully!!", "success");
        } catch (error) {
            showAlert("Error in deleting article!!", "success");
            console.log(error);
            // Handle error, show error message, etc.
        }
    };


    // TODO : Write function to call api and fetch details
    const fetchData = async () => {
        try {
            const response = await fetch(HOST + 'api/articles', {
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
            const sortedArticles = data.sort(compareDates);
            setArticles(sortedArticles);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div>
            <Navbar />
            <br />
            <br />
            <div className="container my-3">
                <div className="row">
                    {articles.map(article => (
                        <div className="col-md-4" key={article._id}>
                            <div className="my-3">
                                <div className="card">
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}
                                    >
                                        <span className=" badge rounded-pill bg-danger p-2 px-3">
                                            IMP
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </div>
                                    <img src={!article.imageUrl ? "https://t4.ftcdn.net/jpg/05/81/84/71/360_F_581847176_eF540XqFGHDdGPZxyh5NtWHNzgs0XFk6.jpg" : article.imageUrl} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <Link to={`/article/${article._id}`} style={{ textDecoration: "none", color: "#000" }}><h5 className="card-title">{article.heading}</h5></Link>
                                        <p className="card-text">{article.text}</p>
                                        <Link rel="noreferrer" to={`/article/${article._id}`} className="btn btn-sm btn-dark">Read More</Link>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="45"
                                            height="45"
                                            viewBox="0 0 60 60"
                                            id="delete"
                                            className='mt-2'
                                            onClick={() => {
                                                deleteArticle(article._id)
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z"></path>
                                            <path fill="none" d="M0 0h48v48H0z"></path>
                                        </svg>
                                        <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(article.date).toUTCString()}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AllArticles;
