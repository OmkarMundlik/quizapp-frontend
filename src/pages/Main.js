import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ArticleComp from '../components/ArticleComp'
import Footer from '../components/Footer'
import ArticleMain from './ArticleMain'
import AllArticles from './AllArticles'
import Spinner from '../components/Spinner'

export default function Main() {
  return (
    <div>
        <Navbar />
        <Hero />
        {/* <ArticleMain imageUrl={"https://buffer.com/library/content/images/2023/10/free-images.jpg"} heading={"Beautiful Lady"} text={"this is some text which i want  to display over here this is some text which i want  to display over here this is some text which i want  to display over here this is some text which i want  to display over here this is some text which i want  to display over here this is some text which i want  to display over here"} articles={articles}/> */}
        {/* <h2>Current Affairs</h2>
        <AllArticles /> */}
        <Footer />
    </div>
  )
}
