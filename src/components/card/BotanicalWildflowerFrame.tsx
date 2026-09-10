"use client";

import React from "react";

interface BotanicalWildflowerFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * BotanicalWildflowerFrame
 * Full-screen cardless botanical paper stage.
 * The entire viewport background IS the handmade flecked paper texture.
 * No cards, no boxes, no borders. Words sit directly on the paper background.
 * Multi-layer vertical parallax on the paper, floral vines, side stems, bottom meadow, and floating petals.
 */
export default function BotanicalWildflowerFrame({
  children,
  className = "",
}: BotanicalWildflowerFrameProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden flex flex-col items-center justify-between select-none ${className}`}>
      {/* ========================================================================= */}
      {/* 1. LAYER: FULL-SCREEN HANDMADE FLECKED PAPER BACKGROUND                   */}
      {/* ========================================================================= */}
      <div
        data-swiper-parallax-y="-10%"
        data-swiper-parallax-scale="1.06"
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-1000"
        style={{
          background: `
            radial-gradient(ellipse at 50% 35%, #fefcf9 0%, #faf6ee 55%, #f2eae0 100%)
          `,
        }}
      >
        {/* Seamless Handmade Recycled Paper Fiber Flecks (SVG pattern across whole screen) */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07'/%3E%3Ccircle cx='35' cy='45' r='1.2' fill='%23665544' opacity='0.28'/%3E%3Ccircle cx='180' cy='95' r='1.5' fill='%23775533' opacity='0.22'/%3E%3Ccircle cx='95' cy='210' r='1' fill='%23554433' opacity='0.3'/%3E%3Ccircle cx='240' cy='170' r='1.8' fill='%23665544' opacity='0.22'/%3E%3Ccircle cx='55' cy='155' r='1.3' fill='%23775533' opacity='0.26'/%3E%3Ccircle cx='270' cy='60' r='1.1' fill='%23554433' opacity='0.25'/%3E%3Ccircle cx='140' cy='260' r='1.4' fill='%23665544' opacity='0.28'/%3E%3Cpath d='M115,55 Q118,60 123,59' stroke='%23665544' stroke-width='0.8' fill='none' opacity='0.25'/%3E%3Cpath d='M210,35 Q215,39 212,44' stroke='%23775533' stroke-width='0.7' fill='none' opacity='0.22'/%3E%3Cpath d='M25,125 Q29,129 34,127' stroke='%23554433' stroke-width='0.8' fill='none' opacity='0.26'/%3E%3Cpath d='M165,225 Q170,229 166,235' stroke='%23665544' stroke-width='0.7' fill='none' opacity='0.22'/%3E%3Cpath d='M255,240 Q258,244 263,242' stroke='%23775533' stroke-width='0.8' fill='none' opacity='0.25'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Soft natural edge lighting vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#4a3f33]/[0.08]" />
      </div>

      {/* ========================================================================= */}
      {/* 2. LAYER: TOP BOTANICAL VINES & BLOSSOMS (Full-width Parallax)             */}
      {/* ========================================================================= */}
      <div 
        data-swiper-parallax-y="-55"
        className="absolute top-0 inset-x-0 h-32 sm:h-40 pointer-events-none z-10 flex justify-between overflow-hidden"
      >
        {/* Top Left Climbing Vine & Daisies */}
        <svg className="w-52 sm:w-72 h-32 sm:h-40 text-[#52664b]" viewBox="0 0 240 140" fill="none">
          {/* Main graceful vine */}
          <path d="M-20,40 Q40,20 90,32 T190,15" stroke="#5d7253" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M35,28 Q60,10 90,14" stroke="#5d7253" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M120,26 Q145,12 175,18" stroke="#5d7253" strokeWidth="1.2" strokeLinecap="round" />
          {/* Olive & sage leaves */}
          <path d="M28,28 Q22,18 30,14 Q38,21 28,28 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.9" />
          <path d="M58,18 Q66,8 74,11 Q68,21 58,18 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.9" />
          <path d="M95,32 Q105,22 114,26 Q106,37 95,32 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.9" />
          <path d="M135,24 Q148,15 155,21 Q145,31 135,24 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.9" />
          <path d="M175,18 Q185,10 192,15 Q184,24 175,18 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.9" />
          {/* Dusky rose bud clusters */}
          <path d="M70,12 L80,4" stroke="#5d7253" strokeWidth="1.1" />
          <circle cx="82" cy="3" r="3.6" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.9" />
          <circle cx="87" cy="7" r="2.8" fill="#e5abab" stroke="#ba7d7d" strokeWidth="0.9" />
          
          <path d="M155,19 L168,11" stroke="#5d7253" strokeWidth="1.1" />
          <circle cx="170" cy="10" r="3.4" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.9" />

          {/* White Daisy Blossom Top-Left */}
          <g transform="translate(22, 60) scale(0.78)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-16"
                rx="3.8"
                ry="10"
                fill="#ffffff"
                stroke="#54674a"
                strokeWidth="0.9"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="8" fill="#dfa528" stroke="#aa7a18" strokeWidth="1.1" />
            <circle cx="0" cy="0" r="5" fill="#f5be38" />
          </g>

          {/* Small Daisy Accent */}
          <g transform="translate(85, 50) scale(0.52)">
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-14"
                rx="3.4"
                ry="9"
                fill="#ffffff"
                stroke="#54674a"
                strokeWidth="0.9"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="6.5" fill="#dfa528" />
          </g>
        </svg>

        {/* Top Right Creeping Vine & Golden Buttercup */}
        <svg className="w-52 sm:w-72 h-32 sm:h-40 text-[#52664b]" viewBox="0 0 240 140" fill="none">
          <path d="M260,45 Q190,15 140,28 T25,14" stroke="#5d7253" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M175,24 Q150,8 120,12" stroke="#5d7253" strokeWidth="1.3" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M195,30 Q202,18 212,22 Q204,33 195,30 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.9" />
          <path d="M150,22 Q142,10 132,13 Q139,24 150,22 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.9" />
          <path d="M100,24 Q90,16 84,23 Q94,30 100,24 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.9" />
          <path d="M60,18 Q50,11 44,18 Q54,25 60,18 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.9" />
          {/* Pink buds */}
          <path d="M120,11 L110,3" stroke="#5d7253" strokeWidth="1.1" />
          <circle cx="108" cy="2" r="3.6" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.9" />
          <circle cx="103" cy="6" r="2.8" fill="#e5abab" stroke="#ba7d7d" strokeWidth="0.9" />

          {/* Golden Buttercup Blossom Top-Right */}
          <g transform="translate(205, 52) scale(0.8)">
            <circle cx="-6" cy="-6" r="10" fill="#f0b833" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="6" cy="-6" r="10" fill="#f5c242" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="0" cy="6" r="10" fill="#dfa528" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="-7" cy="2" r="9" fill="#e8b02c" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="7" cy="2" r="9" fill="#f8ca50" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="0" cy="0" r="5" fill="#52664b" />
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 3. LAYER: LEFT & RIGHT SIDE BOTANICAL CLUSTERS                            */}
      {/* ========================================================================= */}
      {/* Left side botanical sprigs */}
      <div 
        data-swiper-parallax-y="-35"
        className="absolute left-0 top-36 bottom-36 w-10 sm:w-16 pointer-events-none z-10 hidden sm:block overflow-hidden"
      >
        <svg className="w-full h-full" viewBox="0 0 60 500" preserveAspectRatio="none" fill="none">
          <path d="M15,500 Q30,370 10,250 T22,0" stroke="#5d7253" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18,100 Q30,90 32,102 Q22,110 18,100 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
          <path d="M12,190 Q26,182 24,198 Q14,202 12,190 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
          <path d="M16,300 Q30,290 28,306 Q18,312 16,300 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
          <path d="M14,400 Q28,390 26,406 Q16,412 14,400 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
          <circle cx="34" cy="140" r="3.5" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
          <circle cx="32" cy="235" r="3.5" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
          <circle cx="33" cy="345" r="3.5" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Right side botanical sprigs */}
      <div 
        data-swiper-parallax-y="-35"
        className="absolute right-0 top-36 bottom-36 w-10 sm:w-16 pointer-events-none z-10 hidden sm:block overflow-hidden"
      >
        <svg className="w-full h-full" viewBox="0 0 60 500" preserveAspectRatio="none" fill="none">
          <path d="M45,500 Q30,370 50,250 T38,0" stroke="#5d7253" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M42,80 Q30,70 32,84 Q40,90 42,80 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
          <path d="M48,175 Q34,168 36,184 Q46,188 48,175 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
          <path d="M44,270 Q30,260 32,276 Q42,282 44,270 Z" fill="#697f5f" stroke="#4c5e43" strokeWidth="0.8" />
          <path d="M46,370 Q32,360 34,376 Q44,382 46,370 Z" fill="#7a906e" stroke="#4c5e43" strokeWidth="0.8" />
          {/* Side Buttercup */}
          <g transform="translate(30, 220) scale(0.6)">
            <circle cx="-5" cy="-5" r="9" fill="#f0b833" stroke="#aa7a18" strokeWidth="0.9" />
            <circle cx="5" cy="-5" r="9" fill="#f5c242" stroke="#aa7a18" strokeWidth="0.9" />
            <circle cx="0" cy="5" r="9" fill="#dfa528" stroke="#aa7a18" strokeWidth="0.9" />
            <circle cx="0" cy="0" r="4.5" fill="#52664b" />
          </g>
          <circle cx="28" cy="120" r="3.5" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
          <circle cx="30" cy="320" r="3.5" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="0.8" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN CONTENT AREA (WORDS DIRECTLY ON PAPER BACKGROUND)                 */}
      {/* ========================================================================= */}
      <div className="relative z-20 flex-1 w-full max-w-xl flex flex-col justify-between items-center px-6 sm:px-12 pt-14 pb-24 sm:pt-16 sm:pb-28 overflow-y-auto overscroll-contain no-scrollbar">
        {children}
      </div>

      {/* ========================================================================= */}
      {/* 5. LAYER: BOTTOM WILDFLOWER MEADOW (Full-width Parallax)                   */}
      {/* ========================================================================= */}
      <div 
        data-swiper-parallax-y="45"
        className="absolute bottom-0 inset-x-0 h-28 sm:h-36 pointer-events-none z-10 overflow-hidden"
      >
        <svg className="w-full h-full" viewBox="0 0 900 130" preserveAspectRatio="none" fill="none">
          {/* Meadow foliage background stalks */}
          <path d="M40,130 Q70,70 60,45" stroke="#5d7253" strokeWidth="2" />
          <path d="M120,130 Q140,65 160,40" stroke="#5d7253" strokeWidth="2" />
          <path d="M240,130 Q230,75 220,50" stroke="#5d7253" strokeWidth="2" />
          <path d="M340,130 Q360,65 380,42" stroke="#5d7253" strokeWidth="2" />
          <path d="M450,130 Q460,70 470,35" stroke="#5d7253" strokeWidth="2" />
          <path d="M570,130 Q560,60 550,45" stroke="#5d7253" strokeWidth="2" />
          <path d="M680,130 Q700,72 720,40" stroke="#5d7253" strokeWidth="2" />
          <path d="M800,130 Q790,68 780,50" stroke="#5d7253" strokeWidth="2" />
          <path d="M860,130 Q870,80 880,55" stroke="#5d7253" strokeWidth="2" />

          {/* Grass & Leaf sprays */}
          <path d="M30,120 Q10,90 35,75 Q48,100 30,120 Z" fill="#697f5f" opacity="0.85" />
          <path d="M90,125 Q70,95 100,85 Q110,105 90,125 Z" fill="#7a906e" opacity="0.9" />
          <path d="M270,122 Q290,92 260,80 Q250,102 270,122 Z" fill="#697f5f" opacity="0.85" />
          <path d="M410,120 Q440,90 420,75 Q398,100 410,120 Z" fill="#7a906e" opacity="0.9" />
          <path d="M620,122 Q600,92 635,80 Q650,102 620,122 Z" fill="#697f5f" opacity="0.85" />
          <path d="M750,120 Q780,90 760,75 Q738,100 750,120 Z" fill="#7a906e" opacity="0.9" />

          {/* Pink bud sprigs */}
          <g transform="translate(370, 42)">
            <circle cx="0" cy="0" r="4" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="1" />
            <circle cx="7" cy="5" r="3.2" fill="#e5abab" stroke="#ba7d7d" strokeWidth="1" />
          </g>
          <g transform="translate(560, 45)">
            <circle cx="0" cy="0" r="4" fill="#d99b9b" stroke="#ba7d7d" strokeWidth="1" />
            <circle cx="-7" cy="5" r="3.2" fill="#e5abab" stroke="#ba7d7d" strokeWidth="1" />
          </g>

          {/* Large White Daisy Left */}
          <g transform="translate(90, 70) scale(1.1)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-16"
                rx="4"
                ry="10.5"
                fill="#ffffff"
                stroke="#54674a"
                strokeWidth="1"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="8.5" fill="#dfa528" stroke="#aa7a18" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="5.5" fill="#f5be38" />
          </g>

          {/* Small Daisy Mid-Left */}
          <g transform="translate(220, 58) scale(0.8)">
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-14"
                rx="3.5"
                ry="9.5"
                fill="#ffffff"
                stroke="#54674a"
                strokeWidth="0.9"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="7" fill="#dfa528" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="0" cy="0" r="4.5" fill="#f5be38" />
          </g>

          {/* Golden Buttercup Center */}
          <g transform="translate(470, 45) scale(1.1)">
            <circle cx="-7" cy="-7" r="11" fill="#f0b833" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="7" cy="-7" r="11" fill="#f5c242" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="0" cy="7" r="11" fill="#dfa528" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="-8" cy="2" r="10" fill="#e8b02c" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="8" cy="2" r="10" fill="#f8ca50" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="0" cy="0" r="5.5" fill="#52664b" stroke="#3d4d36" strokeWidth="0.9" />
          </g>

          {/* Large White Daisy Right */}
          <g transform="translate(720, 60) scale(1.05)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-16"
                rx="4"
                ry="10.5"
                fill="#ffffff"
                stroke="#54674a"
                strokeWidth="1"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="8.5" fill="#dfa528" stroke="#aa7a18" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="5.5" fill="#f5be38" />
          </g>

          {/* Golden Buttercup Far-Right */}
          <g transform="translate(830, 68) scale(0.95)">
            <circle cx="-6" cy="-6" r="10" fill="#f0b833" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="6" cy="-6" r="10" fill="#f5c242" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="0" cy="6" r="10" fill="#dfa528" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="-7" cy="2" r="9" fill="#e8b02c" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="7" cy="2" r="9" fill="#f8ca50" stroke="#aa7a18" strokeWidth="1" />
            <circle cx="0" cy="0" r="5" fill="#52664b" />
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 6. LAYER: FLOATING PETALS (Heightened Parallax for 3D depth)              */}
      {/* ========================================================================= */}
      <div 
        data-swiper-parallax-y="-120"
        data-swiper-parallax-scale="1.15"
        className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
      >
        {/* Floating White Daisy Petals */}
        <div 
          className="absolute top-[20%] left-[8%] w-4 h-7 bg-white rounded-[50%/70%_70%_30%_30%] rotate-[28deg] shadow-sm opacity-80 border border-[#52664b]/20"
        />
        <div 
          className="absolute bottom-[22%] right-[10%] w-3.5 h-6 bg-white rounded-[50%/60%_60%_40%_40%] -rotate-[38deg] shadow-sm opacity-75 border border-[#52664b]/20"
        />
        {/* Floating Yellow Buttercup Petals */}
        <div 
          className="absolute top-[48%] right-[7%] w-4.5 h-5 bg-[#f0ba36] rounded-[50%] rotate-[18deg] shadow-sm opacity-85"
        />
        <div 
          className="absolute top-[32%] left-[14%] w-3.5 h-4 bg-[#f5c242] rounded-[50%] -rotate-[22deg] opacity-75"
        />
        {/* Floating Tiny Pink Bud Petal */}
        <div 
          className="absolute bottom-[18%] left-[15%] w-3 h-4 bg-[#d99b9b] rounded-full rotate-[65deg] opacity-70"
        />
      </div>
    </div>
  );
}
