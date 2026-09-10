"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Mousewheel, Pagination, Navigation, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { 
  Heart, 
  MapPin, 
  Users, 
  Send, 
  CheckCircle2, 
  ChevronUp, 
  ChevronDown, 
  Gift, 
  Phone, 
  ExternalLink,
  Copy,
  Check
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
  const [copiedBank, setCopiedBank] = useState(false);

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
        colors: ["#dfc285", "#f3e3ba", "#ffffff", "#c5a059"],
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Ralat tidak dijangka";
      setRsvpError(msg);
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleCopyBank = () => {
    navigator.clipboard.writeText(weddingData.gift.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
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
    <div className="relative w-screen h-screen overflow-hidden bg-[#060813] text-white select-none">
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
        {/* SLIDE 01: PINTU GERBANG UTAMA (THE GRAND ENTRANCE - CARDLESS)             */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          {/* Parallax Background with Cinematic Vignette Overlay */}
          <div
            data-swiper-parallax-y="-25%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/garden_arch.jpg')" }}
          />
          {/* Dark Celestial Midnight Radial & Vignette Overlay */}
          <div className="absolute inset-0 bg-radial from-[#060813]/50 via-[#060813]/85 to-[#060813]/98 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-[#060813]/90 pointer-events-none" />

          {/* Huge Roman/Arabic Watermark Number */}
          <div
            data-swiper-parallax-y="-450"
            className="absolute select-none pointer-events-none font-serif text-[180px] sm:text-[300px] font-black text-white/[0.04] tracking-tighter leading-none"
          >
            01
          </div>

          {/* Direct Typography Layout - No Card Box */}
          <div className="relative z-10 max-w-xl w-full px-6 sm:px-8 text-center flex flex-col items-center">
            {/* Header Tag */}
            <div
              data-swiper-parallax-y="-320"
              className="flex items-center justify-center gap-3 mb-3"
            >
              <span className="w-10 h-px bg-gradient-to-r from-transparent via-[#dfc285]/70 to-transparent" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#dfc285] font-serif font-medium drop-shadow-md">
                Walimatulurus
              </span>
              <span className="w-10 h-px bg-gradient-to-r from-transparent via-[#dfc285]/70 to-transparent" />
            </div>

            {/* Couple Grand Titles */}
            <h1
              data-swiper-parallax-y="-260"
              className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-bold tracking-tight my-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
            >
              {weddingData.groom.name} <span className="text-[#dfc285] font-light font-sans text-3xl sm:text-5xl">&amp;</span> {weddingData.bride.name}
            </h1>

            {/* Glowing Accent Line */}
            <div
              data-swiper-parallax-y="-200"
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#dfc285] to-transparent my-4 drop-shadow-[0_0_8px_rgba(223,194,133,0.8)]"
            />

            {/* Event Date & Venue */}
            <p
              data-swiper-parallax-y="-150"
              className="text-sm sm:text-base text-[#fbf8f0] font-serif tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              {weddingData.event.dateFormatted}
            </p>
            <p
              data-swiper-parallax-y="-100"
              className="text-xs sm:text-sm text-[#e8cda1] mt-1.5 font-serif tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              {weddingData.event.venueName} • {weddingData.event.city}
            </p>

            {/* Minimalist Floating Scroll Hint */}
            <div
              data-swiper-parallax-y="-60"
              className="mt-12 flex flex-col items-center gap-2 cursor-pointer group"
              onClick={() => swiperInstance?.slideNext()}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#dfc285] font-serif font-medium transition-all group-hover:text-white drop-shadow-md">
                Skrol ke bawah untuk melangkah masuk
              </span>
              <div className="w-9 h-9 rounded-full border border-[#dfc285]/40 flex items-center justify-center bg-white/[0.04] backdrop-blur-xs group-hover:border-[#dfc285] group-hover:bg-[#dfc285]/20 transition-all shadow-lg">
                <ChevronDown className="w-4 h-4 text-[#dfc285] animate-bounce" />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 02: KALAM SUCI & RESTU (SURAH AR-RUM: 21 - CARDLESS)                */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax-y="-25%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/under_the_arch.jpg')" }}
          />
          <div className="absolute inset-0 bg-radial from-[#060813]/60 via-[#060813]/90 to-[#060813]/98 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-[#060813]/90 pointer-events-none" />

          <div
            data-swiper-parallax-y="-450"
            className="absolute select-none pointer-events-none font-serif text-[180px] sm:text-[300px] font-black text-white/[0.04] tracking-tighter leading-none"
          >
            02
          </div>

          {/* Direct Floating Words - No Card Box */}
          <div className="relative z-10 max-w-xl w-full px-6 sm:px-8 text-center flex flex-col items-center">
            <div
              data-swiper-parallax-y="-320"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#dfc285]/50 bg-white/[0.03] text-[#dfc285] mb-5 shadow-sm"
            >
              <Heart className="w-4 h-4 fill-[#dfc285]" />
            </div>

            {/* Bismillah Calligraphy Text */}
            <p
              data-swiper-parallax-y="-260"
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#dfc285] mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              {weddingData.bismillahText}
            </p>

            {/* Floating Ayat Translation */}
            <blockquote
              data-swiper-parallax-y="-180"
              className="font-serif text-sm sm:text-base md:text-lg text-white/95 leading-relaxed italic max-w-lg mx-auto drop-shadow-[0_3px_15px_rgba(0,0,0,0.9)]"
            >
              &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
            </blockquote>

            {/* Verse Attribution */}
            <p
              data-swiper-parallax-y="-120"
              className="text-xs uppercase tracking-[0.35em] text-[#dfc285] mt-6 font-serif drop-shadow-md"
            >
              — Surah Ar-Rum : Ayat 21 —
            </p>

            {/* Scroll Next Prompt */}
            <div
              data-swiper-parallax-y="-60"
              className="mt-12 flex items-center justify-center gap-2 text-xs text-[#dfc285]/80 font-serif tracking-widest uppercase cursor-pointer hover:text-white transition-all group"
              onClick={() => swiperInstance?.slideNext()}
            >
              <span>Kira Detik &amp; Butiran Majlis</span>
              <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
            </div>
          </div>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 03: BUTIRAN MAJLIS & KIRA DETIK (COUNTDOWN & VENUE - CARDLESS)      */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax-y="-25%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/garden_meadow.jpg')" }}
          />
          <div className="absolute inset-0 bg-radial from-[#060813]/60 via-[#060813]/90 to-[#060813]/98 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-[#060813]/90 pointer-events-none" />

          <div
            data-swiper-parallax-y="-450"
            className="absolute select-none pointer-events-none font-serif text-[180px] sm:text-[300px] font-black text-white/[0.04] tracking-tighter leading-none"
          >
            03
          </div>

          {/* Direct Floating Words & Countdown - No Card Box */}
          <div className="relative z-10 max-w-xl w-full px-6 sm:px-8 text-center flex flex-col items-center">
            <span
              data-swiper-parallax-y="-320"
              className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#dfc285] font-serif font-medium drop-shadow-md"
            >
              Menghitung Hari Bahagia
            </span>

            <h2
              data-swiper-parallax-y="-260"
              className="font-serif text-3xl sm:text-5xl text-white font-bold my-2 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            >
              {weddingData.groom.name} &amp; {weddingData.bride.name}
            </h2>

            <p
              data-swiper-parallax-y="-200"
              className="text-xs sm:text-sm text-[#fbf8f0] font-serif tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              {weddingData.event.dateFormatted} • {weddingData.event.timeFormatted}
            </p>

            {/* Glowing Accent Line */}
            <div
              data-swiper-parallax-y="-160"
              className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#dfc285] to-transparent my-4"
            />

            {/* Direct Floating Minimalist Countdown Numbers */}
            <div
              data-swiper-parallax-y="-120"
              className="grid grid-cols-4 gap-3 sm:gap-6 my-2 w-full max-w-md"
            >
              {[
                { label: "Hari", value: timeLeft.days },
                { label: "Jam", value: timeLeft.hours },
                { label: "Minit", value: timeLeft.minutes },
                { label: "Saat", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <span className="font-serif text-3xl sm:text-5xl font-bold text-[#dfc285] drop-shadow-[0_2px_12px_rgba(223,194,133,0.5)]">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#e8cda1]/80 mt-1 font-serif font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Venue & Navigation Buttons Directly on Background */}
            <div
              data-swiper-parallax-y="-80"
              className="mt-6 flex flex-col items-center gap-2.5"
            >
              <p className="text-xs sm:text-sm text-white/90 flex items-center justify-center gap-1.5 font-serif drop-shadow-md">
                <MapPin className="w-4 h-4 text-[#dfc285]" />
                <span>{weddingData.event.venueName}, {weddingData.event.city}</span>
              </p>

              <div className="flex items-center gap-3 mt-2">
                <a
                  href={weddingData.event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-[#dfc285]/40 text-[#dfc285] text-xs font-serif tracking-wider hover:bg-[#dfc285] hover:text-[#060813] transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={weddingData.event.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-[#dfc285]/40 text-[#dfc285] text-xs font-serif tracking-wider hover:bg-[#dfc285] hover:text-[#060813] transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <span>Waze</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div
              data-swiper-parallax-y="-50"
              className="mt-8 flex items-center justify-center gap-2 text-xs text-[#dfc285]/80 font-serif tracking-widest uppercase cursor-pointer hover:text-white transition-all group"
              onClick={() => swiperInstance?.slideNext()}
            >
              <span>Profil Pengantin &amp; Atur Cara</span>
              <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
            </div>
          </div>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 04: RAJA SEHARI & KELUARGA (THE COUPLE & TIMELINE - CARDLESS)       */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax-y="-25%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/under_the_arch.jpg')" }}
          />
          <div className="absolute inset-0 bg-radial from-[#060813]/60 via-[#060813]/90 to-[#060813]/98 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-[#060813]/90 pointer-events-none" />

          <div
            data-swiper-parallax-y="-450"
            className="absolute select-none pointer-events-none font-serif text-[180px] sm:text-[300px] font-black text-white/[0.04] tracking-tighter leading-none"
          >
            04
          </div>

          {/* Direct Floating Words - No Card Box */}
          <div className="relative z-10 max-w-md w-full px-8 sm:px-10 text-center flex flex-col items-center">
            <span
              data-swiper-parallax-y="-320"
              className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#dfc285] font-serif font-medium drop-shadow-md"
            >
              Meraikan Dua Jiwa
            </span>

            <h2
              data-swiper-parallax-y="-260"
              className="font-serif text-3xl sm:text-5xl text-white font-bold my-1 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            >
              Raja Sehari
            </h2>

            {/* Couple Names & Family Columns - Floating Directly on Background */}
            <div
              data-swiper-parallax-y="-180"
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center my-4 w-full"
            >
              {/* Groom Column */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfc285] font-serif">
                  Pengantin Lelaki
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-1 drop-shadow-md">
                  {weddingData.groom.fullName}
                </h3>
                <p className="text-xs text-[#e8cda1] mt-1 font-serif">
                  Putra kepada {weddingData.groom.fatherName} &amp; {weddingData.groom.motherName}
                </p>
              </div>

              {/* Bride Column */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfc285] font-serif">
                  Pengantin Perempuan
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-1 drop-shadow-md">
                  {weddingData.bride.fullName}
                </h3>
                <p className="text-xs text-[#e8cda1] mt-1 font-serif">
                  Puteri kepada {weddingData.bride.fatherName} &amp; {weddingData.bride.motherName}
                </p>
              </div>
            </div>

            {/* Glowing Accent Line */}
            <div
              data-swiper-parallax-y="-140"
              className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#dfc285] to-transparent my-2"
            />

            {/* Timeline - Floating Directly on Background */}
            <div
              data-swiper-parallax-y="-100"
              className="w-full max-w-md my-2 text-left"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#dfc285] font-serif font-medium block text-center mb-3">
                Atur Cara Majlis
              </span>
              <div className="space-y-1.5 border-l border-[#dfc285]/30 ml-4 pl-4 sm:ml-8 sm:pl-6">
                {weddingData.itinerary.map((item, idx) => (
                  <div key={idx} className="relative flex justify-between items-center py-1">
                    {/* Glowing Dot on timeline */}
                    <span className="absolute -left-[21px] sm:-left-[29px] top-2.5 w-2 h-2 rounded-full bg-[#dfc285] shadow-[0_0_6px_rgba(223,194,133,0.8)]" />
                    <span className="font-mono text-[#dfc285] text-xs font-semibold">{item.time}</span>
                    <span className="font-serif text-xs sm:text-sm text-white/90 drop-shadow-sm">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-swiper-parallax-y="-60"
              className="mt-6 flex items-center justify-center gap-2 text-xs text-[#dfc285]/80 font-serif tracking-widest uppercase cursor-pointer hover:text-white transition-all group"
              onClick={() => swiperInstance?.slideNext()}
            >
              <span>Sahkan Kehadiran (RSVP)</span>
              <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
            </div>
          </div>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 05: PENGESAHAN KEHADIRAN (INTERACTIVE RSVP - CARDLESS)               */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax-y="-25%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/under_the_arch.jpg')" }}
          />
          <div className="absolute inset-0 bg-radial from-[#060813]/60 via-[#060813]/90 to-[#060813]/98 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-[#060813]/90 pointer-events-none" />

          <div
            data-swiper-parallax-y="-450"
            className="absolute select-none pointer-events-none font-serif text-[180px] sm:text-[300px] font-black text-white/[0.04] tracking-tighter leading-none"
          >
            05
          </div>

          {/* Direct Floating Words & Form - No Card Box */}
          <div className="relative z-10 max-w-md w-full px-8 sm:px-10 text-center flex flex-col items-center">
            <span
              data-swiper-parallax-y="-320"
              className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#dfc285] font-serif font-medium drop-shadow-md"
            >
              Sahkan Kehadiran Anda
            </span>

            <h2
              data-swiper-parallax-y="-260"
              className="font-serif text-3xl sm:text-5xl text-white font-bold my-1 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            >
              Borang RSVP
            </h2>

            <p
              data-swiper-parallax-y="-200"
              className="text-xs text-[#e8cda1] font-serif mb-4"
            >
              Mohon maklumkan kehadiran anda sebelum 14 November 2026
            </p>

            {/* RSVP Form Content Directly on Background */}
            <div
              data-swiper-parallax-y="-120"
              className="w-full max-w-md text-left"
            >
              {rsvpSubmitted ? (
                <div className="text-center py-8 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#dfc285]/20 text-[#dfc285] flex items-center justify-center mb-3 border border-[#dfc285]/40 shadow-[0_0_16px_rgba(223,194,133,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-white font-bold">Terima Kasih!</h3>
                  <p className="text-xs sm:text-sm text-[#e8cda1] mt-2 leading-relaxed max-w-xs mx-auto">
                    Jawapan RSVP anda telah selamat direkodkan. Kehadiran anda amat bermakna buat kami sekeluarga.
                  </p>
                  <button
                    onClick={() => swiperInstance?.slideNext()}
                    className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#dfc285] via-[#f3e3ba] to-[#dfc285] text-[#060813] font-serif text-xs font-bold uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-lg transition-all"
                  >
                    Lihat Ucapan Tetamu &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-3.5">
                  {rsvpError && (
                    <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs text-center">
                      {rsvpError}
                    </div>
                  )}

                  {/* Attending Toggle - Floating Minimalist Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending(true)}
                      className={`py-2.5 px-4 rounded-full font-serif text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                        rsvpAttending
                          ? "bg-gradient-to-r from-[#dfc285] via-[#f3e3ba] to-[#dfc285] text-[#060813] border-[#dfc285] font-bold shadow-[0_0_12px_rgba(223,194,133,0.5)]"
                          : "bg-white/[0.04] text-white/70 border-white/20 hover:border-[#dfc285]/50"
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending(false)}
                      className={`py-2.5 px-4 rounded-full font-serif text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                        !rsvpAttending
                          ? "bg-rose-900/80 text-white border-rose-500 font-bold shadow-md"
                          : "bg-white/[0.04] text-white/70 border-white/20 hover:border-rose-500/50"
                      }`}
                    >
                      Tidak Hadir
                    </button>
                  </div>

                  {/* Name Input - Floating Border Bottom */}
                  <div>
                    <input
                      type="text"
                      placeholder="Nama Penuh Anda *"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full py-2.5 px-1 bg-transparent border-b border-[#dfc285]/40 focus:border-[#dfc285] text-white text-sm placeholder:text-white/40 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Phone Input - Floating Border Bottom */}
                  <div>
                    <input
                      type="tel"
                      placeholder="Nombor Telefon / WhatsApp *"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      className="w-full py-2.5 px-1 bg-transparent border-b border-[#dfc285]/40 focus:border-[#dfc285] text-white text-sm placeholder:text-white/40 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Pax Selector (if attending) */}
                  {rsvpAttending && (
                    <div className="flex items-center justify-between py-2 border-b border-[#dfc285]/40">
                      <span className="text-xs text-[#e8cda1] flex items-center gap-1.5 font-serif">
                        <Users className="w-3.5 h-3.5 text-[#dfc285]" />
                        <span>Bilangan Tetamu (Pax):</span>
                      </span>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRsvpPax(num)}
                            className={`w-7 h-7 rounded-full text-xs font-serif font-bold transition-all cursor-pointer ${
                              rsvpPax === num
                                ? "bg-[#dfc285] text-[#060813] shadow-[0_0_8px_rgba(223,194,133,0.6)]"
                                : "bg-white/[0.06] text-white/70 border border-white/20 hover:border-[#dfc285]"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wish Message - Floating Border Bottom */}
                  <div>
                    <input
                      type="text"
                      placeholder="Ucapan & doa tulus (pilihan)..."
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      className="w-full py-2.5 px-1 bg-transparent border-b border-[#dfc285]/40 focus:border-[#dfc285] text-white text-sm placeholder:text-white/40 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={rsvpLoading}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#dfc285] via-[#f3e3ba] to-[#dfc285] text-[#060813] font-serif font-bold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(223,194,133,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
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
        {/* SLIDE 06: BUKU UCAPAN & SALAM KAUT (GUESTBOOK & GIFT - CARDLESS)          */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax-y="-25%"
            data-swiper-parallax-scale="1.15"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/garden_meadow.jpg')" }}
          />
          <div className="absolute inset-0 bg-radial from-[#060813]/60 via-[#060813]/90 to-[#060813]/98 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-[#060813]/90 pointer-events-none" />

          <div
            data-swiper-parallax-y="-450"
            className="absolute select-none pointer-events-none font-serif text-[180px] sm:text-[300px] font-black text-white/[0.04] tracking-tighter leading-none"
          >
            06
          </div>

          {/* Direct Floating Words - No Card Box */}
          <div className="relative z-10 max-w-xl w-full px-6 sm:px-8 text-center flex flex-col items-center">
            <span
              data-swiper-parallax-y="-320"
              className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#dfc285] font-serif font-medium drop-shadow-md"
            >
              Doa &amp; Ingatan Tulus
            </span>

            <h2
              data-swiper-parallax-y="-260"
              className="font-serif text-3xl sm:text-5xl text-white font-bold my-1 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            >
              Buku Ucapan &amp; Hadiah
            </h2>

            {/* Glowing Accent Line */}
            <div
              data-swiper-parallax-y="-200"
              className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#dfc285] to-transparent my-3"
            />

            {/* Floating Live Wishes Preview */}
            <div
              data-swiper-parallax-y="-140"
              className="w-full max-w-md my-2 max-h-36 overflow-y-auto space-y-2.5 text-left pr-2 scrollbar-thin"
            >
              {wishes.length === 0 ? (
                <p className="text-xs text-white/50 text-center py-4 font-serif italic">
                  Jadilah yang pertama mengirimkan ucapan doa buat pengantin!
                </p>
              ) : (
                wishes.slice(0, 3).map((w, idx) => (
                  <div key={idx} className="border-l-2 border-[#dfc285]/50 pl-3 py-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-serif font-bold text-[#dfc285]">{w.name}</span>
                      <span className="text-[10px] text-white/40">{w.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 italic mt-0.5">&ldquo;{w.message}&rdquo;</p>
                  </div>
                ))
              )}
            </div>

            {/* Salam Kaut DuitNow - Floating Minimalist Info */}
            <div
              data-swiper-parallax-y="-90"
              className="w-full max-w-md my-4 pt-3 border-t border-[#dfc285]/30 flex flex-col items-center gap-1.5 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-4 h-4 text-[#dfc285]" />
                <span className="text-xs font-serif font-bold text-[#dfc285] uppercase tracking-wider">
                  Salam Kaut Digital ({weddingData.gift.bankName})
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="font-mono text-base sm:text-lg font-bold text-white tracking-widest">
                  {weddingData.gift.accountNumber}
                </span>
                <button
                  onClick={handleCopyBank}
                  className="px-2.5 py-1 rounded-full bg-white/[0.08] hover:bg-[#dfc285] hover:text-[#060813] transition-all text-xs flex items-center gap-1 text-[#dfc285] cursor-pointer"
                  title="Salin Nombor Akaun"
                >
                  {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10px] font-serif uppercase tracking-wider">{copiedBank ? "Disalin!" : "Salin"}</span>
                </button>
              </div>
              <p className="text-[11px] text-[#e8cda1] font-serif">
                {weddingData.gift.accountHolder}
              </p>
            </div>

            {/* WhatsApp Family Contact Buttons */}
            <div
              data-swiper-parallax-y="-50"
              className="flex items-center justify-center gap-3 my-2"
            >
              {weddingData.contacts.slice(0, 2).map((c, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${c.phone}?text=Tahniah%20atas%20perkahwinan%20Harith%20dan%20Aisyah!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/[0.05] border border-[#dfc285]/40 text-[#dfc285] text-xs font-serif hover:bg-[#dfc285] hover:text-[#060813] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Phone className="w-3 h-3 text-[#dfc285]" />
                  <span>WhatsApp {c.name.split(" ").slice(0, 2).join(" ")}</span>
                </a>
              ))}
            </div>

            {/* Back to Entrance Button */}
            <div
              className="mt-6 pt-2 flex items-center justify-center gap-1.5 text-xs text-[#dfc285]/80 font-serif tracking-widest uppercase cursor-pointer hover:text-white transition-all group"
              onClick={() => swiperInstance?.slideTo(0)}
            >
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              <span>Kembali ke Pintu Gerbang</span>
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
                className={`hidden sm:inline-block text-[10px] uppercase font-serif tracking-widest px-2.5 py-0.5 rounded-full backdrop-blur-md transition-all ${
                  isActive
                    ? "text-[#dfc285] bg-[#060813]/90 border border-[#dfc285]/50 opacity-100 translate-x-0 shadow-md"
                    : "text-white/60 bg-[#060813]/50 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {slide.name}
              </span>

              {/* Number & Progress Dot */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-serif text-[11px] font-bold transition-all ${
                    isActive ? "text-[#dfc285] scale-110 drop-shadow-[0_0_8px_rgba(223,194,133,0.8)]" : "text-white/40 group-hover:text-white/80"
                  }`}
                >
                  {slide.num}
                </span>

                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-6 bg-gradient-to-b from-[#dfc285] to-[#c5a059] shadow-[0_0_10px_rgba(223,194,133,0.9)]"
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
          className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#060813]/70 backdrop-blur-md border border-[#dfc285]/40 flex items-center justify-center text-[#dfc285] hover:bg-[#060813] hover:border-[#dfc285] transition-all cursor-pointer shadow-lg"
          aria-label="Slaid atas sebelumnya"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {activeIndex < slideTitles.length - 1 && (
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#060813]/70 backdrop-blur-md border border-[#dfc285]/40 flex items-center justify-center text-[#dfc285] hover:bg-[#060813] hover:border-[#dfc285] transition-all cursor-pointer shadow-lg"
          aria-label="Slaid bawah seterusnya"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}

      {/* Right Edge Vertical Progress Bar */}
      <div className="fixed right-0 top-0 bottom-0 w-1 bg-white/10 z-40 pointer-events-none">
        <div
          className="w-full bg-gradient-to-b from-[#c5a059] via-[#dfc285] to-[#c5a059] transition-all duration-500 shadow-[0_0_10px_rgba(223,194,133,0.9)]"
          style={{ height: `${((activeIndex + 1) / slideTitles.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
