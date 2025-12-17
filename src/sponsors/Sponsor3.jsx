import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Award, Users, Eye, TrendingUp, Star, CheckCircle, Handshake, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

const Sponsor3 = () => {
  const navigate = useNavigate()

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-3 md:pt-10 md:pb-6">
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-white border border-[#C21807]/30 shadow-sm hover:shadow-md text-[#C21807] hover:bg-[#C21807]/5 text-xs sm:text-sm md:text-base font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
          <span className="whitespace-nowrap">Back to Sponsors</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className='relative py-6 sm:py-10 overflow-hidden bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className='text-center'
          >
            {/* Badge */}
            <div className='inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6 sm:mb-8'>
              <Trophy className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C21807]' />
              <span className='text-xs sm:text-sm font-bold text-[#C21807]'>Merchandise Partner</span>
            </div>

            {/* Icon and Title in Row */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3 md:gap-4 mb-4 sm:mb-6'>
              <div className='inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl md:rounded-3xl bg-linear-to-r from-[#C21807] to-[#A01506] shadow-2xl shrink-0'>
                <Award className='w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white' />
              </div>
              <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight text-center sm:text-left'>
                TeamWear{" "}
                <span className='bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm'>
                  Apparel
                </span>
              </h1>
            </div>
            
            <p className='mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium px-2'>
              Creating custom branded sportswear for unforgettable tournament experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Metrics */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {[
              { icon: <Eye className='w-8 h-8' />, value: '25K+', label: 'Apparel Units' },
              { icon: <Users className='w-8 h-8' />, value: '5K+', label: 'Teams Outfitted' },
              { icon: <TrendingUp className='w-8 h-8' />, value: '200+', label: 'Custom Designs' },
              { icon: <Star className='w-8 h-8' />, value: '98%', label: 'Quality Rating' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='bg-white p-8 rounded-2xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-300 text-center border border-gray-100'
              >
                <div className='inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-700 rounded-2xl mb-4'>
                  {stat.icon}
                </div>
                <h3 className='text-3xl font-bold text-gray-900 mb-2'>{stat.value}</h3>
                <p className='text-gray-600 font-medium'>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Details */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl md:text-4xl font-black text-gray-900 mb-4'>
              Partnership <span className='bg-linear-to-r from-[#C21807] to-[#A01506] bg-clip-text text-transparent'>Offerings</span>
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Premium custom sportswear solutions for corporate teams
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className='bg-linear-to-br from-gray-50 to-gray-100 p-8 rounded-3xl border border-gray-200'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6'>Product Range</h3>
                <div className='space-y-4'>
                  {[
                    'Custom team jerseys',
                    'Performance sportswear',
                    'Branded merchandise',
                    'Tournament trophies & medals',
                    'Event accessories & gear'
                  ].map((item, i) => (
                    <div key={i} className='flex items-start gap-3'>
                      <CheckCircle className='w-6 h-6 text-[#C21807] shrink-0 mt-0.5' />
                      <span className='text-gray-700 font-medium'>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className='bg-linear-to-br from-[#C21807] to-[#A01506] p-8 rounded-3xl text-white shadow-2xl'>
                <h3 className='text-2xl font-bold mb-6'>Partnership Value</h3>
                <div className='space-y-6'>
                  <div>
                    <div className='text-4xl font-black mb-2'>₹18L+</div>
                    <p className='text-white/90'>Annual merchandise value</p>
                  </div>
                  <div>
                    <div className='text-4xl font-black mb-2'>90+</div>
                    <p className='text-white/90'>Events merchandised</p>
                  </div>
                  <div>
                    <div className='text-4xl font-black mb-2'>40+</div>
                    <p className='text-white/90'>Corporate collaborations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Statement */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-gray-100'
          >
            <div className='absolute top-8 right-8 w-16 h-16 rounded-full bg-[#C21807]/10 flex items-center justify-center'>
              <Handshake className='w-8 h-8 text-[#C21807]' />
            </div>
            <div className='relative'>
              <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>Merchandise Partnership</h3>
              <p className='text-lg text-gray-700 leading-relaxed mb-6'>
                TeamWear Apparel has been crafting custom sportswear for HAKIRUSH events since 2021. Their expertise in design and quality manufacturing ensures every team looks professional and feels confident on the field.
              </p>
              <p className='text-lg text-gray-700 leading-relaxed'>
                From concept to delivery, TeamWear handles all aspects of tournament merchandise, making branded apparel a key part of the HAKIRUSH experience that participants cherish long after the games end.
              </p>
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 rounded-full bg-linear-to-br from-[#C21807] to-[#A01506] flex items-center justify-center text-white text-2xl font-bold'>
                    TW
                  </div>
                  <div>
                    <div className='font-bold text-gray-900 text-lg'>TeamWear Apparel</div>
                    <div className='text-gray-600'>Merchandise Partner - Since 2021</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Sponsor3
