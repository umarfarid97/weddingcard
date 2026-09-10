"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function CoupleSection() {
  return (
    <section className="py-12 px-4 max-w-2xl mx-auto text-center">
      {/* Quranic Verse / Doa Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-2xl bg-[#fdfcf9] border border-[#d4af37]/35 p-6 sm:p-8 shadow-sm mb-12 relative"
      >
        <div className="text-[#c5a059] text-sm font-serif mb-2">✦ ✦ ✦</div>
        <p className="font-serif text-lg sm:text-xl text-[#2f2519] leading-loose mb-3 dir-rtl font-medium">
          {weddingData.doa.arabic}
        </p>
        <p className="text-xs sm:text-sm text-[#5a4833] italic font-serif leading-relaxed">
          {weddingData.doa.translation}
        </p>
        <p className="text-[11px] font-semibold text-[#8c6d32] uppercase tracking-wider mt-3">
          — {weddingData.doa.source} —
        </p>
      </motion.div>

      {/* Parents' Invitation Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 px-2"
      >
        <p className="font-serif text-sm sm:text-base text-[#4a3b2b] leading-relaxed max-w-lg mx-auto">
          {weddingData.invitationIntro}
        </p>
      </motion.div>

      {/* The Couple Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center max-w-xl mx-auto relative">
        {/* Groom Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center p-6 rounded-2xl bg-white/80 border border-[#e5d5b8] shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-br from-[#dfc285] to-[#8c6d32] shadow-md mb-4 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={weddingData.groom.photoUrl}
              alt={weddingData.groom.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8c6d32] font-semibold mb-1">
            Pengantin Lelaki
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2d2217]">
            {weddingData.groom.name}
          </h3>
          <p className="text-xs font-serif text-[#786146] mt-1 font-medium">
            {weddingData.groom.fullName}
          </p>

          <div className="mt-4 pt-3 border-t border-[#f0e4d0] w-full text-center">
            <p className="text-[11px] text-[#8c7458]">Putra kepada</p>
            <p className="text-xs font-serif font-semibold text-[#3d2e1e] mt-0.5">
              {weddingData.groom.fatherName}
            </p>
            <p className="text-xs font-serif font-semibold text-[#3d2e1e]">
              &amp; {weddingData.groom.motherName}
            </p>
          </div>
        </motion.div>

        {/* Center Heart Emblem on Desktop */}
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#fbf9f5] border border-[#d4af37]/60 items-center justify-center text-[#996515] shadow-sm">
          <Heart className="w-5 h-5 fill-[#c5a059] text-[#c5a059]" />
        </div>

        {/* Bride Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center p-6 rounded-2xl bg-white/80 border border-[#e5d5b8] shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-br from-[#dfc285] to-[#8c6d32] shadow-md mb-4 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={weddingData.bride.photoUrl}
              alt={weddingData.bride.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8c6d32] font-semibold mb-1">
            Pengantin Perempuan
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2d2217]">
            {weddingData.bride.name}
          </h3>
          <p className="text-xs font-serif text-[#786146] mt-1 font-medium">
            {weddingData.bride.fullName}
          </p>

          <div className="mt-4 pt-3 border-t border-[#f0e4d0] w-full text-center">
            <p className="text-[11px] text-[#8c7458]">Putri kepada</p>
            <p className="text-xs font-serif font-semibold text-[#3d2e1e] mt-0.5">
              {weddingData.bride.fatherName}
            </p>
            <p className="text-xs font-serif font-semibold text-[#3d2e1e]">
              &amp; {weddingData.bride.motherName}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
