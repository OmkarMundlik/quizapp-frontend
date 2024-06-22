import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="jumbotron">
          <h2>About Us !</h2>
          <h2 className="text-center">Welcome To <span id="W_Name1">Spardhaweb</span></h2>
          <p><span id="W_Name2">Spardhaweb</span> is a Professional <span id="W_Type1">Educational</span> Platform. Here we will only provide you with interesting content that you will enjoy very much. We are committed to providing you the best of <span id="W_Type2">Educational</span>, with a focus on reliability and <span id="W_Spec">Access daily quizzes covering various topics and stay updated with one-liner current affairs in Marathi. We provide tailored resources to enhance your preparation, ensuring you're equipped with the knowledge and confidence to ace the exam. Start your journey to success today</span>. we strive to turn our passion for <span id="W_Type3">Educational</span> into a thriving website. We hope you enjoy our <span id="W_Type4">Educational</span> as much as we enjoy giving them to you.</p>
          <p>I will keep on posting such valuable and knowledgeable information on my Website for all of you. Your love and support matters a lot.</p>
          <p className="font-weight-bold text-center">Thank you For Visiting Our Site</p>
          <p className="text-center"><span style={{ color: 'blue', fontSize: '16px', fontWeight: 'bold' }}>Have a great day !</span></p>
        </div>
      </div>
      <Categories />
      <Footer />
    </div>
  );
};

export default AboutUs;
