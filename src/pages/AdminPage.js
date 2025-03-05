import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/adminpage.css';
import Navbar from '../components/Navbar';
import ResultContext from '../context/ResultContext';

function AdminPage() {
  const navigate = useNavigate();
  const {setAlertContext} = useContext(ResultContext);
  const showAlert = (message, status)=>{
    setAlertContext({
        isActive: true,
        message: message, 
        status: status
    })
    setTimeout(() => {
        setAlertContext(prevState => ({ ...prevState, isActive: false }));
    }, 2000);
}

  const logout = () => {
    localStorage.removeItem("admin-token");
    showAlert('logout successful!', 'success');
    navigate("/adminlogin");
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Welcome Admin</h1>
      <div className="button-container">
        <Link className="button-link" to="/createquiz">Create Quiz</Link>
        <Link className="button-link" to="/allquizesforadmin">See All Quizzes</Link>
        <Link className="button-link" to="/createarticle">Create Article</Link>
        <Link className="button-link" to="/allarticles">All Articles</Link>
        <Link className="button-link" to="/uploadcontent">Upload Study Material</Link>
        <Link className="button-link" to="/create-updates">Upload Latest Updates</Link>
        <Link className="button-link" to="/create-new-batch">Add Premium Batch</Link>
        <Link className="button-link" to="/all-batches-admin">All Premium Batches</Link>

        <button className="logout-button" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}

export default AdminPage;
