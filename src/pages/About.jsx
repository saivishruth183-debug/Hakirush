import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, Eye, Crosshair, Lightbulb, Bolt, Trophy, Award, Camera, BarChart3, Quote, Handshake, Briefcase, MapPin, Clock, Users } from "lucide-react";
import Vishruth from "../assets/Team/vishruth.png";
import Lakshmi from "../assets/Team/lakshmi.png";
import Ajmeri from "../assets/Team/ajmeri.png";

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
  { image: Vishruth, name: "Vishruth", role: "Tech - Product & Site" },
  { image: Lakshmi, name: "Lakshmi", role: "Marketing - Content & SMM" },
  { image: "/images/team-madan.jpg", name: "Madan", role: "Social - Design & Content" },
  { image: Ajmeri, name: "Ajmeri", role: "Founder - Strategy & Growth" },
  { image: "/images/team-likita.jpg", name: "Likhita", role: "Marketing - Content & SMM" },
  { image: "/images/team-anisha.jpg", name: "Anisha", role: "Social - Design & Content" },
  { image: "/images/team-anooj.jpg", name: "Anooj Paluri", role: "Social - Design & Content" },
]

const work = [
  { id: 1, title: "Discovery", description: "We understand your people, culture and KPIs."},
  { id: 2, title: "Design", description: "Custom event plan, formats, schedules and branding options."},
  { id: 3, title: "Delivery", description: "Venue, logistics, referees, safety and on-ground ops."},
  { id: 4, title: "Content & Reach", description: "Photo, reels, streaming and social amplification."},
  { id: 5, title: "Measure & Scale", description: "Feedback, participation metrics and scaling plan for next cycles."},
]

const metrics = [
  { value: "85%", label: "Average Participation" },
  { value: "1,200+", label: "Employees Engaged" },
  { value: "4.8/5", label: "Average NPS" },
  { value: "50+", label: "Events Delivered" },
]

const services = [
  { icon: <Trophy className="w-7 h-7 text-red-600" />, title: "Custom Sports Tournaments", description: "Monthly rotating sports, tournament formats, mixed-teaming, and multi-location leagues tailored to your calendar."},
  { icon: <Award className="w-7 h-7 text-red-600" />, title: "Branding &amp; Sponsorship", description: "Sponsor dashboards, co-branding kits, merchandise sponsorship and partner activation management."},
  { icon: <Camera className="w-7 h-7 text-red-600" />, title: "Content &amp; Media", description: "Live streaming, short-form reels, highlight reels, post-event reports and branded media assets for recruitment & employer branding."},
  { icon: <BarChart3 className="w-7 h-7 text-red-600" />, title: "Data &amp; Measurement", description: "Participation dashboards, NPS capture, demographic reporting and impact reports for HR leadership."},
]

const testimonials = [
  { queue: '"HAKIRUSH organised a flawless tournament for our 200 employees. The energy was instant — people were talking across teams the next week."', title: "HR Lead", company: "FinTech Company" },
  { queue: '"Well-run, professional and great content. Our leadership loved the visibility."', title: "Operations Head", company: "Infrastructure Company" },
  { queue: '"Best employee engagement event we did this year."', title: "People Team", company: "EdTech Startup" },
]

const partners = [
  { img: "/images/partner-1.png" },
  { img: "/images/partner-2.png" },
  { img: "/images/partner-3.png" },
  { img: "/images/partner-4.png" },
]

const careers = [
  { title: "Event Coordinator", location: "Bengaluru", type: "Full-time", coordinator: "Operations" },
  { title: "Content Producer", location: "Hyderabad", type: "Contract", coordinator: "Media" },
  { title: "Sales & Partnerships", location: "Remote", type: "Full-time", coordinator: "Business Development" },
]

