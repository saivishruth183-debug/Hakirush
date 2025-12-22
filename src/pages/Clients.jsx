// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Star, Users, Building, Award, TrendingUp, Quote, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Amit from "../assets/Clients/Amit.png";
import Priya from "../assets/Clients/Priya.png";
import Rajesh from "../assets/Clients/Rajesh.png";
import Sarah from "../assets/Clients/Sarah.png";


const sponsers = [
  { id: 1, href: "/sponsors/sponsor1", name: "Sponser 1", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+1" },
  { id: 2, href: "/sponsors/sponsor2", name: "Sponser 2", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+2" },
  { id: 3, href: "/sponsors/sponsor3", name: "Sponser 3", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+3" },
  { id: 4, href: "/sponsors/sponsor4", name: "Sponser 4", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+4" },
  { id: 5, href: "/sponsors/sponsor5", name: "Sponser 5", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+5" },
];

const clients = [
  { id: 1, href: "/clients/client1", name: "Client 1", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Client+1" },
  { id: 2, href: "/clients/client2", name: "Client 2", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Client+2" },
  { id: 3, href: "/clients/client3", name: "Client 3", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Client+3" },
  { id: 4, href: "/clients/client4", name: "Client 4", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Client+4" },
  { id: 5, href: "/clients/client5", name: "Client 5", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Client+5" },
];

const testimonials = [
  {
    person: "Rajesh Kumar",
    position: "HR Director",
    message:
      "HAKIRUSH has revolutionized our employee engagement. The biweekly tournaments have created a buzz in the office that we never had before. Team morale is at an all-time high!",
    avatar:
      Rajesh,
    rating: 5,
  },
  {
    person: "Priya Sharma",
    position: "CEO",
    message:
      "The professional organization and competitive spirit that HAKIRUSH brings has made our company culture more vibrant. Our employees look forward to every tournament!",
    avatar:
      Priya,
    rating: 5,
  },
  {
    
    person: "Amit Patel",
    position: "Operations Manager",
    message:
      "Outstanding service delivery! Every tournament is executed flawlessly. The branded kits, professional coverage, and seamless coordination exceed our expectations.",
    avatar:
      Amit,
    rating: 5,
  },
  {

    person: "Sarah Johnson",
    position: "Head of People Operations",
    message:
      "HAKIRUSH has transformed how our teams collaborate. The inter-department competitions have broken down silos and created lasting friendships across our organization.",
    avatar:
      Sarah,
    rating: 5,
  },
];

export default function Clients() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(
      () =>
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length),
      10000
    );
    return () => clearInterval(timer);
  }, []);

  const handleClientClick = (href) => {
    if (href) {
      navigate(href);
    }
  };



  return (
    <div className="bg-gray-50 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-8 overflow-hidden bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Icon and Title in Row */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-linear-to-r from-[#C21807] to-[#A01506] shadow-2xl shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Our{" "}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                  Clients
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Trusted by leading companies to deliver exceptional corporate sports experiences 
              and build vibrant workplace cultures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 relative overflow-hidden bg-gray-50">
        <div className="hidden" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6">
              <TrendingUp className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Our Impact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
              By The{" "}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                Numbers
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building className="h-6 w-6 text-red-700" />,
                label: "Companies Trust Us",
                value: "50+",
                gradient: "from-[#C21807] to-[#A01506]",
              },
              {
                icon: <Users className="h-6 w-6 text-red-700" />,
                label: "Employees Engaged",
                value: "10K+",
                gradient: "from-[#A01506] to-[#C21807]",
              },
              {
                icon: <Award className="h-6 w-6 text-red-700" />,
                label: "Events Delivered",
                value: "500+",
                gradient: "from-[#C21807] to-[#A01506]",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.1 
                }}
                viewport={{ once: true }}
                className="group relative text-center bg-white rounded-3xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
              >
                {/* Background Effects removed for pure white */}
                <div className="hidden" aria-hidden="true" />
                <div className="hidden" aria-hidden="true" />

                <div className="relative p-10">
                  {/* Icon Badge */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#C21807] group-hover:to-[#A01506] group-hover:bg-clip-text transition-all duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 font-medium">{stat.label}</p>
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor LOGOS SECTION */}
      <section className="py-12 relative overflow-hidden bg-gray-50">
        <div className="hidden" aria-hidden="true"></div>

        <motion.div
          className="max-w-7xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-4">
              <Building className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Our Sponsors</span>
            </div>
          </div>

          <div className="relative overflow-hidden w-full py-10">
            {/* Infinite loop animation */}
            <motion.div
              className="flex items-center gap-10 whitespace-nowrap"
              animate={{ x: ["-100%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {/* First set */}
              {[...sponsers, ...sponsers].map((sponsor, index) => (
                <motion.div
                  key={`sponsor-${index}`}
                  whileHover={{ y: -8, scale: 1.05 }}
                  onClick={() => handleClientClick(sponsor.href)}
                  className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] border border-gray-100 cursor-pointer shrink-0 overflow-hidden transition-all duration-500"
                >
                  <div className="hidden" aria-hidden="true" />
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} - HAKIRUSH Sponsor`}
                    loading="lazy"
                    className="relative h-16 w-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
                </motion.div>
              ))}

              {/* Second set (duplicate for seamless loop) */}
              {[...sponsers, ...sponsers].map((sponsor, index) => (
                <motion.div
                  key={`sponsor-dup-${index}`}
                  whileHover={{ y: -8, scale: 1.05 }}
                  onClick={() => handleClientClick(sponsor.href)}
                  className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] border border-gray-100 cursor-pointer shrink-0 overflow-hidden transition-all duration-500"
                >
                  <div className="hidden" aria-hidden="true" />
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} - HAKIRUSH Sponsor`}
                    loading="lazy"
                    className="relative h-16 w-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Company LOGOS SECTION */}
      <section className="py-12 relative overflow-hidden bg-gray-50">
        <div className="hidden" aria-hidden="true"></div>

        <motion.div
          className="max-w-7xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-4">
              <Building className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Our Partners</span>
            </div>
          </div>

            <div className="relative overflow-hidden w-full py-10">
            {/* Infinite loop animation */}
            <motion.div
              className="flex items-center gap-10 whitespace-nowrap"
              animate={{ x: ["-100%", "-50%"] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {/* First set */}
              {[...clients, ...clients].map((client, index) => (
                <motion.div
                  key={`client-${index}`}
                  whileHover={{ y: -8, scale: 1.05 }}
                  onClick={() => handleClientClick(client.href)}
                  className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] border border-gray-100 cursor-pointer shrink-0 overflow-hidden transition-all duration-500"
                >
                  <div className="hidden" aria-hidden="true" />
                  <img
                    src={client.logo}
                    alt={`${client.name} - HAKIRUSH Client`}
                    loading="lazy"
                    className="relative h-16 w-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
                </motion.div>
              ))}

              {/* Second set (duplicate for seamless loop) */}
              {[...clients, ...clients].map((client, index) => (
                <motion.div
                  key={`client-dup-${index}`}
                  whileHover={{ y: -8, scale: 1.05 }}
                  onClick={() => handleClientClick(client.href)}
                  className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] border border-gray-100 cursor-pointer shrink-0 overflow-hidden transition-all duration-500"
                >
                  <div className="hidden" aria-hidden="true" />
                  <img
                    src={client.logo}
                    alt={`${client.name} - HAKIRUSH Client`}
                    loading="lazy"
                    className="relative h-16 w-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-12 relative overflow-hidden bg-gray-50">
        <div className="hidden" aria-hidden="true"></div>

        <motion.div
          className="max-w-5xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6">
              <MessageCircle className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Success Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
              What Our{" "}
              <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                Clients Say
              </span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              transition={{ duration: 0.6 }}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
            >
              {/* Background Effects removed for pure white */}
              <div className="hidden" aria-hidden="true" />
              <div className="hidden" aria-hidden="true" />

              <div className="relative p-6 md:p-12">
                {/* Quote Icon - responsive size/position for mobile */}
                <div className="absolute top-4 right-4 w-10 h-10 md:top-8 md:right-8 md:w-16 md:h-16 rounded-full bg-[#C21807]/10 flex items-center justify-center opacity-50">
                  <Quote className="w-5 h-5 md:w-8 md:h-8 text-[#C21807]" />
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-6 md:mb-8 text-center md:text-left">
                  <motion.img
                    src={testimonials[currentTestimonial].avatar}
                    alt={`${testimonials[currentTestimonial].person} - ${testimonials[currentTestimonial].position}`}
                    loading="lazy"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-lg shrink-0 border-2 border-[#C21807]/20 mx-auto md:mx-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                      {testimonials[currentTestimonial].person}
                    </h3>
                    <p className="text-gray-600 font-medium mb-2 text-sm md:text-base">
                      {testimonials[currentTestimonial].position}
                    </p>
                    <div className="flex gap-1 mt-3 justify-center md:justify-start">
                      {Array(testimonials[currentTestimonial].rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-sm md:text-lg text-gray-700 leading-relaxed italic relative pl-4 md:pl-6 border-l-2 md:border-l-4 border-[#C21807]">
                  "{testimonials[currentTestimonial].message}"
                </blockquote>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
