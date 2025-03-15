import React, { useContext, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import Spinner from '../components/Spinner';  
import ResultContext from '../context/ResultContext';  
  
function CreatePremiumBatch() {  
  const navigate = useNavigate();  
  const [name, setName] = useState("");  
  const [subject, setSubject] = useState("");  
  const [password, setPassword] = useState("");  
  const [description, setDescription] = useState("");  
  const [mainImg, setMainImg] = useState(null);  
  const [spinner, setSpinner] = useState(false);  
  const HOST = process.env.REACT_APP_HOST_NAME;  
  const { setAlertContext } = useContext(ResultContext);  
  
  const showAlert = (message, status) => {  
    setAlertContext({ isActive: true, message, status });  
    setTimeout(() => {  
      setAlertContext(prevState => ({ ...prevState, isActive: false }));  
    }, 2000);  
  };  
  
  const createPremiumBatch = async () => {  
    setSpinner(true);  
  
    try {  
      const formData = new FormData();  
      formData.append('name', name);  
      formData.append('subject', subject);  
      formData.append('password', password);  
      formData.append('description', description);  
      formData.append('mainImg', mainImg);  
  
      // Log each field individually  
      for (const [key, value] of formData.entries()) {  
        console.log(`${key}: ${value}`);  
      }  
  
      const url = `${HOST}api/create-premium-batch`;  
      const response = await fetch(url, {  
        method: 'POST',  
        headers: {  
          'admin-token': localStorage.getItem('admin-token')  
        },  
        body: formData,  
      });  
  
      if (!response.ok) {  
        throw new Error('Network response was not ok');  
      }  
  
      const data = await response.json();  
      showAlert('Premium Batch Created Successfully!!', 'success');  
      navigate('/adminpage');  
    } catch (error) {  
      console.error('Error creating premium batch:', error.message);  
      showAlert('There was a problem creating the batch', 'danger');  
    } finally {  
      setSpinner(false);  
    }  
  };  
  
  return (  
    <>  
      {spinner && <Spinner />}  
      <div className="container">  
        <div className="header">  
          <h1>Create a Premium Batch</h1>  
        </div>  
        <div className="row">  
          <div className="col-md-6">  
            <div className="form-floating mt-1">  
              <input  
                type="text"  
                className="form-control"  
                id="name"  
                name="name"  
                placeholder="Name"  
                value={name}  
                onChange={(e) => { setName(e.target.value); }}  
              />  
              <label htmlFor="name">Name</label>  
            </div>  
            <div className="form-floating mt-3">  
              <input  
                type="text"  
                className="form-control"  
                id="subject"  
                name="subject"  
                placeholder="Subject"  
                value={subject}  
                onChange={(e) => { setSubject(e.target.value); }}  
              />  
              <label htmlFor="subject">Subject</label>  
            </div>  
            <div className="form-floating mt-3">  
              <input  
                type="password"  
                className="form-control"  
                id="password"  
                name="password"  
                placeholder="Password"  
                value={password}  
                onChange={(e) => { setPassword(e.target.value); }}  
              />  
              <label htmlFor="password">Password</label>  
            </div>  
            <div className="form-group mt-3">  
              <label htmlFor="description">Description: </label>  
              <textarea  
                className="form-control"  
                id="description"  
                name="description"  
                rows="3"  
                value={description}  
                onChange={(e) => { setDescription(e.target.value); }}  
              ></textarea>  
            </div>  
            <div className="form-group mt-3">  
              <label htmlFor="mainImg" style={{ marginBottom: "10px" }}>Select Image</label>  
              <br />  
              <input  
                type="file"  
                onChange={(e) => { setMainImg(e.target.files[0]) }}  
                accept="image/*"  
              />  
            </div>  
            <div className="d-flex justify-content-center mt-3">  
              <button type="button" className="btn btn-primary" onClick={createPremiumBatch}>Create Premium Batch</button>  
            </div>  
          </div>  
        </div>  
      </div>  
    </>  
  );  
}  
  
export default CreatePremiumBatch;  