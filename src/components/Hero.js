import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo_.jpg";
import Lottie from 'lottie-react';
import style from '../styles/Hero.css'
import instagram from '../assets/instagram.json';
import whatsapp from '../assets/whatsapp.json';
import telegram from '../assets/telegram.json';
import HeroImg from '../assets/exam_prep.avif';

export default function Hero() {
    return (
        <div className="container-fluid px-4 py-3 my-3 text-center">
            <div className="hero-heading mb-4">
                <h2 className="display-2 fw-bold m-5 p-6">स्पर्धा परीक्षा  <span className="text-primary">By Spardhaweb</span></h2>
            </div>
            <div className="hero-img-container">
                <img src={HeroImg} className="img-fluid" alt="Hero Image" />
            </div>
            <div className="hero-buttons d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <Link className="btn btn-primary btn-lg px-4 gap-3" to="/allquizes" role="button">Test Series</Link>
                <Link className="btn btn-primary btn-lg px-4 gap-3" to="/allquizes" role="button">चालू घडामोडी 2024</Link>
                <Link className="btn btn-primary btn-lg px-4 gap-3" to="/allquizes" role="button">Study Material</Link>
            </div>
            {/* <h1>Follow Us On Social Media To be Updated </h1>
            <section className="social-media-icons d-flex justify-content-center align-items-center p-4">
                <div className="icon-container">
                    <a href="https://t.me/+BdSatS5bmdE5ODQ1" target="_blank"><Lottie animationData={telegram} className="social-media-icon" /></a>
                </div>
                <div className="icon-container">
                    <a href="/" target="_blank"><Lottie animationData={whatsapp} className="social-media-icon" /></a>
                </div>
                <div className="icon-container">
                    <a href="https://www.instagram.com/mpsc_insta?igsh=MWtobmFudjk1OGxndA==" target="_blank" ><Lottie animationData={instagram} className="social-media-icon" /></a>
                </div>
            </section> */}
        </div>
    );
}
