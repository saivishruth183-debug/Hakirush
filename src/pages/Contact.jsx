import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import {
  Mail, Phone, MapPin, Clock, Send, MessageSquare, Linkedin,
  Instagram, Youtube, Star, Facebook, Trophy, Activity, 
  Target, CircleDot, Dumbbell, Flag, Zap
} from "lucide-react";
import backgroundImage from "../assets/Hero/Backimage.png";

const ACCENT = "#8C1D2B"; // deep burgundy
const GOLD = "#D4AF37";   // highlight gold
const HAIRLINE = `linear-gradient(90deg, ${ACCENT}, ${GOLD}, ${ACCENT})`;

// --- BACKGROUND SUB-COMPONENT (dark theme, matching Navbar/About/Gallery) ---
const ContinuousSportsBackground = () => {
  const row1 = [Trophy, Activity, Target, CircleDot, Star, Dumbbell];
  const row2 = [Flag, Zap, Trophy, Activity, Target, Star];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 bg-[#05070a]">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px]" style={{ background: `${ACCENT}22` }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]" style={{ background: `${GOLD}14` }} />

      {/* Icon tint now matches Clients.jsx's ACCENT-tinted background icons
          instead of plain white, so the two dark-themed pages read as one
          system. */}
      <div className="flex absolute top-[10%] opacity-[0.06] w-full overflow-hidden">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 pr-24 whitespace-nowrap flex-nowrap"
        >
          {row1.map((Icon, i) => <Icon key={i} size={70} style={{ color: ACCENT }} strokeWidth={1} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={70} style={{ color: ACCENT }} strokeWidth={1} />)}
        </motion.div>
      </div>

      <div className="flex absolute top-[60%] opacity-[0.05] w-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-32 pr-32 whitespace-nowrap flex-nowrap"
        >
          {row2.map((Icon, i) => <Icon key={i} size={100} style={{ color: ACCENT }} strokeWidth={0.5} />)}
          {row2.map((Icon, i) => <Icon key={`dup-${i}`} size={100} style={{ color: ACCENT }} strokeWidth={0.5} />)}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950/10 via-slate-950/40 to-slate-950/80" />
    </div>
  )
}

