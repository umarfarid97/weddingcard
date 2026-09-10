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
    <main className="relative w-screen h-screen overflow-hidden bg-[#0d0a08] select-none">
      {/* 1. SWIPER PARALLAX SLIDER TRANSITIONS (#28 Style) */}
      <SwiperWeddingSlider onSlideChange={handleSlideChange} />

      {/* 2. Floating Ambient Audio Music Player */}
      <MusicPlayer autoPlayTrigger={hasInteracted} />

      {/* 3. Discreet Admin Portal Button (Top Left) */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white/30 hover:text-[#dfc285] transition-all cursor-pointer"
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
