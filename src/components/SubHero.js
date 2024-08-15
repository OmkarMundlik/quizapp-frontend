import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import InfeedAd from './InfeedAd';
import DisplayAd from './DisplayAd';
import InarticleAd from './InarticleAd';
import MultiplexAd from './MultiplexAd';

function SubHero() {
    const formatDate = (timestamp) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const compareDates = (a, b) => {
        return new Date(b.date) - new Date(a.date);
    };

    const HOST = process.env.REACT_APP_HOST_NAME;

    const [quizes, setQuizes] = useState(null);
    const [articles, setArticles] = useState(null);
    const [latestUpdates, setLatestUpdates] = useState(null);
    const [studyMaterial, setStudyMaterial] = useState(null);

    const fetchData = async (type) => {
        let url = "";
        if (type === 'articles') {
            url = 'articles';
        } else if (type === 'quizes') {
            url = 'getallquizes';
        } else if (type === 'latestupdate') {
            url = 'get-all-updates';
        } else if (type === 'study_material') {
            url = 'getallmaterial';
        }
        try {
            const response = await fetch(`${HOST}api/${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // Sort the data based on date in descending order
            const sortedData = data.sort(compareDates);
            // Update state based on type
            if (type === 'articles') {
                if (sortedData.length < 2) {
                    setArticles(sortedData);
                } else {
                    setArticles(sortedData.slice(0, 2))
                }
            } else if (type === 'quizes') {
                if (sortedData.length < 2) {
                    setQuizes(sortedData);
                } else {
                    setQuizes(sortedData.slice(0, 2))
                }

            } else if (type === 'latestupdate') {
                if (sortedData.length < 2) {
                    setLatestUpdates(sortedData);
                } else {
                    setLatestUpdates(sortedData.slice(0, 2))
                }
            } else if (type === 'study_material') {
                if (sortedData.length < 2) {
                    setStudyMaterial(sortedData);
                } else {
                    setStudyMaterial(sortedData.slice(0, 2))
                }
            }
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
            // Optionally handle error state or display error message to user
        }
    };

    useEffect(() => {
        fetchData('articles');
        fetchData('quizes');
        fetchData('study_material');
        fetchData('latestupdate');
        console.log(articles)
    }, []);

    return (
        <div>
            <DisplayAd />
            <h1 className="text-center mt-4 mb-5">Latest Updates</h1>
            {!latestUpdates ? <Spinner /> :
                <div className="container my-3">
                    <div className="row">
                        {latestUpdates.map(update => (
                            <div className="col-md-4" key={update._id}>
                                <div className="my-3">
                                    <div className="card">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}
                                        >
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

                        {latestUpdates.length > 0 && (
                            <div className="col-md-4" key={"viewall"}>
                                <div className="my-3">
                                    <Link to="/latest-updates">
                                        <div className="card">
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                                            </div>
                                            <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720804964/latest_updates_aq4tlu.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h3 className=" btn btn-sm btn-dark m-auto p-3">View More</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            }
            <h1 className="text-center mt-4 mb-5">Test Series 2024</h1>
             {!quizes ? <Spinner /> :
                <div className="container my-3 flex-grow-1">
                    <div className="row">
                        {quizes.map(quiz => (
                            <div className="col-md-4" key={quiz._id}>
                                <div className="my-3">
                                    <div className="card">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                                        </div>
                                        {/* <img src={!quiz.imageUrl ? "https://res.cloudinary.com/dpktfyhbi/image/upload/v1718558408/testkg_ttyz5t.jpg" : quiz.imageUrl} className="card-img-top" alt="..." /> */}
                                        <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/test_series_y3kecu.jpg" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">Date: {formatDate(quiz.date)}</h5>
                                            <h5 className="card-title">Subject: {quiz.subject}</h5>
                                            <Link  className="btn btn-sm btn-dark" to={`/start/${quiz._id}`}>Start Test</Link>
                                            <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(quiz.date).toUTCString()}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            // <HorizonTextCard quiz={quiz}/>
                        ))}

                        {quizes.length > 0 && (
                            <div className="col-md-4" key={"viewall"}>
                                <div className="my-3">
                                    <Link to="/allquizes">
                                        <div className="card">
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                                            </div>
                                            <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/test_series_y3kecu.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h3 className=" btn btn-sm btn-dark m-auto p-3">View More</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            }
            <InarticleAd />
            <h1 className="text-center mt-4 mb-5">Current Affairs</h1>
            {!articles ? <Spinner /> :
                <div className="container">
                    <div className="row">
                        {articles.map(article => (
                            <div className="col-md-4" key={article._id}>
                                <div className="my-3">
                                    <div className="card">
                                        {/* <img src={!article.imageUrl ? "https://t4.ftcdn.net/jpg/05/81/84/71/360_F_581847176_eF540XqFGHDdGPZxyh5NtWHNzgs0XFk6.jpg" : article.imageUrl} className="card-img-top" alt="..." /> */}
                                        <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720804925/dailycurrafair_uga0y3.jpg" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <Link to={`/article/${article._id}`} style={{ textDecoration: "none", color: "#000" }}><h5 className="card-title">{article.heading}</h5></Link>
                                            <p className="card-text">{article.text}</p>
                                            <Link to={`/article/${article._id}`} className="btn btn-sm btn-dark">Read More</Link>
                                            <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {formatDate(article.date)}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {articles.length > 0 && (
                            <div className="col-md-4" key={"viewall"}>
                                <div className="my-3">
                                    <Link to="/articles">
                                        <div className="card">
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                                            </div>
                                            <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720804925/dailycurrafair_uga0y3.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h3 className=" btn btn-sm btn-dark m-auto p-3">View More</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            }
            <h1 className="text-center mt-4 mb-5">E-books and Study Material</h1>
            {!studyMaterial ? <Spinner /> :
                <div className="container my-3 flex-grow-1">
                    <div className="row">
                        {studyMaterial.map(material => (
                            <div className="col-md-4" key={material._id}>
                                <div className="my-3">
                                    <div className="card">
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                                        </div>
                                        {/* <img src={!material.imageUrl ? "https://t4.ftcdn.net/jpg/05/81/84/71/360_F_581847176_eF540XqFGHDdGPZxyh5NtWHNzgs0XFk6.jpg" : material.imageUrl} className="card-img-top" alt="..." /> */}
                                        <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/studymaterial_jervxl.jpg" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{material.headline}</h5>
                                            <a href={material.contentViewUrl} className="btn btn-sm btn-dark" target="_blank">View PDF</a>
                                            &#160;&#160;&#160;&#160;
                                            <a href={material.contentUrl} className="btn btn-sm btn-dark">Download Now</a>
                                            <p className="card-text my-2"><small className="text-muted">By team@spardhaweb on {new Date(material.date).toUTCString()}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {studyMaterial.length > 0 && (
                            <div className="col-md-4" key={"viewall"}>
                                <div className="my-3">
                                    <Link to="/ebooks">
                                        <div className="card">
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                                            </div>
                                            <img src="https://res.cloudinary.com/dzpazaufa/image/upload/v1720805005/studymaterial_jervxl.jpg" className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h3 className=" btn btn-sm btn-dark m-auto p-3">View More</h3>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        )}

                    </div>
                </div>
            }
            <MultiplexAd />
        </div>
    );
}

export default SubHero;
