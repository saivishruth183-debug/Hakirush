import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Camera, Sparkles, X, Play, ChevronLeft, ChevronRight } from "lucide-react";
import PageBackground from "../components/PageBackground";
import backgroundImage from "../assets/Hero/Backimage.png";

// Import your assets
import Cricket from "../assets/Gallery/Annual/Cricket.mp4";
import Badminton from "../assets/Gallery/Annual/Badminton.mp4";
import Basketball from "../assets/Gallery/Quarterly/basketball.png";
import Ground from "../assets/Gallery/Quarterly/ground.png";
import Batemention from "../assets/Gallery/Quarterly/batemention.png";
import Celebration1 from "../assets/Gallery/Celebration/celeb1.JPG";
import Celebration2 from "../assets/Gallery/Celebration/celeb2.JPG";
import Celebration3 from "../assets/Gallery/Celebration/celeb3.JPG";
import Celebration4 from "../assets/Gallery/Celebration/celeb4.JPG";
import Behind1 from "../assets/Gallery/BehindTheSceans/behind1.JPG";
import Behind2 from "../assets/Gallery/BehindTheSceans/behind2.JPG";
import Behind3 from "../assets/Gallery/BehindTheSceans/behind3.JPG";
import VideoThumbnail1 from "../assets/Pilot/Video 1.mp4";

