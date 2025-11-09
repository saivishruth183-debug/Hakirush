import React from 'react'
import { motion } from 'framer-motion'
import Cricket from '../assets/Women.jpg'
import Treeking from '../assets/treeking.png'
import Team from '../assets/team.jpg'
import Marathon from '../assets/marathon.png'
import { Eye, Lightbulb, Target } from "lucide-react";

const aboutimg = [
  { image: Cricket },
  { image: Treeking },
  { image: Marathon },
  { image: Team },
]

const about = [
  {
    icon: <Lightbulb className="text-red-600" size={30} />,
    title: "Vision",
    description: "To be India’s leading corporate sports experience brand, inspiring teams through competition and collaboration."
  },
  {
    icon: <Target className="text-red-600" size={30} />,
    title: "Mission",
    description: "To unleash the spirit of teamwork, fitness, and camaraderie through organized sports experiences."
  },
]

const About = () => {
  return (
    <section className="relative py-28 bg-[#FFF5F5] overflow-hidden">

      {/* Decorative Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C21807]/15 via-transparent to-transparent blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* LEFT TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#C21807]">
            Who We Are
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            HAKIRUSH SPORTS AND EVENTS LLP is a corporate sports and wellness management company.
            We build experiences that inspire teamwork, wellness, and motivation — through sports.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            Active in Bangalore, Hyderabad, and other metros, HAKIRUSH is redefining corporate engagement.
          </p>
        </motion.div>

        {/* RIGHT IMAGE COLLAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-5"
        >
          {aboutimg.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.04] transition transform"
            >
              <img
                src={item.image}
                alt="Hakirush Team"
                className="w-full h-56 md:h-60 object-cover object-center cursor-pointer"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* VISION & MISSION */}
      <div className="mt-24 px-6 flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-14">
        {about.map((item,index)=>(
          <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
                className="w-full md:w-1/3 bg-white shadow-lg px-10 py-14 rounded-2xl hover:shadow-red-400 transition cursor-pointer"
        >
          <h3 className="flex items-center gap-4 text-2xl font-extrabold mb-5 text-black transition"><span className='p-3 bg-red-200 rounded'>{item.icon}</span> {item.title}</h3>
          <p className="text-gray-600 transition leading-relaxed">{item.description}</p>
        </motion.div>
        ))}
      </div>
        
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
          {[
            { icon: "🏢", label: "Companies Engaged", value: 20 },
            { icon: "⚽", label: "Events Organized", value: 50 },
            { icon: "🎖", label: "Employees Impacted", value: 1000 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ type: 'spring', stiffness: 200 }}
              viewport={{ once: true }}
              className=" bg-white rounded-xl shadow-md border border-gray-100 py-10 hover:shadow-xl hover:shadow-red-400 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-2 group-hover:text-white transition-colors">
                {stat.icon}
              </div>

              <div className="text-3xl font-bold text-[#C21807] transition-colors">
                {stat.value}+
              </div>

              <p className="text-sm mt-1 text-gray-600 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
    </section>
  )
}

export default About
