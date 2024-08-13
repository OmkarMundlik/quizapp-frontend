import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Navbar from '../components/Navbar';

function Dashboard() {
    const hostname = process.env.REACT_APP_HOST_NAME;
    const [userdata, setUserdata] = useState(null);

    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const response = await axios.get(hostname + "login/success", { withCredentials: true });
            setUserdata(response.data.user);
        } catch (error) {
            console.log("Login First");
            navigate("*")
        }
    }

    useEffect(() => {
      getUser();
    }, [])
    
  return (
    <div>
        <Navbar />
      {userdata? <>
        <h1>Hello, {userdata.displayName}</h1>
      </> : <></>}
    </div>
  )
}

export default Dashboard;
