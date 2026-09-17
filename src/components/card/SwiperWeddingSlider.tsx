"use client";

import { useState, useEffect, useRef, useMemo } from "react";
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
  ChevronLeft,
  ChevronRight,
  Phone, 
  Calendar, 
  Sparkles, 
  Check,
  Navigation as NavIcon 
} from "lucide-react";
import confetti from "canvas-confetti";
import { weddingData } from "@/data/weddingData";
import BotanicalWildflowerFrame from "./BotanicalWildflowerFrame";
import { getAssetPath } from "@/lib/basePath";
import { submitRSVP, getWishes, fetchAndSyncWishes } from "@/lib/guestService";

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

  // Live Wishes State (Single Wish Per Slide with Limit)
  const [wishes, setWishes] = useState<Array<{ name: string; message: string; date: string }>>([]);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [isWishesPaused, setIsWishesPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-advance wish-by-wish with limit (stops at the last wish)
  useEffect(() => {
    if (isWishesPaused || wishes.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentWishIndex((prev) => {
        if (prev < wishes.length - 1) {
          return prev + 1;
        }
        return prev; // stops at the limit
      });
    }, 5000); // 5 seconds per wish gives comfortable reading time

    return () => clearInterval(timer);
  }, [isWishesPaused, wishes.length]);

  const handlePrevWish = () => {
    setIsWishesPaused(true);
    setCurrentWishIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextWish = () => {
    setIsWishesPaused(true);
    setCurrentWishIndex((prev) => Math.min(wishes.length - 1, prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsWishesPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45 && currentWishIndex < wishes.length - 1) {
      setCurrentWishIndex((prev) => Math.min(wishes.length - 1, prev + 1));
    } else if (diff < -45 && currentWishIndex > 0) {
      setCurrentWishIndex((prev) => Math.max(0, prev - 1));
    }
    touchStartXRef.current = null;
  };

  const fetchWishes = async () => {
    try {
      // Fast load from local/cache first
      const cached = getWishes();
      setWishes(cached.map((w) => ({ name: w.name, message: w.message, date: w.createdAt })));

      // Fresh sync with Google Sheets
      const fresh = await fetchAndSyncWishes();
      if (fresh && fresh.length > 0) {
        setWishes(fresh.map((w) => ({ name: w.name, message: w.message, date: w.createdAt })));
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
      await submitRSVP({
        name: rsvpName.trim(),
        phone: rsvpPhone.trim(),
        attending: rsvpAttending,
        pax: rsvpAttending ? rsvpPax : 0,
        message: rsvpMessage.trim() || undefined,
      });

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
        speed={650}
        parallax={true}
        mousewheel={{ enabled: true, sensitivity: 1 }}
        keyboard={{ enabled: true }}
        touchAngle={45}
        threshold={5}
        touchRatio={1.3}
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
        {/* SLIDE 01: PINTU GERBANG UTAMA (ISLAMIC BOTANICAL ARABIC MONOGRAM DESIGN)  */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-center items-center text-center w-full my-auto space-y-3 sm:space-y-3.5 max-w-sm sm:max-w-md">
              {/* 1. Header Arabic Calligraphy: وَلِيمَةُ العُرْسِ */}
              <div 
                data-swiper-parallax-y="-120"
                data-swiper-parallax-opacity="0.2"
                className="space-y-0.5 pt-1"
              >
                <div className="font-serif text-3xl sm:text-4xl text-[#3a1d1d] tracking-wider font-semibold select-none">
                  وَلِيمَةُ العُرْسِ
                </div>
                <p className="font-serif text-[10px] sm:text-xs tracking-[0.35em] text-[#5c3e32] uppercase font-semibold">
                  WALIMATULURUS
                </p>
              </div>

              {/* 2. Arabic Initial Monogram with Central Gold Divider (Bigger & Closer) */}
              <div 
                data-swiper-parallax-y="-170"
                className="flex items-center justify-center gap-3.5 sm:gap-5 mx-auto pt-2 sm:pt-3 select-none"
              >
                {/* Bride Side: ن / نفيسة / NAFISYA */}
                <div className="flex flex-col items-center min-w-[80px] sm:min-w-[95px]">
                  <span className="font-serif text-[84px] sm:text-[100px] text-[#3a1d1d] leading-[0.88] font-normal select-none">
                    ن
                  </span>
                  <span className="font-serif text-base sm:text-lg text-[#4a2e24] mt-1.5 font-medium">
                    نفيسة
                  </span>
                  <span className="font-serif text-[10px] sm:text-xs tracking-[0.25em] text-[#5c3e32] uppercase font-semibold">
                    NAFISYA
                  </span>
                </div>

                {/* Vertical Divider with Infinity / Ornate Loop */}
                <div className="flex flex-col items-center justify-center h-32 sm:h-36 select-none px-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                  <div className="w-[1px] h-10 sm:h-12 bg-[#c5a059]/60" />
                  <div className="my-1 w-4 h-4 rounded-full border border-[#c5a059] flex items-center justify-center">
                    <span className="text-[10px] text-[#c5a059] font-serif leading-none">§</span>
                  </div>
                  <div className="w-[1px] h-10 sm:h-12 bg-[#c5a059]/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                </div>

                {/* Groom Side: ع / عمر / UMAR */}
                <div className="flex flex-col items-center min-w-[80px] sm:min-w-[95px]">
                  <span className="font-serif text-[84px] sm:text-[100px] text-[#3a1d1d] leading-[0.88] font-normal select-none">
                    ع
                  </span>
                  <span className="font-serif text-base sm:text-lg text-[#4a2e24] mt-1.5 font-medium">
                    عمر
                  </span>
                  <span className="font-serif text-[10px] sm:text-xs tracking-[0.25em] text-[#5c3e32] uppercase font-semibold">
                    UMAR
                  </span>
                </div>
              </div>

              {/* 3. Date & Venue Details */}
              <div 
                data-swiper-parallax-y="-140"
                data-swiper-parallax-opacity="0.3"
                className="space-y-1 pt-3 sm:pt-4"
              >
                <p className="font-serif text-sm sm:text-base text-[#2c1810] font-bold tracking-[0.16em] uppercase">
                  {weddingData.event.dateFormatted}
                </p>
                <p className="font-sans text-[11px] sm:text-xs text-[#6b5344] tracking-wider font-medium">
                  {weddingData.event.venueName}, {weddingData.event.city} • 11:00 AM – 4:00 PM
                </p>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 02: KALAM SUCI (CARDLESS - DIRECT ON PAPER BACKGROUND)              */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-center items-center text-center w-full my-auto space-y-4 sm:space-y-5">
              {/* Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-4xl sm:text-5xl text-[#35452e] block">
                  &lsquo;Kalam Suci&rsquo;
                </span>
                <p className="font-serif text-xs sm:text-sm tracking-[0.2em] text-[#556b4f] uppercase font-semibold max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                  Dengan Nama Allah Yang Maha Pengasih Lagi Maha Penyayang
                </p>
              </div>

              {/* Bismillah Calligraphy */}
              <div 
                data-swiper-parallax-y="-160"
                className="space-y-1.5"
              >
                <p className="font-serif text-3xl sm:text-4xl text-[#1f2d1b] tracking-wide leading-relaxed">
                  {weddingData.bismillahText}
                </p>
                <div className="w-20 h-[1px] bg-[#c5a059]/50 mx-auto" />
              </div>

              {/* Quranic Arabic Verse Directly on Background */}
              <div 
                data-swiper-parallax-y="-200"
                className="px-2 sm:px-4 max-w-sm sm:max-w-md w-full"
              >
                <p className="font-serif text-xl sm:text-2xl text-[#1f2d1b] leading-[2.1] sm:leading-[2.3] dir-rtl font-medium">
                  {weddingData.doa.arabic}
                </p>
              </div>

              {/* Malay Translation */}
              <div 
                data-swiper-parallax-y="-150"
                className="px-3 sm:px-4 max-w-sm sm:max-w-md w-full"
              >
                <p className="font-serif italic text-sm sm:text-base text-[#3d4d38] leading-relaxed">
                  {weddingData.doa.translation}
                </p>
              </div>

              {/* Source Tag with Laurel Motif */}
              <div 
                data-swiper-parallax-y="-100"
                className="pt-1"
              >
                <span className="inline-block px-5 py-1.5 rounded-full border border-[#35452e]/25 bg-white/60 font-serif text-xs sm:text-sm text-[#35452e] font-semibold tracking-wide shadow-xs">
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
            <div className="flex-1 flex flex-col justify-center items-center text-center w-full my-auto space-y-4 sm:space-y-5">
              {/* Title */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-4xl sm:text-5xl text-[#35452e] block">
                  &lsquo;Kira Detik Hari Bahagia&rsquo;
                </span>
                <p className="font-serif text-xs sm:text-sm tracking-[0.22em] text-[#556b4f] uppercase font-semibold">
                  Menghitung Detik Menuju Walimatulurus
                </p>
              </div>

              {/* 4-Box Pressed Paper Countdown */}
              <div 
                data-swiper-parallax-y="-180"
                className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-[340px] sm:max-w-[360px] my-1 sm:my-2"
              >
                {[
                  { label: "Hari", val: timeLeft.days },
                  { label: "Jam", val: timeLeft.hours },
                  { label: "Minit", val: timeLeft.minutes },
                  { label: "Saat", val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl border border-[#35452e]/20 bg-white/75 shadow-xs"
                  >
                    <span className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1f2d1b]">
                      {String(item.val).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-[11px] sm:text-xs uppercase tracking-wider text-[#556b4f] font-bold mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Venue Details Directly on Background */}
              <div 
                data-swiper-parallax-y="-160"
                className="w-full max-w-[350px] sm:max-w-[370px] text-center space-y-1.5 my-1 sm:my-2"
              >
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#35452e]/10 text-[#35452e] mb-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f2d1b]">
                  {weddingData.event.venueName}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#35452e] font-bold">
                  {weddingData.event.hallName}
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#556b4f] leading-relaxed max-w-sm mx-auto">
                  {weddingData.event.address}
                </p>
              </div>

              {/* Navigation Action Buttons (Google Maps & Waze) */}
              <div 
                data-swiper-parallax-y="-130"
                className="flex items-center gap-3 w-full max-w-[320px] sm:max-w-[340px] my-1 sm:my-2"
              >
                <a
                  href={weddingData.event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#35452e] hover:bg-[#253220] text-white font-serif text-sm sm:text-base font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-[#e8c872]" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={weddingData.event.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#c5a059] hover:bg-[#b38d45] text-[#1f2d1b] font-serif text-sm sm:text-base font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                >
                  <NavIcon className="w-4 h-4" />
                  <span>Waze</span>
                </a>
              </div>

              {/* Add to Calendar Link */}
              <div 
                data-swiper-parallax-y="-90"
                className="pt-1"
              >
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(weddingData.event.calendarSummary)}&dates=20270102T030000Z/20270102T080000Z&details=${encodeURIComponent(weddingData.event.calendarDescription)}&location=${encodeURIComponent(weddingData.event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans text-[#35452e] hover:text-[#1f2d1b] underline underline-offset-4 tracking-wide font-semibold"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Tambah ke Google Calendar</span>
                </a>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 04: ATUR CARA MAJLIS / TENTATIF (CARDLESS - DIRECT ON BACKGROUND)   */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-center items-center text-center w-full my-auto space-y-4 sm:space-y-5">
              {/* Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-4xl sm:text-5xl text-[#35452e] block">
                  &lsquo;Atur Cara Majlis&rsquo;
                </span>
                <p className="font-serif text-xs sm:text-sm tracking-[0.22em] text-[#556b4f] uppercase font-semibold">
                  Tentatif & Jadual Walimatulurus
                </p>
                <div className="w-20 h-[1px] bg-[#c5a059]/50 mx-auto mt-1" />
              </div>

              {/* Itinerary Timeline Directly on Background */}
              <div 
                data-swiper-parallax-y="-160"
                className="w-full max-w-[335px] sm:max-w-[355px] space-y-4 sm:space-y-4.5 my-2 sm:my-3"
              >
                {weddingData.itinerary.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    {/* Time Badge */}
                    <span className="font-serif font-bold text-sm sm:text-base text-[#35452e] w-20 sm:w-22 shrink-0 text-right pt-0.5">
                      {item.time}
                    </span>
                    {/* Gold Dot Accent */}
                    <div className="flex flex-col items-center mt-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#dfa528] ring-3 ring-[#dfa528]/25" />
                    </div>
                    {/* Event Details */}
                    <div className="flex-1 text-left pb-0.5">
                      <p className="font-serif font-bold text-sm sm:text-base text-[#1f2d1b] leading-tight">
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="font-sans text-xs sm:text-[13px] text-[#556b4f] leading-snug mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Whisper */}
              <div 
                data-swiper-parallax-y="-90"
                className="pt-2"
              >
                <p className="font-serif italic text-sm sm:text-base text-[#556b4f]">
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
            <div className="flex-1 flex flex-col justify-center items-center text-center w-full my-auto space-y-3 sm:space-y-4">
              {/* RSVP Top Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="text-center space-y-1 mb-1"
              >
                <span className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.3em] uppercase text-[#23311f] block">
                  R · S · V · P
                </span>
                <p className="font-serif text-xs sm:text-sm tracking-wider uppercase text-[#556b4f] font-semibold">
                  Sila maklumkan sebelum 1 Disember 2026
                </p>
                <div className="w-20 h-[1px] bg-[#c5a059]/50 mx-auto mt-1" />
                <p className="font-handwriting text-3xl sm:text-4xl text-[#35452e] pt-1">
                  Kindly Join Our Celebration
                </p>
              </div>

              {rsvpSubmitted ? (
                /* Success State */
                <div 
                  data-swiper-parallax-y="-150"
                  className="p-6 sm:p-7 rounded-2xl border border-[#35452e]/20 bg-white/85 text-center space-y-3 my-3 max-w-[350px] w-full shadow-xs"
                >
                  <div className="w-14 h-14 rounded-full bg-[#35452e]/15 text-[#35452e] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#1f2d1b]">
                    Terima Kasih!
                  </h3>
                  <p className="font-serif text-sm sm:text-base text-[#35452e] leading-relaxed">
                    Pengesahan RSVP anda telah berjaya disimpan. Kami tidak sabar untuk meraikan hari bahagia bersama anda!
                  </p>
                  <button
                    onClick={() => setRsvpSubmitted(false)}
                    className="text-xs sm:text-sm font-sans text-[#35452e] underline tracking-wider pt-2 cursor-pointer font-semibold"
                  >
                    Kemaskini Respons Lain
                  </button>
                </div>
              ) : (
                /* Form Fields styled like Reference Card (Directly on Background) */
                <form 
                  onSubmit={handleRsvpSubmit}
                  data-swiper-parallax-y="-180"
                  className="space-y-3.5 sm:space-y-4 my-1 w-full max-w-[335px] sm:max-w-[355px] text-left"
                >
                  {/* Name(s) Underlined Input */}
                  <div className="space-y-1">
                    <label className="font-serif text-xs sm:text-sm uppercase tracking-wider text-[#23311f] font-bold block">
                      Nama Penuh / Name(s):
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="cth: Ahmad Fadhil"
                      className="w-full bg-transparent border-b-2 border-[#3b4c34]/40 focus:border-[#23311f] outline-none py-1.5 font-serif text-base sm:text-lg text-[#152012] font-semibold placeholder:text-[#556b4f]/45 transition-colors"
                    />
                  </div>

                  {/* Phone Number Underlined Input */}
                  <div className="space-y-1">
                    <label className="font-serif text-xs sm:text-sm uppercase tracking-wider text-[#23311f] font-bold block">
                      No. Telefon / Phone:
                    </label>
                    <input
                      type="tel"
                      required
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      placeholder="cth: 012-3456789"
                      className="w-full bg-transparent border-b-2 border-[#3b4c34]/40 focus:border-[#23311f] outline-none py-1.5 font-serif text-base sm:text-lg text-[#152012] font-semibold placeholder:text-[#556b4f]/45 transition-colors"
                    />
                  </div>

                  {/* Attendance Checkboxes (Joyfully Accepts / Regretfully Declines) */}
                  <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                    <button 
                      type="button"
                      onClick={() => setRsvpAttending(true)}
                      className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl border transition-all cursor-pointer text-left ${
                        rsvpAttending 
                          ? "border-[#35452e] bg-[#35452e]/10 text-[#23311f] shadow-xs" 
                          : "border-[#3b4c34]/25 bg-white/40 text-[#556b4f] hover:bg-white/70"
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        rsvpAttending 
                          ? "border-[#35452e] bg-[#35452e] text-white" 
                          : "border-[#3b4c34]/50 bg-white"
                      }`}>
                        {rsvpAttending && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-serif text-xs sm:text-sm font-bold leading-tight">
                        Joyfully Accepts
                      </span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => setRsvpAttending(false)}
                      className={`flex items-center gap-2.5 py-2.5 px-3 rounded-xl border transition-all cursor-pointer text-left ${
                        !rsvpAttending 
                          ? "border-[#8a424e] bg-[#8a424e]/10 text-[#5f252f] shadow-xs" 
                          : "border-[#3b4c34]/25 bg-white/40 text-[#556b4f] hover:bg-white/70"
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                        !rsvpAttending 
                          ? "border-[#8a424e] bg-[#8a424e] text-white" 
                          : "border-[#3b4c34]/50 bg-white"
                      }`}>
                        {!rsvpAttending && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-serif text-xs sm:text-sm font-bold leading-tight">
                        Regretfully Declines
                      </span>
                    </button>
                  </div>

                  {/* Number Attending (Pax Selection) */}
                  {rsvpAttending && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-serif text-xs sm:text-sm uppercase tracking-wider text-[#23311f] font-bold">
                        Bilangan / Pax:
                      </span>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRsvpPax(num)}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                              rsvpPax === num
                                ? "bg-[#35452e] text-white shadow-sm ring-2 ring-[#c5a059]"
                                : "bg-white/80 text-[#35452e] border border-[#3b4c34]/35 hover:bg-white shadow-xs"
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
                    <label className="font-serif text-xs sm:text-sm uppercase tracking-wider text-[#23311f] font-bold block">
                      Dietary Restrictions / Ucapan:
                    </label>
                    <input
                      type="text"
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      placeholder="Pesanan atau ucapan ringkas"
                      className="w-full bg-transparent border-b-2 border-[#3b4c34]/40 focus:border-[#23311f] outline-none py-1.5 font-serif text-base sm:text-lg text-[#152012] font-semibold placeholder:text-[#556b4f]/45 transition-colors"
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
                    className="w-full py-3 px-5 rounded-full bg-[#35452e] hover:bg-[#253220] disabled:opacity-50 text-white font-serif text-sm sm:text-base uppercase tracking-widest font-semibold transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    {rsvpLoading ? (
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#dfc285]" />
                        <span>Hantar Pengesahan RSVP</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Footer Script Whisper */}
              <div 
                data-swiper-parallax-y="-100"
                className="text-center pt-2"
              >
                <p className="font-handwriting text-2xl sm:text-3xl text-[#35452e]/90">
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
            <div className="flex-1 flex flex-col justify-center items-center text-center w-full my-auto space-y-3 sm:space-y-4">
              {/* Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-4xl sm:text-5xl text-[#35452e] block">
                  &lsquo;Buku Ucapan Tetamu&rsquo;
                </span>
                <p className="font-serif text-xs sm:text-sm tracking-[0.22em] text-[#556b4f] uppercase font-semibold">
                  Titipan Doa & Ingatan Tulus
                </p>
                <div className="w-20 h-[1px] bg-[#c5a059]/50 mx-auto mt-1" />
              </div>

              {/* Guestbook Wishes: Single Wish Per Slide with Limit */}
              <div 
                data-swiper-parallax-y="-170"
                className="w-full max-w-[335px] sm:max-w-[355px] my-1 sm:my-2 flex flex-col items-center"
              >
                {/* Header with Integrated Controls & Counter Badge */}
                <div className="flex items-center justify-between w-full px-1 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#dfa528]" />
                    <span className="font-serif text-sm sm:text-base font-bold text-[#1f2d1b]">
                      Ucapan Tetamu
                    </span>
                  </div>
                  {wishes.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handlePrevWish}
                        disabled={currentWishIndex === 0}
                        className={`w-7 h-7 rounded-full bg-white/90 border border-[#35452e]/20 shadow-xs flex items-center justify-center text-[#35452e] transition-all ${
                          currentWishIndex === 0 ? "opacity-25 cursor-not-allowed" : "hover:bg-white active:scale-95 cursor-pointer"
                        }`}
                        aria-label="Ucapan Sebelumnya"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-[#556b4f] font-serif font-bold bg-[#556b4f]/10 px-2 py-0.5 rounded-full">
                        {currentWishIndex + 1} / {wishes.length}
                      </span>
                      <button
                        onClick={handleNextWish}
                        disabled={currentWishIndex === wishes.length - 1}
                        className={`w-7 h-7 rounded-full bg-white/90 border border-[#35452e]/20 shadow-xs flex items-center justify-center text-[#35452e] transition-all ${
                          currentWishIndex === wishes.length - 1 ? "opacity-25 cursor-not-allowed" : "hover:bg-white active:scale-95 cursor-pointer"
                        }`}
                        aria-label="Ucapan Seterusnya"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Horizontal Slide Viewport (One Wish at a time) */}
                <div
                  onMouseEnter={() => setIsWishesPaused(true)}
                  onMouseLeave={() => setIsWishesPaused(false)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  data-swiper-no-swiping="true"
                  className="swiper-no-swiping relative w-full overflow-hidden rounded-2xl bg-white/85 backdrop-blur-xs border border-[#35452e]/15 shadow-sm select-text"
                >
                  <div 
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentWishIndex * 100}%)` }}
                  >
                    {wishes.length > 0 ? (
                      wishes.map((w, idx) => (
                        <div 
                          key={idx} 
                          className="w-full shrink-0 p-5 sm:p-6 flex flex-col justify-between text-center min-h-[155px] sm:min-h-[170px]"
                        >
                          <div className="my-auto">
                            <p className="font-serif font-bold text-[#1f2d1b] text-base sm:text-lg leading-tight mb-2">
                              {w.name}
                            </p>
                            <p className="font-serif italic text-[#35452e] text-sm sm:text-base leading-relaxed line-clamp-4">
                              &ldquo;{w.message}&rdquo;
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full p-5 text-center text-sm text-[#556b4f] font-serif italic min-h-[155px] flex items-center justify-center">
                        &ldquo;Selamat menempuh alam perkahwinan, semoga berkekalan hingga ke Jannah.&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                {/* Pagination Dots (Has Limit) */}
                {wishes.length > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-2.5">
                    {wishes.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsWishesPaused(true);
                          setCurrentWishIndex(idx);
                        }}
                        className={`transition-all rounded-full ${
                          currentWishIndex === idx
                            ? "w-4.5 h-1.5 bg-[#35452e]"
                            : "w-1.5 h-1.5 bg-[#35452e]/25 hover:bg-[#35452e]/50"
                        }`}
                        aria-label={`Pergi ke ucapan ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Family WhatsApp Contacts Directly on Background */}
              <div 
                data-swiper-parallax-y="-130"
                className="w-full max-w-[335px] sm:max-w-[355px] space-y-2 my-1 sm:my-2"
              >
                <p className="font-serif text-xs sm:text-sm font-bold text-[#1f2d1b] text-center">
                  Hubungi Keluarga Pengantin:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                  {weddingData.contacts.map((contact, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/${contact.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-[#35452e]/25 bg-white/70 hover:bg-white text-xs sm:text-sm transition-all shadow-xs active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#35452e] shrink-0" />
                      <div className="text-left">
                        <p className="font-serif font-bold text-[#1f2d1b] leading-tight text-xs sm:text-sm">
                          {contact.name}
                        </p>
                        <p className="text-[10px] sm:text-xs text-[#556b4f]">
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
                className="pt-1 text-center"
              >
                <p className="font-handwriting text-xl sm:text-2xl text-[#35452e]">
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
