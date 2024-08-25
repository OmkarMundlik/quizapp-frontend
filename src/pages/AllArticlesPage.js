import React from 'react'
import Navbar from '../components/Navbar'
import AllArticles from './AllArticles'
import Footer from '../components/Footer'
import Categories from '../components/Categories'
import DisplayAd from '../components/DisplayAd'
import { Helmet } from 'react-helmet'

function AllArticlesPage() {
  return (
    <div>
            <Helmet>
        <title>Daily Current Affairs - Spardhaweb</title>
        <meta name="description" content="Stay updated with the latest daily current affairs in Marathi on Spardha Web. Get concise and informative updates to enhance your knowledge and exam preparation." />
        <meta name="keywords" content="daily current affairs, current affairs in Marathi, MPSC current affairs, daily news updates" />
        <meta property="og:title" content="Daily Current Affairs in Marathi - Spardha Web" />
        <meta property="og:description" content="Stay updated with the latest daily current affairs in Marathi on Spardha Web. Get concise and informative updates to enhance your knowledge and exam preparation." />
        <meta property="og:image" content="%PUBLIC_URL%/logo_.jpg" />
        <meta property="og:url" content="https://spardhaweb.com/articles" />
      </Helmet>

        <Navbar />
        <br />
        <br />
        <DisplayAd />
        <h1 className="text-center">Current Affairs</h1>
        <AllArticles />
        <Categories />
        <Footer />
    </div>
  )
}

export default AllArticlesPage;
