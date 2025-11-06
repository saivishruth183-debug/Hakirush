import React from 'react'
import { motion } from 'framer-motion'
import Ceremoney from '../assets/Ceremoney.jpg'
import Celebration from '../assets/Team Celebration.webp'
import Team from '../assets/team.jpg'
import Trophy from '../assets/trophy.jpeg'

const aboutimg = [
  { image: Ceremoney },
  { image: Celebration },
  { image: Team },
  { image: Trophy }
]

const About = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-extrabold mb-6" style={{ color: '#C21807' }}>
            Who We Are
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            HAKIRUSH SPORTS AND EVENTS LLP is a corporate sports and wellness management company.
            We build experiences that inspire teamwork, wellness, and motivation — through sports.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Active in Bangalore, Hyderabad, and other metros, HAKIRUSH is redefining corporate engagement.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold" style={{ color: '#C21807' }}>Vision</h3>
              <p className="text-gray-700">
                To be India’s leading corporate sports experience brand, inspiring teams through competition and collaboration.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold" style={{ color: '#C21807' }}>Mission</h3>
              <p className="text-gray-700">
                To unleash the spirit of teamwork, fitness, and camaraderie through organized sports experiences.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold" style={{ color: '#C21807' }}>Tagline</h3>
              <p className="font-semibold italic text-gray-800">
                “Unleashing Team Spirit Through Sports.”
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE COLLAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          {aboutimg.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <img
                src={item.image}
                alt="Hakirush Team"
                className="w-full h-56 rounded-xl shadow-md object-cover object-center transition-transform duration-300 hover:shadow-xl hover:scale-[1.03]"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About
