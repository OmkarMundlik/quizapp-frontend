import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo_.jpg";
import style from  '../styles/Navbar.css';

export default function Navbar() {
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

    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-light py-3" style={{ transition: 'all 0.3s ease' }}>
            <div className="container-fluid">
                <Link className="navbar-brand fs-4" to="/">
                    <img src={logo} alt="" height={80} width={80}/>
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
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/articles"><b>चालू घडामोडी</b></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active fs-5 px-3 font-weight-bold" aria-current="page" to="/ebooks"><b>E-Books</b></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
