"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FastForward } from "lucide-react";
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
          <div className="absolute inset-0 z-20 flex flex-col justify-end items-center px-6 pb-10 sm:pb-12 pointer-events-auto transition-opacity duration-300">
            {/* Minimalist 'BUKA' Text Hyperlink */}
            <a
              href="#buka"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleStart();
              }}
              className="font-serif text-sm sm:text-base tracking-[0.35em] uppercase text-[#3d342d] hover:text-[#120f0d] underline underline-offset-[8px] decoration-[#756455]/50 hover:decoration-[#120f0d] transition-all duration-200 cursor-pointer py-2 px-4 select-none"
            >
              BUKA
            </a>
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
