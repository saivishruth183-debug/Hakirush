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
} from "lucide-react";

const contactDetails = {
  email: "krishna@hakirush.com",
  phone: "+91 7997110210",
  whatsapp: "+91 7997110210",
  address:
    "No. 472/7 Balaji Arcade, A.V.S. Compound, 20th L Cross Road, AVS Layout, Ejipura, Koramangala, Bengaluru, Karnataka -560095",
  hours: "Mon-Sat: 9:00 AM - 7:00 PM",
};

const socialLinks = [
  { icon: Linkedin, url: "https://linkedin.com/company/hakirush" },
  { icon: Instagram, url: "https://www.instagram.com/hakirush.sports_events/?hl=en" },
  { icon: Twitter, url: "https://x.com/Hakirushsports" },
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
        title: "Message Sent 🎉",
        text: "We’ll get back to you soon!",
        timer: 2500,
        showConfirmButton: false,
      });

      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    } catch (err) {
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

      {/* Background Accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-72 h-72 bg-red-200/40 blur-[120px] -top-10 -left-10"></div>
        <div className="absolute w-96 h-96 bg-red-100/30 blur-[150px] bottom-0 right-0"></div>
      </div>

      {/* HERO */}
      <section className="py-15 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
        >
          Get in <span className="text-red-600">Touch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          Ready to transform your workplace culture? Let’s create sports experiences
          that inspire energy, unity & performance.
        </motion.p>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20">

        {/* LEFT SIDE INFO */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Let's <span className="text-red-600">Connect</span></h2>
          <p className="text-gray-600 text-lg mb-10">
            Have questions or want a custom corporate sports event? We’re here to help.
          </p>

          <div className="space-y-7">
            {[
              { icon: <Mail />, label: "Email", value: contactDetails.email, href: `mailto:${contactDetails.email}` },
              { icon: <Phone />, label: "Phone", value: contactDetails.phone, href: `tel:${contactDetails.phone}` },
              { icon: <MessageSquare />, label: "WhatsApp", value: contactDetails.whatsapp, href: `https://wa.me/${contactDetails.whatsapp.replace(/[^0-9]/g, "")}` },
              { icon: <MapPin />, label: "Address", value: contactDetails.address },
              { icon: <Clock />, label: "Hours", value: contactDetails.hours },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="p-3 bg-red-100 rounded-xl text-red-600">{item.icon}</div>
                <div>
                  <h3 className="font-semibold">{item.label}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-gray-600 hover:text-red-600 text-sm transition">{item.value}</a>
                  ) : (
                    <p className="text-gray-600 text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* SOCIAL */}
          <div className="mt-12">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-5">
              {socialLinks.map((s, i) => (
                <motion.a key={i} href={s.url} target="_blank" whileHover={{ scale: 1.25 }}>
                  <s.icon className="h-6 w-6 text-gray-600 hover:text-red-600 transition" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl shadow-2xl bg-white text-gray-900 border border-gray-200 shadow-red-400"
        >
          <h2 className="text-3xl font-bold mb-8">
            Send us a <span className="text-red-600">Message</span>
          </h2>

          <form onSubmit={submitForm} className="space-y-6">
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
                className="w-full p-3 border border-red-300 rounded-lg outline-none focus:ring-red-600 focus:border-red-600 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-lg flex justify-center items-center gap-2 transition"
            >
              <Send className="h-5 w-5" />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </section>

      {/* MAP */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-bold mb-8"
        >
          Find <span className="text-red-600">Us</span>
        </motion.h2>

        <iframe
          className="w-full h-[420px] rounded-2xl border shadow-xl"
          src="https://www.google.com/maps?q=No.+472/7+Balaji+Arcade+AVS+Layout+Ejipura+Koramangala+Bengaluru+560095&output=embed"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
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
        className="w-full p-3 border border-red-300 rounded-lg outline-none focus:border-red-600 focus:ring-red-600 transition"
      />
    </div>
  );
}
