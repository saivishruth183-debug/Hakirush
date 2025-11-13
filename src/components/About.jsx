import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import Cricket from '../assets/About/Women.jpg'
import Treeking from '../assets/About/treeking.png'
import Team from '../assets/About/team.jpg'
import Marathon from '../assets/About/marathon.png'
import { Eye, Lightbulb, Target, Building2, Trophy, Users } from "lucide-react";

const aboutimg = [
  { image: Cricket },
  { image: Treeking },
  { image: Marathon },
  { image: Team },
]

const about = [
  {
    icon: <Lightbulb className="text-[#C21807]" size={24} />,
    title: "Vision",
    description: "To be India's leading corporate sports experience brand, inspiring teams through competition and collaboration."
  },
  {
    icon: <Target className="text-[#C21807]" size={24} />,
    title: "Mission",
    description: "To unleash the spirit of teamwork, fitness, and camaraderie through organized sports experiences."
  },
]

const About = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center mb-20">

          {/* LEFT TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[#C21807]/10 text-[#C21807] px-4 py-2 rounded-full text-sm font-semibold shadow-md border border-[#C21807]/20"
            >
              <div className="w-2 h-2 rounded-full bg-[#C21807] animate-pulse" />
              About Us
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent">
                Who We Are
              </span>
            </h2>

            <div className="space-y-4">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <span className="font-bold text-[#C21807]">HAKIRUSH SPORTS AND EVENTS LLP</span> is a corporate sports and wellness management company.
                We build experiences that inspire <span className="font-semibold text-[#C21807]">teamwork</span>, <span className="font-semibold text-[#C21807]">wellness</span>, and <span className="font-semibold text-[#C21807]">motivation</span> — through sports.
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Active in <span className="font-semibold text-gray-900">Bangalore, Hyderabad, and other metros</span>, HAKIRUSH is redefining corporate engagement.
              </p>
            </div>
          </motion.div>

          {/* RIGHT IMAGE COLLAGE - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative"
          >
            
            <div className="relative grid grid-cols-2 gap-4 max-w-lg mx-auto">
              {aboutimg.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 200,
                    delay: index * 0.1 
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: window.innerWidth >= 768 ? 1.03 : 1,
                    y: window.innerWidth >= 768 ? -8 : 0
                  }}
                  className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 ring-2 ring-white/50 group cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={`Hakirush Sports Event ${index + 1}`}
                    loading="lazy"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* VISION & MISSION - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-10">
          {about.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: window.innerWidth >= 768 ? 1.03 : 1,
                y: window.innerWidth >= 768 ? -8 : 0
              }}
              className="flex-1 relative bg-linear-to-br from-white via-white to-[#C21807]/5 shadow-2xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 px-10 sm:px-12 py-12 sm:py-16 rounded-3xl border-2 border-[#C21807]/10 group overflow-hidden cursor-pointer"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C21807]/5 rounded-bl-full"></div>
              
              {/* Animated Background on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-[#C21807]/0 to-[#C21807]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon and Title in Row */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-linear-to-br from-[#C21807]/20 to-[#C21807]/30 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-4 bg-linear-to-br from-[#C21807]/10 to-[#C21807]/20 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold">
                    <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent">
                      {item.title}
                    </span>
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STATS - Enhanced */}
      <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Building2, label: "Companies Engaged", value: 20, color: "from-blue-500 to-blue-600" },
            { icon: Trophy, label: "Events Organized", value: 50, color: "from-green-500 to-green-600" },
            { icon: Users, label: "Employees Impacted", value: 1000, color: "from-purple-500 to-purple-600" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: window.innerWidth >= 768 ? 1.03 : 1,
                y: window.innerWidth >= 768 ? -8 : 0
              }}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 border border-gray-100 px-4 py-8 group overflow-hidden cursor-pointer"
            >
              
              <div className="relative z-10 text-center">
                <div className="mb-3 flex justify-center">
                  <stat.icon className="text-[#C21807] group-hover:scale-110 transition-transform duration-300" size={40} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold mb-2">
                  <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent">
                    {stat.value}+
                  </span>
                </div>
                <p className="text-gray-600 font-semibold text-xs sm:text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default About
