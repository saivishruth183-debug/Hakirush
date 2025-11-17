import { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Star,
  Sparkles,
  Facebook,
} from "lucide-react";

void motion;

const contactDetails = {
  email: "krishna@hakirush.com",
  phone: "+91 7997110210",
  whatsapp: "+91 7997110210",
  address:
    "No. 472/7 Balaji Arcade, A.V.S. Compound, 20th L Cross Road, AVS Layout, Ejipura, Koramangala, Bengaluru, Karnataka -560095",
  hours: "Mon-Sat: 9:00 AM - 7:00 PM",
};

const socialLinks = [
  { icon: Facebook, url: "https://facebook.com/company/hakirush" },
  { icon: Instagram, url: "https://www.instagram.com/hakirush.sports_events/?hl=en" },
  { icon: Linkedin, url: "https://linkedin.com/company/hakirush" },
  { icon: Twitter, url: "https://x.com/Hakirush_sports?t=imr-ZZmYL7pGFek5b_8J9A&s=09" },
  { icon: Youtube, url: "https://www.youtube.com/@HakirushSportsEvents" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendMail = async () => {
    setLoading(true);
    try {
      await emailjs.send(
        "service_e0wk90a",
        "template_mpc32vt",
        formData,
        "TdZxUTpTA6byQ_J-p"
      );

      Swal.fire({
        icon: "success",
        title: "Submitted 🎉",
        text: "We’ll get back to you soon!",
        timer: 2500,
        showConfirmButton: false,
      });

      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Try later.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    sendMail();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-white text-gray-900"
    >

      <div className="bg-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-20 pb-15 md:py-24 overflow-hidden bg-white">
          {/* Floating decorative gradient orbs */}
          <div className="hidden" aria-hidden="true" />
          <div className="hidden" aria-hidden="true" />
          <div className="hidden" aria-hidden="true" />
          <div className="hidden" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6 md:mb-10">
                <MessageSquare className="w-4 h-4 text-[#C21807]" />
                <span className="text-sm font-bold text-[#C21807]">We're Here to Help</span>
              </div>

              {/* Icon and Title in Row */}
              <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-linear-to-r from-[#C21807] to-[#A01506] shadow-2xl shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900">
                  Get in{" "}
                  <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                    Touch
                  </span>
                </h1>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your workplace culture? Let's create sports experiences
                that inspire energy, unity & performance.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* LEFT SIDE INFO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            {/* Section Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm">
              <Star className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Contact Information</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-4 text-gray-900">
                Let's{" "}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                  Connect
                </span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                Have questions or want a custom corporate sports event? We're here to help.
              </p>
            </div>

            <div className="space-y-5">
            {[ 
              { icon: <Mail className="w-5 h-5" />, label: "Email", value: contactDetails.email, href: `mailto:${contactDetails.email}` },
              { icon: <Phone className="w-5 h-5" />, label: "Phone", value: contactDetails.phone, href: `tel:${contactDetails.phone}` },
              { icon: <MessageSquare className="w-5 h-5" />, label: "WhatsApp", value: contactDetails.whatsapp, href: `https://wa.me/${contactDetails.whatsapp.replace(/[^0-9]/g, "")}` },
              { icon: <MapPin className="w-5 h-5" />, label: "Address", value: contactDetails.address },
              { icon: <Clock className="w-5 h-5" />, label: "Hours", value: contactDetails.hours },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 8, transition: { duration: 0.3 } }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#C21807]/5 border border-[#C21807]/20 hover:border-[#C21807] hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center p-3 bg-[#C21807] rounded-lg text-white shadow-lg shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">{item.label}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-[#C21807] transition-colors font-medium">{item.value}</a>
                  ) : (
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* SOCIAL */}
          <div className="mt-6 md:mt-8 p-6 rounded-2xl bg-white border border-gray-200">
            <h3 className="font-bold text-base sm:text-lg mb-5 text-gray-900">
              Follow{" "}
              <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent">
                Us
              </span>
            </h3>
                <div className="flex gap-4">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url}
                  target="_blank"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white border-2 border-[#C21807]/20 hover:border-[#C21807] text-gray-600 hover:text-[#C21807] shadow-md hover:shadow-xl transition-all duration-300"
                >
                      <s.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200
          }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: window.innerWidth >= 768 ? 1.03 : 1,
            y: window.innerWidth >= 768 ? -8 : 0
          }}
          className="relative flex flex-col justify-center my-10 md:my-24 px-6 pt-6 pb-6 md:px-10 md:pt-10 md:pb-8 rounded-3xl shadow-2xl bg-white border border-[#C21807]/20 hover:shadow-red-400 overflow-hidden transition-all duration-500"
        >
          {/* Decorative Background removed for pure white */}
          <div className="hidden" aria-hidden="true" />
          <div className="hidden" aria-hidden="true" />

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-8 text-gray-900">
            Send us a{" "}
            <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
              Message
            </span>
          </h2>

          <form onSubmit={submitForm} className="space-y-5 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Full Name *" name="name" value={formData.name} onChange={handleInput} required />
              <InputField label="Email Address *" name="email" type="email" value={formData.email} onChange={handleInput} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Company Name" name="company" value={formData.company} onChange={handleInput} />
              <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleInput} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleInput}
                placeholder="Tell us about your requirements..."
                className="w-full p-3 border border-[#C21807]/30 rounded-lg outline-none focus:ring-[#C21807] focus:border-[#C21807] transition"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#C21807] text-white py-3 md:py-4 text-base sm:text-lg font-bold rounded-lg flex justify-center items-center gap-2 sm:gap-3 shadow-xl hover:shadow-xl hover:shadow-[#C21807]/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              {loading ? "Sending..." : "Submit"}
            </motion.button>
          </form>
        </motion.div>
        </div>
      </section>

      {/* MAP */}
      <section className="max-w-6xl mx-auto px-6 pb-12 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          {/* Section Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6">
            <MapPin className="w-4 h-4 text-[#C21807]" />
            <span className="text-sm font-bold text-[#C21807]">Our Location</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
            Find{" "}
            <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
              Us
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-100 hover:border-red-200 transition-all duration-300"
        >
          <iframe
            title="HAKIRUSH Office Location"
            className="w-full h-[450px]"
            src="https://www.google.com/maps?q=No.+472/7+Balaji+Arcade+AVS+Layout+Ejipura+Koramangala+Bengaluru+560095&output=embed"
            allowFullScreen
            loading="lazy"
            aria-label="Map showing HAKIRUSH office location in Bangalore"
          ></iframe>
        </motion.div>
      </section>
    </motion.div>
  );
}

function InputField({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-[#C21807]/30 rounded-lg outline-none focus:border-[#C21807] focus:ring-[#C21807] transition"
      />
    </div>
  );
}
