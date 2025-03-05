import React, { useContext, useEffect, useState } from 'react';  
import { useNavigate, useParams } from "react-router-dom";  
import Alert from '../components/Alert';  
import Spinner from '../components/Spinner';  
import ResultContext from '../context/ResultContext';  
import '../styles/createquiz.css';  
  
export default function UpdatePremiumBatch() {  
    const navigate = useNavigate();  
    const { batchId } = useParams();  
    const [name, setName] = useState("");  
    const [subject, setSubject] = useState("");  
    const [password, setPassword] = useState("");  
    const [description, setDescription] = useState("");  
    const [imageUrl, setImageUrl] = useState(null);  
    const [passwordVisible, setPasswordVisible] = useState(false); // New state for password visibility  
    const [spinner, setSpinner] = useState(false);  
  
    const HOST = process.env.REACT_APP_HOST_NAME;  
    const { setAlertContext } = useContext(ResultContext);  
  
    useEffect(() => {  
        const fetchBatchDetails = async () => {  
            try {  
                setSpinner(true);  
                const response = await fetch(`${HOST}api/get-premium-batch/${batchId}`, {  
                    method: 'GET',  
                    headers: {  
                        'Content-Type': 'application/json',  
                        'admin-token': localStorage.getItem('admin-token')  
                    }  
                });  
  
                if (!response.ok) {  
                    throw new Error('Network response was not ok');  
                }  
  
                const data = await response.json();  
                setName(data.name);  
                setSubject(data.subject);  
                setPassword(data.password);  
                setDescription(data.description);  
                setImageUrl(data.imageUrl);  
            } catch (error) {  
                showAlert('There was a problem fetching the batch details', 'danger');  
            } finally {  
                setSpinner(false);  
            }  
        };  
  
        fetchBatchDetails();  
    }, [batchId, HOST]);  
  
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
  
    const uploadImage = () => {  
        return new Promise((resolve, reject) => {  
            const data = new FormData();  
            data.append("file", imageUrl);  
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
                    showAlert('Error in uploading image!', 'danger');  
                    reject(error); // Reject with the error if upload fails  
                });  
        });  
    };  
  
    const updateBatch = async () => {  
        setSpinner(true);  
        try {  
            let uploadedImageUrl = imageUrl;  
            if (imageUrl instanceof File) {  
                uploadedImageUrl = await uploadImage(); // Wait for image upload to complete if it's a new file  
            }  
  
            const batchObj = {  
                name,  
                subject,  
                password,  
                description,  
                imageUrl: uploadedImageUrl  
            };  
  
            const url = `${HOST}api/update-premium-batch/${batchId}`;  
            const response = await fetch(url, {  
                method: 'PUT',  
                headers: {  
                    'Content-Type': 'application/json',  
                    'admin-token': localStorage.getItem('admin-token')  
                },  
                body: JSON.stringify(batchObj),  
            });  
  
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }  
  
            const data = await response.json();  
            showAlert('Batch Updated Successfully!!', 'success');  
            navigate('/allpremiumbatches');  
        } catch (error) {  
            showAlert('There was a problem updating the batch', 'danger');  
        }  
        setSpinner(false);  
    };  
  
    return (  
        <>  
            {spinner && <Spinner />}  
            <div className="container">  
                <div className="header">  
                    <h1>Update Premium Batch</h1>  
                </div>  
                <div className="row">  
                    <div className="col-md-6">  
                        <form className="centered-form">  
                            <div className="form-floating mt-1">  
                                <input  
                                    type="text"  
                                    className="form-control"  
                                    id="name"  
                                    name="name"  
                                    placeholder="Name"  
                                    value={name}  
                                    onChange={(e) => setName(e.target.value)}  
                                />  
                                <label htmlFor="name">Name</label>  
                            </div>  
                            <div className="form-floating mt-1">  
                                <input  
                                    type="text"  
                                    className="form-control"  
                                    id="subject"  
                                    name="subject"  
                                    placeholder="Subject"  
                                    value={subject}  
                                    onChange={(e) => setSubject(e.target.value)}  
                                />  
                                <label htmlFor="subject">Subject</label>  
                            </div>  
                            <div className="form-floating mt-1">  
                                <input  
                                    type={passwordVisible ? "text" : "password"} // Toggle between text and password  
                                    className="form-control"  
                                    id="password"  
                                    name="password"  
                                    placeholder="Password"  
                                    value={password}  
                                    onChange={(e) => setPassword(e.target.value)}  
                                />  
                                <label htmlFor="password">Password</label>  
                                <div className="mt-2">  
                                    <input  
                                        type="checkbox"  
                                        checked={passwordVisible}  
                                        onChange={() => setPasswordVisible(!passwordVisible)}  
                                    /> Show Password  
                                </div>  
                            </div>  
                            <div className="form-group mt-3">  
                                <label htmlFor="description">Description: </label>  
                                <textarea  
                                    className="form-control"  
                                    id="description"  
                                    name="description"  
                                    rows="3"  
                                    value={description}  
                                    onChange={(e) => setDescription(e.target.value)}  
                                ></textarea>  
                            </div>  
                            <label htmlFor="image" style={{ marginBottom: "10px" }}>Select Image</label>  
                            <br />  
                            <input type="file" onChange={(e) => setImageUrl(e.target.files[0])} accept="image/*" />  
                            <div className="d-flex justify-content-center mt-3">  
                                <button type="button" className="btn btn-primary" onClick={updateBatch}>Update Batch</button>  
                            </div>  
                        </form>  
                    </div>  
                </div>  
            </div>  
        </>  
    );
}  