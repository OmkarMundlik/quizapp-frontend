import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo_.jpg";
import '../styles/Navbar.css';
import Login from '../pages/Login';
import axios from "axios"

export default function Navbar() {

    const hostname = process.env.REACT_APP_HOST_NAME;
    // const [userdata, setUserdata] = useState(null);

    // const getUser = async () => {
    //     try {
    //         const response = await axios.get(hostname + "login/success", { withCredentials: true });
    //         setUserdata(response.data.user);
    //     } catch (error) {
    //         console.log("some problem occurred");
    //     }
    // }

    useEffect(() => {
        // getUser();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        const navbar = document.getElementById('navbar');
        if (window.pageYOffset > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    };

    const logout = () => {
        window.open(hostname + "logout", "_self");
    }

    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-light py-3" style={{ transition: 'all 0.3s ease' }}>
            <div className="container-fluid">
                <Link className="navbar-brand fs-4" to="/">
                    <img src={logo} alt="" height={80} width={80} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/"><b>Home</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/allquizes"><b>Test Series</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/articles"><b>Current Affairs Notes</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/ebooks"><b>E-Books</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/latest-updates"><b>Latest Updates</b></Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/about-us"><b>About Us</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/contact-us"><b>Contact Us</b></Link>
                        </li>

                        {/* {userdata ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/dashboard"><b>Dashboard</b></Link>
                                </li>
                                <button className='btn btn-primary' onClick={logout}>Logout</button>
                                <li>
                                    <img src={userdata?.image} alt="" style={{ width: "50%", borderRadius: "50%" }} />
                                </li>
                            </>
                        ) : (
                            <Login />
                        )} */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
