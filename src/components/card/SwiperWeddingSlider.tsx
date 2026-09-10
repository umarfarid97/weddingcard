"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Mousewheel, Pagination, Navigation, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { 
  Heart, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ChevronUp, 
  ChevronDown, 
  Gift, 
  Phone, 
  Copy, 
  Check,
  Calendar,
  Sparkles,
  Navigation as NavIcon
} from "lucide-react";
import confetti from "canvas-confetti";
import { weddingData } from "@/data/weddingData";
import BotanicalWildflowerFrame from "./BotanicalWildflowerFrame";

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
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#dfa528", "#52664b", "#ffffff", "#e8b738", "#d99b9b"],
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
    <div className="relative w-full max-w-[100vw] h-screen overflow-hidden bg-[#faf6ee] text-[#283424] select-none touch-none">
      <Swiper
        direction="vertical"
        speed={1000}
        parallax={true}
        mousewheel={{ enabled: true, sensitivity: 1 }}
        keyboard={{ enabled: true }}
        touchAngle={45}
        resistanceRatio={0}
        preventInteractionOnTransition={true}
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
        {/* SLIDE 01: PINTU GERBANG UTAMA (CARDLESS - DIRECT ON PAPER BACKGROUND)     */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-4 w-full">
              {/* Header Script */}
              <div 
                data-swiper-parallax-y="-120"
                data-swiper-parallax-opacity="0.2"
                className="space-y-1.5"
              >
                <span className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-[#52664b] block tracking-wide">
                  &lsquo;Walimatulurus&rsquo;
                </span>
                <p className="font-serif text-xs sm:text-sm tracking-[0.3em] text-[#697f5f] uppercase font-semibold">
                  Sabtu • 2 Januari 2027
                </p>
              </div>

              {/* Callout */}
              <div 
                data-swiper-parallax-y="-170"
                data-swiper-parallax-opacity="0.2"
                className="my-4 sm:my-6"
              >
                <p className="font-handwriting text-3xl sm:text-4xl text-[#3d4d38] leading-tight">
                  Kindly Join Our Celebration
                </p>
                <div className="w-20 h-[1.5px] bg-[#52664b]/30 mx-auto mt-2.5" />
              </div>

              {/* Main Couple Names Directly on Background */}
              <div 
                data-swiper-parallax-y="-210"
                className="space-y-1.5 my-3"
              >
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#222d1f] font-normal tracking-tight">
                  Umar
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <span className="w-12 h-[1px] bg-[#dfa528]/50" />
                  <span className="font-handwriting text-4xl sm:text-5xl text-[#dfa528]">
                    &
                  </span>
                  <span className="w-12 h-[1px] bg-[#dfa528]/50" />
                </div>
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#222d1f] font-normal tracking-tight">
                  Nafisya
                </h1>
              </div>

              {/* Venue & Time Information */}
              <div 
                data-swiper-parallax-y="-160"
                data-swiper-parallax-opacity="0.3"
                className="space-y-1.5 mt-4"
              >
                <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#2f3d2a] font-medium tracking-wide">
                  Petak Padin, Kepala Batas
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#697f5f] tracking-widest uppercase font-medium">
                  Pulau Pinang • 11:00 AM – 4:00 PM
                </p>
              </div>

              {/* Dainty Footer Script Whisper */}
              <div 
                data-swiper-parallax-y="-110"
                className="pt-6"
              >
                <p className="font-handwriting text-2xl sm:text-3xl text-[#52664b]/95">
                  We can&apos;t wait to celebrate with you!
                </p>
              </div>

              {/* Interactive Scroll Cue */}
              <div 
                data-swiper-parallax-y="-80"
                className="mt-4 flex items-center gap-1.5 text-[#697f5f] text-[11px] tracking-widest uppercase font-medium"
              >
                <span>Skrol ke bawah</span>
                <ChevronDown className="w-4 h-4 animate-bounce text-[#52664b]" />
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 02: KALAM SUCI (CARDLESS - DIRECT ON PAPER BACKGROUND)              */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-4 w-full">
              {/* Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-4xl sm:text-5xl text-[#52664b] block">
                  &lsquo;Kalam Suci&rsquo;
                </span>
                <p className="font-serif text-xs tracking-[0.25em] text-[#697f5f] uppercase font-semibold">
                  Dengan Nama Allah Yang Maha Pengasih Lagi Maha Penyayang
                </p>
              </div>

              {/* Bismillah Calligraphy */}
              <div 
                data-swiper-parallax-y="-160"
                className="my-4"
              >
                <p className="font-serif text-2xl sm:text-3xl text-[#222d1f] tracking-wide leading-relaxed">
                  {weddingData.bismillahText}
                </p>
                <div className="w-16 h-[1.5px] bg-[#dfa528]/50 mx-auto mt-3" />
              </div>

              {/* Quranic Arabic Verse Directly on Background */}
              <div 
                data-swiper-parallax-y="-200"
                className="px-4 max-w-lg my-3"
              >
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2b3926] leading-loose dir-rtl">
                  {weddingData.doa.arabic}
                </p>
              </div>

              {/* Malay Translation */}
              <div 
                data-swiper-parallax-y="-150"
                className="px-4 max-w-lg my-3"
              >
                <p className="font-serif italic text-sm sm:text-base text-[#44553f] leading-relaxed">
                  {weddingData.doa.translation}
                </p>
              </div>

              {/* Source Tag with Laurel Motif */}
              <div 
                data-swiper-parallax-y="-100"
                className="pt-3"
              >
                <span className="inline-block px-5 py-1.5 rounded-full border border-[#52664b]/30 bg-[#52664b]/5 font-serif text-sm text-[#52664b] font-medium tracking-wide">
                  {weddingData.doa.source}
                </span>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 03: KIRA DETIK & LOKASI (CARDLESS - DIRECT ON PAPER BACKGROUND)     */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-4 w-full">
              {/* Title */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-4xl sm:text-5xl text-[#52664b] block">
                  &lsquo;Kira Detik Hari Bahagia&rsquo;
                </span>
                <p className="font-serif text-xs tracking-[0.25em] text-[#697f5f] uppercase font-semibold">
                  Menghitung Detik Menuju Walimatulurus
                </p>
              </div>

              {/* 4-Box Pressed Paper Countdown (Minimalist, directly on background) */}
              <div 
                data-swiper-parallax-y="-180"
                className="grid grid-cols-4 gap-3 sm:gap-5 w-full max-w-[400px] my-5"
              >
                {[
                  { label: "Hari", val: timeLeft.days },
                  { label: "Jam", val: timeLeft.hours },
                  { label: "Minit", val: timeLeft.minutes },
                  { label: "Saat", val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl border border-[#52664b]/20 bg-white/40 shadow-xs"
                  >
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#222d1f]">
                      {String(item.val).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-[10px] sm:text-xs uppercase tracking-wider text-[#697f5f] font-semibold mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Venue Details Directly on Background */}
              <div 
                data-swiper-parallax-y="-160"
                className="w-full max-w-[420px] text-center space-y-1.5 my-3"
              >
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#52664b]/10 text-[#52664b] mb-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#222d1f]">
                  {weddingData.event.venueName}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#52664b] font-medium">
                  {weddingData.event.hallName}
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#697f5f] leading-relaxed max-w-sm mx-auto">
                  {weddingData.event.address}
                </p>
              </div>

              {/* Navigation Action Buttons (Google Maps & Waze) */}
              <div 
                data-swiper-parallax-y="-130"
                className="flex items-center gap-3 w-full max-w-[360px] my-2"
              >
                <a
                  href={weddingData.event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#52664b] hover:bg-[#44553f] text-white font-serif text-sm font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-[#e8c872]" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={weddingData.event.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#dfa528] hover:bg-[#c9911e] text-[#222d1f] font-serif text-sm font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                >
                  <NavIcon className="w-4 h-4" />
                  <span>Waze</span>
                </a>
              </div>

              {/* Add to Calendar Link */}
              <div 
                data-swiper-parallax-y="-90"
                className="pt-2"
              >
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(weddingData.event.calendarSummary)}&dates=20270102T030000Z/20270102T080000Z&details=${encodeURIComponent(weddingData.event.calendarDescription)}&location=${encodeURIComponent(weddingData.event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-sans text-[#52664b] hover:text-[#222d1f] underline underline-offset-4 tracking-wide font-medium"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Tambah ke Google Calendar</span>
                </a>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 04: RAJA SEHARI & ATUR CARA (CARDLESS - DIRECT ON PAPER BACKGROUND) */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-4 w-full">
              {/* Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-4xl sm:text-5xl text-[#52664b] block">
                  &lsquo;Raja Sehari&rsquo;
                </span>
                <p className="font-serif text-xs tracking-[0.25em] text-[#697f5f] uppercase font-semibold">
                  Mempelai & Atur Cara Majlis
                </p>
              </div>

              {/* Couple & Parents Dual Column Directly on Background */}
              <div 
                data-swiper-parallax-y="-180"
                className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg my-3 text-center"
              >
                {/* Groom */}
                <div className="space-y-1">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#222d1f]">
                    {weddingData.groom.fullName}
                  </h4>
                  <div className="w-12 h-[1px] bg-[#52664b]/30 mx-auto my-1.5" />
                  <p className="font-sans text-xs sm:text-sm text-[#697f5f] leading-relaxed">
                    Bapa: {weddingData.groom.fatherName}
                    <br />
                    Ibu: {weddingData.groom.motherName}
                  </p>
                </div>

                {/* Bride */}
                <div className="space-y-1">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#222d1f]">
                    {weddingData.bride.fullName}
                  </h4>
                  <div className="w-12 h-[1px] bg-[#52664b]/30 mx-auto my-1.5" />
                  <p className="font-sans text-xs sm:text-sm text-[#697f5f] leading-relaxed">
                    Bapa: {weddingData.bride.fatherName}
                    <br />
                    Ibu: {weddingData.bride.motherName}
                  </p>
                </div>
              </div>

              {/* Itinerary Timeline Directly on Background */}
              <div 
                data-swiper-parallax-y="-160"
                className="w-full max-w-md my-2"
              >
                <p className="font-handwriting text-2xl sm:text-3xl text-[#52664b] text-center mb-2.5">
                  Atur Cara Majlis
                </p>
                <div className="space-y-2 text-left text-xs sm:text-sm font-sans max-w-xs mx-auto">
                  {weddingData.itinerary.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="font-serif font-bold text-[#52664b] w-20 shrink-0 text-right">
                        {item.time}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#dfa528] mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-serif font-semibold text-[#222d1f] leading-tight">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-[11px] text-[#697f5f] leading-tight mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Whisper */}
              <div 
                data-swiper-parallax-y="-90"
                className="pt-2"
              >
                <p className="font-serif italic text-xs sm:text-sm text-[#697f5f]">
                  Semoga kehadiran para tetamu menyerikan lagi majlis kami
                </p>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 05: BORANG RSVP (CARDLESS - DIRECT ON BACKGROUND)                   */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center py-4 w-full">
              {/* RSVP Top Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="text-center space-y-1"
              >
                <span className="font-handwriting text-5xl sm:text-6xl text-[#3b4c34] block tracking-wide">
                  &lsquo;RSVP&rsquo;
                </span>
                <p className="font-serif text-xs sm:text-sm tracking-wider text-[#6e5538] font-semibold">
                  Please respond by December 1st, 2026
                </p>
                <p className="font-handwriting text-3xl text-[#2f3d2a] pt-1">
                  Kindly Join Our Celebration
                </p>
              </div>

              {rsvpSubmitted ? (
                /* Success State */
                <div 
                  data-swiper-parallax-y="-150"
                  className="p-8 rounded-2xl border border-[#3b4c34]/20 bg-white/70 text-center space-y-3 my-6 max-w-md w-full shadow-xs"
                >
                  <div className="w-14 h-14 rounded-full bg-[#3b4c34]/15 text-[#3b4c34] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1b140b]">
                    Terima Kasih!
                  </h3>
                  <p className="font-serif text-sm sm:text-base text-[#3b4c34] leading-relaxed">
                    Pengesahan RSVP anda telah berjaya disimpan. Kami tidak sabar untuk meraikan hari bahagia bersama anda!
                  </p>
                  <button
                    onClick={() => setRsvpSubmitted(false)}
                    className="text-xs font-sans text-[#3b4c34] underline tracking-wider pt-2 cursor-pointer font-medium"
                  >
                    Kemaskini Respons Lain
                  </button>
                </div>
              ) : (
                /* Form Fields styled like Reference Card (Directly on Background) */
                <form 
                  onSubmit={handleRsvpSubmit}
                  data-swiper-parallax-y="-180"
                  className="space-y-4 my-3 w-full max-w-[380px] text-left"
                >
                  {/* Name(s) Underlined Input */}
                  <div className="space-y-1">
                    <label className="font-serif text-sm text-[#1b140b] font-bold block">
                      Name(s):
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Nama penuh anda"
                      className="w-full bg-transparent border-b-2 border-[#3b4c34]/60 focus:border-[#3b4c34] outline-none py-1.5 font-serif text-base text-[#150f08] font-semibold placeholder:text-[#3b4c34]/50 transition-colors"
                    />
                  </div>

                  {/* Phone Number Underlined Input */}
                  <div className="space-y-1">
                    <label className="font-serif text-sm text-[#1b140b] font-bold block">
                      No. Telefon:
                    </label>
                    <input
                      type="tel"
                      required
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      placeholder="cth: 012-3456789"
                      className="w-full bg-transparent border-b-2 border-[#3b4c34]/60 focus:border-[#3b4c34] outline-none py-1.5 font-serif text-base text-[#150f08] font-semibold placeholder:text-[#3b4c34]/50 transition-colors"
                    />
                  </div>

                  {/* Attendance Checkboxes (Joyfully Accepts / Regretfully Declines) */}
                  <div className="flex items-center justify-between pt-2 gap-3">
                    <label 
                      onClick={() => setRsvpAttending(true)}
                      className="flex items-center gap-2.5 cursor-pointer select-none group"
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        rsvpAttending 
                          ? "border-[#3b4c34] bg-[#3b4c34] text-white" 
                          : "border-[#3b4c34]/60 bg-[#faf6ee] group-hover:border-[#3b4c34]"
                      }`}>
                        {rsvpAttending && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-serif text-sm text-[#1b140b] font-bold">
                        Joyfully Accepts
                      </span>
                    </label>

                    <label 
                      onClick={() => setRsvpAttending(false)}
                      className="flex items-center gap-2.5 cursor-pointer select-none group"
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        !rsvpAttending 
                          ? "border-[#ba7d7d] bg-[#ba7d7d] text-white" 
                          : "border-[#3b4c34]/60 bg-[#faf6ee] group-hover:border-[#ba7d7d]"
                      }`}>
                        {!rsvpAttending && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-serif text-sm text-[#6e5538] font-bold">
                        Regretfully Declines
                      </span>
                    </label>
                  </div>

                  {/* Number Attending (Pax Selection) */}
                  {rsvpAttending && (
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-serif text-sm text-[#1b140b] font-bold">
                        Number Attending:
                      </span>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRsvpPax(num)}
                            className={`w-8 h-8 rounded-full font-serif text-sm font-bold transition-all cursor-pointer ${
                              rsvpPax === num
                                ? "bg-[#3b4c34] text-white shadow-sm ring-2 ring-[#cba358]"
                                : "bg-[#faf6ee] text-[#3b4c34] border border-[#3b4c34]/40 hover:bg-white shadow-xs"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dietary Restrictions / Wishes Underlined Input */}
                  <div className="space-y-1">
                    <label className="font-serif text-sm text-[#1b140b] font-bold block">
                      Dietary Restrictions / Ucapan:
                    </label>
                    <input
                      type="text"
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      placeholder="Pesanan atau ucapan ringkas"
                      className="w-full bg-transparent border-b-2 border-[#3b4c34]/60 focus:border-[#3b4c34] outline-none py-1.5 font-serif text-base text-[#150f08] font-semibold placeholder:text-[#3b4c34]/50 transition-colors"
                    />
                  </div>

                  {rsvpError && (
                    <p className="font-sans text-xs text-red-600 font-medium">
                      {rsvpError}
                    </p>
                  )}

                  {/* Submit Button in Sage Green */}
                  <button
                    type="submit"
                    disabled={rsvpLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#3b4c34] hover:bg-[#2d3a27] disabled:opacity-50 text-white font-serif text-base font-semibold tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    {rsvpLoading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#e8c872]" />
                        <span>Hantar Pengesahan RSVP</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Footer Script Whisper */}
              <div 
                data-swiper-parallax-y="-100"
                className="text-center pt-3"
              >
                <p className="font-handwriting text-2xl sm:text-3xl text-[#3b4c34]/95">
                  We can&apos;t wait to celebrate with you!
                </p>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 06: BUKU UCAPAN & SALAM KAUT (CARDLESS - DIRECT ON PAPER BACKGROUND) */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-4 w-full">
              {/* Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-4xl sm:text-5xl text-[#52664b] block">
                  &lsquo;Buku Ucapan & Hadiah&rsquo;
                </span>
                <p className="font-serif text-xs tracking-[0.25em] text-[#697f5f] uppercase font-semibold">
                  Ingatan Tulus & Salam Kaut Digital
                </p>
              </div>

              {/* Guestbook Wishes Directly on Background */}
              <div 
                data-swiper-parallax-y="-180"
                className="w-full max-w-md my-2"
              >
                <p className="font-serif text-sm font-bold text-[#222d1f] mb-2 text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#dfa528]" />
                  <span>Ucapan Tetamu Terkini</span>
                </p>
                <div className="space-y-2 max-h-28 overflow-y-auto no-scrollbar text-center px-4">
                  {wishes.length > 0 ? (
                    wishes.slice(0, 3).map((w, idx) => (
                      <div 
                        key={idx} 
                        className="py-1.5 border-b border-[#52664b]/15 text-xs sm:text-sm"
                      >
                        <p className="font-serif font-bold text-[#222d1f] leading-tight">
                          {w.name}
                        </p>
                        <p className="font-serif italic text-[#52664b] text-xs line-clamp-2 mt-0.5">
                          &ldquo;{w.message}&rdquo;
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="py-2 text-xs sm:text-sm text-[#697f5f] font-serif italic">
                      &ldquo;Selamat menempuh alam perkahwinan, semoga berkekalan hingga ke Jannah.&rdquo;
                    </div>
                  )}
                </div>
              </div>

              {/* Digital Salam Kaut Directly on Background */}
              <div 
                data-swiper-parallax-y="-160"
                className="w-full max-w-md py-3 px-5 rounded-2xl border border-[#52664b]/20 bg-white/40 text-center my-2 shadow-xs"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Gift className="w-4 h-4 text-[#dfa528]" />
                  <span className="font-serif text-sm font-bold text-[#52664b]">
                    Salam Kaut Digital (DuitNow)
                  </span>
                  <span className="font-serif text-xs text-[#697f5f] uppercase font-bold tracking-wider">
                    • {weddingData.gift.bankName}
                  </span>
                </div>
                <p className="font-serif text-sm text-[#222d1f]">
                  {weddingData.gift.accountHolder}
                </p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="font-mono text-sm sm:text-base font-bold text-[#222d1f] tracking-wider">
                    {weddingData.gift.accountNumber}
                  </span>
                  <button
                    onClick={handleCopyBank}
                    className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-[#52664b] hover:bg-[#44553f] text-white text-xs font-sans font-medium transition-all active:scale-95 cursor-pointer"
                  >
                    {copiedBank ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#e8c872]" />
                        <span>Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Family WhatsApp Contacts Directly on Background */}
              <div 
                data-swiper-parallax-y="-130"
                className="w-full max-w-md space-y-2 my-2"
              >
                <p className="font-serif text-xs sm:text-sm font-bold text-[#222d1f] text-center">
                  Hubungi Keluarga Pengantin:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {weddingData.contacts.map((contact, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/${contact.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-[#52664b]/30 bg-white/40 hover:bg-white text-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#52664b] shrink-0" />
                      <div className="text-left">
                        <p className="font-serif font-bold text-[#222d1f] leading-tight">
                          {contact.name}
                        </p>
                        <p className="text-[10px] text-[#697f5f]">
                          {contact.relation}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Concluding Blessing */}
              <div 
                data-swiper-parallax-y="-90"
                className="pt-2 text-center"
              >
                <p className="font-handwriting text-xl sm:text-2xl text-[#52664b]">
                  Terima kasih atas doa dan ingatan tulus anda.
                </p>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>
      </Swiper>

      {/* ========================================================================= */}
      {/* FLOATING BOTANICAL NAVIGATION CONTROLS                                    */}
      {/* ========================================================================= */}
      {/* Right Edge Slide Dots */}
      <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 py-2 px-1 rounded-full bg-[#faf6ee]/80 backdrop-blur-xs border border-[#52664b]/20 shadow-xs pointer-events-auto">
        {slideTitles.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => swiperInstance?.slideTo(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
              activeIndex === idx
                ? "w-2.5 h-6 bg-[#52664b] shadow-xs ring-1 ring-[#dfa528]"
                : "w-2 h-2 bg-[#52664b]/30 hover:bg-[#52664b]/80"
            }`}
            aria-label={`Pergi ke slaid ${slide.name}`}
            title={slide.name}
          />
        ))}
      </div>

      {/* Slide Index Badge (Top Right) */}
      <div className="fixed top-4 right-4 z-40 px-3 py-1 rounded-full bg-[#faf6ee]/90 border border-[#52664b]/25 shadow-xs font-serif text-xs text-[#52664b] font-bold tracking-wider">
        {slideTitles[activeIndex]?.num} / 06
      </div>

      {/* Floating Vertical Navigation Arrows */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5">
        <button
          onClick={() => swiperInstance?.slidePrev()}
          disabled={activeIndex === 0}
          className="p-2 rounded-full bg-[#faf6ee]/90 hover:bg-white border border-[#52664b]/25 text-[#52664b] disabled:opacity-20 shadow-xs transition-all cursor-pointer"
          aria-label="Slaid Sebelumnya"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => swiperInstance?.slideNext()}
          disabled={activeIndex === slideTitles.length - 1}
          className="p-2 rounded-full bg-[#faf6ee]/90 hover:bg-white border border-[#52664b]/25 text-[#52664b] disabled:opacity-20 shadow-xs transition-all cursor-pointer"
          aria-label="Slaid Seterusnya"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
