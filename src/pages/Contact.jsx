import React, { useEffect, useState } from "react";
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
  Facebook,
} from "lucide-react";

const contactDetails = {
  email: "Support@hakirush.com",
  phone: "+91 7997110210",
  whatsapp: "+91 7997110210",
  address:
    "No. 472/7 Balaji Arcade, A.V.S. Compound, 20th L Cross Road, AVS Layout, Ejipura, Koramangala, Bengaluru, Karnataka -560095",
  hours: "Mon-Sat: 9:00 AM - 7:00 PM",
};

const TwitterIcon = ({ className }) => (
  <svg
    viewBox="0 0 1200 1227"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M714.2 519.1L1160.9 0H1055.7L667.1 450.2L358.1 0H0L468.6 681.8L0 1226.4H105.3L515.8 750.8L842 1226.4H1200L714.2 519.1ZM570.9 687.5L523.4 620.1L146.7 79.7H311.5L615.4 520.2L662.9 587.6L1055.7 1146.7H890.9L570.9 687.5Z" />
  </svg>
);


const socialLinks = [
  { icon: Facebook, url: "https://www.facebook.com/share/1DKbJRWQtq/" },
  { icon: Instagram, url: "https://www.instagram.com/hakirush.sports_events/?hl=en" },
  { icon: Linkedin, url: "https://linkedin.com/company/hakirush" },
  { icon: TwitterIcon, url: "https://x.com/Hakirush_sports?t=imr-ZZmYL7pGFek5b_8J9A&s=09" },
  { icon: Youtube, url: "https://www.youtube.com/@HakirushSportsEvents" },
];

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Desktop state for hover transforms (prevents SSR/window errors)
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );

  useEffect(() => {
    // Initialize EmailJS once (replace with your user id if you prefer init)
    // It's fine to init with the user ID once.
    if (emailjs && emailjs.init) {
      emailjs.init("zyKH5j7WIvha9eQ6S");
    }

    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleInput = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Basic client-side validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  const canSubmit =
    formData.name.trim() &&
    isValidEmail(formData.email) &&
    formData.message.trim() &&
    !loading;

  // sendMail corrected for EmailJS API: emailjs.send(serviceID, templateID, templateParams)
  const sendMail = async () => {
    if (!canSubmit) {
      Swal.fire({
        icon: "warning",
        title: "Fill required fields",
        text: "Please provide name, valid email and a message.",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);
    try {

      const serviceId = "service_g329dyj";
      const templateId = "template_8vlwff3";

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams);

      Swal.fire({
        icon: "success",
        title: "Submitted 🎉",
        text: "We’ll get back to you soon!",
        timer: 2500,
        showConfirmButton: false,
      });

      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    } catch (err) {
      // log error for devs while keeping user message friendly
      console.error("EmailJS send error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Try later.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    void sendMail();
  };

  return (
    <div className="relative overflow-hidden bg-gray-50 text-gray-900">
      <div className="bg-gray-50 overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-20 pb-15 md:py-24 overflow-hidden bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6 md:mb-10">
                <MessageSquare className="w-4 h-4 text-[#C21807]" aria-hidden />
                <span className="text-sm font-bold text-[#C21807]">We're Here to Help</span>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-linear-to-r from-[#C21807] to-[#A01506] shadow-2xl shrink-0"
                  aria-hidden
                >
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900">
                  Get in{" "}
                  <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                    Touch
                  </span>
                </h1>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your workplace culture? Let's create sports experiences that
                inspire energy, unity & performance.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-6 md:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-10">
          {/* LEFT SIDE INFO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm">
              <Star className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Contact Information</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-gray-900">
                Let's{" "}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                  Connect
                </span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                Have questions or want a custom corporate sports event? We're here to help.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {[
                {
                  icon: <Mail className="w-5 h-5" aria-hidden />,
                  label: "Email",
                  value: contactDetails.email,
                  href: `mailto:${contactDetails.email}`,
                },
                {
                  icon: <Phone className="w-5 h-5" aria-hidden />,
                  label: "Phone",
                  value: contactDetails.phone,
                  href: `tel:${contactDetails.phone.replace(/\s+/g, "")}`,
                },
                {
                  icon: <MessageSquare className="w-5 h-5" aria-hidden />,
                  label: "WhatsApp",
                  value: contactDetails.whatsapp,
                  href: `https://wa.me/${contactDetails.whatsapp.replace(/[^0-9]/g, "")}`,
                },
                { icon: <MapPin className="w-5 h-5" aria-hidden />, label: "Address", value: contactDetails.address },
                { icon: <Clock className="w-5 h-5" aria-hidden />, label: "Hours", value: contactDetails.hours },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                  className="flex flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#C21807]/5 border border-[#C21807]/20 hover:border-[#C21807] hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="inline-flex items-center justify-center p-3 bg-red-100 rounded-lg text-red-700 shadow-lg shrink-0 flex-none"
                    aria-hidden
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-red-600 mb-1">{item.label}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-[#C21807] transition-colors font-medium"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* SOCIAL */}
            <div className="mt-2 md:mt-4 p-4 sm:p-6 rounded-2xl bg-white border border-gray-200">
              <h3 className="font-bold text-base sm:text-lg mb-5 text-gray-900">
                Follow{" "}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent">
                  Us
                </span>
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white border-2 border-[#C21807]/20 hover:border-[#C21807] text-gray-600 hover:text-[#C21807] shadow-md hover:shadow-xl transition-all duration-300"
                    aria-label={`Open ${s.url}`}
                  >
                    <s.icon className="w-5 h-5" aria-hidden />
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
              type: "spring",
              stiffness: 200,
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: isDesktop ? 1.03 : 1,
              y: isDesktop ? -8 : 0,
            }}
            className="relative flex flex-col justify-center sm:my-6 md:my-35 p-5 sm:px-3 md:px-10 pt-4 pb-4 sm:pt-6 sm:pb-6 md:pt-10 md:pb-8 rounded-lg sm:rounded-2xl md:rounded-3xl shadow-2xl bg-white border border-[#C21807]/20 hover:shadow-red-400 overflow-hidden transition-all duration-500 w-full"
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-black mb-6 sm:mb-8 text-gray-900">
              Send us a{" "}
              <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                Message
              </span>
            </h2>

            <form onSubmit={submitForm} className="space-y-4 sm:space-y-5 md:space-y-6" aria-label="Contact form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InputField label="Full Name *" name="name" value={formData.name} onChange={handleInput} required small />
                <InputField label="Email Address *" name="email" type="email" value={formData.email} onChange={handleInput} required small />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InputField label="Company Name" name="company" value={formData.company} onChange={handleInput} small />
                <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleInput} small />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleInput}
                  placeholder="Tell us about your requirements..."
                  className="w-full p-2 sm:p-3 md:p-4 lg:p-5 border border-[#C21807]/30 rounded-lg outline-none focus:ring-[#C21807] focus:border-[#C21807] text-xs sm:text-sm md:text-base lg:text-lg transition"
                  aria-required
                />
              </div>

              <motion.button
                type="submit"
                disabled={!canSubmit}
                whileHover={{ scale: canSubmit ? 1.02 : 1 }}
                whileTap={{ scale: canSubmit ? 0.98 : 1 }}
                className="w-full bg-[#C21807] text-white py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold rounded-lg flex justify-center items-center gap-2 sm:gap-3 shadow-xl hover:shadow-xl hover:shadow-[#C21807]/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                aria-disabled={!canSubmit}
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
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6">
            <MapPin className="w-4 h-4 text-[#C21807]" />
            <span className="text-sm font-bold text-[#C21807]">Our Location</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
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
          />
        </motion.div>
      </section>
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, required, small }) {
  return (
    <div>
      <label className={`block ${small ? "text-xs" : "text-sm"} md:text-base font-medium text-gray-700 mb-2`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={`w-full ${small ? "p-2 text-xs" : "p-3 text-sm"} md:p-1 md:text-base lg:p-2 lg:text-lg border border-[#C21807]/30 rounded-lg outline-none focus:border-[#C21807] focus:ring-[#C21807] transition`}
        aria-required={required}
      />
    </div>
  );
}
