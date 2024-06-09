import React, { useContext, useEffect, useState } from 'react';
import '../styles/createquiz.css';
import Alert from '../components/Alert';
import { useNavigate } from "react-router-dom";
import style from '../styles/quizesPage.css'
import ResultContext from '../context/ResultContext';
import Spinner from '../components/Spinner';


export default function CreateQuiz() {
    const navigate = useNavigate();
    const [headline, setHeadline] = useState("");
    const [mainText, setMainText] = useState("");
    const [mainImg, setMainImg] = useState(null);
    const [subparts, setSubparts] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [subpart, setSubpart] = useState({
        subheading: "",
        text: ""
    });

    const HOST = process.env.REACT_APP_HOST_NAME;

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


    const addSubpart = () => {
        const updatedSubparts = subparts;
        updatedSubparts.push(subpart);
        setSubparts(updatedSubparts);
        setSubpart({
            subheading: "",
            text: ""
        })
        console.log(subparts);
    }

    const renderQuestionList = () => {
        return subparts.map((data, index) => (
            <div key={index} className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{data.subheading}</h5>
                            <p className="card-text">{data.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAlertVisible(true); 
    //     }, 3000);
    // }, [setAlertStatus]); 

    const uploadImage = () => {
        return new Promise((resolve, reject) => {
            const data = new FormData();
            data.append("file", mainImg);
            data.append("upload_preset", "vmyf3te9");
            data.append("cloud_name", "dpktfyhbi");

            fetch("https://api.cloudinary.com/v1_1/dpktfyhbi/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    showAlert('Image Uploaded SUccessfully', 'success');
                    resolve(data.url); // Resolve with the image URL
                })
                .catch(error => {
                    showAlert('Error in uploading image!', 'danger');
                    reject(error); // Reject with the error if upload fails
                });
        });
    };

    const CreateArticle = async () => {
        setSpinner(true);
        try {
            const imageUrl = await uploadImage(); // Wait for image upload to complete
            const articleObj = {
                heading: headline,
                text: mainText,
                subparts: subparts,
                imageUrl: imageUrl
            };

            console.log(articleObj);
            const url = HOST + 'api/createarticle';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'admin-token': localStorage.getItem('admin-token')
                },
                body: JSON.stringify(articleObj),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            showAlert('Article Created Successfully!!', 'success');
            // console.log('Article created successfully:', data.message);
        } catch (error) {
            showAlert('There was a problem creating the article', 'danger');
            // console.error('There was a problem creating the article:', error.message);
        }
        setSpinner(false);
        navigate('/allarticles');
    };

    return (
        <>
        {spinner && <Spinner />}
            <div className="container">
                    {/* {alertVisible && alertStatus ?  <Alert message={alertStatus.message} status={alertStatus.status}/> : <></>} */}
                    <div className="header">
                        <h1>Welcome Admin! Create Today's Quiz.</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form className="centered-form">
                                <div className="form-floating mt-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subheading"
                                        name="subheading"
                                        placeholder="subheading"
                                        value={subpart.subheading}
                                        onChange={(e) => {
                                            setSubpart({
                                                ...subpart,
                                                subheading: e.target.value
                                            });
                                        }}
                                    />
                                    <label htmlFor="headline">Subheading: </label>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="mainText">Text: </label>
                                    <textarea
                                        className="form-control"
                                        id="text"
                                        name="text"
                                        rows="3"
                                        value={subpart.text}
                                        onChange={(e) => {
                                            setSubpart({
                                                ...subpart,
                                                text: e.target.value
                                            });
                                        }}
                                    ></textarea>
                                </div>
                                <div className="form-group mt-2 d-flex justify-content-center">
                                    <button type="button" className="btn btn-primary" onClick={addSubpart}>Add Subpart</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating mt-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="headline"
                                    name="headline"
                                    placeholder="Headline"
                                    value={headline}
                                    onChange={(e) => {
                                        setHeadline(e.target.value);
                                    }}
                                />
                                <label htmlFor="headline">Headline</label>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="mainText">Main Text: </label>
                                <textarea
                                    className="form-control"
                                    id="text"
                                    name="text"
                                    rows="3"
                                    value={mainText}
                                    onChange={(e) => {
                                        setMainText(e.target.value);
                                    }}
                                ></textarea>
                            </div>
                            <label htmlFor="" style={{ marginBottom: "10px" }}>Select Image</label>
                            <br />
                            <input type="file" onChange={(e) => { setMainImg(e.target.files[0]) }} accept="image/*" />

                            <div className="card mt-4">
                                <div className="card-header">
                                    <b>All Questions</b>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {renderQuestionList()}
                                </ul>
                            </div>
                            {/* {renderQuestionCard()} */}

                            <div className="d-flex justify-content-center mt-3">
                                <button type="button" className="btn btn-primary" onClick={CreateArticle}>Create Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}
