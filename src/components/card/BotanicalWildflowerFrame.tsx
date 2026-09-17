"use client";

import React from "react";
import { getAssetPath } from "@/lib/basePath";

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
          backgroundImage: `url('${getAssetPath("/images/page_background.jpg")}')`,
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
      {/* 2. MAIN CONTENT AREA (WORDS DIRECTLY ON THE BOTANICAL BACKGROUND)         */}
      {/* Safe padding top & bottom ensures text sits in clear ivory canvas         */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex-1 w-full max-w-lg flex flex-col justify-center items-center px-4 sm:px-6 pt-12 pb-14 sm:pt-16 sm:pb-16 overflow-y-auto overscroll-contain no-scrollbar">
        {children}
      </div>
    </div>
  );
}
