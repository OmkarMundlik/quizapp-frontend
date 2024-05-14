import React, { useContext, useEffect, useState } from 'react'
import style from "../styles/adminlogin.css"
import { useNavigate } from 'react-router-dom';
import ResultContext from '../context/ResultContext';

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {alertContext, setAlertContext} = useContext(ResultContext);

    // useEffect(() => {
    //     if (alertContext.isActive) {
    //       const timeout = setTimeout(() => {
    //         setAlertContext(prevState => ({ ...prevState, isActive: false }));
    //       }, 2000);
    //       return () => clearTimeout(timeout);
    //     }
    //   }, [alertContext]);

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
          
    const navigate = useNavigate();

    const handleLogin = async () => {
        // console.log('Hello');
        try {  //https://quiz-app-backend-delta.vercel.app
            const response = await fetch('https://quiz-app-backend-delta.vercel.app/api/auth/adminlogin', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
    
            if (response.ok) {
                const data = await response.json(); //Fix: Use response.json() to parse the response body
                const adminToken = data.adminToken;
                localStorage.setItem('admin-token', adminToken);
                // console.log(localStorage.getItem('admin-token'));
                showAlert('Login Successful!!', 'success');
                navigate('/adminpage');
                // console.log('Admin token:', adminToken);
            } else {
                showAlert('Enter Correct Credentials', 'danger');
                console.error('Login failed');
            }
        } catch (error) {
            showAlert(error, 'danger');
            console.error('Error:', error);
        }
    };
    
    return (
        <div className="wrapper"> {/* Apply wrapper class */}
\            <h1 className="title">Admin Login</h1> {/* Apply title class */}
            <div className="form-group"> {/* Apply form-group class */}
                <label className="label" htmlFor="username">Username:</label> {/* Apply label class */}
                <input className="input" type="text" id="username" value={username} onChange={(e)=> setUsername(e.target.value)} /> {/* Apply input class */}
            </div>
            <div className="form-group"> {/* Apply form-group class */}
                <label className="label" htmlFor="password">Password:</label> {/* Apply label class */}
                <input className="input" type="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} /> {/* Apply input class */}
            </div>

            <div className="button-container"> {/* New container for the login button */}
                <button className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default AdminLogin;
