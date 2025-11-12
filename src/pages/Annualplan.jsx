import React from 'react'
import { motion } from 'framer-motion'
import Marathon from '../assets/Run.png'
import Football from '../assets/football.png'
import Badminton from '../assets/doublebadmention.png'
import Cricket from '../assets/cricket6s.png'
import Table from '../assets/Tabletennis.png'
import Yoga from '../assets/yoga.png'
import Volleyball from '../assets/volleyball.png'
import Chess from '../assets/chess.png'
import Fitness from '../assets/bootcamp.png'
import Relay from '../assets/relayrun.png'
import Olympics from '../assets/Olympics.png'
import Finale from '../assets/allstar.png'
import { Link } from 'react-router-dom'

const plans = [
  { month: "January", title: "Corporate Marathon", image: Marathon },
  { month: "February", title: "Football League", image: Football },
  { month: "March", title: "Badminton Doubles", image: Badminton },
  { month: "April", title: "Cricket 6s", image: Cricket },
  { month: "May", title: "Table Tennis Challenge", image: Table },
  { month: "June", title: "Yoga & Wellness Day", image: Yoga },
  { month: "July", title: "Volleyball / Throwball", image: Volleyball },
  { month: "August", title: "Mini Olympics", image: Olympics },
  { month: "September", title: "Indoor Games Challenge", image: Chess },
  { month: "October", title: "Fitness Bootcamp", image: Fitness },
  { month: "November", title: "Relay Run", image: Relay },
  { month: "December", title: "All-Star Grand Finale", image: Finale },
]

const details = [
  {
    id: 1,
    title: "Included in the Annual Package",
    des1: "Venue, sports kits & professional umpires",
    des2: "Drone videography & monthly highlight reels",
    des3: "Certificates, medals & recognition",
    des4: "Event coverage on HAKIRUSH social media",
    des5: "Leaderboard & engagement dashboard",
  },
  {
    id: 2,
    title: "Benefits",
    des1: "12 months of seamless employee engagement",
    des2: "Morale and fitness boost across teams",
    des3: "Stronger communication and team synergy",
    des4: "Zero headaches for HR — we manage everything",
    des5: "Brand exposure & positive workplace culture",
  },
]

const Annualplan = () => {
  return (
    <div className="relative bg-white overflow-hidden">

      {/* Global background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,0,0,0.06), transparent 60%), radial-gradient(circle at bottom right, rgba(255,102,0,0.05), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 90%)"
        }}
      />

      <section className="py-16 relative overflow-hidden">
          {/* Absolute positioned background gradients */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,0,0,0.06), transparent 60%), radial-gradient(circle at bottom right, rgba(255,102,0,0.05), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 90%)'
            }}
          />

          {/* Max-width container for content */}
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            {/* Header - motion.div with new animation and reduced padding for centering */}
            <motion.div
              initial={{ opacity: 0, y: -60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto relative z-10" // Removed 'p-10' as section handles vertical padding
            >
              <h1 className="text-4xl font-extrabold text-gray-800">
                Annual Package — <span className="text-[#C21807]">12 Months. 12 Sports.</span> One Unstoppable Team.
              </h1>

              <p className="text-gray-600 text-lg mt-5">
                A year-long engagement program designed for organizations that believe in
                consistent team connection and active employee culture.
                Each month brings a new sport, a new challenge, and a stronger team.
              </p>
            </motion.div>
          </div>
        </section>

      {/* Monthly Schedule */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="px-10 sm:px-20 mt-16 relative z-10"
      >
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,0,0,0.06), transparent 60%), radial-gradient(circle at bottom right, rgba(255,102,0,0.05), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 90%)'
            }}
          />
        <h2 className="text-2xl font-bold text-[#C21807] mb-8">Monthly Activity Calendar</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 cursor-pointer">
          {plans.map((item, index) => (
            <div 
              key={index} 
              className="group relative rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:shadow-red-400 transition hover:-translate-y-1 aspect-square"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white group-hover:text-red-600 text-center">
                <h3 className="font-bold">{item.month}</h3>
                <p className="text-sm mt-1">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div 
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="px-10 sm:px-20 mt-20 relative z-10"
      >
        <div className="grid md:grid-cols-2 gap-10">
          {details.map((item) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ type: 'spring', stiffness: 50 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-red-400 hover:shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-bold text-[#C21807] mb-4">{item.title}</h3>

              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                {Object.values(item).slice(2).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div 
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center my-16 relative z-10"
      >
        <Link 
          to="/contact" 
          className="px-8 py-3 text-white bg-red-600 hover:bg-red-700 transitions rounded-full text-lg font-semibold shadow-lg cursor-pointer"
        >
          Subscribe to Annual Package data
        </Link>
      </motion.div>

    </div>
  )
}

export default Annualplan
