import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, Eye, Crosshair, Lightbulb, Bolt, Trophy, Award, Camera, BarChart3, Quote, Handshake, Briefcase, MapPin, Clock } from "lucide-react";

const mission = [
  { icon:<Target className="w-8 h-8 text-red-600" />, title: "Mission", description: "To unleash team spirit through thoughtfully designed sports experiences that drive employee wellbeing, collaboration and long-term loyalty."},
  { icon:<Eye className="w-8 h-8 text-red-600" />, title: "Vision", description: "To be India's most trusted corporate sports partner — delivering repeatable ROI in employee engagement and employer branding."},
]

const founding = [
  { icon:<Crosshair className="w-6 h-6 text-red-600" />, title: "Why we started", description: "To solve a real problem: disengaged teams, growing employee isolation after remote work, and HR teams stretched thin."},
  { icon:<Lightbulb className="w-6 h-6 text-red-600" />, title: "What we learned", description: "Small, well-run events create outsized cultural impact — trust and collaboration increase far faster than through remote initiatives."},
  { icon:<Bolt className="w-6 h-6 text-red-600" />, title: "How we operate", description: "End-to-end delivery: strategy, venue, ops, production, content & measurement."},
]

const team = [
  { image: "/images/team-krishna.jpg", name: "Krishna", role: "Founder - Strategy & Growth" },
  { image: "/images/team-lakshmi.jpg", name: "Lakshmi", role: "Marketing - Content & Social" },
  { image: "/images/team-vishruth.jpg", name: "Vishruth", role: "Tech - Product & Site" },
  { image: "/images/team-anisha.jpg", name: "Anisha", role: "Social - Design & Content" },
]