// --- PARALLAX IMAGE BACKGROUND (Consistent with core framework pages) ---
const ParallaxImageBackground = ({ image }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 80, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const translateX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const translateY = useTransform(smoothY, [-1, 1], [-20, 20]);
  const scale = useTransform(smoothX, [-1, 1], [1.08, 1.12]);
  const { scrollY } = useScroll();
  const scrollTranslateY = useTransform(scrollY, [0, 1500], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed left-0 w-full overflow-hidden -z-10" style={{ top: "-10vh", height: "130vh" }}>
      <motion.img
        src={image}
        alt=""
        style={{ x: translateX, y: useTransform([translateY, scrollTranslateY], ([ty, sy]) => ty + sy), scale }}
        className="w-full h-full object-cover object-center will-change-transform opacity-70"
        transition={{ type: "tween" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/55 to-slate-950/85" />
    </div>
  );
};

/* KIT-STRIPE DIVIDER — same diagonal jersey-trim seam used on About,
   Package, Gallery and Clients, marking the hero-to-content transition. */
const KitStripeDivider = () => (
  <div className="relative h-8 sm:h-10 w-full overflow-hidden" aria-hidden="true">
    <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="w-full h-full">
      <polygon points="0,56 480,0 560,0 80,56" fill={ACCENT} />
      <polygon points="560,56 1040,0 1120,0 640,56" fill={GOLD} opacity="0.85" />
    </svg>
  </div>
);

const contactDetails = {
  email: "admin@hakirush.com",
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

const PremiumDarkCard = ({ children, className = "" }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-slate-800/90 backdrop-blur-md border border-slate-700 ${className}`}>
    <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: HAIRLINE }} />
    {children}
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmit =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.message.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());

  const sendMail = () => {
    if (!canSubmit) {
      Swal.fire({
        icon: "error",
        title: "Please complete the form",
        text: "Name, a valid email and a message are required before sending.",
      });
      return;
    }

    setLoading(true);

    const mailtoBody = [
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Company: ${formData.company.trim() || "Not provided"}`,
      `Phone: ${formData.phone.trim() || "Not provided"}`,
      "",
      "Message:",
      formData.message.trim(),
    ].join("\n");

    const mailtoLink = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
      `Enquiry from ${formData.name.trim()}`
    )}&body=${encodeURIComponent(mailtoBody)}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Your message is ready",
        text: "Your email app has been opened so you can send the inquiry.",
      });
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      setLoading(false);
    }, 200);
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* BACKGROUND MATRIX */}
      <ContinuousSportsBackground />
      
      {/* MOUSE RESPONSIVE PARALLAX HERO */}
      <ParallaxImageBackground image={backgroundImage} />

      <div className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="pt-24 pb-6">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-slate-900 shadow-xl shadow-slate-200 mb-8">
                <MessageSquare className="w-3.5 h-3.5" style={{ color: GOLD }} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">We're Here to Help</span>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div
                  className="relative w-16 h-16 rounded-3xl shadow-xl flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #4a0d13)` }}
                >
                  <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                  <Mail className="relative w-6 h-6 text-white" />
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-black tracking-tight text-white">
                  Get in <span style={{ color: GOLD }}>Touch</span>
                </h1>
              </div>

              <div className="w-16 h-px mx-auto rounded-full" style={{ background: HAIRLINE }} />
            </motion.div>
          </div>
        </section>

        <KitStripeDivider />

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
                <h2 className="font-serif text-3xl font-black text-white">Let's <span style={{ color: GOLD }}>Connect</span></h2>
                <p className="text-slate-300 font-medium">Ready to transform your workplace culture? Let's create sports experiences that inspire energy, unity & performance.</p>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: <Mail />, label: "Email", value: contactDetails.email, href: `mailto:${contactDetails.email}` },
                  { icon: <Phone />, label: "Phone", value: contactDetails.phone, href: `tel:${contactDetails.phone}` },
                  { icon: <MessageSquare />, label: "WhatsApp", value: contactDetails.whatsapp, href: `https://wa.me/${contactDetails.whatsapp.replace(/\D/g,'')}` },
                  { icon: <MapPin />, label: "Address", value: contactDetails.address },
                  { icon: <Clock />, label: "Hours", value: contactDetails.hours },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ x: 10 }}>
                    <PremiumDarkCard className="flex items-center gap-5 p-5 shadow-sm hover:shadow-md transition-all" >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ring-1 ring-white/10"
                        style={{ background: `${ACCENT}33`, color: GOLD }}
                      >
                        {React.cloneElement(item.icon, { size: 20 })}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-white font-bold transition-colors" style={{ '--tw-text-opacity': 1 }} onMouseEnter={(e) => e.currentTarget.style.color = GOLD} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white font-bold leading-tight">{item.value}</p>
                        )}
                      </div>
                    </PremiumDarkCard>
                  </motion.div>
                ))}
              </div>

              {/* SOCIALS */}
              <div
                className="relative overflow-hidden p-6 rounded-3xl text-white shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${ACCENT}, #4a0d13)` }}
              >
                <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: HAIRLINE }} />
                <h3 className="font-bold mb-4">Follow Our Journey</h3>
                <div className="flex gap-3">
                  {socialLinks.map((s, i) => (
                    <motion.a 
                      key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white flex items-center justify-center transition-all"
                      style={{ color: 'white' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
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
            >
              <PremiumDarkCard className="p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                <h2 className="font-serif text-2xl font-black text-white mb-8">Send a <span style={{ color: GOLD }}>Message</span></h2>
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
                    <label className="block text-sm font-bold text-slate-200 mb-2">Message *</label>
                    <textarea
                      name="message" rows="4" required value={formData.message} onChange={handleInput}
                      placeholder="How can we help you?"
                      className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-2xl outline-none text-white placeholder-slate-400 focus:ring-2 focus:ring-[#D4AF37] focus:bg-slate-700 transition-all"
                    />
                  </div>
                  <motion.button
                    type="submit" disabled={!canSubmit}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="group relative w-full overflow-hidden text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 disabled:shadow-none transition-all cursor-pointer"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, #4a0d13)`, boxShadow: `0 20px 40px -15px ${ACCENT}80` }}
                  >
                    <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                    <Send size={20} className="relative" />
                    <span className="relative">{loading ? "Sending..." : "Send Message"}</span>
                  </motion.button>
                </form>
              </PremiumDarkCard>
            </motion.div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-white ring-1 ring-slate-700" style={{ border: `8px solid #1e293b` }}>
            <span className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: HAIRLINE }} />
            <iframe
              title="Location" className="w-full h-[450px] border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.514686411516!2d77.6256!3d12.9392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzIxLjEiTiA3N8KwMzcnMzIuMiJF!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
              allowFullScreen={true} loading="lazy"
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
      <label className="block text-sm font-bold text-slate-200">{label} {required && "*"}</label>
      <input
        type={type} name={name} required={required} value={value} onChange={onChange}
        className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-2xl outline-none text-white placeholder-slate-400 focus:ring-2 focus:ring-[#D4AF37] focus:bg-slate-700 transition-all"
      />
    </div>
  );
}