export default function About() {
  return (
    <div className="bg-white overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-12 md:pb-16 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-600 via-red-700 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
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
      <section className="bg-gradient-to-b from-white to-slate-50 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
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
                className="group p-6 sm:p-8 md:p-10 bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-red-200 transition-all duration-500 border-2 border-slate-100 hover:border-red-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">{item.title}</span></h3>
              </div>
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                {item.description}
              </p>
            </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Founding story */}
      <section className="relative py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900">Our <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Story</span></h2>
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
              className="group p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-red-200 transition-all duration-500 border border-slate-100 hover:border-red-300">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="font-bold text-xl sm:text-2xl text-slate-900">{item.title}</h4>
              </div>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team (short bios) */}
      <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.03),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.03),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-red-50 border border-red-100 mb-3 sm:mb-4 md:mb-6">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              <span className="text-xs sm:text-sm font-semibold text-red-600">Our Amazing Team</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center mb-3 sm:mb-4 md:mb-5 px-4">
             Meet the <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Dream Team</span>
            </h2>
            <p className="text-slate-600 text-center text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4 leading-relaxed">
              A passionate cross-functional team with expertise in events, operations,
              marketing and partnerships, dedicated to making every event extraordinary.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-14 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 180,
                  damping: 15,
                  delay: index * 0.08 
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.05 : 1,
                  y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -12 : 0,
                  rotateY: typeof window !== 'undefined' && window.innerWidth >= 768 ? 5 : 0
                }}
                className="group relative bg-gradient-to-br from-white to-slate-50/50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-slate-100 hover:border-red-200 overflow-hidden"
              >
                {/* Background gradient effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 via-red-50/0 to-red-100/0 group-hover:from-red-50/30 group-hover:via-red-50/10 group-hover:to-transparent transition-all duration-500 rounded-xl sm:rounded-2xl lg:rounded-3xl"></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-100/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="relative mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                    {/* Animated ring around avatar */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[85px] h-[85px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] lg:w-[150px] lg:h-[150px] rounded-full border-2 border-red-200/0 group-hover:border-red-300/40 group-hover:scale-110 transition-all duration-500"></div>
                    </div>
                    
                    {/* Avatar with enhanced styling */}
                    <div className="relative mx-auto w-[70px] h-[70px] sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-200/30 to-red-100/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="relative w-full h-full rounded-full object-cover border-3 sm:border-4 border-white group-hover:border-red-100 transition-all duration-500 shadow-xl group-hover:shadow-2xl ring-1 sm:ring-2 ring-slate-100 group-hover:ring-red-200"
                      />
                      {/* Status indicator */}
                      <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-400 rounded-full border-2 sm:border-3 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
                    <h5 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent group-hover:from-red-700 group-hover:via-red-800 group-hover:to-red-700 transition-all duration-300 leading-tight">
                      {member.name}
                    </h5>
                    <div className="flex items-center justify-center">
                      <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 group-hover:text-slate-700 leading-snug sm:leading-relaxed font-medium transition-colors duration-300">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work - process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 sm:mb-4">How We <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Work</span></h2>
        <p className="text-center text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mt-2 sm:mt-3 px-4">
          We follow a simple 5-step process to ensure flawless delivery and
          measurable impact.
        </p>

        <ol className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-slate-700">
          {work.map((step, index) => (
            <motion.li
            key={index}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200,
              delay: 0 * 0.1 
            }}
            viewport={{ once: true }}
            className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg border-l-4 border-red-600 hover:bg-slate-100 transition-colors"
          >
            <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-red-600 text-white text-sm sm:text-base font-bold rounded-full">{step.id}</span>
            <div>
              <strong className="text-slate-900 text-base sm:text-lg">{step.title}:</strong>
              <p className="mt-1 text-sm sm:text-base text-slate-600">{step.description}</p>
            </div>
          </motion.li>
        ))}
        </ol>
      </section>

      {/* Impact metrics */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">Impact & <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Metrics</span></h2>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl mx-auto px-4">
            We track real outcomes — participation, NPS, retention signals and
            media reach.
          </p>

          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {metrics.map((metric, index) => (
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
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-6 sm:p-8 md:p-10 lg:p-14 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-200 transition-all duration-300 border-2 border-slate-100 hover:border-red-300 cursor-pointer"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent mb-2 sm:mb-3">{metric.value}</div>
              <div className="text-sm sm:text-base font-semibold text-slate-700">{metric.label}</div>
            </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services detail (more than home) */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 sm:mb-4">Our <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Services</span></h2>
          <p className="text-center text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mt-2 sm:mt-3 px-4">
            The homepage lists our core offers. Below are the deeper service
            details you won't find on the home page.
          </p>

          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
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
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-200 transition-all duration-300 border-2 border-slate-100 hover:border-red-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-100 to-red-50 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">{service.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16 md:py-20"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-3 sm:mb-4">What Companies <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Say</span></h2>
          <p className="text-center text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mt-2 sm:mt-3 px-4">
            Hear from HR leaders and operations teams who have transformed their company culture with HAKIRUSH.
          </p>
          <div className="mt-8 sm:mt-10 md:mt-12 grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
              key={index}
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
              className="group relative bg-white p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-200 transition-all duration-300 border-2 border-slate-100 hover:border-red-300 cursor-pointer"
            >
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base mt-3 sm:mt-4 mb-3 sm:mb-4">
                {testimonial.queue}
              </p>
              <div className="pt-3 sm:pt-4 border-t border-slate-100">
                <p className="text-sm sm:text-base font-bold text-red-600">{testimonial.title}</p>
                <p className="text-xs sm:text-sm text-slate-600">{testimonial.company}</p>
              </div>
            </motion.blockquote>
          ))}
          </div>
        </div>
      </section>

      {/* Partners & Press */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
                Partners & <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Press</span>
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mt-2 sm:mt-3 px-4">
              We partner with venues, sports suppliers, media partners and corporate
              sponsors to deliver scaled events.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {partners.map((partner, index) => (
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
                scale: typeof window !== 'undefined' && window.innerWidth >= 768 ? 1.03 : 1,
                y: typeof window !== 'undefined' && window.innerWidth >= 768 ? -8 : 0
              }}
              className="group bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:shadow-red-200 transition-all duration-300 border-2 border-slate-100 hover:border-red-300 flex items-center justify-center cursor-pointer"
            >
              <img src={partner.img} alt="partner" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900">
                Careers & <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent">Open Roles</span>
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mt-2 sm:mt-3 px-4">
              We're scaling. If you love operations, events or content, we'd love
              to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {careers.map((job, index) => (
              <motion.div
              key={index}
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
              className="group bg-white p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-200 transition-all duration-300 border-2 border-slate-100 hover:border-red-300"
            >
              <div className="mb-5 sm:mb-6">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{job.title}</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                    <span className="text-xs sm:text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-red-600 shrink-0" />
                    <span className="text-xs sm:text-sm">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Briefcase className="w-4 h-4 text-red-600 shrink-0" />
                    <span className="text-xs sm:text-sm">{job.coordinator}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-3 sm:mt-4 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
                Apply Now
              </button>
            </motion.div>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}
