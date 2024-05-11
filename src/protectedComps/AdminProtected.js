import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminProtected(props) {
    const { Component, ...rest } = props; // Destructure Component and rest of the props

    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem('admin-token');

        if (!login) {
            console.log("Login with Correct token!!");
            navigate("/adminlogin");
        }
    }, [navigate]); // Include navigate as a dependency

    return (
        <div>
            <Component {...rest} /> {/* Pass rest of the props to Component */}
        </div>
    );
}

export default AdminProtected;
