import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion"; // Fixed import
import {
  Mail, Phone, MapPin, Clock, Send, MessageSquare, Linkedin,
  Instagram, Twitter, Youtube, Star, Facebook, Trophy, Activity, 
  Target, CircleDot, Dumbbell, Flag, Zap
} from "lucide-react";

// --- BACKGROUND SUB-COMPONENT (Consistent with Clients page) ---
const ContinuousSportsBackground = () => {
  const row1 = [Trophy, Activity, Target, CircleDot, Star, Dumbbell];
  const row2 = [Flag, Zap, Trophy, Activity, Target, Star];

  return (
    <div className="fixed inset-0 overflow-hidden bg-white pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-100/60 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50/80 blur-[120px] rounded-full" />

      <div className="flex absolute top-[10%] opacity-[0.04]">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 pr-24 whitespace-nowrap"
        >
          {row1.map((Icon, i) => <Icon key={i} size={70} className="text-red-900" strokeWidth={1} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={70} className="text-red-900" strokeWidth={1} />)}
        </motion.div>
      </div>

      <div className="flex absolute top-[60%] opacity-[0.03]">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-32 pr-32 whitespace-nowrap"
        >
          {row2.map((Icon, i) => <Icon key={i} size={100} className="text-red-900" strokeWidth={0.5} />)}
          {row2.map((Icon, i) => <Icon key={`dup-${i}`} size={100} className="text-red-900" strokeWidth={0.5} />)}
        </motion.div>
      </div>
    </div>
  )
}

const contactDetails = {
  email: "Support@hakirush.com",
  phone: "+91 7997110210",
  whatsapp: "+91 7997110210",
  address: "No. 472/7 Balaji Arcade, A.V.S. Compound, 20th L Cross Road, AVS Layout, Ejipura, Koramangala, Bengaluru, Karnataka -560095",
  hours: "Mon-Sat: 9:00 AM - 7:00 PM",
};

const TwitterIcon = ({ className }) => (
  <svg viewBox="0 0 1200 1227" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
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
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" ? window.innerWidth >= 768 : false);

  useEffect(() => {
    if (emailjs && emailjs.init) emailjs.init("pcWFF4SE3MMUSZ8RT");
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleInput = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  const canSubmit = formData.name.trim() && isValidEmail(formData.email) && formData.message.trim() && !loading;

  const sendMail = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await emailjs.send("service_6nnmjta", "template_ugyileq", {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message,
      });
      Swal.fire({ icon: "success", title: "Submitted 🎉", text: "We’ll get back to you soon!", timer: 2500, showConfirmButton: false });
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong. Try later.", timer: 3000, showConfirmButton: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      <ContinuousSportsBackground />

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-8">
                <MessageSquare className="w-4 h-4 text-[#C21807]" />
                <span className="text-sm font-bold text-[#C21807]">We're Here to Help</span>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-3xl bg-linear-to-r from-[#C21807] to-[#A01506] shadow-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  Get in <span className="bg-linear-to-r from-[#C21807] to-[#A01506] bg-clip-text text-transparent">Touch</span>
                </h1>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* LEFT SIDE: INFO */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-black">Let's <span className="text-[#C21807]">Connect</span></h2>
                <p className="text-gray-600 font-medium">Ready to transform your workplace culture? Let's create sports experiences that inspire energy, unity & performance.</p>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: <Mail />, label: "Email", value: contactDetails.email, href: `mailto:${contactDetails.email}` },
                  { icon: <Phone />, label: "Phone", value: contactDetails.phone, href: `tel:${contactDetails.phone}` },
                  { icon: <MessageSquare />, label: "WhatsApp", value: contactDetails.whatsapp, href: `https://wa.me/${contactDetails.whatsapp.replace(/\D/g,'')}` },
                  { icon: <MapPin />, label: "Address", value: contactDetails.address },
                  { icon: <Clock />, label: "Hours", value: contactDetails.hours },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      {React.cloneElement(item.icon, { size: 20 })}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-red-500">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-gray-900 font-bold hover:text-red-600 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-gray-900 font-bold leading-tight">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* SOCIALS */}
              <div className="p-6 rounded-3xl bg-red-900 text-white shadow-2xl">
                <h3 className="font-bold mb-4">Follow Our Journey</h3>
                <div className="flex gap-3">
                  {socialLinks.map((s, i) => (
                    <motion.a 
                      key={i} href={s.url} target="_blank"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-red-900 flex items-center justify-center transition-all"
                    >
                      <s.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: FORM */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/20 relative"
            >
              <h2 className="text-2xl font-black mb-8">Send a <span className="text-red-600">Message</span></h2>
              <form onSubmit={(e) => { e.preventDefault(); sendMail(); }} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <InputField label="Name" name="name" value={formData.name} onChange={handleInput} required />
                  <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleInput} required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <InputField label="Company" name="company" value={formData.company} onChange={handleInput} />
                  <InputField label="Phone" name="phone" value={formData.phone} onChange={handleInput} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message" rows="4" required value={formData.message} onChange={handleInput}
                    placeholder="How can we help you?"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                  />
                </div>
                <motion.button
                  type="submit" disabled={!canSubmit}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-red-200 disabled:opacity-50 disabled:shadow-none hover:bg-red-700 transition-all cursor-pointer"
                >
                  <Send size={20} />
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-white">
            <iframe
              title="Location" className="w-full h-[450px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.514686411516!2d77.6256!3d12.9392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzIxLjEiTiA3N8KwMzcnMzIuMiJF!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
              allowFullScreen loading="lazy"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, required }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-gray-700">{label} {required && "*"}</label>
      <input
        type={type} name={name} required={required} value={value} onChange={onChange}
        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
      />
    </div>
  );
}