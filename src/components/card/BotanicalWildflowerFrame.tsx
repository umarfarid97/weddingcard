"use client";

import React from "react";

interface BotanicalWildflowerFrameProps {
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
}

/**
 * BotanicalWildflowerFrame
 * Recreates the handmade flecked paper card framed by delicate hand-drawn
 * wildflowers (white daisies, sunny yellow buttercups, pink bud clusters, sage green vines)
 * as seen in the physical wedding stationery reference photo.
 * Equipped with staggered vertical parallax layers.
 */
export default function BotanicalWildflowerFrame({
  children,
  className = "",
  cardClassName = "",
}: BotanicalWildflowerFrameProps) {
  return (
    <div className={`relative w-full flex items-center justify-center py-6 px-6 sm:px-8 pointer-events-auto select-none ${className}`}>
      {/* ========================================================================= */}
      {/* 1. LAYER 2: THE HANDMADE FLECKED PAPER CARD BASE                          */}
      {/* ========================================================================= */}
      <div
        data-swiper-parallax-y="-25%"
        className={`relative w-full max-w-[425px] min-h-[580px] max-h-[90vh] flex flex-col justify-between rounded-2xl bg-[#faf7f0] text-[#283424] shadow-[0_22px_45px_-12px_rgba(42,32,18,0.28),0_4px_12px_rgba(0,0,0,0.06)] border border-[#ece4d3]/80 overflow-hidden ${cardClassName}`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(245, 238, 224, 0.9) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(243, 235, 220, 0.8) 0%, transparent 50%),
            linear-gradient(to bottom, #faf7f0 0%, #f7f2e6 100%)
          `,
        }}
      >
        {/* Handmade Recycled Paper Fiber Flecks (SVG pattern overlay) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-45 mix-blend-multiply z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3Ccircle cx='25' cy='35' r='1' fill='%23665544' opacity='0.25'/%3E%3Ccircle cx='140' cy='75' r='1.2' fill='%23775533' opacity='0.2'/%3E%3Ccircle cx='80' cy='160' r='0.8' fill='%23554433' opacity='0.3'/%3E%3Ccircle cx='180' cy='130' r='1.5' fill='%23665544' opacity='0.2'/%3E%3Ccircle cx='40' cy='120' r='1' fill='%23775533' opacity='0.25'/%3E%3Cpath d='M95,42 Q97,46 101,45' stroke='%23665544' stroke-width='0.7' fill='none' opacity='0.25'/%3E%3Cpath d='M160,25 Q164,28 162,32' stroke='%23775533' stroke-width='0.6' fill='none' opacity='0.2'/%3E%3Cpath d='M15,95 Q18,98 22,96' stroke='%23554433' stroke-width='0.7' fill='none' opacity='0.25'/%3E%3Cpath d='M125,175 Q129,178 126,183' stroke='%23665544' stroke-width='0.6' fill='none' opacity='0.2'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ========================================================================= */}
        {/* 2. BOTANICAL WILDFLOWER BORDERS & FLOWERS                                 */}
        {/* ========================================================================= */}

        {/* TOP VINE (Curving branches, sage leaves & pink buds) */}
        <div 
          data-swiper-parallax-y="-55"
          className="absolute top-0 inset-x-0 h-28 pointer-events-none z-10 flex justify-between overflow-hidden"
        >
          {/* Top Left Delicate Vines */}
          <svg className="w-40 h-28 text-[#586c4f]" viewBox="0 0 160 100" fill="none">
            {/* Vine stem */}
            <path d="M-10,35 Q30,20 65,30 T130,15" stroke="#5d7253" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M25,24 Q40,10 60,12" stroke="#5d7253" strokeWidth="1.2" strokeLinecap="round" />
            {/* Leaves */}
            <path d="M20,24 Q15,16 22,12 Q28,18 20,24 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M42,16 Q48,8 55,10 Q50,18 42,16 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M68,28 Q75,20 82,23 Q76,33 68,28 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M95,22 Q105,15 110,20 Q102,28 95,22 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
            {/* Pink bud sprigs */}
            <path d="M50,11 L58,4" stroke="#5d7253" strokeWidth="1" />
            <circle cx="59" cy="3" r="3.2" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
            <circle cx="63" cy="6" r="2.5" fill="#e5abab" stroke="#ba7d7d" strokeWidth="0.8" />
            
            <path d="M110,18 L120,12" stroke="#5d7253" strokeWidth="1" />
            <circle cx="122" cy="11" r="3" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
            {/* Small Daisy on Top Left */}
            <g transform="translate(15, 48) scale(0.68)">
              {/* Petals */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
                <ellipse
                  key={idx}
                  cx="0"
                  cy="-15"
                  rx="3.5"
                  ry="9"
                  fill="#ffffff"
                  stroke="#5d7253"
                  strokeWidth="0.9"
                  transform={`rotate(${angle})`}
                />
              ))}
              {/* Daisy Center */}
              <circle cx="0" cy="0" r="7" fill="#dfa528" stroke="#aa7a18" strokeWidth="1" />
              <circle cx="0" cy="0" r="4.5" fill="#f5be38" />
            </g>
          </svg>

          {/* Top Right Graceful Floral Tendril */}
          <svg className="w-44 h-28 text-[#586c4f]" viewBox="0 0 170 100" fill="none">
            <path d="M180,40 Q130,15 90,25 T10,12" stroke="#5d7253" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M120,20 Q105,8 85,12" stroke="#5d7253" strokeWidth="1.2" strokeLinecap="round" />
            {/* Leaves */}
            <path d="M135,26 Q140,16 148,19 Q142,28 135,26 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M105,18 Q100,8 92,10 Q98,19 105,18 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M70,20 Q62,14 58,20 Q66,26 70,20 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
            {/* Dusky pink buds */}
            <path d="M85,11 L78,4" stroke="#5d7253" strokeWidth="1" />
            <circle cx="76" cy="3" r="3.2" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
            <circle cx="72" cy="7" r="2.5" fill="#e5abab" stroke="#ba7d7d" strokeWidth="0.8" />

            {/* Top Right Buttercup Flower */}
            <g transform="translate(145, 42) scale(0.65)">
              <circle cx="-5" cy="-5" r="9" fill="#f0b833" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="5" cy="-5" r="9" fill="#f5c242" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="0" cy="5" r="9" fill="#dfa528" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="-6" cy="2" r="8" fill="#e8b02c" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="6" cy="2" r="8" fill="#f8ca50" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="0" cy="0" r="4.5" fill="#586c4f" />
            </g>
          </svg>
        </div>

        {/* LEFT SIDE BORDER (Daisies, stems & leaves crawling upwards) */}
        <div 
          data-swiper-parallax-y="-35"
          className="absolute left-0 top-20 bottom-24 w-12 pointer-events-none z-10 hidden sm:block overflow-hidden"
        >
          <svg className="w-12 h-full" viewBox="0 0 50 400" preserveAspectRatio="none" fill="none">
            {/* Vine stem */}
            <path d="M12,400 Q25,300 8,200 T18,0" stroke="#5d7253" strokeWidth="1.5" strokeLinecap="round" />
            {/* Leaves along edge */}
            <path d="M15,80 Q25,72 26,82 Q18,88 15,80 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M10,150 Q22,145 20,158 Q12,160 10,150 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M14,240 Q25,232 24,245 Q16,250 14,240 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M12,320 Q24,312 22,325 Q14,330 12,320 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
            {/* Pink bud clusters */}
            <circle cx="28" cy="115" r="3.2" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
            <circle cx="26" cy="190" r="3.2" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
            <circle cx="27" cy="275" r="3.2" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
          </svg>
        </div>

        {/* RIGHT SIDE BORDER (Yellow buttercups, daisies & sprigs) */}
        <div 
          data-swiper-parallax-y="-35"
          className="absolute right-0 top-20 bottom-24 w-12 pointer-events-none z-10 hidden sm:block overflow-hidden"
        >
          <svg className="w-12 h-full" viewBox="0 0 50 400" preserveAspectRatio="none" fill="none">
            {/* Vine stem */}
            <path d="M38,400 Q25,300 42,200 T32,0" stroke="#5d7253" strokeWidth="1.5" strokeLinecap="round" />
            {/* Leaves */}
            <path d="M35,60 Q24,52 25,64 Q32,70 35,60 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M40,140 Q28,135 30,148 Q38,150 40,140 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M36,220 Q25,212 26,225 Q34,230 36,220 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
            <path d="M38,300 Q26,292 28,305 Q36,310 38,300 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
            {/* Small yellow buttercup on right edge */}
            <g transform="translate(25, 175) scale(0.55)">
              <circle cx="-5" cy="-5" r="9" fill="#f0b833" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="5" cy="-5" r="9" fill="#f5c242" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="0" cy="5" r="9" fill="#dfa528" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="0" cy="0" r="4" fill="#586c4f" />
            </g>
            <circle cx="22" cy="100" r="3" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
            <circle cx="24" cy="260" r="3" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* 3. CARD CONTENT (Typography, Buttons, Interactive Elements)               */}
        {/* ========================================================================= */}
        <div className="relative z-20 flex-1 flex flex-col px-5 sm:px-8 pt-9 pb-20 overflow-y-auto overscroll-contain no-scrollbar">
          {children}
        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM MEADOW BORDER (Lush blooming daisies, buttercups, herbs)       */}
        {/* ========================================================================= */}
        <div 
          data-swiper-parallax-y="40"
          className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-10 overflow-hidden"
        >
          <svg className="w-full h-24" viewBox="0 0 460 95" preserveAspectRatio="none" fill="none">
            {/* Meadow foliage background stalks */}
            <path d="M20,95 Q35,50 30,35" stroke="#5d7253" strokeWidth="1.5" />
            <path d="M60,95 Q70,45 80,30" stroke="#5d7253" strokeWidth="1.5" />
            <path d="M120,95 Q115,55 110,40" stroke="#5d7253" strokeWidth="1.5" />
            <path d="M170,95 Q180,48 190,32" stroke="#5d7253" strokeWidth="1.5" />
            <path d="M230,95 Q235,50 240,25" stroke="#5d7253" strokeWidth="1.5" />
            <path d="M290,95 Q285,45 280,35" stroke="#5d7253" strokeWidth="1.5" />
            <path d="M350,95 Q360,52 370,30" stroke="#5d7253" strokeWidth="1.5" />
            <path d="M410,95 Q405,50 400,38" stroke="#5d7253" strokeWidth="1.5" />
            <path d="M440,95 Q445,60 450,45" stroke="#5d7253" strokeWidth="1.5" />

            {/* Grass & leaf clusters */}
            <path d="M15,85 Q5,65 18,55 Q25,72 15,85 Z" fill="#697f5f" opacity="0.85" />
            <path d="M45,88 Q35,68 50,60 Q55,75 45,88 Z" fill="#7a906e" opacity="0.9" />
            <path d="M135,88 Q145,68 130,58 Q125,76 135,88 Z" fill="#697f5f" opacity="0.85" />
            <path d="M205,85 Q220,65 210,55 Q198,72 205,85 Z" fill="#7a906e" opacity="0.9" />
            <path d="M310,88 Q300,68 318,58 Q325,76 310,88 Z" fill="#697f5f" opacity="0.85" />
            <path d="M385,85 Q400,65 390,55 Q378,72 385,85 Z" fill="#7a906e" opacity="0.9" />

            {/* Pink bud clusters */}
            <g transform="translate(185, 30)">
              <circle cx="0" cy="0" r="3.2" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
              <circle cx="5" cy="4" r="2.6" fill="#e5abab" stroke="#ba7d7d" strokeWidth="0.8" />
            </g>
            <g transform="translate(280, 32)">
              <circle cx="0" cy="0" r="3.2" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
              <circle cx="-5" cy="4" r="2.6" fill="#e5abab" stroke="#ba7d7d" strokeWidth="0.8" />
            </g>

            {/* Large White Daisy Bottom-Left */}
            <g transform="translate(45, 52) scale(0.85)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
                <ellipse
                  key={idx}
                  cx="0"
                  cy="-15"
                  rx="3.6"
                  ry="9.5"
                  fill="#ffffff"
                  stroke="#586c4f"
                  strokeWidth="0.85"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="7.5" fill="#dfa528" stroke="#aa7a18" strokeWidth="1" />
              <circle cx="0" cy="0" r="5" fill="#f5be38" />
            </g>

            {/* Small Daisy Mid-Left */}
            <g transform="translate(110, 42) scale(0.62)">
              {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, idx) => (
                <ellipse
                  key={idx}
                  cx="0"
                  cy="-13"
                  rx="3.2"
                  ry="8.5"
                  fill="#ffffff"
                  stroke="#586c4f"
                  strokeWidth="0.85"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="6" fill="#dfa528" stroke="#aa7a18" strokeWidth="1" />
              <circle cx="0" cy="0" r="4" fill="#f5be38" />
            </g>

            {/* Golden Buttercup Center */}
            <g transform="translate(240, 32) scale(0.85)">
              <circle cx="-6" cy="-6" r="10" fill="#f0b833" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="6" cy="-6" r="10" fill="#f5c242" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="0" cy="6" r="10" fill="#dfa528" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="-7" cy="2" r="9" fill="#e8b02c" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="7" cy="2" r="9" fill="#f8ca50" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="0" cy="0" r="5" fill="#586c4f" stroke="#3d4d36" strokeWidth="0.8" />
            </g>

            {/* Large White Daisy Bottom-Right */}
            <g transform="translate(365, 45) scale(0.82)">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
                <ellipse
                  key={idx}
                  cx="0"
                  cy="-15"
                  rx="3.6"
                  ry="9.5"
                  fill="#ffffff"
                  stroke="#586c4f"
                  strokeWidth="0.85"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="7" fill="#dfa528" stroke="#aa7a18" strokeWidth="1" />
              <circle cx="0" cy="0" r="4.5" fill="#f5be38" />
            </g>

            {/* Golden Buttercup Far-Right */}
            <g transform="translate(425, 52) scale(0.75)">
              <circle cx="-5" cy="-5" r="9" fill="#f0b833" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="5" cy="-5" r="9" fill="#f5c242" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="0" cy="5" r="9" fill="#dfa528" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="-6" cy="2" r="8" fill="#e8b02c" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="6" cy="2" r="8" fill="#f8ca50" stroke="#aa7a18" strokeWidth="0.9" />
              <circle cx="0" cy="0" r="4.5" fill="#586c4f" />
            </g>
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FLOATING PETALS LAYER (Heightened Parallax for 3D depth)              */}
      {/* ========================================================================= */}
      <div 
        data-swiper-parallax-y="-120"
        data-swiper-parallax-scale="1.15"
        className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
      >
        {/* Floating White Daisy Petal 1 */}
        <div 
          className="absolute top-[18%] left-[6%] w-3.5 h-6 bg-white rounded-[50%/70%_70%_30%_30%] rotate-[28deg] shadow-sm opacity-80 border border-[#4a5f43]/20"
        />
        {/* Floating White Daisy Petal 2 */}
        <div 
          className="absolute bottom-[24%] right-[8%] w-3 h-5.5 bg-white rounded-[50%/60%_60%_40%_40%] -rotate-[42deg] shadow-sm opacity-75 border border-[#4a5f43]/20"
        />
        {/* Floating Yellow Buttercup Petal */}
        <div 
          className="absolute top-[45%] right-[5%] w-4 h-4.5 bg-[#f0ba36] rounded-[50%] rotate-[18deg] shadow-sm opacity-85"
        />
        {/* Floating Tiny Pink Bud Petal */}
        <div 
          className="absolute bottom-[16%] left-[12%] w-2.5 h-3.5 bg-[#d99b9b] rounded-full rotate-[70deg] opacity-70"
        />
      </div>
    </div>
  );
}
