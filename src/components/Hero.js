import React from 'react';
import { Link } from 'react-router-dom';
import HeroImg from '../assets/exam_prep.avif';
import '../styles/Hero.css'

export default function Hero() {
    return (
        <div className="mainDiv container-fluid d-flex align-items-center justify-content-center">
            
            <div className="hero-img-container" >
                <img src={HeroImg} className="img-fluid" alt="Hero Image" style={{ width: "100%" }} />
            </div>
           
            <div className="hero-content-container" >
                <div className="hero-content">
                    <h3 className="display-2 fw-bold m-5 p-6">Test Series and Daily Current Affairs <span className="text-primary">By Spardhaweb</span></h3>
                    <p className="m-4 p-4">Access daily quizzes covering various topics and stay updated with one-liner current affairs in Marathi. We provide tailored resources to enhance your preparation, ensuring you're equipped with the knowledge and confidence to ace the exam. Start your journey to success today!</p>
                </div>
                <div className="hero-buttons d-grid gap-2 d-sm-flex justify-content-sm-center mb-5" style={{width:"100%"}}>
                    <Link className="btn btn-primary btn-lg px-4 gap-3" to="/allquizes" role="button" >Test Series</Link>
                    <Link className="btn btn-primary btn-lg px-4 gap-3" to="/articles" role="button">Current Affairs 2025</Link>
                    <Link className="btn btn-primary btn-lg px-4 gap-3" to="/ebooks" role="button">Study Material</Link>
                    <Link className="btn btn-primary btn-lg px-4 gap-3" to="/latest-updates" role="button">Latest Updates</Link>

                </div>
            </div>

            
        </div>
    );
}
