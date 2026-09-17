"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ChevronUp, Sparkles } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import { getAssetPath } from "@/lib/basePath";

interface EnvelopeOpeningProps {
  onOpen: () => void;
  onInteract?: () => void;
}

export default function EnvelopeOpening({ onOpen, onInteract }: EnvelopeOpeningProps) {
  const [isDone, setIsDone] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  // 1:1 Gesture Progress: 0 (completely closed) to 1 (completely opened)
  const progress = useMotionValue(0);

  // 1. 3D Flap Rotation: 0 -> 0.45 progress flips flap 0deg -> -180deg
  const flapRotateX = useTransform(progress, [0, 0.45], [0, -180]);
  // Flap shifts behind the rising card once it passes -90 degrees
  const flapZIndex = useTransform(progress, [0, 0.22, 0.23, 1], [35, 35, 8, 8]);

  // 2. Inner Invitation Card Slide-Up: emerges as flap opens (0.2 -> 1.0 progress)
  const cardY = useTransform(progress, [0.2, 1], [0, -250]);
  const cardScale = useTransform(progress, [0.2, 1], [0.94, 1.02]);
  const cardShadow = useTransform(
    progress,
    [0.2, 1],
    ["0 10px 25px -5px rgba(0,0,0,0.3)", "0 25px 50px -12px rgba(0,0,0,0.55)"]
  );

  // 3. Wax Seal Lift and Disappear
  const sealScale = useTransform(progress, [0, 0.18, 0.42], [1, 1.15, 0.4]);
  const sealOpacity = useTransform(progress, [0, 0.25, 0.42], [1, 0.85, 0]);

  // 4. Prompts fade out immediately on swipe
  const promptOpacity = useTransform(progress, [0, 0.15], [1, 0]);
  const headerOpacity = useTransform(progress, [0, 0.4], [1, 0.35]);

  // Trigger smooth finish animation
  const completeOpening = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsDone(true);
    if (onInteract) onInteract();

    animate(progress, 1, {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        setTimeout(() => {
          onOpen();
        }, 350);
      },
    });
  };

  // Reset back to closed if drag didn't cross threshold
  const resetEnvelope = () => {
    isAnimatingRef.current = true;
    animate(progress, 0, {
      type: "spring",
      stiffness: 280,
      damping: 24,
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  };

  // 1:1 Touch Gesture Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimatingRef.current || isDone) return;
    touchStartY.current = e.touches[0].clientY;
    if (onInteract) onInteract();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null || isAnimatingRef.current || isDone) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - currentY; // positive when swiping UP

    if (deltaY > 0) {
      // Direct 1:1 progress tracking: 220px drag = 100% progress
      const p = Math.min(1, Math.max(0, deltaY / 220));
      progress.set(p);
    } else {
      // Swiping back down: damp slightly
      progress.set(0);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === null || isAnimatingRef.current || isDone) return;
    touchStartY.current = null;

    const currentP = progress.get();
    if (currentP > 0.32) {
      completeOpening();
    } else {
      resetEnvelope();
    }
  };

  // Mouse Drag Fallback (for Desktop testing)
  const isMouseDownRef = useRef(false);
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimatingRef.current || isDone) return;
    isMouseDownRef.current = true;
    touchStartY.current = e.clientY;
    if (onInteract) onInteract();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || touchStartY.current === null || isAnimatingRef.current || isDone) return;
    const deltaY = touchStartY.current - e.clientY;
    if (deltaY > 0) {
      const p = Math.min(1, Math.max(0, deltaY / 220));
      progress.set(p);
    } else {
      progress.set(0);
    }
  };

  const handleMouseUp = () => {
    if (!isMouseDownRef.current || isAnimatingRef.current || isDone) return;
    isMouseDownRef.current = false;
    touchStartY.current = null;
    if (progress.get() > 0.32) {
      completeOpening();
    } else {
      resetEnvelope();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#14110d] px-3 sm:px-4 py-5 sm:py-7 select-none overflow-hidden touch-none"
      style={{ perspective: 1200 }}
    >
      {/* 1. Atmospheric Ambient Backdrop with Warm Golden Vignette */}
      <div className="absolute inset-0 bg-radial from-[#241c14] via-[#15110d] to-[#0a0806] opacity-95 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#c5a059]/10 blur-[130px] pointer-events-none" />

      {/* Floating subtle gold sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/6 left-1/5 w-1.5 h-1.5 rounded-full bg-[#dfa528] blur-[0.5px] animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#e8c87c] blur-[1px] animate-pulse" style={{ animationDelay: "1.2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#d4af37] blur-[0.5px] animate-pulse" style={{ animationDelay: "0.7s" }} />
      </div>

      {/* 2. Top Title Header */}
      <motion.div
        style={{ opacity: headerOpacity }}
        className="text-center pt-2 sm:pt-3 z-10 pointer-events-none"
      >
        <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#c5a059]/90 font-medium mb-1">
          Undangan Rasmi Walimatulurus
        </p>
        <h1 className="font-script text-3xl sm:text-4xl text-[#eeddb2] tracking-wide">
          {weddingData.groom.name} &amp; {weddingData.bride.name}
        </h1>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. CLOSE-UP FULL SCREEN 3D ENVELOPE (DIRECT TOUCH DRAG GESTURE)            */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-[390px] h-[64vh] sm:h-[68vh] max-h-[580px] my-auto flex items-center justify-center">
        {/* Realistic Ambient Ground Shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[92%] h-8 bg-black/60 blur-xl rounded-full pointer-events-none" />

        {/* Envelope Container */}
        <div 
          onClick={() => {
            // Tap fallback: clicking also smoothly opens the envelope
            if (!isAnimatingRef.current && !isDone) completeOpening();
          }}
          className="relative w-full h-full cursor-pointer select-none"
        >
          {/* A. ENVELOPE BACK PLATE (Warm Textured Ivory Paper Interior) */}
          <div className="absolute inset-0 rounded-2xl bg-[#282017] border border-[#c5a059]/35 shadow-2xl overflow-hidden">
            {/* Rich Botanical Damask Pattern on Inside Lining */}
            <div
              className="absolute inset-0 opacity-30 bg-cover bg-center pointer-events-none"
              style={{
                backgroundImage: `url('${getAssetPath("/images/islamic_botanical_bg.jpg")}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* ========================================================================= */}
          {/* B. THE INVITATION CARD (Slides out in 1:1 sync with swipe gesture)        */}
          {/* ========================================================================= */}
          <motion.div
            style={{
              y: cardY,
              scale: cardScale,
              boxShadow: cardShadow,
            }}
            className="absolute inset-x-2.5 top-2.5 bottom-2.5 rounded-2xl bg-[#faf6ee] p-4 sm:p-5 border border-[#c5a059]/45 flex flex-col items-center justify-between text-center z-10 overflow-hidden"
          >
            {/* Background Botanical Frame Image */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-90"
              style={{
                backgroundImage: `url('${getAssetPath("/images/islamic_botanical_bg.jpg")}')`,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(254, 252, 247, 0.75) 0%, rgba(254, 252, 247, 0.35) 75%, transparent 100%)",
              }}
            />
            {/* Fine Inner Hairline Border */}
            <div className="absolute inset-2 rounded-xl border border-[#c5a059]/35 pointer-events-none" />

            {/* Top Arabic Calligraphy Header */}
            <div className="relative z-10 space-y-0.5 pt-2">
              <p className="font-serif text-2xl sm:text-3xl text-[#3a1d1d] font-semibold tracking-wider select-none">
                وَلِيمَةُ العُرْسِ
              </p>
              <p className="font-serif text-[9px] sm:text-[10px] tracking-[0.35em] text-[#5c3e32] uppercase font-semibold">
                WALIMATULURUS
              </p>
            </div>

            {/* Central Arabic Initial Monogram (ع | ن) */}
            <div className="relative z-10 my-auto flex items-center justify-center gap-5 sm:gap-7 w-full max-w-[240px]">
              {/* Bride: ن / نفيسة / NAFISYA */}
              <div className="flex-1 flex flex-col items-center">
                <span className="font-serif text-5xl sm:text-6xl text-[#3a1d1d] leading-none font-normal select-none">
                  ن
                </span>
                <span className="font-serif text-xs sm:text-sm text-[#4a2e24] mt-0.5 font-medium">
                  نفيسة
                </span>
                <span className="font-serif text-[9px] tracking-[0.2em] text-[#5c3e32] uppercase font-semibold">
                  NAFISYA
                </span>
              </div>

              {/* Center Divider with Knot */}
              <div className="flex flex-col items-center justify-center h-20 sm:h-24 select-none">
                <div className="w-1 h-1 rounded-full bg-[#c5a059]" />
                <div className="w-[1px] h-6 sm:h-8 bg-[#c5a059]/60" />
                <div className="my-0.5 w-3.5 h-3.5 rounded-full border border-[#c5a059] flex items-center justify-center">
                  <span className="text-[8px] text-[#c5a059] font-serif leading-none">§</span>
                </div>
                <div className="w-[1px] h-6 sm:h-8 bg-[#c5a059]/60" />
                <div className="w-1 h-1 rounded-full bg-[#c5a059]" />
              </div>

              {/* Groom: ع / عمر / UMAR */}
              <div className="flex-1 flex flex-col items-center">
                <span className="font-serif text-5xl sm:text-6xl text-[#3a1d1d] leading-none font-normal select-none">
                  ع
                </span>
                <span className="font-serif text-xs sm:text-sm text-[#4a2e24] mt-0.5 font-medium">
                  عمر
                </span>
                <span className="font-serif text-[9px] tracking-[0.2em] text-[#5c3e32] uppercase font-semibold">
                  UMAR
                </span>
              </div>
            </div>

            {/* Date & Quote */}
            <div className="relative z-10 space-y-1 pb-2">
              <p className="font-serif text-xs sm:text-sm text-[#2c1810] font-bold tracking-[0.15em] uppercase">
                {weddingData.event.dateFormatted}
              </p>
              <p className="font-serif italic text-[11px] sm:text-xs text-[#4a2e24] leading-tight">
                &ldquo;dan Kami menciptakan kamu berpasang-pasangan&rdquo;
              </p>
              <p className="font-serif text-[9px] text-[#8c6d32] font-semibold tracking-wider">
                Surah An-Naba&apos; : 78:8
              </p>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* C. ENVELOPE FRONT POCKET (Clean Architectural Fold - Fully Opaque Paper)  */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
            {/* Solid Backing for the pocket to guarantee complete opacity */}
            <div
              className="absolute inset-x-0 bottom-0 h-[56%] bg-[#f5ede0] shadow-md"
              style={{
                clipPath: "polygon(0% 10%, 50% 0%, 100% 10%, 100% 100%, 0% 100%)",
              }}
            />
            {/* Left Wing */}
            <div
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#ebe0cc] to-[#f5eee2] shadow-sm border-r border-[#c5a059]/25"
              style={{
                clipPath: "polygon(0% 0%, 0% 100%, 50% 48%)",
              }}
            />
            {/* Right Wing */}
            <div
              className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-[#ebe0cc] to-[#f5eee2] shadow-sm border-l border-[#c5a059]/25"
              style={{
                clipPath: "polygon(100% 0%, 100% 100%, 50% 48%)",
              }}
            />
            {/* Bottom Triangular Fold with Fine Top Edge */}
            <div
              className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#f8f4ec] via-[#efe6d4] to-[#e5d6be] border-t border-[#c5a059]/45 shadow-lg"
              style={{
                clipPath: "polygon(0% 100%, 100% 100%, 50% 46%)",
              }}
            />
            {/* Delicate Perimeter Border */}
            <div className="absolute inset-0 border border-[#c5a059]/40 rounded-2xl pointer-events-none" />
          </div>

          {/* ========================================================================= */}
          {/* D. ENVELOPE TOP FLAP (Folds back in 3D sync with touch swipe)             */}
          {/* ========================================================================= */}
          <motion.div
            style={{
              rotateX: flapRotateX,
              zIndex: flapZIndex,
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-x-0 top-0 h-full pointer-events-none"
          >
            {/* Outer Flap Front (Closed view) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#f4ede1] via-[#ebe1cf] to-[#e1d2bc] shadow-xl border-b border-[#c5a059]/50"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 50% 52%)",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Embossed Flap Edge Line */}
              <div
                className="absolute inset-x-0 top-0 h-full border-b border-[#c5a059]/35"
                style={{ clipPath: "polygon(4% 0%, 96% 0%, 50% 49%)" }}
              />
            </div>

            {/* Inner Flap Back (Flipped open view) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#c5a059] to-[#8c6d32] shadow-inner"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 50% 52%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>

          {/* ========================================================================= */}
          {/* E. 3D WAX SEAL STAMP (Directly at the Flap V-Apex)                       */}
          {/* ========================================================================= */}
          <motion.div
            style={{
              scale: sealScale,
              opacity: sealOpacity,
            }}
            className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative group/seal">
              {/* Pulsing Warm Glow Aura */}
              <div className="absolute -inset-3 rounded-full bg-[#dfa528]/30 blur-md animate-pulse" />

              {/* 3D Molten Wax Body */}
              <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#80222a] via-[#65171d] to-[#460d12] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.55),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-3px_5px_rgba(0,0,0,0.6)]">
                {/* Beveled Edge Ring */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#721c23] to-[#501217] flex flex-col items-center justify-center text-center shadow-inner border border-[#d4af37]/45 relative overflow-hidden">
                  {/* Metallic Gold Sheen Highlight */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white/20 blur-sm pointer-events-none" />

                  {/* Debossed Arabic Monogram Content */}
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#f5e6c8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none">
                    ع <span className="text-[#dfa528] text-sm font-normal">✦</span> ن
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#d4af37]/90 font-serif font-semibold -mt-0.5">
                    11.04
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TACTILE SWIPE UP PROMPT (Direct feedback to the user)                   */}
      {/* ========================================================================= */}
      <motion.div
        style={{ opacity: promptOpacity }}
        className="text-center pb-3 sm:pb-5 z-10 pointer-events-none"
      >
        <div className="inline-flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#251e17]/80 border border-[#c5a059]/40 flex items-center justify-center text-[#dfa528] shadow-md animate-bounce">
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#251e17]/80 border border-[#c5a059]/30 backdrop-blur-sm shadow-md mt-1">
            <Sparkles className="w-3 h-3 text-[#dfa528]" />
            <p className="text-xs uppercase tracking-[0.25em] text-[#eeddb2] font-serif font-medium">
              Tarik Ke Atas Untuk Buka
            </p>
            <Sparkles className="w-3 h-3 text-[#dfa528]" />
          </div>
          <p className="text-[10px] text-[#eeddb2]/50 tracking-wider font-light mt-1">
            Swipe up perlahan untuk membuka sampul
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
