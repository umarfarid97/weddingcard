"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, CheckCircle2, MessageSquareHeart, Gift } from "lucide-react";

export default function FloatingNav() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Kad", icon: Heart, id: "hero" },
    { label: "Lokasi", icon: MapPin, id: "lokasi" },
    { label: "RSVP", icon: CheckCircle2, id: "rsvp", highlight: true },
    { label: "Ucapan", icon: MessageSquareHeart, id: "ucapan" },
    { label: "Hadiah", icon: Gift, id: "hadiah" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
    >
      <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full bg-[#271f16]/90 backdrop-blur-md border border-[#c5a059]/40 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer ${
                item.highlight
                  ? "bg-gradient-to-r from-[#c5a059] to-[#8c6d32] text-white font-semibold shadow-md scale-105"
                  : "text-[#eeddb2] hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
              {item.highlight && <span className="sm:hidden text-[11px] font-bold">RSVP</span>}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
