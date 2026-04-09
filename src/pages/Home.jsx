import React from 'react'
import Hero from '../components/Hero'
import Ourplans from '../components/Ourplans'
import Newsletter from '../components/Newsletter'
import Sponsor from '../components/Sponsor';

const Home = () => {
  return (
    <div>
      <Hero />
      <Ourplans />
      <Sponsor />
      <Newsletter />
    </div>
  )
}

export default Home
