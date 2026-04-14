import React from 'react'
import Hero from '../components/Hero'
import Ourplans from '../components/Ourplans'
import Newsletter from '../components/Newsletter'
import Sponsor from '../components/Sponsor';
import Impact from '../components/Impact';
import Partners from '../components/Partners';

const Home = () => {
  return (
    <div>
      <Hero />
      <Ourplans />
      <Sponsor />
      <Impact />
      <Partners />
      <Newsletter />
    </div>
  )
}

export default Home
