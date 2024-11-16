import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import SubHero from '../components/SubHero'
import MultiplexAd from '../components/MultiplexAd'
import { Helmet } from 'react-helmet'
import Socials from '../components/Socials'


export default function Main() {

  return (
    <div>
      <Helmet>
        <title>Spardhaweb: MPSC Preparation Website</title>
        <meta name="description" content="Access free MPSC test series on Spardha Web. Enhance your preparation with daily quizzes, current affairs updates, and tailored resources to excel in your MPSC exams. Start your free test series now and boost your preparation!" />
        <meta name="keywords" content="free MPSC test series, MPSC test series, free test series, MPSC exam preparation, daily quizzes, current affairs in Marathi" />

        {/* Open Graph Tags for Social Media */}
        <meta property="og:title" content="Spardhaweb: MPSC Preparation Website" />
        <meta property="og:description" content="Access free MPSC test series on Spardha Web. Enhance your preparation with daily quizzes, current affairs updates, and tailored resources to excel in your MPSC exams. Start your free test series now and boost your preparation!" />
        <meta property="og:image" content="%PUBLIC_URL%/logo_.jpg" />
        <meta property="og:url" content="https://spardhaweb.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spardhaweb" />
      </Helmet>

      <Navbar />
      <Socials />
      <Hero />
      <SubHero />
      <Footer />
    </div>
  )
}
