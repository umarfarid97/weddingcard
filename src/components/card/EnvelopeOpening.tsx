"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import { getAssetPath } from "@/lib/basePath";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Call onOpen immediately on user gesture to initiate music playback & transition
    setTimeout(() => {
      onOpen();
    }, 1250);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#15120e] px-4 select-none overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* 1. Atmospheric Ambient Backdrop */}
      <div className="absolute inset-0 bg-radial from-[#2a2219] via-[#16120e] to-[#0d0a08] opacity-95 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#c5a059]/10 blur-[130px] pointer-events-none" />

      {/* Floating subtle warm gold dust motes */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#dfa528] blur-[0.5px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[#e8c87c] blur-[1px] animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#d4af37] blur-[0.5px] animate-pulse" style={{ animationDelay: "0.8s" }} />
      </div>

      {/* 2. Top Monogram Calligraphy Header */}
      <motion.div
        animate={isOpening ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 sm:mb-8 z-10 pointer-events-none"
      >
        <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#c5a059]/90 font-medium mb-1">
          Undangan Rasmi Walimatulurus
        </p>
        <h1 className="font-script text-3xl sm:text-4xl text-[#eeddb2] tracking-wide">
          {weddingData.groom.name} &amp; {weddingData.bride.name}
        </h1>
      </motion.div>

      {/* 3. Main Interactive 3D Envelope Container */}
      <motion.div
        animate={
          isOpening
            ? {
                scale: 1.08,
                y: -10,
                transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
              }
            : { scale: 1, y: 0 }
        }
        onClick={handleOpen}
        className="relative w-full max-w-[340px] sm:max-w-[400px] h-[235px] sm:h-[265px] cursor-pointer group"
      >
        {/* Realistic Ambient Ground Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/50 blur-xl rounded-full pointer-events-none" />

        {/* Envelope Back Plate (Textured Charcoal/Warm Stone) */}
        <div className="absolute inset-0 rounded-2xl bg-[#231b14] border border-[#c5a059]/35 shadow-2xl overflow-hidden">
          {/* Inner Botanical Foil Pattern on Inside Flap Lining */}
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('${getAssetPath("/images/page_background.jpg")}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* ========================================================================= */}
        {/* 4. THE INVITATION CARD (Pulls up smoothly with Roman Arch Window)           */}
        {/* ========================================================================= */}
        <motion.div
          animate={
            isOpening
              ? {
                  y: -135,
                  opacity: 1,
                  transition: { duration: 0.95, delay: 0.28, ease: [0.16, 1, 0.3, 1] },
                }
              : { y: 0, opacity: 0.95 }
          }
          className="absolute inset-x-4 top-3 bottom-3 rounded-t-[100px] sm:rounded-t-[120px] rounded-b-xl bg-[#faf6ee] p-5 shadow-2xl border border-[#c5a059]/40 flex flex-col items-center justify-start text-center z-10 overflow-hidden"
        >
          {/* Roman Arch Die-Cut Header Window with Garden Art */}
          <div className="relative w-full h-[120px] sm:h-[135px] rounded-t-[90px] sm:rounded-t-[110px] rounded-b-md overflow-hidden border border-[#c5a059]/40 shadow-inner mb-2">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${getAssetPath("/images/vintage_garden_bg.jpg")}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#faf6ee] via-transparent to-black/10" />
            
            {/* Arched Inner Hairline Frame */}
            <div className="absolute inset-1.5 rounded-t-[80px] sm:rounded-t-[100px] rounded-b-sm border border-[#c5a059]/30 pointer-events-none" />
          </div>

          {/* Invitation Card Content */}
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#8c6d32] font-serif font-semibold">
            Walimatulurus
          </p>
          <p className="font-script text-2xl sm:text-3xl text-[#3d4d38] -mt-0.5">
            {weddingData.groom.name} &amp; {weddingData.bride.name}
          </p>
          <div className="w-12 h-px bg-[#c5a059]/50 my-1" />
          <p className="text-[10px] text-[#556b4f] font-serif tracking-wider">
            {weddingData.event.dateFormatted}
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 5. ENVELOPE FRONT POCKET (Clean Architectural Fold)                       */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
          {/* Bottom Triangular Fold */}
          <div
            className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#f8f5ee] via-[#efe8d8] to-[#e6dbca] border-t border-[#c5a059]/40 shadow-md"
            style={{
              clipPath: "polygon(0% 100%, 100% 100%, 50% 48%)",
            }}
          />
          {/* Left Wing */}
          <div
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#ece4d3] to-transparent opacity-95"
            style={{
              clipPath: "polygon(0% 0%, 0% 100%, 50% 50%)",
            }}
          />
          {/* Right Wing */}
          <div
            className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-[#ece4d3] to-transparent opacity-95"
            style={{
              clipPath: "polygon(100% 0%, 100% 100%, 50% 50%)",
            }}
          />
          {/* Soft Gold Foil Border Accent */}
          <div 
            className="absolute inset-0 border border-[#c5a059]/30 rounded-2xl pointer-events-none"
          />
        </div>

        {/* ========================================================================= */}
        {/* 6. ENVELOPE TOP FLAP (Smooth 3D Opening Fold)                              */}
        {/* ========================================================================= */}
        <motion.div
          animate={
            isOpening
              ? {
                  rotateX: -180,
                  zIndex: 5,
                  transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
                }
              : { rotateX: 0, zIndex: 30 }
          }
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
          className="absolute inset-x-0 top-0 h-full pointer-events-none"
        >
          {/* Outer Flap Front (When closed) */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#f3ece0] via-[#ede4d3] to-[#e4d7bf] shadow-lg border-b border-[#c5a059]/45"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 50% 53%)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Fine Flap Embossed Edge Line */}
            <div 
              className="absolute inset-x-0 top-0 h-full border-b border-[#c5a059]/30"
              style={{ clipPath: "polygon(5% 0%, 95% 0%, 50% 50%)" }}
            />
          </div>

          {/* Inner Flap Back (When flipped open) */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#c5a059] to-[#8c6d32] shadow-inner"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 50% 53%)",
              transform: "rotateX(180deg)",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        {/* ========================================================================= */}
        {/* 7. LUXURY 3D WAX SEAL STAMP (UN Monogram)                                 */}
        {/* ========================================================================= */}
        <motion.div
          animate={
            isOpening
              ? {
                  scale: 0.75,
                  opacity: 0,
                  y: -15,
                  transition: { duration: 0.4, ease: "easeOut" },
                }
              : { scale: 1, opacity: 1, y: 0 }
          }
          className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center cursor-pointer pointer-events-auto"
        >
          <div className="relative group/seal">
            {/* Pulsing Warm Glow */}
            <div className="absolute -inset-3 rounded-full bg-[#dfa528]/25 blur-md animate-pulse group-hover/seal:bg-[#dfa528]/40 transition-colors duration-300" />

            {/* 3D Molten Wax Body */}
            <div className="relative w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full bg-gradient-to-br from-[#80222a] via-[#65171d] to-[#460d12] p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.35),inset_0_-3px_5px_rgba(0,0,0,0.6)] transform transition-transform duration-300 group-hover/seal:scale-108">
              {/* Beveled Edge Ring */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#721c23] to-[#501217] flex flex-col items-center justify-center text-center shadow-inner border border-[#d4af37]/40 relative overflow-hidden">
                {/* Metallic Gold Sheen Highlight */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white/20 blur-sm pointer-events-none" />
                
                {/* Monogram Content */}
                <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-[#f5e6c8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  U <span className="text-[#dfa528] text-xs font-normal">✦</span> N
                </span>
                <span className="text-[7px] uppercase tracking-[0.2em] text-[#d4af37]/90 font-serif font-semibold -mt-0.5">
                  11.04
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 8. TAP PROMPT & HINT                                                      */}
      {/* ========================================================================= */}
      <motion.div
        animate={isOpening ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 sm:mt-10 text-center pointer-events-none z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#251e17]/80 border border-[#c5a059]/40 backdrop-blur-sm shadow-md animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-[#dfa528]" />
          <p className="text-xs uppercase tracking-[0.3em] text-[#eeddb2] font-serif font-medium">
            Buka Undangan
          </p>
          <Sparkles className="w-3.5 h-3.5 text-[#dfa528]" />
        </div>
        <p className="text-[10px] text-[#eeddb2]/50 tracking-wider mt-2 font-light">
          Sentuh meterai lilin untuk membuka
        </p>
      </motion.div>
    </motion.div>
  );
}
