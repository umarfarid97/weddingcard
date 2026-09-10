"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.event.date).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
      {/* Subtle top ornament arch */}
      <div className="mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mb-6 opacity-70" />

      {/* Bismillah */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-xl sm:text-2xl text-[#8c6d32] tracking-wider mb-3 select-none"
      >
        {weddingData.bismillahText}
      </motion.p>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="inline-block text-xs uppercase tracking-[0.35em] text-[#714e25] font-semibold mb-2">
          Undangan Majlis
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#2c2217] uppercase">
          Walimatulurus
        </h1>
      </motion.div>

      {/* Couple Calligraphy Names */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="my-8 py-2 relative"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <span className="font-script text-5xl sm:text-6xl md:text-7xl text-[#996515] drop-shadow-sm">
            {weddingData.groom.name}
          </span>
          <span className="font-serif text-2xl sm:text-3xl text-[#c5a059] italic font-light">&amp;</span>
          <span className="font-script text-5xl sm:text-6xl md:text-7xl text-[#996515] drop-shadow-sm">
            {weddingData.bride.name}
          </span>
        </div>
      </motion.div>

      {/* Event Details Quick Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-md mx-auto rounded-2xl bg-white/70 border border-[#dfc285]/60 shadow-sm p-5 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-serif font-semibold text-[#2f2518]">
          <Calendar className="w-4 h-4 text-[#c5a059]" />
          <span>{weddingData.event.dateFormatted}</span>
        </div>

        {weddingData.event.islamicDate && (
          <p className="text-xs text-[#8c6d32] font-serif italic mt-0.5">
            {weddingData.event.islamicDate}
          </p>
        )}

        <div className="mt-3 pt-3 border-t border-[#dfc285]/40 flex items-center justify-center gap-4 text-xs text-[#6e5940]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
            {weddingData.event.timeFormatted}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
            {weddingData.event.venueName}
          </span>
        </div>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 max-w-lg mx-auto"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-[#8c6d32] font-medium mb-3">
          Menghitung Hari Bahagia
        </p>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm mx-auto">
          {[
            { label: "Hari", value: timeLeft.days },
            { label: "Jam", value: timeLeft.hours },
            { label: "Minit", value: timeLeft.minutes },
            { label: "Saat", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-3 sm:py-4 px-2 rounded-xl bg-gradient-to-b from-white to-[#f9f4ea] border border-[#d4af37]/40 shadow-sm"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#3d2b15]">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-[#8c6d32] uppercase font-medium mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Quick RSVP CTA Button */}
        <div className="mt-8 flex justify-center">
          <a
            href="#rsvp"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#996515] via-[#c5a059] to-[#8c6d32] text-white font-serif font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:brightness-105 transition-all cursor-pointer group"
          >
            <CheckCircle2 className="w-4 h-4 text-[#faeecf] group-hover:scale-110 transition-transform" />
            <span>Sahkan Kehadiran (RSVP)</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
