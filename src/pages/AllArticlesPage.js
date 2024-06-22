import React from 'react'
import Navbar from '../components/Navbar'
import AllArticles from './AllArticles'
import Footer from '../components/Footer'
import Categories from '../components/Categories'

function AllArticlesPage() {
  return (
    <div>
        <Navbar />
        <br />
        <br />
        <h1 className="text-center">Current Affairs</h1>
        <AllArticles />
        <Categories />
        <Footer />
    </div>
  )
}

export default AllArticlesPage;
