"use client";

import React from "react";

interface BotanicalWildflowerFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * BotanicalWildflowerFrame
 * Full-screen cardless romantic vintage garden estate background (English Garden Gazebo & Fountain).
 * The entire background is the watercolor garden illustration with classical gazebo, fountain, and lush lilies/roses.
 * Words sit directly on the watercolor parchment wash in the center.
 * Multi-layer vertical parallax on the garden background, floating petals, and typography.
 */
export default function BotanicalWildflowerFrame({
  children,
  className = "",
}: BotanicalWildflowerFrameProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col items-center justify-between select-none ${className}`}>
      {/* ========================================================================= */}
      {/* 1. LAYER: TORN-PAPER BOTANICAL WATERCOLOR BACKGROUND                       */}
      {/* ========================================================================= */}
      <div
        data-swiper-parallax-y="-10%"
        data-swiper-parallax-scale="1.06"
        className="slide-bg absolute inset-0 z-0 bg-cover bg-center pointer-events-none transition-transform duration-1000"
        style={{
          backgroundImage: "url('/images/page_background.jpg')",
          backgroundPosition: "center center",
        }}
      />

      {/* Very subtle soft warm highlight to preserve authentic cotton paper texture while ensuring crisp typography */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(254, 252, 247, 0.25) 0%, rgba(254, 252, 247, 0.1) 60%, transparent 100%)
          `,
        }}
      />

      {/* Subtle edge vignette */}
      <div className="absolute inset-0 z-0 bg-radial from-transparent via-transparent to-[#282218]/10 pointer-events-none" />

      {/* ========================================================================= */}
      {/* 2. LAYER: FLOATING PETALS & BOTANICAL PARTICLES (Parallax 3D Depth)       */}
      {/* ========================================================================= */}
      <div 
        data-swiper-parallax-y="-120"
        data-swiper-parallax-scale="1.12"
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      >
        {/* Soft Pink Lily Petals */}
        <div 
          className="absolute top-[22%] left-[10%] w-4 h-7 bg-[#f2cbd2] rounded-[50%/70%_70%_30%_30%] rotate-[28deg] shadow-xs opacity-75 border border-[#ba7d87]/30"
        />
        <div 
          className="absolute bottom-[28%] right-[12%] w-3.5 h-6 bg-[#f4d2d8] rounded-[50%/60%_60%_40%_40%] -rotate-[38deg] shadow-xs opacity-70 border border-[#ba7d87]/30"
        />
        {/* Wild Rose Petals */}
        <div 
          className="absolute top-[48%] right-[8%] w-4 h-5 bg-[#e8b5be] rounded-[50%] rotate-[18deg] shadow-xs opacity-80"
        />
        <div 
          className="absolute top-[35%] left-[16%] w-3.5 h-4.5 bg-[#f7dbe0] rounded-[50%] -rotate-[22deg] opacity-75"
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN CONTENT AREA (WORDS DIRECTLY ON THE GARDEN BACKGROUND)            */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex-1 w-full max-w-xl flex flex-col justify-between items-center px-6 sm:px-12 pt-14 pb-24 sm:pt-16 sm:pb-28 overflow-y-auto overscroll-contain no-scrollbar">
        {children}
      </div>
    </div>
  );
}
