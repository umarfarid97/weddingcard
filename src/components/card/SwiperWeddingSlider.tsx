"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Mousewheel, Pagination, Navigation, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ChevronUp, 
  ChevronDown, 
  MessageSquare,
  Gift,
  Phone,
  QrCode,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";
import { weddingData } from "@/data/weddingData";

// Swiper CSS styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SwiperWeddingSliderProps {
  onSlideChange?: (index: number) => void;
}

export default function SwiperWeddingSlider({ onSlideChange }: SwiperWeddingSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Countdown timer state
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
      }
    };
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpAttending, setRsvpAttending] = useState(true);
  const [rsvpPax, setRsvpPax] = useState(2);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  // Live Wishes State
  const [wishes, setWishes] = useState<Array<{ name: string; message: string; date: string }>>([]);

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      if (data.wishes) {
        setWishes(data.wishes);
      }
    } catch (e) {
      console.error("Failed to fetch wishes:", e);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpError(null);

    if (!rsvpName.trim()) {
      setRsvpError("Sila masukkan nama anda");
      return;
    }
    if (!rsvpPhone.trim()) {
      setRsvpError("Sila masukkan nombor telefon anda");
      return;
    }

    setRsvpLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: rsvpName.trim(),
          phone: rsvpPhone.trim(),
          attending: rsvpAttending,
          pax: rsvpAttending ? rsvpPax : 0,
          message: rsvpMessage.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal menghantar RSVP");
      }

      setRsvpSubmitted(true);
      fetchWishes();

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#dfc285", "#b0883b", "#ffffff", "#e8cda1"],
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Ralat tidak dijangka";
      setRsvpError(msg);
    } finally {
      setRsvpLoading(false);
    }
  };

  const slideTitles = [
    { num: "01", name: "Pintu Gerbang" },
    { num: "02", name: "Kalam Suci" },
    { num: "03", name: "Kira Detik" },
    { num: "04", name: "Raja Sehari" },
    { num: "05", name: "Sahkan RSVP" },
    { num: "06", name: "Buku Ucapan" },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d0a08] text-white select-none">
      <Swiper
        direction="vertical"
        speed={1000}
        parallax={true}
        mousewheel={{ enabled: true, sensitivity: 1 }}
        keyboard={{ enabled: true }}
        modules={[Parallax, Mousewheel, Pagination, Navigation, Keyboard]}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          if (typeof window !== "undefined") {
            (window as unknown as { weddingSwiper: SwiperType }).weddingSwiper = swiper;
          }
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          if (onSlideChange) onSlideChange(swiper.activeIndex);
        }}
        className="wedding-slider w-full h-full"
      >
        {/* ========================================================================= */}
        {/* SLIDE 01: PINTU GERBANG UTAMA (THE GRAND ENTRANCE)                       */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          {/* Parallax Background Layer with Dynamic CSS Filter */}
          <div
            data-swiper-parallax="-28%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/garden_arch.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />

          {/* Roman Numeral Watermark */}
          <div
            data-swiper-parallax="-450"
            className="absolute select-none pointer-events-none font-serif text-[140px] sm:text-[240px] font-black text-white/[0.08] tracking-tighter leading-none"
          >
            01
          </div>

          {/* Content Card */}
          <div className="relative z-10 max-w-sm sm:max-w-md w-full px-6 text-center">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0"
              className="rounded-3xl bg-[#140e08]/80 backdrop-blur-xl border border-[#dfc285]/70 p-7 sm:p-8 shadow-2xl relative"
            >
              <div className="absolute inset-1.5 rounded-2xl border border-[#c5a059]/30 pointer-events-none" />

              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-8 h-px bg-[#dfc285]/60" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#e8cda1] font-semibold">
                  Walimatulurus
                </span>
                <span className="w-8 h-px bg-[#dfc285]/60" />
              </div>

              <h1
                data-swiper-parallax="-250"
                className="font-serif text-3xl sm:text-4xl text-white font-bold my-1.5 drop-shadow-md tracking-tight"
              >
                {weddingData.groom.name} <span className="text-[#dfc285] font-light">&amp;</span> {weddingData.bride.name}
              </h1>

              <div className="w-16 h-px bg-[#c5a059] mx-auto my-3" />

              <p
                data-swiper-parallax="-180"
                className="text-xs sm:text-sm text-[#f4e7d3] font-serif tracking-wide"
              >
                {weddingData.event.dateFormatted}
              </p>
              <p
                data-swiper-parallax="-120"
                className="text-[11px] text-[#dac2a3] mt-1 font-serif"
              >
                {weddingData.event.venueName}
              </p>

              {/* Scroll / Swipe Cue */}
              <div
                data-swiper-parallax-y="-80"
                className="mt-6 flex flex-col items-center gap-1.5 cursor-pointer"
                onClick={() => swiperInstance?.slideNext()}
              >
                <span className="text-[10px] uppercase tracking-widest text-[#dfc285] font-serif font-medium animate-pulse">
                  Skrol ke bawah untuk melangkah masuk
                </span>
                <div className="w-8 h-8 rounded-full border border-[#dfc285]/40 flex items-center justify-center bg-black/40 hover:bg-[#dfc285]/20 transition-all">
                  <ChevronDown className="w-4 h-4 text-[#dfc285] animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 02: KALAM SUCI & RESTU (SURAH AR-RUM: 21)                          */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax="-28%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/under_the_arch.jpg')" }}
          />
          {/* Golden Sunbeam Filter Overlay */}
          <div className="absolute inset-0 bg-radial from-[#fff4d0]/20 via-black/40 to-black/75 pointer-events-none" />

          <div
            data-swiper-parallax="-450"
            className="absolute select-none pointer-events-none font-serif text-[140px] sm:text-[240px] font-black text-white/[0.08] tracking-tighter leading-none"
          >
            02
          </div>

          <div className="relative z-10 max-w-sm sm:max-w-md w-full px-6 text-center">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0"
              className="rounded-3xl bg-[#140e08]/85 backdrop-blur-xl border border-[#e2c892]/70 p-7 sm:p-8 shadow-2xl text-center"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#dfc285]/50 bg-[#2d1c0b] text-[#dfc285] mb-3 shadow-xs">
                <Heart className="w-4 h-4 fill-[#dfc285]" />
              </span>

              <p
                data-swiper-parallax="-240"
                className="font-serif text-lg sm:text-xl text-[#e8cda1] mb-3"
              >
                {weddingData.bismillahText}
              </p>

              <blockquote
                data-swiper-parallax="-180"
                className="font-serif text-xs sm:text-sm text-[#fdf6ea] leading-relaxed italic"
              >
                &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
              </blockquote>

              <p
                data-swiper-parallax="-120"
                className="text-[11px] text-[#dac2a3] tracking-widest uppercase mt-4 font-serif"
              >
                — Surah Ar-Rum: 21 —
              </p>

              <div
                data-swiper-parallax-y="-60"
                className="mt-6 pt-3 border-t border-[#dfc285]/25 flex items-center justify-center gap-1.5 text-[10px] text-[#dfc285]/90 font-serif tracking-wider cursor-pointer"
                onClick={() => swiperInstance?.slideNext()}
              >
                <span>Lihat Atur Cara &amp; Kira Detik</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 03: BUTIRAN MAJLIS & KIRA DETIK (EVENT & COUNTDOWN)                */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax="-28%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/garden_meadow.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />

          <div
            data-swiper-parallax="-450"
            className="absolute select-none pointer-events-none font-serif text-[140px] sm:text-[240px] font-black text-white/[0.08] tracking-tighter leading-none"
          >
            03
          </div>

          <div className="relative z-10 max-w-sm sm:max-w-md w-full px-6 text-center">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0"
              className="rounded-3xl bg-[#fdfbf7]/95 backdrop-blur-xl border border-[#dfc285] p-6 sm:p-7 shadow-2xl text-center text-[#2d2217]"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#c5a059]/60 bg-[#f8f2e4] text-[#8c6d32] font-serif font-bold text-xs tracking-widest mb-1.5 shadow-xs">
                H &amp; A
              </span>

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#8c6d32] font-semibold block">
                Menghitung Hari Bahagia
              </span>

              <h2
                data-swiper-parallax="-250"
                className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217] mt-1"
              >
                {weddingData.groom.name} &amp; {weddingData.bride.name}
              </h2>

              <p
                data-swiper-parallax="-200"
                className="text-xs text-[#6e583e] font-serif mt-1"
              >
                {weddingData.event.dateFormatted} • {weddingData.event.timeFormatted}
              </p>

              <div className="w-12 h-px bg-[#c5a059]/60 mx-auto my-2.5" />

              {/* Countdown Clocks */}
              <div
                data-swiper-parallax="-150"
                className="grid grid-cols-4 gap-2 my-3"
              >
                {[
                  { label: "Hari", value: timeLeft.days },
                  { label: "Jam", value: timeLeft.hours },
                  { label: "Minit", value: timeLeft.minutes },
                  { label: "Saat", value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-[#f5ede0] border border-[#e0cfb8] p-2 text-center shadow-xs">
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#8c6d32] block">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-[#7a6449] font-semibold">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Venue & Navigation links */}
              <div
                data-swiper-parallax="-100"
                className="mt-3 flex flex-col items-center gap-2"
              >
                <p className="text-[11px] text-[#7a6449] flex items-center justify-center gap-1 font-serif">
                  <MapPin className="w-3.5 h-3.5 text-[#996515]" />
                  <span>{weddingData.event.venueName}</span>
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <a
                    href={weddingData.event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[#2d2217] text-[#f4e7d3] text-[10px] font-serif tracking-wider hover:bg-[#4a3a29] transition-all flex items-center gap-1"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={weddingData.event.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[#8c6d32] text-white text-[10px] font-serif tracking-wider hover:bg-[#6f5526] transition-all flex items-center gap-1"
                  >
                    <span>Waze</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div
                data-swiper-parallax-y="-50"
                className="mt-4 pt-3 border-t border-[#dfc285]/40 flex items-center justify-center gap-1.5 text-[10px] text-[#8c6d32] font-serif cursor-pointer"
                onClick={() => swiperInstance?.slideNext()}
              >
                <span>Lihat Profil Pengantin &amp; Atur Cara</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 04: RAJA SEHARI & KELUARGA (THE COUPLE & ITINERARY)                 */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax="-28%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/under_the_arch.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70 pointer-events-none" />

          <div
            data-swiper-parallax="-450"
            className="absolute select-none pointer-events-none font-serif text-[140px] sm:text-[240px] font-black text-white/[0.08] tracking-tighter leading-none"
          >
            04
          </div>

          <div className="relative z-10 max-w-sm sm:max-w-md w-full px-6 text-center">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0"
              className="rounded-3xl bg-[#140e08]/90 backdrop-blur-xl border border-[#dfc285]/70 p-6 sm:p-7 shadow-2xl text-center"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#e8cda1] font-semibold block mb-1">
                Meraikan Dua Jiwa
              </span>

              <h2
                data-swiper-parallax="-250"
                className="font-serif text-2xl sm:text-3xl text-white font-bold my-1"
              >
                Raja Sehari
              </h2>

              <div className="w-14 h-px bg-[#c5a059] mx-auto my-3" />

              {/* Couple Info */}
              <div
                data-swiper-parallax="-180"
                className="grid grid-cols-2 gap-3 text-left my-3"
              >
                <div className="p-3 rounded-2xl bg-black/40 border border-[#dfc285]/30">
                  <span className="text-[9px] uppercase tracking-wider text-[#dfc285] block">Pengantin Lelaki</span>
                  <h3 className="font-serif text-sm font-bold text-white mt-0.5">{weddingData.groom.fullName}</h3>
                  <p className="text-[10px] text-[#dac2a3] mt-1">
                    Putra kepada {weddingData.groom.fatherName} &amp; {weddingData.groom.motherName}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-[#dfc285]/30">
                  <span className="text-[9px] uppercase tracking-wider text-[#dfc285] block">Pengantin Perempuan</span>
                  <h3 className="font-serif text-sm font-bold text-white mt-0.5">{weddingData.bride.fullName}</h3>
                  <p className="text-[10px] text-[#dac2a3] mt-1">
                    Puteri kepada {weddingData.bride.fatherName} &amp; {weddingData.bride.motherName}
                  </p>
                </div>
              </div>

              {/* Quick Timeline */}
              <div
                data-swiper-parallax="-120"
                className="p-3 rounded-2xl bg-[#231a11]/80 border border-[#dfc285]/30 text-left my-2"
              >
                <span className="text-[9px] uppercase tracking-widest text-[#dfc285] font-semibold block mb-2 text-center">
                  Atur Cara Ringkas Majlis
                </span>
                <div className="space-y-1 text-[11px] text-[#f4e7d3]">
                  {weddingData.itinerary.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-0.5 border-b border-white/5 last:border-0">
                      <span className="font-mono text-[#dfc285] text-[10px]">{item.time}</span>
                      <span className="font-serif text-[11px]">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                data-swiper-parallax-y="-60"
                className="mt-4 pt-2 border-t border-[#dfc285]/30 flex items-center justify-center gap-1.5 text-[10px] text-[#dfc285] font-serif cursor-pointer"
                onClick={() => swiperInstance?.slideNext()}
              >
                <span>Seterusnya: Sahkan Kehadiran (RSVP)</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 05: PENGESAHAN KEHADIRAN (INTERACTIVE RSVP FORM)                    */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax="-28%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/card_in_garden.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/70 pointer-events-none" />

          <div
            data-swiper-parallax="-450"
            className="absolute select-none pointer-events-none font-serif text-[140px] sm:text-[240px] font-black text-white/[0.08] tracking-tighter leading-none"
          >
            05
          </div>

          <div className="relative z-10 max-w-sm sm:max-w-md w-full px-5 text-center">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0"
              className="rounded-3xl bg-[#140e08]/92 backdrop-blur-2xl border border-[#dfc285] p-5 sm:p-7 shadow-2xl text-left"
            >
              <div className="text-center mb-3">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#e8cda1] font-semibold block">
                  Sahkan Kehadiran Anda
                </span>
                <h2 className="font-serif text-2xl text-white font-bold my-0.5">
                  Borang RSVP
                </h2>
                <p className="text-[11px] text-[#dac2a3]">
                  Mohon maklumkan kehadiran anda sebelum 14 November 2026
                </p>
              </div>

              {rsvpSubmitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2 border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg text-white font-bold">Terima Kasih!</h3>
                  <p className="text-xs text-[#dac2a3] mt-1 leading-relaxed">
                    Jawapan RSVP anda telah selamat direkodkan. Kami tidak sabar untuk meraikan hari bahagia ini bersama anda.
                  </p>
                  <button
                    onClick={() => swiperInstance?.slideNext()}
                    className="mt-4 px-5 py-2 rounded-full bg-[#dfc285] text-[#2c2217] font-serif text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer"
                  >
                    Lihat Ucapan Tetamu &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-2.5">
                  {rsvpError && (
                    <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-200 text-[11px] text-center">
                      {rsvpError}
                    </div>
                  )}

                  {/* Attending Toggle */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending(true)}
                      className={`py-2 px-3 rounded-xl font-serif text-xs border transition-all cursor-pointer ${
                        rsvpAttending
                          ? "bg-gradient-to-r from-[#b0883b] to-[#dfc285] text-white border-[#dfc285] font-bold shadow-md"
                          : "bg-black/40 text-[#dac2a3] border-white/10 hover:border-white/30"
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending(false)}
                      className={`py-2 px-3 rounded-xl font-serif text-xs border transition-all cursor-pointer ${
                        !rsvpAttending
                          ? "bg-rose-900/60 text-rose-200 border-rose-600/50 font-bold shadow-md"
                          : "bg-black/40 text-[#dac2a3] border-white/10 hover:border-white/30"
                      }`}
                    >
                      Tidak Dapat Hadir
                    </button>
                  </div>

                  {/* Name Input */}
                  <div>
                    <input
                      type="text"
                      placeholder="Nama Penuh Anda *"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-[#dfc285]"
                      required
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Nombor Telefon / WhatsApp *"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-[#dfc285]"
                      required
                    />
                  </div>

                  {/* Pax Selector (if attending) */}
                  {rsvpAttending && (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/10">
                      <span className="text-[11px] text-[#dac2a3] flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#dfc285]" />
                        <span>Bilangan Pax:</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRsvpPax(num)}
                            className={`w-7 h-7 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                              rsvpPax === num
                                ? "bg-[#dfc285] text-[#2c2217]"
                                : "bg-black/40 text-stone-300 border border-white/10 hover:border-white/30"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wish Message */}
                  <div>
                    <input
                      type="text"
                      placeholder="Ucapan atau doa buat pengantin (pilihan)..."
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs placeholder:text-stone-500 focus:outline-none focus:border-[#dfc285]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={rsvpLoading}
                    className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#b0883b] via-[#dfc285] to-[#8c6d32] text-white font-serif font-bold text-xs tracking-widest uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                  >
                    {rsvpLoading ? (
                      <span>Menghantar...</span>
                    ) : (
                      <>
                        <span>Hantar Pengesahan</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 06: BUKU UCAPAN & SALAM KAUT (GUESTBOOK & GIFT SALAM)               */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax="-28%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/garden_meadow.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/70 pointer-events-none" />

          <div
            data-swiper-parallax="-450"
            className="absolute select-none pointer-events-none font-serif text-[140px] sm:text-[240px] font-black text-white/[0.08] tracking-tighter leading-none"
          >
            06
          </div>

          <div className="relative z-10 max-w-sm sm:max-w-md w-full px-5 text-center">
            <div
              data-swiper-parallax="-300"
              data-swiper-parallax-opacity="0"
              className="rounded-3xl bg-[#140e08]/90 backdrop-blur-xl border border-[#dfc285]/70 p-5 sm:p-7 shadow-2xl text-center"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#e8cda1] font-semibold block mb-1">
                Doa &amp; Ingatan Tulus
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold my-0.5">
                Buku Ucapan &amp; Hadiah
              </h2>

              <div className="w-12 h-px bg-[#c5a059] mx-auto my-2.5" />

              {/* Wishes list preview */}
              <div className="my-3 max-h-40 overflow-y-auto space-y-2 text-left pr-1 scrollbar-thin">
                {wishes.length === 0 ? (
                  <p className="text-xs text-stone-400 text-center py-4">Jadilah yang pertama mengirimkan ucapan!</p>
                ) : (
                  wishes.slice(0, 4).map((w, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-serif font-bold text-[#dfc285]">{w.name}</span>
                        <span className="text-stone-500">{w.date}</span>
                      </div>
                      <p className="text-[11px] text-[#f4e7d3] mt-0.5 italic">&ldquo;{w.message}&rdquo;</p>
                    </div>
                  ))
                )}
              </div>

              {/* Salam Kaut DuitNow Card */}
              <div className="p-3 rounded-2xl bg-[#231a11]/90 border border-[#dfc285]/40 text-left my-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#dfc285]" />
                    <span className="text-[11px] font-serif font-bold text-[#f5ebd7]">Salam Kaut Digital (DuitNow)</span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-[#dfc285]/20 text-[#dfc285] font-mono">
                    {weddingData.gift.bankName}
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 font-mono mt-1.5">
                  {weddingData.gift.accountNumber} • {weddingData.gift.accountHolder}
                </p>
              </div>

              {/* Hubungi Keluarga WhatsApp */}
              <div className="mt-3 flex items-center justify-center gap-3">
                {weddingData.contacts.slice(0, 2).map((c, idx) => (
                  <a
                    key={idx}
                    href={`https://wa.me/${c.phone}?text=Tahniah%20atas%20perkahwinan%20Harith%20dan%20Aisyah!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-black/50 border border-white/20 text-[#dac2a3] text-[10px] font-serif hover:border-[#dfc285] hover:text-[#dfc285] transition-all flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-[#dfc285]" />
                    <span>WhatsApp {c.name.split(" ")[0]}</span>
                  </a>
                ))}
              </div>

              <div
                className="mt-4 pt-2 border-t border-[#dfc285]/20 flex items-center justify-center gap-1.5 text-[10px] text-[#dfc285] font-serif cursor-pointer"
                onClick={() => swiperInstance?.slideTo(0)}
              >
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Kembali ke Pintu Gerbang</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* ========================================================================= */}
      {/* FLOATING CONTROLS: EDITORIAL SLIDE PAGINATION & ARROWS                   */}
      {/* ========================================================================= */}

      {/* Vertical Pagination Bar on the Right */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {slideTitles.map((slide, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => swiperInstance?.slideTo(idx)}
              className="group flex items-center gap-2 cursor-pointer transition-all focus:outline-none"
              aria-label={`Pergi ke slaid ${slide.num}: ${slide.name}`}
            >
              {/* Tooltip on desktop hover */}
              <span
                className={`hidden sm:inline-block text-[10px] uppercase font-serif tracking-widest px-2 py-0.5 rounded backdrop-blur-md transition-all ${
                  isActive
                    ? "text-[#dfc285] bg-black/70 border border-[#dfc285]/40 opacity-100 translate-x-0"
                    : "text-white/60 bg-black/40 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {slide.name}
              </span>

              {/* Number & Progress Dot */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-serif text-[11px] font-bold transition-all ${
                    isActive ? "text-[#dfc285] scale-110" : "text-white/40 group-hover:text-white/80"
                  }`}
                >
                  {slide.num}
                </span>

                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-6 bg-gradient-to-b from-[#dfc285] to-[#b0883b] shadow-[0_0_8px_rgba(223,194,133,0.8)]"
                      : "w-2 h-2 bg-white/30 group-hover:bg-white/60 group-hover:scale-125"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Vertical Navigation Chevrons: Top & Bottom */}
      {activeIndex > 0 && (
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#dfc285]/40 flex items-center justify-center text-[#dfc285] hover:bg-black/85 hover:border-[#dfc285] transition-all cursor-pointer shadow-lg"
          aria-label="Slaid atas sebelumnya"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {activeIndex < slideTitles.length - 1 && (
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#dfc285]/40 flex items-center justify-center text-[#dfc285] hover:bg-black/85 hover:border-[#dfc285] transition-all cursor-pointer shadow-lg"
          aria-label="Slaid bawah seterusnya"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}

      {/* Right Edge Vertical Progress Bar */}
      <div className="fixed right-0 top-0 bottom-0 w-1 bg-white/10 z-40 pointer-events-none">
        <div
          className="w-full bg-gradient-to-b from-[#b0883b] via-[#dfc285] to-[#b0883b] transition-all duration-500 shadow-[0_0_8px_rgba(223,194,133,0.8)]"
          style={{ height: `${((activeIndex + 1) / slideTitles.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
