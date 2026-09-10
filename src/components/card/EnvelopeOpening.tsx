"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Graceful, refined transition to the main invitation
    setTimeout(() => {
      onOpen();
    }, 1300);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#15120e] px-4 overflow-hidden select-none"
      style={{ perspective: 1200 }}
    >
      {/* Soft warm vignette backdrop */}
      <div className="absolute inset-0 bg-radial from-[#251e17] via-[#15120e] to-[#0c0a08] opacity-95 pointer-events-none" />

      {/* Subtle warm glow behind the envelope */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#c5a059]/10 blur-[120px] pointer-events-none" />

      {/* Main Interactive Envelope Container */}
      <motion.div
        animate={
          isOpening
            ? {
                scale: 1.18,
                y: -15,
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              }
            : { scale: 1, y: 0 }
        }
        onClick={handleOpen}
        className="relative w-full max-w-[340px] sm:max-w-[400px] h-[230px] sm:h-[260px] cursor-pointer group"
      >
        {/* Realistic Ground Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/40 blur-xl rounded-full pointer-events-none" />

        {/* Envelope Back Plate (Textured Charcoal/Warm Stone) */}
        <div className="absolute inset-0 rounded-xl bg-[#231b14] border border-[#c5a059]/30 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* The Invitation Letter Card (Slides up gracefully when opened) */}
        <motion.div
          animate={
            isOpening
              ? {
                  y: -120,
                  opacity: 1,
                  transition: { duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                }
              : { y: 0, opacity: 0.95 }
          }
          className="absolute inset-x-4 top-3 bottom-3 rounded-lg bg-gradient-to-b from-[#fdfbf7] via-[#f7f3ea] to-[#ede3d1] p-6 shadow-xl border border-[#c5a059]/40 flex flex-col items-center justify-center text-center z-10"
        >
          {/* Inner hairline border */}
          <div className="absolute inset-2 rounded-md border border-[#c5a059]/25 pointer-events-none" />

          <p className="text-[9px] uppercase tracking-[0.35em] text-[#8c6d32] font-medium mb-1">
            Walimatulurus
          </p>

          <p className="font-script text-3xl sm:text-4xl text-[#996515] my-1">
            {weddingData.groom.name} &amp; {weddingData.bride.name}
          </p>

          <div className="w-12 h-px bg-[#c5a059]/50 my-1" />

          <p className="text-[10px] text-[#6b553e] font-serif tracking-wider">
            {weddingData.event.dateFormatted}
          </p>
          <p className="text-[9px] text-[#8c7457] mt-0.5">
            {weddingData.event.venueName}
          </p>
        </motion.div>

        {/* Envelope Front Pocket (Clean Architectural Fold) */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
          <div
            className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#f8f5ee] via-[#efe8d8] to-[#e5dac5] border-t border-[#c5a059]/40 shadow-sm"
            style={{
              clipPath: "polygon(0% 100%, 100% 100%, 50% 48%)",
            }}
          />
          <div
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#ece3d1] to-transparent opacity-95"
            style={{
              clipPath: "polygon(0% 0%, 0% 100%, 50% 50%)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-[#ece3d1] to-transparent opacity-95"
            style={{
              clipPath: "polygon(100% 0%, 100% 100%, 50% 50%)",
            }}
          />
        </div>

        {/* Envelope Top Flap (Smooth Natural 3D Fold) */}
        <motion.div
          animate={
            isOpening
              ? {
                  rotateX: -180,
                  zIndex: 5,
                  transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
                }
              : { rotateX: 0, zIndex: 30 }
          }
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
          className="absolute inset-x-0 top-0 h-full pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#f3ece0] via-[#ede4d3] to-[#e4d7bf] shadow-md border-b border-[#c5a059]/40"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 50% 52%)",
              backfaceVisibility: "hidden",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#d8c49e] to-[#caa76f] shadow-inner"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 50% 52%)",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        {/* Elegant Minimalist Gold Monogram Seal */}
        <motion.div
          animate={
            isOpening
              ? {
                  scale: 0.8,
                  opacity: 0,
                  transition: { duration: 0.35, ease: "easeOut" },
                }
              : { scale: 1, opacity: 1 }
          }
          className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
        >
          <div className="relative group/seal">
            <div className="absolute -inset-2 rounded-full bg-[#c5a059]/15 blur-sm opacity-0 group-hover/seal:opacity-100 transition-opacity duration-300" />
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#e6ce97] via-[#c5a059] to-[#8c6d32] p-[1.5px] shadow-lg transform transition-transform duration-300 group-hover/seal:scale-105">
              <div className="w-full h-full rounded-full bg-[#271f16] flex flex-col items-center justify-center text-center shadow-inner border border-[#c5a059]/40">
                <span className="font-serif text-sm font-semibold tracking-wider text-[#eeddb2]">
                  {weddingData.groom.name[0]} · {weddingData.bride.name[0]}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Refined Bottom Invitation Prompt */}
      <motion.div
        animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-12 inset-x-0 text-center pointer-events-none"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-[#c5a059]/90 font-serif font-light">
          Buka Undangan
        </p>
        <div className="w-8 h-px bg-[#c5a059]/40 mx-auto mt-2" />
      </motion.div>
    </motion.div>
  );
}
