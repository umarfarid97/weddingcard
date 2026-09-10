"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { weddingData } from "@/data/weddingData";

interface GardenEntranceProps {
  onEnter: () => void;
}

// Gentle floating petal particles
const petals = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: `${(i * 7 + 5) % 95}%`,
  top: `${(i * 11) % 85}%`,
  size: 10 + (i % 4) * 6,
  delay: (i * 0.4) % 3,
  duration: 4 + (i % 3) * 2,
}));

export default function GardenEntrance({ onEnter }: GardenEntranceProps) {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);

    // Smooth cinematic transition timing
    setTimeout(() => {
      onEnter();
    }, 2400);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 overflow-hidden select-none bg-[#111611]"
    >
      {/* 1. Underlying Garden Meadow (Revealed as we pass through the arch) */}
      <motion.div
        animate={
          isEntering
            ? {
                scale: [0.88, 1],
                opacity: [0, 0.6, 1],
                transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
              }
            : { scale: 0.88, opacity: 0 }
        }
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/garden_meadow.jpg')" }}
      >
        {/* Dreamy sunburst overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f9f5ea]/40 via-transparent to-[#1a140d]/40" />
      </motion.div>

      {/* 2. Grand Floral Archway Gate (Zooms forward and parts outward like walking in) */}
      <motion.div
        animate={
          isEntering
            ? {
                scale: 3.6,
                opacity: [1, 1, 0.4, 0],
                filter: ["blur(0px)", "blur(0px)", "blur(4px)", "blur(12px)"],
                transition: { duration: 2.2, ease: [0.32, 0, 0.24, 1] },
              }
            : { scale: 1, opacity: 1, filter: "blur(0px)" }
        }
        style={{ transformOrigin: "50% 48%" }}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
      >
        <img
          src="/images/garden_arch.jpg"
          alt="Garden Floral Entrance Arch"
          className="w-full h-full object-cover"
        />

        {/* Cinematic Vignette Framing */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/60 pointer-events-none" />
      </motion.div>

      {/* 3. Golden Sunbeam Flash (Peaks at the moment of passing through the arch) */}
      <motion.div
        animate={
          isEntering
            ? {
                opacity: [0, 0.85, 0],
                scale: [0.8, 1.8, 2.2],
                transition: { duration: 1.6, delay: 0.6, ease: "easeInOut" },
              }
            : { opacity: 0, scale: 0.8 }
        }
        className="absolute inset-0 bg-radial from-[#fff8e7] via-[#f5deb3]/60 to-transparent pointer-events-none mix-blend-screen"
      />

      {/* 4. Floating Flower Petals (Drift calmly, then rush towards camera upon enter) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ opacity: 0.75, y: -20, rotate: 0 }}
            animate={
              isEntering
                ? {
                    scale: [1, 2.8, 4.5],
                    opacity: [0.8, 1, 0],
                    y: 600,
                    x: (petal.id % 2 === 0 ? 1 : -1) * 250,
                    rotate: 360,
                    transition: { duration: 1.8, delay: petal.delay * 0.2, ease: "easeIn" },
                  }
                : {
                    y: [0, 80, 160],
                    x: [0, (petal.id % 2 === 0 ? 15 : -15), 0],
                    rotate: [0, 45, 90],
                    opacity: [0.4, 0.85, 0.4],
                    transition: {
                      duration: petal.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: petal.delay,
                    },
                  }
            }
            style={{
              left: petal.left,
              top: petal.top,
              width: petal.size,
              height: petal.size * 1.3,
            }}
            className="absolute rounded-full bg-gradient-to-tr from-[#fff5ea] via-[#ffd6e0] to-[#ffffff] shadow-sm backdrop-blur-[1px] opacity-80"
          />
        ))}
      </div>

      {/* 5. Center Glassmorphism Plaque & Interactive Button */}
      <AnimatePresence>
        {!isEntering && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)", transition: { duration: 0.6 } }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4 z-30"
          >
            {/* Romantic Frosted Glass Card */}
            <div className="relative max-w-sm w-full mx-auto rounded-3xl bg-[#1d1712]/55 backdrop-blur-md border border-[#dfc285]/50 p-7 text-center shadow-2xl overflow-hidden">
              {/* Inner golden hairline border */}
              <div className="absolute inset-2 rounded-2xl border border-[#c5a059]/30 pointer-events-none" />

              {/* Decorative top icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c5a059]/30 to-[#8c6d32]/40 border border-[#dfc285]/60 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Sparkles className="w-5 h-5 text-[#fdedc9] animate-pulse" />
              </div>

              {/* Header Title */}
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#e8cda1] font-medium mb-1">
                Undangan Walimatulurus
              </p>

              {/* Couple Names */}
              <h1 className="font-script text-4xl sm:text-5xl text-[#ffffff] my-2 drop-shadow-md">
                {weddingData.groom.name} &amp; {weddingData.bride.name}
              </h1>

              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto my-2" />

              {/* Date & Venue */}
              <p className="text-xs text-[#f4e7d3] font-serif tracking-wider">
                {weddingData.event.dateFormatted}
              </p>
              <p className="text-[11px] text-[#dac2a3] mt-0.5 font-light">
                {weddingData.event.venueName}
              </p>

              {/* Enter Button */}
              <div className="mt-6 pt-2">
                <button
                  onClick={handleEnter}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b0883b] via-[#d4af37] to-[#8c6d32] text-white font-serif font-bold text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Shimmer light pass */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <span>Masuk ke Taman</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">🌿</span>
                </button>
              </div>

              {/* Sub-prompt */}
              <p className="text-[10px] text-[#cfb794]/80 tracking-widest uppercase font-serif mt-4">
                Sentuh untuk memulakan detik indah
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
