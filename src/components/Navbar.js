import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the cookie library
import logo from "../assets/logo_.jpg";
import '../styles/Navbar.css';
import Socials from './Socials';

export default function Navbar() {
    const hostname = process.env.REACT_APP_HOST_NAME;
    const navigate = useNavigate();

    useEffect(() => {
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
    const handleLogout = () => {
        Cookies.remove('jwtoken');
        Cookies.remove('user');
        navigate('/login');
    };

    // Check if the user is logged in based on the presence of the JWT token
    const isLoggedIn = !!Cookies.get('jwtoken');

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
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/premium"><b>Premium Batches</b></Link>
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

                        {/* Dashboard and Login/Signup Logic */}
                        {/* {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5 px-3 font-weight-bold" to="/dashboard"><b>Dashboard</b></Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link active fs-5 px-3 font-weight-bold" onClick={handleLogout} ><b>Logout</b></button>
                                </li>
                            </>
                        ) : (
                            <div className="d-flex">
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5 px-3 font-weight-bold" to="/login"><b>Login</b></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5 px-3 font-weight-bold" to="/signup"><b>Signup</b></Link>
                                </li>
                            </div>
                        )} */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
