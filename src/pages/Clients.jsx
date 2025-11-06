import React, { useState, useEffect } from "react";
import Logo1 from "/favicon.ico"; // replace with real logos
import Logo2 from "/favicon.ico";
import Logo3 from "/favicon.ico";

const testimonials = [
  {
    quote:
      "Our employees eagerly wait for HAKIRUSH events — the energy is unmatched!",
    author: "HR Head",
    company: "Top IT Company",
  },
  {
    quote:
      "Top-class event management. Our team bonded like never before.",
    author: "Operations Lead",
    company: "Infrastructure Group",
  },
  {
    quote:
      "Professional, exciting, and truly memorable experiences every time.",
    author: "Employee Engagement Manager",
    company: "Finance Firm",
  },
];

const logos = [Logo1, Logo2, Logo3, Logo1, Logo2];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white pt-24 pb-28 px-6 md:px-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0D1B2A]">
          Trusted by Leading Companies Across Sectors
        </h2>
      </div>

      {/* Testimonial Slider */}
      <div className="relative max-w-4xl mx-auto text-center transition-all">
        <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed">
          "{testimonials[index].quote}"
        </p>
        <div className="mt-6 text-[#C21807] font-semibold">
          — {testimonials[index].author}, {testimonials[index].company}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                index === i ? "bg-[#C21807]" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Logos Row */}
      <div className="mt-20 flex flex-wrap justify-center gap-10 opacity-80">
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt="Client Logo"
            className="h-12 object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <a
          href="/contact"
          className="px-10 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#C21807] to-[#870B00] hover:scale-105 transition"
        >
          Become a Sponsor
        </a>
      </div>
    </div>
  );
};

export default TestimonialsSection;
