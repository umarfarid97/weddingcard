"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import SwiperWeddingSlider from "@/components/card/SwiperWeddingSlider";
import MusicPlayer from "@/components/card/MusicPlayer";
import AdminModal from "@/components/card/AdminModal";

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSlideChange = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <main className="relative w-full max-w-[100vw] h-screen overflow-hidden bg-[#241a13] select-none touch-none">
      {/* 1. SWIPER PARALLAX SLIDER TRANSITIONS */}
      <SwiperWeddingSlider onSlideChange={handleSlideChange} />

      {/* 2. Floating Ambient Audio Music Player */}
      <MusicPlayer autoPlayTrigger={hasInteracted} />

      {/* 3. Discreet Admin Portal Button (Top Left) */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-full bg-[#faf7f0]/80 hover:bg-[#faf7f0] border border-[#ece4d3] text-[#52664b]/60 hover:text-[#52664b] shadow-sm transition-all cursor-pointer"
        aria-label="Pengurusan RSVP"
        title="Admin RSVP"
      >
        <Lock className="w-3.5 h-3.5" />
      </button>

      {/* 4. Admin Headcount & CSV Export Modal */}
      <AdminModal isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </main>
  );
}
