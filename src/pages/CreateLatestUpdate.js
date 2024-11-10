import React, { useContext, useEffect, useState } from 'react';
import '../styles/createquiz.css';
import Alert from '../components/Alert';
import { useNavigate } from "react-router-dom";
import style from '../styles/quizesPage.css'
import ResultContext from '../context/ResultContext';
import Spinner from '../components/Spinner';


export default function CreateLatestUpdate() {
    const navigate = useNavigate();
    const [headline, setHeadline] = useState("");
    const [mainText, setMainText] = useState("");
    const [mainImg, setMainImg] = useState(null);
    const [youtubeVid, setYoutubeVid] = useState(null);
    const [subparts, setSubparts] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [subpart, setSubpart] = useState({
        linkHeadline: "",
        link: ""
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
        if(subpart.link.length < 7){ 
            showAlert('Please Add Valid Link', 'danger');
            return;
        }
        if(subpart.linkHeadline.length=="0"){
            showAlert('Add Headline to link', 'danger');
            return;
        }
        const updatedSubparts = subparts;
        updatedSubparts.push(subpart);
        setSubparts(updatedSubparts);
        setSubpart({
            linkHeadline: "",
            link: ""
        })
    }

    const renderQuestionList = () => {
        return subparts.map((data, index) => (
            <div key={index} className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{data.linkHeadline}</h5>
                            <p className="card-text">{data.link}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };


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
                    showAlert('Image Uploaded Successfully', 'success');
                    resolve(data.url); // Resolve with the image URL
                })
                .catch(error => {
                    showAlert('Error in uploading Image', 'danger');
                    reject(error); // Reject with the error if upload fails
                });
        });
    };

    const UploadLinks = async () => {
        if (!headline.trim() || !mainText.trim()) {
            showAlert('Headline and Main Text cannot be empty', 'danger');
            return;
        }    

        if(subparts.length < 1){
            showAlert('Add at least one link!!', 'danger');
            return;
        }

        setSpinner(true);
        try {
            const imageUrl = await uploadImage(); // Wait for image upload to complete
            const linksObj = {
                headline: headline,
                mainText: mainText,
                linksArray: subparts,
                imageUrl: imageUrl,
                youtubeVid: youtubeVid
            };

            // console.log(linksObj);
            const url = HOST + 'api/upload-links';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'admin-token': localStorage.getItem('admin-token')
                },
                body: JSON.stringify(linksObj),
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
        navigate('/latest-updates');
    };

    return (
        <>
        {spinner && <Spinner />}
            <div className="container">
                    {/* {alertVisible && alertStatus ?  <Alert message={alertStatus.message} status={alertStatus.status}/> : <></>} */}
                    <div className="header">
                        <h1>Welcome Admin! Upload Latest Updates.</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <form className="centered-form">
                                <div className="form-floating mt-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="linkHeadline"
                                        name="linkHeadline"
                                        placeholder="linkHeadline"
                                        value={subpart.linkHeadline}
                                        onChange={(e) => {
                                            setSubpart({
                                                ...subpart,
                                                linkHeadline: e.target.value
                                            });
                                        }}
                                    />
                                    <label htmlFor="headline">Link Headline: </label>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="mainText">Link: </label>
                                    <input
                                        className="form-control"
                                        id="text"
                                        name="text"
                                        rows="3"
                                        value={subpart.link}
                                        onChange={(e) => {
                                            setSubpart({
                                                ...subpart,
                                                link: e.target.value
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form-group mt-2 d-flex justify-content-center">
                                    <button type="button" className="btn btn-primary" onClick={addSubpart}>Add Link</button>
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
                            <label htmlFor="" style={{ marginBottom: "10px" }}><b>Paste Youtube Link</b></label>
                            <input type="text" style={{padding:"10px" , margin: "10px"}} onChange={(e) => { setYoutubeVid(e.target.value) }}/>
                            <br />
                            <label htmlFor="" style={{ marginBottom: "10px" }}><b>Select Image</b></label>
                            <input type="file" style={{padding:"10px" , margin: "10px"}} onChange={(e) => { setMainImg(e.target.files[0]) }} accept="image/*" />

                            <div className="card mt-4">
                                <div className="card-header">
                                    <b>All Links</b>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {renderQuestionList()}
                                </ul>
                            </div>
                            {/* {renderQuestionCard()} */}

                            <div className="d-flex justify-content-center mt-3">
                                <button type="button" className="btn btn-primary" onClick={UploadLinks}>Upload Links</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}
