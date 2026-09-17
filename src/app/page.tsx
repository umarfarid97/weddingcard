"use client";

import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import SwiperWeddingSlider from "@/components/card/SwiperWeddingSlider";
import MusicPlayer from "@/components/card/MusicPlayer";
import AdminModal from "@/components/card/AdminModal";
import EnvelopeOpening from "@/components/card/EnvelopeOpening";

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
    setHasInteracted(true);
  };

  const handleSlideChange = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <main className="relative w-full max-w-[100vw] h-screen overflow-hidden bg-[#faf6ee] select-none touch-none">
      {/* 1. INTERACTIVE 3D WAX SEAL ENVELOPE ENTRANCE */}
      <AnimatePresence mode="wait">
        {!isEnvelopeOpen && (
          <EnvelopeOpening onOpen={handleEnvelopeOpen} />
        )}
      </AnimatePresence>

      {/* 2. SWIPER PARALLAX SLIDER TRANSITIONS */}
      <SwiperWeddingSlider onSlideChange={handleSlideChange} />

      {/* 3. Floating Ambient Audio Music Player */}
      <MusicPlayer autoPlayTrigger={hasInteracted} />

      {/* 4. Re-open Envelope Button (Top Right) */}
      {isEnvelopeOpen && (
        <button
          onClick={() => setIsEnvelopeOpen(false)}
          className="fixed top-4 right-4 z-40 p-2 rounded-full bg-[#faf7f0]/80 hover:bg-[#faf7f0] border border-[#ece4d3] text-[#52664b]/70 hover:text-[#52664b] shadow-sm transition-all cursor-pointer"
          aria-label="Tutup Sampul Surat"
          title="Lihat Sampul Surat Semula"
        >
          <Mail className="w-3.5 h-3.5" />
        </button>
      )}

      {/* 5. Discreet Admin Portal Button (Top Left) */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-full bg-[#faf7f0]/80 hover:bg-[#faf7f0] border border-[#ece4d3] text-[#52664b]/60 hover:text-[#52664b] shadow-sm transition-all cursor-pointer"
        aria-label="Pengurusan RSVP"
        title="Admin RSVP"
      >
        <Lock className="w-3.5 h-3.5" />
      </button>

      {/* 6. Admin Headcount & CSV Export Modal */}
      <AdminModal isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </main>
  );
}

