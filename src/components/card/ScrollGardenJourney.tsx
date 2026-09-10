"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronDown, MapPin, ArrowDown, Sparkles, Heart } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function ScrollGardenJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Real-time Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.event.date).getTime();
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track scroll progress through the 420vh scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Keep track of active slide for pagination indicator
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) {
      setActiveSlide(0);
    } else if (latest < 0.50) {
      setActiveSlide(1);
    } else if (latest < 0.75) {
      setActiveSlide(2);
    } else {
      setActiveSlide(3);
    }
  });

  // ================= 4 PARALLAX SLIDER BACKGROUNDS + CSS FILTERS =================

  // SLIDE 1: Pintu Gerbang Masuk (0.0 - 0.28)
  const slide1Scale = useTransform(scrollYProgress, [0, 0.28, 0.40], [1.0, 1.25, 1.35], { clamp: true });
  const slide1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.32, 1.0], [1, 1, 0, 0], { clamp: true });
  const slide1Filter = useTransform(
    scrollYProgress,
    [0, 0.25, 0.35],
    ["contrast(1.05) brightness(1)", "contrast(1.1) brightness(1.08)", "contrast(1.2) brightness(1.2) blur(6px)"],
    { clamp: true }
  );

  // SLIDE 2: Di Bawah Gerbang & Cahaya Mentari (0.20 - 0.54)
  const slide2Opacity = useTransform(scrollYProgress, [0, 0.18, 0.28, 0.46, 0.56, 1.0], [0, 0, 1, 1, 0, 0], { clamp: true });
  const slide2Scale = useTransform(scrollYProgress, [0, 0.18, 0.36, 0.56, 1.0], [1.18, 1.18, 1.02, 1.22, 1.22], { clamp: true });
  const slide2Filter = useTransform(
    scrollYProgress,
    [0.2, 0.36, 0.54],
    ["brightness(0.9) saturate(1.1)", "brightness(1.1) saturate(1.25) contrast(1.05)", "brightness(1.2) saturate(1.1) blur(4px)"],
    { clamp: true }
  );

  // Warm Golden Sunbeam Flare Bloom (Slide 2 Transition)
  const sunbeamOpacity = useTransform(scrollYProgress, [0, 0.22, 0.36, 0.50, 1.0], [0, 0, 0.85, 0, 0], { clamp: true });
  const sunbeamScale = useTransform(scrollYProgress, [0, 0.22, 0.50, 1.0], [0.8, 0.8, 2.2, 2.2], { clamp: true });

  // SLIDE 3: Padang Bunga & Alam Kasih (0.46 - 0.78)
  const slide3Opacity = useTransform(scrollYProgress, [0, 0.44, 0.54, 0.70, 0.80, 1.0], [0, 0, 1, 1, 0, 0], { clamp: true });
  const slide3Scale = useTransform(scrollYProgress, [0, 0.44, 0.62, 0.80, 1.0], [1.18, 1.18, 1.02, 1.16, 1.16], { clamp: true });
  const slide3Filter = useTransform(
    scrollYProgress,
    [0.46, 0.62, 0.78],
    ["saturate(1.1) contrast(1.0)", "saturate(1.25) contrast(1.08) brightness(1.02)", "saturate(1.1) contrast(1.05) blur(5px)"],
    { clamp: true }
  );

  // SLIDE 4: Kad Jemputan Di Alam Perkahwinan (0.72 - 1.0)
  const slide4Opacity = useTransform(scrollYProgress, [0, 0.70, 0.80, 1.0], [0, 0, 1, 1], { clamp: true });
  const slide4Scale = useTransform(scrollYProgress, [0, 0.70, 0.88, 1.0], [1.12, 1.12, 1.0, 1.04], { clamp: true });
  const slide4Filter = useTransform(
    scrollYProgress,
    [0.72, 0.88, 1.0],
    ["brightness(0.85) contrast(1.1)", "brightness(0.95) contrast(1.05)", "brightness(0.9) contrast(1.05)"],
    { clamp: true }
  );

  // Floating Flower Petals Parallax
  const petalsY = useTransform(scrollYProgress, [0, 1], [0, 700], { clamp: true });

  // ================= STAGGERED PARALLAX TYPOGRAPHY & WATERMARKS =================

  // SLIDE 1 CONTENT (The Entrance)
  const text1Opacity = useTransform(scrollYProgress, [0, 0.16, 0.24, 1.0], [1, 1, 0, 0], { clamp: true });
  const text1Y = useTransform(scrollYProgress, [0, 0.24, 1.0], [0, -60, -60], { clamp: true });
  const text1WatermarkY = useTransform(scrollYProgress, [0, 0.24, 1.0], [0, -110, -110], { clamp: true });
  const text1Display = useTransform(text1Opacity, (v) => (v <= 0.01 ? "none" : "flex"));

  // SLIDE 2 CONTENT (Holy Blessing Surah Ar-Rum)
  const text2Opacity = useTransform(scrollYProgress, [0, 0.20, 0.28, 0.44, 0.52, 1.0], [0, 0, 1, 1, 0, 0], { clamp: true });
  const text2Y = useTransform(scrollYProgress, [0, 0.20, 0.28, 0.44, 0.52, 1.0], [60, 60, 0, 0, -60, -60], { clamp: true });
  const text2WatermarkY = useTransform(scrollYProgress, [0, 0.20, 0.28, 0.52, 1.0], [120, 120, 0, -110, -110], { clamp: true });
  const text2Display = useTransform(text2Opacity, (v) => (v <= 0.01 ? "none" : "flex"));

  // SLIDE 3 CONTENT (Love Realm & Countdown)
  const text3Opacity = useTransform(scrollYProgress, [0, 0.46, 0.54, 0.68, 0.76, 1.0], [0, 0, 1, 1, 0, 0], { clamp: true });
  const text3Y = useTransform(scrollYProgress, [0, 0.46, 0.54, 0.68, 0.76, 1.0], [60, 60, 0, 0, -60, -60], { clamp: true });
  const text3WatermarkY = useTransform(scrollYProgress, [0, 0.46, 0.54, 0.76, 1.0], [120, 120, 0, -110, -110], { clamp: true });
  const text3Display = useTransform(text3Opacity, (v) => (v <= 0.01 ? "none" : "flex"));

  // SLIDE 4 CONTENT (Invitation Card & RSVP Gateway)
  const text4Opacity = useTransform(scrollYProgress, [0, 0.72, 0.80, 0.94, 1.0], [0, 0, 1, 1, 0, 0], { clamp: true });
  const text4Y = useTransform(scrollYProgress, [0, 0.72, 0.80, 0.94, 1.0], [60, 60, 0, 0, -40, -40], { clamp: true });
  const text4WatermarkY = useTransform(scrollYProgress, [0, 0.72, 0.80, 1.0], [120, 120, 0, -80], { clamp: true });
  const text4Display = useTransform(text4Opacity, (v) => (v <= 0.01 ? "none" : "flex"));

  // Skip button fades as we reach the full card
  const skipOpacity = useTransform(scrollYProgress, [0, 0.78, 0.88, 1.0], [1, 1, 0, 0], { clamp: true });
  const skipDisplay = useTransform(skipOpacity, (v) => (v <= 0.01 ? "none" : "flex"));

  // Clickable Navigation handlers
  const scrollToSlide = (slideIndex: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;

    // Map slide index (0 to 3) to fractional scroll position
    const positions = [0.06, 0.36, 0.62, 0.88];
    const targetScroll = containerTop + positions[slideIndex] * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const scrollToContent = () => {
    const el = document.getElementById("invitation-start") || document.getElementById("rsvp");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToRsvp = () => {
    const el = document.getElementById("rsvp");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const slideLabels = [
    { num: "01", name: "Pintu Gerbang", title: "The Entrance" },
    { num: "02", name: "Ayat Suci", title: "Holy Blessing" },
    { num: "03", name: "Kira Detik", title: "Realm & Countdown" },
    { num: "04", name: "Kad & RSVP", title: "Invitation & RSVP" },
  ];

  return (
    <div ref={containerRef} className="relative h-[420vh] w-full bg-[#0a0806] text-white">
      {/* Sticky Fullscreen Viewport Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ================= BACKGROUND 4-SLIDE PARALLAX STACK ================= */}

        {/* SLIDE 4: Kad Jemputan Di Taman (Deepest Layer) */}
        <motion.div
          style={{ opacity: slide4Opacity, scale: slide4Scale, filter: slide4Filter }}
          className="absolute inset-0 bg-cover bg-center will-change-transform pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/card_in_garden.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none" />
        </motion.div>

        {/* SLIDE 3: Padang Bunga & Alam Kasih */}
        <motion.div
          style={{ opacity: slide3Opacity, scale: slide3Scale, filter: slide3Filter }}
          className="absolute inset-0 bg-cover bg-center will-change-transform pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/garden_meadow.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
        </motion.div>

        {/* SLIDE 2: Di Bawah Gerbang */}
        <motion.div
          style={{ opacity: slide2Opacity, scale: slide2Scale, filter: slide2Filter }}
          className="absolute inset-0 bg-cover bg-center will-change-transform pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/under_the_arch.jpg')" }}
          />
          <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/60 pointer-events-none" />
        </motion.div>

        {/* Golden Sunbeam Bloom Filter for Slide 2 */}
        <motion.div
          style={{ opacity: sunbeamOpacity, scale: sunbeamScale }}
          className="absolute inset-0 bg-radial from-[#fff4d0] via-[#fcd385]/40 to-transparent mix-blend-screen pointer-events-none z-10"
        />

        {/* SLIDE 1: Pintu Gerbang Utama (Front Entrance) */}
        <motion.div
          style={{ opacity: slide1Opacity, scale: slide1Scale, filter: slide1Filter }}
          className="absolute inset-0 bg-cover bg-center will-change-transform pointer-events-none z-10"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/garden_arch.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/50 pointer-events-none" />
        </motion.div>

        {/* 3D Floating Flower Petals Parallax Layer */}
        <motion.div
          style={{ y: petalsY }}
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
        >
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${(i * 19 + 7) % 94}%`,
                top: `${(i * 27 + 5) % 85}%`,
                width: `${10 + (i % 4) * 3}px`,
                height: `${13 + (i % 4) * 4}px`,
                background: "radial-gradient(circle, #fffaf0 30%, #fecdd3 100%)",
                opacity: 0.5 + (i % 3) * 0.15,
                transform: `rotate(${i * 40}deg)`,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            />
          ))}
        </motion.div>

        {/* Quick Skip Button (Top Right) */}
        <motion.div
          style={{ opacity: skipOpacity, display: skipDisplay }}
          className="fixed top-4 right-4 z-40"
        >
          <button
            onClick={scrollToContent}
            className="px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-[#dfc285]/50 text-[#f5ebd7] text-[10px] sm:text-[11px] font-serif tracking-widest uppercase shadow-lg hover:bg-black/85 hover:border-[#dfc285] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Langkau ke Kad</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#dfc285]" />
          </button>
        </motion.div>

        {/* ================= EDITORIAL SLIDE INDICATORS (#28 Style) ================= */}
        {/* Vertical Pagination Bar on the Right */}
        <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 pointer-events-auto">
          {slideLabels.map((slide, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className="group flex items-center gap-2 cursor-pointer transition-all focus:outline-none"
                aria-label={`Pergi ke slaid ${slide.num}: ${slide.name}`}
              >
                {/* Tooltip on desktop hover */}
                <span
                  className={`hidden sm:inline-block text-[10px] uppercase font-serif tracking-widest px-2 py-0.5 rounded backdrop-blur-md transition-all ${
                    isActive
                      ? "text-[#dfc285] bg-black/70 border border-[#dfc285]/40 opacity-100 translate-x-0"
                      : "text-white/60 bg-black/40 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                  }`}
                >
                  {slide.name}
                </span>

                {/* Number & Progress Dot */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-serif text-[11px] font-bold transition-all ${
                      isActive
                        ? "text-[#dfc285] scale-110"
                        : "text-white/40 group-hover:text-white/80"
                    }`}
                  >
                    {slide.num}
                  </span>

                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-2.5 h-6 bg-gradient-to-b from-[#dfc285] to-[#b0883b] shadow-[0_0_8px_rgba(223,194,133,0.8)]"
                        : "w-2 h-2 bg-white/30 group-hover:bg-white/60 group-hover:scale-125"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* ================= EDITORIAL TYPOGRAPHY & WATERMARKS ================= */}

        {/* ---------------- SLIDE 01: PINTU GERBANG UTAMA ---------------- */}
        <motion.div
          style={{ opacity: text1Opacity, display: text1Display }}
          className="absolute inset-0 flex items-center justify-center p-4 z-30 pointer-events-auto"
        >
          {/* Editorial Parallax Watermark "01" */}
          <motion.div
            style={{ y: text1WatermarkY }}
            className="absolute select-none pointer-events-none font-serif text-[120px] sm:text-[220px] font-black text-white/[0.07] tracking-tighter leading-none"
          >
            01
          </motion.div>

          <motion.div
            style={{ y: text1Y }}
            className="relative max-w-sm sm:max-w-md w-full text-center"
          >
            <div className="relative rounded-3xl bg-[#140e08]/80 backdrop-blur-lg border border-[#dfc285]/70 p-6 sm:p-8 shadow-2xl">
              <div className="absolute inset-1.5 rounded-2xl border border-[#c5a059]/30 pointer-events-none" />

              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-6 h-px bg-[#dfc285]/60" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#e8cda1] font-semibold">
                  Walimatulurus
                </span>
                <span className="w-6 h-px bg-[#dfc285]/60" />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-white font-bold my-1.5 drop-shadow-md tracking-tight">
                {weddingData.groom.name} <span className="text-[#dfc285] font-light">&amp;</span> {weddingData.bride.name}
              </h1>

              <div className="w-14 h-px bg-[#c5a059] mx-auto my-3" />

              <p className="text-xs sm:text-sm text-[#f4e7d3] font-serif tracking-wide">
                {weddingData.event.dateFormatted}
              </p>
              <p className="text-[11px] text-[#dac2a3] mt-1 font-serif">
                {weddingData.event.venueName}
              </p>

              {/* Scroll Call to Action Indicator */}
              <div className="mt-7 flex flex-col items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-widest text-[#dfc285] font-serif font-medium animate-pulse">
                  Skrol ke bawah untuk melangkah masuk
                </span>
                <div className="w-7 h-7 rounded-full border border-[#dfc285]/40 flex items-center justify-center bg-black/40">
                  <ChevronDown className="w-4 h-4 text-[#dfc285] animate-bounce" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- SLIDE 02: DI BAWAH GERBANG & RESTU SUCI ---------------- */}
        <motion.div
          style={{ opacity: text2Opacity, display: text2Display }}
          className="absolute inset-0 flex items-center justify-center p-4 z-30 pointer-events-none"
        >
          {/* Editorial Parallax Watermark "02" */}
          <motion.div
            style={{ y: text2WatermarkY }}
            className="absolute select-none pointer-events-none font-serif text-[120px] sm:text-[220px] font-black text-white/[0.07] tracking-tighter leading-none"
          >
            02
          </motion.div>

          <motion.div
            style={{ y: text2Y }}
            className="relative max-w-sm sm:max-w-md w-full text-center"
          >
            <div className="rounded-3xl bg-[#140e08]/85 backdrop-blur-lg border border-[#e2c892]/70 p-6 sm:p-8 shadow-2xl text-center">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#dfc285]/50 bg-[#2d1c0b] text-[#dfc285] mb-2 shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-[#dfc285]" />
              </span>

              <p className="font-serif text-base sm:text-lg text-[#e8cda1] mb-2.5">
                {weddingData.bismillahText}
              </p>

              <blockquote className="font-serif text-xs sm:text-sm text-[#fdf6ea] leading-relaxed italic">
                &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
              </blockquote>

              <p className="text-[11px] text-[#dac2a3] tracking-widest uppercase mt-3 font-serif">
                — Surah Ar-Rum: 21 —
              </p>

              <div className="mt-4 pt-3 border-t border-[#dfc285]/25 flex items-center justify-center gap-1.5 text-[10px] text-[#dfc285]/90 font-serif tracking-wider">
                <span>Melangkah masuk ke alam perkahwinan</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- SLIDE 03: ALAM KASIH & KIRA DETIK ---------------- */}
        <motion.div
          style={{ opacity: text3Opacity, display: text3Display }}
          className="absolute inset-0 flex items-center justify-center p-4 z-30 pointer-events-auto"
        >
          {/* Editorial Parallax Watermark "03" */}
          <motion.div
            style={{ y: text3WatermarkY }}
            className="absolute select-none pointer-events-none font-serif text-[120px] sm:text-[220px] font-black text-white/[0.07] tracking-tighter leading-none"
          >
            03
          </motion.div>

          <motion.div
            style={{ y: text3Y }}
            className="relative max-w-sm sm:max-w-md w-full text-center"
          >
            <div className="rounded-3xl bg-[#fdfbf7]/95 backdrop-blur-lg border border-[#dfc285] p-6 sm:p-7 shadow-2xl text-center text-[#2d2217]">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#c5a059]/60 bg-[#f8f2e4] text-[#8c6d32] font-serif font-bold text-xs tracking-widest mb-1.5 shadow-xs">
                H &amp; A
              </span>

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#8c6d32] font-semibold block">
                Selamat Datang Ke Alam Kasih
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217] mt-1">
                Harith &amp; Aisyah
              </h2>

              <p className="text-xs text-[#6e583e] font-serif mt-1">
                {weddingData.event.dateFormatted} • {weddingData.event.timeFormatted}
              </p>

              <div className="w-12 h-px bg-[#c5a059]/60 mx-auto my-2.5" />

              {/* Real-time Countdown Grid */}
              <div className="grid grid-cols-4 gap-2 my-3">
                {[
                  { label: "Hari", value: timeLeft.days },
                  { label: "Jam", value: timeLeft.hours },
                  { label: "Minit", value: timeLeft.minutes },
                  { label: "Saat", value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-[#f5ede0] border border-[#e0cfb8] p-2 text-center shadow-xs">
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#8c6d32] block">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-[#7a6449] font-semibold">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-[#7a6449] flex items-center justify-center gap-1 mt-2">
                <MapPin className="w-3 h-3 text-[#996515]" />
                <span>{weddingData.event.venueName}</span>
              </p>

              <div className="mt-4 pt-3 border-t border-[#dfc285]/40 flex items-center justify-center gap-1 text-[10px] text-[#8c6d32] font-serif">
                <span>Skrol seterusnya untuk kad jemputan &amp; RSVP</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- SLIDE 04: KAD JEMPUTAN & GERBANG RSVP ---------------- */}
        <motion.div
          style={{ opacity: text4Opacity, display: text4Display }}
          className="absolute inset-0 flex items-center justify-center p-4 z-30 pointer-events-auto"
        >
          {/* Editorial Parallax Watermark "04" */}
          <motion.div
            style={{ y: text4WatermarkY }}
            className="absolute select-none pointer-events-none font-serif text-[120px] sm:text-[220px] font-black text-white/[0.07] tracking-tighter leading-none"
          >
            04
          </motion.div>

          <motion.div
            style={{ y: text4Y }}
            className="relative max-w-sm sm:max-w-md w-full text-center"
          >
            <div className="rounded-3xl bg-[#140e08]/90 backdrop-blur-xl border border-[#dfc285] p-6 sm:p-8 shadow-2xl text-center">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#e8cda1] font-semibold block mb-1">
                Tiba Di Alam Perkahwinan
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold my-1">
                Kad Jemputan &amp; RSVP
              </h3>

              <p className="text-xs text-[#f4e7d3] font-serif mt-2 leading-relaxed">
                Anda kini telah melangkah masuk ke taman perkahwinan kami. Sila sahkan kehadiran anda atau teruskan membaca atur cara majlis.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={scrollToRsvp}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#b0883b] via-[#d4af37] to-[#8c6d32] text-white font-serif font-bold text-xs tracking-widest uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Sahkan Kehadiran (RSVP)</span>
                  <Sparkles className="w-4 h-4" />
                </button>

                <button
                  onClick={scrollToContent}
                  className="w-full py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#f5ebd7] font-serif text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Lihat Kad Penuh &amp; Atur Cara</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#dfc285]" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
