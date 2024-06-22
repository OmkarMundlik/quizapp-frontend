import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ArticleComp from '../components/ArticleComp'
import Footer from '../components/Footer'
import ArticleMain from './ArticleMain'
import AllArticles from './AllArticles'
import Spinner from '../components/Spinner'
import AboutUs from './AboutUs'
import SubHero from '../components/SubHero'
import { Link } from 'react-router-dom'

export default function Main() {
  const hostname = process.env.HOST;
  return (
    <div>
      <Navbar />
      <Hero />
      <SubHero />
      <Footer />
    </div>
  )
}
