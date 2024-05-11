import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from "../styles/adminpage.css"

function AdminPage() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("admin-token");
    navigate("/adminlogin");
  };

  return (
    <div >
      <h1>Welcome Admin</h1>
      <div className="button-container">
        <Link className="button-link" to="/createquiz">Create Quiz</Link>
        <Link className="button-link" to="/allquizesforadmin">See All Quizes</Link>
        <button className="logout-button" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}

export default AdminPage;