/* ------------------------------------------------------------------ */
/*  NOTE ON TYPE: this design pairs a restrained serif display face   */
/*  with a clean grotesque body face for an "editorial trophy room"   */
/*  feel. Add these once, e.g. in index.html <head> or your global    */
/*  CSS, then the `font-display` / `font-body` classes below work:    */
/*                                                                    */
/*  <link rel="preconnect" href="https://fonts.googleapis.com">       */
/*  <link href="https://fonts.googleapis.com/css2?family=Fraunces:   */
/*  opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&   */
/*  display=swap" rel="stylesheet">                                   */
/*                                                                    */
/*  tailwind.config.js:                                               */
/*  fontFamily: { display: ['"Fraunces"', 'serif'],                   */
/*                body: ['"Inter"', 'sans-serif'] }                   */
/* ------------------------------------------------------------------ */

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
        className="w-full h-full object-cover object-center will-change-transform"
        transition={{ type: "tween" }}
      />
      {/* Deeper, warmer vignette for a more premium, less "raw photo" feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/85" />
      <div className="absolute inset-0 bg-slate-950/30 mix-blend-multiply" />
    </div>
  );
};

const galleryData = {
  annual: [
    { id: 1, type: "video", img: Cricket, city: "City A" },
    { id: 2, type: "video", img: Badminton, city: "City A" },
  ],
  quarterly: [
    { id: 4, type: "image", img: Basketball, city: "City C" },
    { id: 5, type: "image", img: Ground, city: "City A" },
    { id: 6, type: "image", img: Batemention, city: "City B" },
  ],
  celebration: [
    { id: 7, type: "image", img: Celebration1, city: "City C" },
    { id: 8, type: "image", img: Celebration2, city: "City B" },
    { id: 9, type: "image", img: Celebration3, city: "City C" },
    { id: 13, type: "image", img: Celebration4, city: "City A" },
  ],
  behindthescenes: [
    { id: 10, type: "image", img: Behind1, city: "City A" },
    { id: 11, type: "image", img: Behind2, city: "City B" },
    { id: 12, type: "image", img: Behind3, city: "City C" },
  ],
};

const tabLabels = {
  annual: "Annual Package",
  quarterly: "Quarterly Package",
  celebration: "Celebration",
  behindthescenes: "Behind The Scenes",
};

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("annual");
  const [cityFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages =
    cityFilter === "All"
      ? galleryData[activeTab]
      : galleryData[activeTab].filter((img) => img.city === cityFilter);

  const lightbox = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    (e) => {
      e.stopPropagation();
      setLightboxIndex((i) => (i - 1 + filteredImages.length) % filteredImages.length);
    },
    [filteredImages.length]
  );
  const showNext = useCallback(
    (e) => {
      e.stopPropagation();
      setLightboxIndex((i) => (i + 1) % filteredImages.length);
    },
    [filteredImages.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev(e);
      if (e.key === "ArrowRight") showNext(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  return (
    <div className="relative overflow-hidden min-h-screen font-body">
      <PageBackground />
      <ParallaxImageBackground image={backgroundImage} />

      <div className="relative z-10">
        <section className="relative pt-24 pb-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto px-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 shadow-lg backdrop-blur-md mb-8">
              <Camera className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-slate-300">
                Visual Memories
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight leading-[1.05]">
              Event <span className="text-red-600">Gallery</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
              Relive the energy, passion, and competition from our corporate tournaments through stunning visual moments.
            </p>
          </motion.div>
        </section>

        <section className="py-8 sticky top-0 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-6"
          >
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-xl px-1.5 py-1.5 shadow-2xl overflow-x-auto max-w-full">
                {Object.keys(tabLabels).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative whitespace-nowrap px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-slate-950" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="tab-pill"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-red-600 shadow-md pointer-events-none"
                        />
                      )}
                      <span className="relative z-10">{tabLabels[tab]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] gap-4 sm:gap-5"
              >
                {filteredImages.map((item, idx) => {
                  const isVideo = item.type === "video";
                  const isFeature = idx === 0 && filteredImages.length > 2;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true, margin: "-80px" }}
                      whileHover={{ y: -6 }}
                      onClick={() => setLightboxIndex(idx)}
                      className={`group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl ${
                        isFeature ? "col-span-2 row-span-2" : ""
                      }`}
                    >
                      {isVideo ? (
                        <video
                          src={item.img}
                          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out relative z-0"
                          preload="metadata"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={item.img}
                          alt="Gallery item"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[900ms] ease-out"
                        />
                      )}

                      {/* Gradient scrim always faintly present, deepens on hover — reads as premium, not flat black overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-slate-950/0 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="absolute inset-0 flex flex-col justify-end p-4 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                        <div className="flex items-center gap-2">
                          {isVideo ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                              <Play className="w-3.5 h-3.5 text-white" fill="currentColor" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                              <Camera className="w-3.5 h-3.5 text-white" />
                            </span>
                          )}
                          <span className="text-xs font-medium text-slate-200 tracking-wide">{item.city}</span>
                        </div>
                      </div>

                      {/* Hairline border glow on hover */}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-amber-400/30 transition-all duration-500 pointer-events-none" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>

      <div className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-[11px] tracking-[0.25em] uppercase font-semibold text-amber-400">Featured</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight mt-3">
              Our Pilot Event <span className="italic text-red-500">Highlight</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
              Watch the highlights from our pilot event below — the best moments from the opening showcase.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-4xl rounded-[28px] overflow-hidden shadow-2xl border border-white/10 ring-1 ring-black/40"
          >
            <div className="absolute -inset-px rounded-[28px] bg-gradient-to-r from-amber-400/20 via-transparent to-red-500/20 pointer-events-none" />
            <video src={VideoThumbnail1} controls className="w-full h-auto max-h-[620px] relative z-10" poster="">
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md flex justify-center items-center z-50 p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-20"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-20"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-20"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <motion.div
              key={lightbox.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center max-w-[92vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === "video" ? (
                <video
                  src={lightbox.img}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[78vh] max-w-[92vw] rounded-2xl shadow-2xl border border-white/10"
                />
              ) : (
                <img
                  src={lightbox.img}
                  alt="Gallery enlarged"
                  className="max-h-[78vh] max-w-[92vw] rounded-2xl shadow-2xl border border-white/10"
                />
              )}
              <div className="mt-4 flex items-center gap-3 text-slate-300 text-xs tracking-wide">
                <span>{lightbox.city}</span>
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                <span>
                  {lightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;