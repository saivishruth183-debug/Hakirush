import React from 'react'
import Hero from '../components/Hero'
import Whyhakirush from '../components/Whyhakirush'
import Newsletter from '../components/Newsletter'
import Sponsor from '../components/Sponsor';
import Roadtoglory from '../components/Roadtoglory';
import Partners from '../components/Partners';
import backgroundVideo from '../assets/Hero/Home.mp4';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <div>
        {/* Video Background */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <video
              src={backgroundVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
          </div>
        <Whyhakirush />
        <Roadtoglory />
        <Sponsor />
        <Partners />
        <Newsletter />
      </div>
    </div>
  )
}

export default Home