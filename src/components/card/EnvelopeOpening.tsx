"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, FastForward, Mail } from "lucide-react";
import { getAssetPath } from "@/lib/basePath";

interface EnvelopeOpeningProps {
  onOpen: () => void;
  onInteract?: () => void;
}

export default function EnvelopeOpening({ onOpen, onInteract }: EnvelopeOpeningProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completedRef = useRef(false);

  const videoSrc = getAssetPath("/videos/envelope_opening.mp4");
  const coverSrc = getAssetPath("/images/envelope_video_cover.jpg");

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFadingOut(true);
    setTimeout(() => {
      onOpen();
    }, 550);
  };

  const handleStart = () => {
    if (isPlaying || completedRef.current) return;

    if (onInteract) {
      try {
        onInteract();
      } catch (err) {
        console.warn("Interact handler error:", err);
      }
    }

    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video playback was interrupted or blocked:", err);
        });
      }
    }

    // Safety timeout: for 10s video, auto-advance after 11.5s if not completed
    setTimeout(() => {
      if (!completedRef.current) {
        handleComplete();
      }
    }, 11500);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || completedRef.current) return;
    // Crossfade when the botanical illustration completes (at 9.7s) for a buttery-smooth transition
    if (videoRef.current.currentTime >= 9.7) {
      handleComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#151210] overflow-hidden select-none"
    >
      {/* Container maintaining 9:16 portrait aspect ratio (1080 / 1920) */}
      <div 
        onClick={!isPlaying ? handleStart : undefined}
        className="relative w-full h-full max-w-[520px] max-h-[100dvh] aspect-[9/16] flex items-center justify-center cursor-pointer overflow-hidden shadow-2xl bg-[#e8e4dc]"
      >
        {/* The Envelope Opening Video (Wedding1.mp4) */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={coverSrc}
          preload="auto"
          playsInline
          webkit-playsinline="true"
          muted
          onEnded={handleComplete}
          onTimeUpdate={handleTimeUpdate}
          onError={() => {
            console.warn("Video failed to load, falling back to instant open");
          }}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* --- STATE 1: INITIAL CLOSED ENVELOPE OVERLAY --- */}
        {!isPlaying && (
          <div className="absolute inset-0 z-20 flex flex-col justify-between items-center px-6 py-10 sm:py-12 pointer-events-auto transition-opacity duration-300">
            {/* Top Invitation Header */}
            <div className="text-center space-y-1 pt-2 sm:pt-3">
              <span className="text-[10px] sm:text-xs font-serif tracking-[0.45em] uppercase text-[#4a4038] font-bold block">
                WALIMATULURUS
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif text-[#2c2621] tracking-wide font-normal">
                Umar & Nafisya
              </h1>
              <p className="text-[11px] sm:text-xs font-serif text-[#6b5f54] tracking-widest uppercase font-medium">
                Sabtu, 2 Januari 2027
              </p>
            </div>

            {/* Bottom Call to Action Button */}
            <div className="flex flex-col items-center space-y-2.5 pb-6 sm:pb-8">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStart();
                }}
                className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2c2724] via-[#453e39] to-[#2c2724] text-[#f7f4ed] font-serif font-semibold tracking-wider text-xs sm:text-sm shadow-[0_10px_25px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border border-[#c5a059]/40"
              >
                <Sparkles className="w-4 h-4 text-[#dfc285] group-hover:rotate-12 transition-transform duration-300" />
                <span className="tracking-[0.18em] uppercase font-serif">Buka Undangan</span>
              </button>

              <p className="text-[11px] font-serif tracking-wider text-[#524941] font-medium animate-pulse flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 opacity-70" />
                Sentuh untuk membuka
              </p>
            </div>
          </div>
        )}

        {/* --- STATE 2: PLAYING STATE WITH SKIP OPTION --- */}
        {isPlaying && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Elegant Skip Button (Top Right) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleComplete();
              }}
              className="pointer-events-auto absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/85 hover:text-white text-xs font-serif tracking-widest uppercase transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
              title="Langkau ke kad jemputan"
            >
              <span>Langkau</span>
              <FastForward className="w-3 h-3 opacity-70" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