export default function About() {
  return (
    <div className="bg-white overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-red-600 via-red-700 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              About <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">HAKIRUSH</span>
            </h1>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-sm sm:text-base md:text-md text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              HAKIRUSH is a corporate sports management company designed for today's fast-moving, post-COVID work culture. While most companies struggle to create real team bonding and employee engagement, we bring organizations together through professionally executed, high-energy sports experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {mission.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 200,
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                  y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
                }}
                className="group p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-slate-100 hover:border-red-300">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">Our <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">{item.title}</span></h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">
                {item.description}
              </p>
            </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Founding story */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900">Our <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Story</span></h2>
          <div className="max-w-4xl mx-auto mt-6">
            <p className="text-sm sm:text-base md:text-md text-gray-700 leading-relaxed font-medium">
              HAKIRUSH began as a simple idea: bring professional sporting experiences
              to corporate teams in a way that's effortless for HR and unforgettable
              for employees. Founded by professionals who love sport and corporate
              culture, we combined event management, digital storytelling, and
              scalable operations to create a model that works for both startups and
              enterprise companies.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founding.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-red-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="font-bold text-2xl text-slate-900">{item.title}</h4>
              </div>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team (short bios) */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">Meet the <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Team</span></h2>
          <p className="text-slate-600 text-center text-lg max-w-3xl mx-auto mt-3">
            A small cross-functional team with expertise in events, operations,
            marketing and partnerships.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 200,
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                  y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
                }}
                className="group bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-slate-100 group-hover:border-red-300 transition-all duration-300 shadow-lg"
                  />
                </div>
                <h5 className="text-xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent mb-2">{member.name}</h5>
                <p className="text-sm text-slate-600 leading-relaxed">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work - process */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">How We <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Work</span></h2>
        <p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mt-3">
          We follow a simple 5-step process to ensure flawless delivery and
          measurable impact.
        </p>

        <ol className="mt-6 space-y-4 text-slate-700">
          <motion.li
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200,
              delay: 0 * 0.1 
            }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border-l-4 border-red-600 hover:bg-slate-100 transition-colors"
          >
            <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-red-600 text-white font-bold rounded-full">1</span>
            <div>
              <strong className="text-slate-900 text-lg">Discovery:</strong>
              <p className="mt-1 text-slate-600">We understand your people, culture and KPIs.</p>
            </div>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200,
              delay: 1 * 0.1 
            }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border-l-4 border-red-600 hover:bg-slate-100 transition-colors"
          >
            <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-red-600 text-white font-bold rounded-full">2</span>
            <div>
              <strong className="text-slate-900 text-lg">Design:</strong>
              <p className="mt-1 text-slate-600">Custom event plan, formats, schedules and branding options.</p>
            </div>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200,
              delay: 2 * 0.1 
            }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border-l-4 border-red-600 hover:bg-slate-100 transition-colors"
          >
            <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-red-600 text-white font-bold rounded-full">3</span>
            <div>
              <strong className="text-slate-900 text-lg">Delivery:</strong>
              <p className="mt-1 text-slate-600">Venue, logistics, referees, safety and on-ground ops.</p>
            </div>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200,
              delay: 3 * 0.1 
            }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border-l-4 border-red-600 hover:bg-slate-100 transition-colors"
          >
            <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-red-600 text-white font-bold rounded-full">4</span>
            <div>
              <strong className="text-slate-900 text-lg">Content &amp; Reach:</strong>
              <p className="mt-1 text-slate-600">Photo, reels, streaming and social amplification.</p>
            </div>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200,
              delay: 4 * 0.1 
            }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border-l-4 border-red-600 hover:bg-slate-100 transition-colors"
          >
            <span className="shrink-0 w-8 h-8 flex items-center justify-center bg-red-600 text-white font-bold rounded-full">5</span>
            <div>
              <strong className="text-slate-900 text-lg">Measure &amp; Scale:</strong>
              <p className="mt-1 text-slate-600">Feedback, participation metrics and scaling plan for next cycles.</p>
            </div>
          </motion.li>
        </ol>
      </section>

      {/* Impact metrics */}
      <section className="bg-gradient-to-b from-red-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3">Impact & <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Metrics</span></h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            We track real outcomes — participation, NPS, retention signals and
            media reach.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 0 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-14 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent mb-3">1,200+</div>
              <div className="text-base font-semibold text-slate-700">Employees Engaged</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 1 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-14 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent mb-3">85%</div>
              <div className="text-base font-semibold text-slate-700">Average Participation</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 2 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-14 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent mb-3">4.8/5</div>
              <div className="text-base font-semibold text-slate-700">Average Event Rating</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 3 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-14 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent mb-3">500k+</div>
              <div className="text-base font-semibold text-slate-700">Social Impressions</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services detail (more than home) */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">Our <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Services</span></h2>
          <p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mt-3">
            The homepage lists our core offers. Below are the deeper service
            details you won't find on the home page.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 0 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Custom Sports Programming</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Monthly rotating sports, tournament formats, mixed-teaming, and
                multi-location leagues tailored to your calendar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 1 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Branding &amp; Sponsorship</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Sponsor dashboards, co-branding kits, merchandise sponsorship and
                partner activation management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 2 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Camera className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Content &amp; Media</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Live streaming, short-form reels, highlight reels, post-event
                reports and branded media assets for recruitment & employer
                branding.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 3 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Data &amp; Measurement</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Participation dashboards, NPS capture, demographic reporting and
                impact reports for HR leadership.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">What Companies <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Say</span></h2>
          <p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mt-3">
            Hear from HR leaders and operations teams who have transformed their company culture with HAKIRUSH.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <motion.blockquote
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 0 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-slate-700 leading-relaxed text-base mt-4 mb-4">
                "HAKIRUSH organised a flawless tournament for our 200 employees.
                The energy was instant — people were talking across teams the
                next week."
              </p>
              <div className="pt-4 border-t border-slate-100">
                <p className="font-bold text-slate-900">HR Lead</p>
                <p className="text-sm text-slate-600">FinTech Company</p>
              </div>
            </motion.blockquote>

            <motion.blockquote
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 1 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-slate-700 leading-relaxed text-base mt-4 mb-4">
                "Well-run, professional and great content. Our leadership loved
                the visibility."
              </p>
              <div className="pt-4 border-t border-slate-100">
                <p className="font-bold text-slate-900">Operations Head</p>
                <p className="text-sm text-slate-600">Infrastructure Company</p>
              </div>
            </motion.blockquote>

            <motion.blockquote
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 2 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-slate-700 leading-relaxed text-base mt-4 mb-4">
                "Best employee engagement event we did this year."
              </p>
              <div className="pt-4 border-t border-slate-100">
                <p className="font-bold text-slate-900">People Team</p>
                <p className="text-sm text-slate-600">EdTech Startup</p>
              </div>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Partners & Press */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shadow-lg">
                <Handshake className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                Partners & <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Press</span>
              </h2>
            </div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-3">
              We partner with venues, sports suppliers, media partners and corporate
              sponsors to deliver scaled events.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 0 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300 flex items-center justify-center"
            >
              <img src="/images/partner-1.png" alt="partner" className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 1 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300 flex items-center justify-center"
            >
              <img src="/images/partner-2.png" alt="partner" className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 2 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300 flex items-center justify-center"
            >
              <img src="/images/partner-3.png" alt="partner" className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 3 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300 flex items-center justify-center"
            >
              <img src="/images/partner-4.png" alt="partner" className="h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="bg-gradient-to-b from-red-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
                Careers & <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Open Roles</span>
              </h2>
            </div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-3">
              We're scaling. If you love operations, events or content, we'd love
              to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 0 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Event Coordinator</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Bengaluru</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Full-time</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Briefcase className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Operations</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg">
                Apply Now
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 1 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Content Producer</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Hyderabad</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Contract</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Briefcase className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Media</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg">
                Apply Now
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 2 * 0.1 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-slate-900 mb-4">Sales & Partnerships</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Remote</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Full-time</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Briefcase className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Business Development</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg">
                Apply Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
