import React, { useContext, useState } from 'react'
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import ResultContext from '../context/ResultContext';

function UploadContent() {
    const ConvertToDirectDownloadLink = ({ googleDriveLink }) => {
        // Extract file ID from the input URL
        const fileIdIndex = googleDriveLink.indexOf("/d/") + 3; // Find the index of "/d/" and add 3 to get the starting index of the file ID
        const fileIdEndIndex = googleDriveLink.indexOf("/view"); // Find the end index of the file ID
        const file_id = googleDriveLink.substring(fileIdIndex, fileIdEndIndex);
        // Construct the direct download link
        const directDownloadLink = `https://drive.google.com/uc?export=download&id=${file_id}`;

        // console.log(directDownloadLink)
        return directDownloadLink;
    };

    const navigate = useNavigate();
    const [headline, setHeadline] = useState("");
    const [mainImg, setMainImg] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [contentUrl, setContentUrl] = useState("")

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

    const UploadContent = async () => {
        setSpinner(true);
        try {
            const imageUrl = await uploadImage(); // Wait for image upload to complete
            const downloadUrl =  ConvertToDirectDownloadLink({googleDriveLink: contentUrl})
            const uploadObj = {
                headline: headline,
                imageUrl: imageUrl,
                contentUrl: downloadUrl, 
                contentViewUrl: contentUrl
            };

            // console.log(uploadObj);

            const url = HOST + 'api/uploadstudymaterial';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'admin-token': localStorage.getItem('admin-token')
                },
                body: JSON.stringify(uploadObj),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            showAlert('Material Uploaded Successfully!!', 'success');
            // console.log('Article created successfully:', data.message);
        } catch (error) {
            showAlert('There was a problem Uploading Material', 'danger');
            // console.log(uploadObj)
            console.error('There was a problem creating the article:', error.message);
        }
        setSpinner(false);
        navigate('/ebooks');
    };

    return (
        <>
        {spinner && <Spinner />}
            <div className="container">
                    {/* {alertVisible && alertStatus ?  <Alert message={alertStatus.message} status={alertStatus.status}/> : <></>} */}
                    <div className="header">
                        <h1>Welcome Admin! Upload Study Material</h1>
                    </div>
                    <div className="row">
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

                            <div className="form-floating mt-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contentUrl"
                                    name="contentUrl"
                                    placeholder="Enter Content Url"
                                    value={contentUrl}
                                    onChange={(e) => {
                                        setContentUrl(e.target.value);
                                    }}
                                />
                                <label htmlFor="headline">Content URL:</label>
                            </div>


                            <label htmlFor="" style={{ marginBottom: "10px" }}>Select Image</label>
                            <br />
                            <input type="file" onChange={(e) => { setMainImg(e.target.files[0]) }} accept="image/*" />

                            {/* {renderQuestionCard()} */}
                            
                            <div className="d-flex justify-content-center mt-3">
                                <button type="button" className="btn btn-primary" onClick={UploadContent}>Create Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default UploadContent
