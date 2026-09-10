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
  ExternalLink,
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
    <div className="relative w-full max-w-[100vw] h-screen overflow-hidden bg-[#241a13] text-[#283424] select-none touch-none">
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
        {/* SLIDE 01: PINTU GERBANG UTAMA (THE GRAND ENTRANCE)                        */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          {/* Layer 1: Rustic Wood Tabletop Background */}
          <div
            data-swiper-parallax-y="-14%"
            data-swiper-parallax-scale="1.08"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/rustic_wood_flatlay.jpg')" }}
          />
          {/* Soft Dappled Ambient Shadow Overlay */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/20 pointer-events-none" />

          {/* Layer 2: Botanical Wildflower Handmade Paper Card */}
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-2 sm:py-4">
              {/* Header Script */}
              <div 
                data-swiper-parallax-y="-120"
                data-swiper-parallax-opacity="0.2"
                className="space-y-1.5"
              >
                <span className="font-handwriting text-3xl sm:text-4xl text-[#52664b] block tracking-wide">
                  &lsquo;Walimatulurus&rsquo;
                </span>
                <p className="font-serif text-[11px] sm:text-xs tracking-[0.25em] text-[#697f5f] uppercase font-semibold">
                  Sabtu • 2 Januari 2027
                </p>
              </div>

              {/* Invitation Callout */}
              <div 
                data-swiper-parallax-y="-170"
                data-swiper-parallax-opacity="0.2"
                className="my-3 sm:my-5"
              >
                <p className="font-handwriting text-2xl sm:text-3xl text-[#3d4d38] leading-tight">
                  Kindly Join Our Celebration
                </p>
                <div className="w-14 h-[1px] bg-[#52664b]/30 mx-auto mt-2" />
              </div>

              {/* Main Couple Names */}
              <div 
                data-swiper-parallax-y="-210"
                className="space-y-1 my-2"
              >
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#222d1f] font-normal tracking-tight">
                  Umar
                </h1>
                <div className="flex items-center justify-center gap-3">
                  <span className="w-8 h-[1px] bg-[#dfa528]/40" />
                  <span className="font-handwriting text-3xl sm:text-4xl text-[#dfa528]">
                    &
                  </span>
                  <span className="w-8 h-[1px] bg-[#dfa528]/40" />
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#222d1f] font-normal tracking-tight">
                  Nafisya
                </h1>
              </div>

              {/* Venue & Time Information */}
              <div 
                data-swiper-parallax-y="-160"
                data-swiper-parallax-opacity="0.3"
                className="space-y-1 mt-3"
              >
                <p className="font-serif text-base sm:text-lg text-[#2f3d2a] font-medium tracking-wide">
                  Petak Padin, Kepala Batas
                </p>
                <p className="font-sans text-[11px] sm:text-xs text-[#697f5f] tracking-wider uppercase font-medium">
                  Pulau Pinang • 11:00 AM – 4:00 PM
                </p>
              </div>

              {/* Dainty Footer Script Whisper */}
              <div 
                data-swiper-parallax-y="-110"
                className="pt-4"
              >
                <p className="font-handwriting text-xl sm:text-2xl text-[#52664b]/90">
                  We can&apos;t wait to celebrate with you!
                </p>
              </div>

              {/* Interactive Scroll Cue */}
              <div 
                data-swiper-parallax-y="-80"
                className="mt-3 flex items-center gap-1.5 text-[#697f5f] text-[10px] tracking-widest uppercase"
              >
                <span>Skrol ke bawah</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#52664b]" />
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 02: KALAM SUCI (SURAH AR-RUM: 21)                                  */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          {/* Wood Flatlay Background */}
          <div
            data-swiper-parallax-y="-14%"
            data-swiper-parallax-scale="1.08"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/rustic_wood_flatlay.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {/* Botanical Wildflower Card */}
          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-2 sm:py-4">
              {/* Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-3xl sm:text-4xl text-[#52664b] block">
                  &lsquo;Kalam Suci&rsquo;
                </span>
                <p className="font-serif text-[10px] sm:text-xs tracking-[0.2em] text-[#697f5f] uppercase font-semibold">
                  Dengan Nama Allah Yang Maha Pengasih Lagi Maha Penyayang
                </p>
              </div>

              {/* Bismillah Arabic Calligraphy */}
              <div 
                data-swiper-parallax-y="-160"
                className="my-3"
              >
                <p className="font-serif text-xl sm:text-2xl text-[#222d1f] tracking-wide leading-relaxed">
                  {weddingData.bismillahText}
                </p>
                <div className="w-12 h-[1px] bg-[#dfa528]/40 mx-auto mt-2" />
              </div>

              {/* Quranic Arabic Verse */}
              <div 
                data-swiper-parallax-y="-200"
                className="px-2 my-2"
              >
                <p className="font-serif text-lg sm:text-xl text-[#2b3926] leading-loose dir-rtl">
                  {weddingData.doa.arabic}
                </p>
              </div>

              {/* Malay Translation */}
              <div 
                data-swiper-parallax-y="-150"
                className="px-2 sm:px-4 my-2"
              >
                <p className="font-serif italic text-xs sm:text-sm text-[#44553f] leading-relaxed">
                  {weddingData.doa.translation}
                </p>
              </div>

              {/* Source Tag with Laurel Motif */}
              <div 
                data-swiper-parallax-y="-100"
                className="pt-2"
              >
                <span className="inline-block px-4 py-1 rounded-full border border-[#52664b]/30 bg-[#f4ede0]/60 font-serif text-xs text-[#52664b] font-medium tracking-wide">
                  {weddingData.doa.source}
                </span>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 03: KIRA DETIK & LOKASI (COUNTDOWN & VENUE)                          */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax-y="-14%"
            data-swiper-parallax-scale="1.08"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/rustic_wood_flatlay.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-2 sm:py-3">
              {/* Title */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-1"
              >
                <span className="font-handwriting text-3xl sm:text-4xl text-[#52664b] block">
                  &lsquo;Kira Detik Hari Bahagia&rsquo;
                </span>
                <p className="font-serif text-[10px] sm:text-xs tracking-[0.2em] text-[#697f5f] uppercase font-semibold">
                  Menghitung Detik Menuju Walimatulurus
                </p>
              </div>

              {/* 4-Box Pressed Paper Countdown Units */}
              <div 
                data-swiper-parallax-y="-180"
                className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-[340px] my-3"
              >
                {[
                  { label: "Hari", val: timeLeft.days },
                  { label: "Jam", val: timeLeft.hours },
                  { label: "Minit", val: timeLeft.minutes },
                  { label: "Saat", val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-[#f5efe4] border border-[#dfd5c2] shadow-[inset_0_1px_3px_rgba(0,0,0,0.05),0_2px_4px_rgba(0,0,0,0.04)]"
                  >
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#222d1f]">
                      {String(item.val).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-wider text-[#697f5f] font-semibold mt-0.5">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Venue Details */}
              <div 
                data-swiper-parallax-y="-160"
                className="w-full max-w-[350px] p-3 rounded-xl bg-[#f5efe4]/80 border border-[#dfd5c2] text-left space-y-1.5 my-2"
              >
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#52664b] mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#222d1f]">
                      {weddingData.event.venueName}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs text-[#52664b]">
                      {weddingData.event.hallName}
                    </p>
                    <p className="font-sans text-[10px] sm:text-[11px] text-[#697f5f] leading-tight mt-0.5">
                      {weddingData.event.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Action Buttons (Google Maps & Waze) */}
              <div 
                data-swiper-parallax-y="-130"
                className="flex items-center gap-2.5 w-full max-w-[340px]"
              >
                <a
                  href={weddingData.event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#52664b] hover:bg-[#44553f] text-white font-serif text-xs font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#e8c872]" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={weddingData.event.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#dfa528] hover:bg-[#c9911e] text-[#222d1f] font-serif text-xs font-semibold tracking-wider transition-all shadow-sm active:scale-95"
                >
                  <NavIcon className="w-3.5 h-3.5" />
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
                  className="inline-flex items-center gap-1 text-[11px] font-sans text-[#52664b] hover:text-[#222d1f] underline underline-offset-4 tracking-wide"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Tambah ke Google Calendar</span>
                </a>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 04: RAJA SEHARI & ATUR CARA (COUPLE & ITINERARY)                    */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax-y="-14%"
            data-swiper-parallax-scale="1.08"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/rustic_wood_flatlay.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-2">
              {/* Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-0.5"
              >
                <span className="font-handwriting text-3xl sm:text-4xl text-[#52664b] block">
                  &lsquo;Raja Sehari&rsquo;
                </span>
                <p className="font-serif text-[10px] sm:text-xs tracking-[0.2em] text-[#697f5f] uppercase font-semibold">
                  Mempelai & Atur Cara Majlis
                </p>
              </div>

              {/* Couple & Parents Dual Column */}
              <div 
                data-swiper-parallax-y="-180"
                className="grid grid-cols-2 gap-3 w-full my-2 text-center"
              >
                {/* Groom */}
                <div className="p-2.5 rounded-xl bg-[#f5efe4]/70 border border-[#dfd5c2]">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#222d1f]">
                    {weddingData.groom.fullName}
                  </h4>
                  <div className="w-8 h-[1px] bg-[#52664b]/30 mx-auto my-1" />
                  <p className="font-sans text-[9px] sm:text-[10px] text-[#697f5f] leading-snug">
                    Bapa: {weddingData.groom.fatherName}
                    <br />
                    Ibu: {weddingData.groom.motherName}
                  </p>
                </div>

                {/* Bride */}
                <div className="p-2.5 rounded-xl bg-[#f5efe4]/70 border border-[#dfd5c2]">
                  <h4 className="font-serif text-sm sm:text-base font-bold text-[#222d1f]">
                    {weddingData.bride.fullName}
                  </h4>
                  <div className="w-8 h-[1px] bg-[#52664b]/30 mx-auto my-1" />
                  <p className="font-sans text-[9px] sm:text-[10px] text-[#697f5f] leading-snug">
                    Bapa: {weddingData.bride.fatherName}
                    <br />
                    Ibu: {weddingData.bride.motherName}
                  </p>
                </div>
              </div>

              {/* Itinerary Vertical Timeline */}
              <div 
                data-swiper-parallax-y="-160"
                className="w-full max-w-[340px] my-1"
              >
                <p className="font-handwriting text-xl text-[#52664b] text-center mb-1.5">
                  Atur Cara Majlis
                </p>
                <div className="space-y-1.5 text-left text-[11px] sm:text-xs font-sans">
                  {weddingData.itinerary.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="font-serif font-bold text-[#52664b] w-16 shrink-0 text-right">
                        {item.time}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dfa528] mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-serif font-semibold text-[#222d1f] leading-tight">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-[10px] text-[#697f5f] leading-tight">
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
                className="pt-1"
              >
                <p className="font-serif italic text-[11px] text-[#697f5f]">
                  Semoga kehadiran para tetamu menyerikan lagi majlis kami
                </p>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 05: BORANG RSVP (FAITHFUL RECREATION OF REFERENCE IMAGE CARD)       */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax-y="-14%"
            data-swiper-parallax-scale="1.08"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/rustic_wood_flatlay.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between py-1 sm:py-2">
              {/* RSVP Top Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="text-center space-y-0.5"
              >
                <span className="font-handwriting text-4xl sm:text-5xl text-[#52664b] block tracking-wide">
                  &lsquo;RSVP&rsquo;
                </span>
                <p className="font-serif text-[11px] sm:text-xs tracking-wider text-[#697f5f]">
                  Please respond by December 1st, 2026
                </p>
                <p className="font-handwriting text-2xl text-[#3d4d38] pt-1">
                  Kindly Join Our Celebration
                </p>
              </div>

              {rsvpSubmitted ? (
                /* Success State */
                <div 
                  data-swiper-parallax-y="-150"
                  className="p-6 rounded-xl bg-[#f5efe4] border border-[#dfd5c2] text-center space-y-3 my-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#52664b]/15 text-[#52664b] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#222d1f]">
                    Terima Kasih!
                  </h3>
                  <p className="font-serif text-sm text-[#52664b] leading-relaxed">
                    Pengesahan RSVP anda telah berjaya disimpan. Kami tidak sabar untuk meraikan hari bahagia bersama anda!
                  </p>
                  <button
                    onClick={() => setRsvpSubmitted(false)}
                    className="text-xs font-sans text-[#52664b] underline tracking-wider pt-2 cursor-pointer"
                  >
                    Kemaskini Respons Lain
                  </button>
                </div>
              ) : (
                /* Form Fields styled like Reference Card */
                <form 
                  onSubmit={handleRsvpSubmit}
                  data-swiper-parallax-y="-180"
                  className="space-y-3.5 my-2 w-full max-w-[360px] mx-auto text-left"
                >
                  {/* Name(s) Underlined Input */}
                  <div className="space-y-0.5">
                    <label className="font-serif text-xs text-[#283424] font-semibold block">
                      Name(s):
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Nama penuh anda"
                      className="w-full bg-transparent border-b border-[#52664b]/40 focus:border-[#52664b] outline-none py-1 font-serif text-sm text-[#222d1f] placeholder:text-[#697f5f]/50 transition-colors"
                    />
                  </div>

                  {/* Phone Number Underlined Input */}
                  <div className="space-y-0.5">
                    <label className="font-serif text-xs text-[#283424] font-semibold block">
                      No. Telefon:
                    </label>
                    <input
                      type="tel"
                      required
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      placeholder="cth: 012-3456789"
                      className="w-full bg-transparent border-b border-[#52664b]/40 focus:border-[#52664b] outline-none py-1 font-serif text-sm text-[#222d1f] placeholder:text-[#697f5f]/50 transition-colors"
                    />
                  </div>

                  {/* Attendance Checkboxes (Joyfully Accepts / Regretfully Declines) */}
                  <div className="flex items-center justify-between pt-1 gap-2">
                    <label 
                      onClick={() => setRsvpAttending(true)}
                      className="flex items-center gap-2 cursor-pointer select-none group"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        rsvpAttending 
                          ? "border-[#52664b] bg-[#52664b] text-white" 
                          : "border-[#697f5f]/50 bg-white/60 group-hover:border-[#52664b]"
                      }`}>
                        {rsvpAttending && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-serif text-xs text-[#283424] font-medium">
                        Joyfully Accepts
                      </span>
                    </label>

                    <label 
                      onClick={() => setRsvpAttending(false)}
                      className="flex items-center gap-2 cursor-pointer select-none group"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        !rsvpAttending 
                          ? "border-[#ba7d7d] bg-[#ba7d7d] text-white" 
                          : "border-[#697f5f]/50 bg-white/60 group-hover:border-[#ba7d7d]"
                      }`}>
                        {!rsvpAttending && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="font-serif text-xs text-[#697f5f] font-medium">
                        Regretfully Declines
                      </span>
                    </label>
                  </div>

                  {/* Number Attending (Pax Selection) */}
                  {rsvpAttending && (
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-serif text-xs text-[#283424] font-semibold">
                        Number Attending:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRsvpPax(num)}
                            className={`w-7 h-7 rounded-full font-serif text-xs font-semibold transition-all cursor-pointer ${
                              rsvpPax === num
                                ? "bg-[#52664b] text-white shadow-sm"
                                : "bg-[#f5efe4] text-[#52664b] border border-[#dfd5c2] hover:bg-[#e9e1d2]"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dietary Restrictions / Wishes Underlined Input */}
                  <div className="space-y-0.5">
                    <label className="font-serif text-xs text-[#283424] font-semibold block">
                      Dietary Restrictions / Ucapan:
                    </label>
                    <input
                      type="text"
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      placeholder="Pesanan atau ucapan ringkas"
                      className="w-full bg-transparent border-b border-[#52664b]/40 focus:border-[#52664b] outline-none py-1 font-serif text-sm text-[#222d1f] placeholder:text-[#697f5f]/50 transition-colors"
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
                    className="w-full py-2.5 px-4 rounded-xl bg-[#52664b] hover:bg-[#44553f] disabled:opacity-50 text-white font-serif text-sm font-semibold tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {rsvpLoading ? (
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#e8c872]" />
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
                <p className="font-handwriting text-xl text-[#52664b]/90">
                  We can&apos;t wait to celebrate with you!
                </p>
              </div>
            </div>
          </BotanicalWildflowerFrame>
        </SwiperSlide>

        {/* ========================================================================= */}
        {/* SLIDE 06: BUKU UCAPAN & SALAM KAUT (GUESTBOOK & GIFT)                      */}
        {/* ========================================================================= */}
        <SwiperSlide className="relative w-full h-full overflow-hidden flex items-center justify-center">
          <div
            data-swiper-parallax-y="-14%"
            data-swiper-parallax-scale="1.08"
            className="slide-bg absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: "url('/images/rustic_wood_flatlay.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          <BotanicalWildflowerFrame>
            <div className="flex-1 flex flex-col justify-between items-center text-center py-2">
              {/* Header */}
              <div 
                data-swiper-parallax-y="-120"
                className="space-y-0.5"
              >
                <span className="font-handwriting text-3xl sm:text-4xl text-[#52664b] block">
                  &lsquo;Buku Ucapan & Hadiah&rsquo;
                </span>
                <p className="font-serif text-[10px] sm:text-xs tracking-[0.2em] text-[#697f5f] uppercase font-semibold">
                  Ingatan Tulus & Salam Kaut Digital
                </p>
              </div>

              {/* Guestbook Wishes Snapshot */}
              <div 
                data-swiper-parallax-y="-180"
                className="w-full max-w-[340px] my-1"
              >
                <p className="font-serif text-xs font-bold text-[#222d1f] mb-1.5 text-left flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#dfa528]" />
                  <span>Ucapan Tetamu Terkini</span>
                </p>
                <div className="space-y-1.5 max-h-24 overflow-y-auto no-scrollbar text-left">
                  {wishes.length > 0 ? (
                    wishes.slice(0, 3).map((w, idx) => (
                      <div 
                        key={idx} 
                        className="p-2 rounded-lg bg-[#f5efe4] border border-[#dfd5c2] text-[11px]"
                      >
                        <p className="font-serif font-bold text-[#222d1f] leading-tight">
                          {w.name}
                        </p>
                        <p className="font-serif italic text-[#52664b] text-[10px] line-clamp-2 mt-0.5">
                          &ldquo;{w.message}&rdquo;
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-2.5 rounded-lg bg-[#f5efe4]/80 border border-[#dfd5c2] text-center text-[11px] text-[#697f5f] font-serif italic">
                      &ldquo;Selamat menempuh alam perkahwinan, semoga berkekalan hingga ke Jannah.&rdquo;
                    </div>
                  )}
                </div>
              </div>

              {/* Digital Salam Kaut (Maybank Card with Wax Seal style) */}
              <div 
                data-swiper-parallax-y="-160"
                className="w-full max-w-[340px] p-3 rounded-xl bg-[#f5efe4] border border-[#dfd5c2] text-left relative shadow-sm my-1"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif text-xs font-bold text-[#52664b] flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#dfa528]" />
                    <span>Salam Kaut Digital (DuitNow)</span>
                  </span>
                  <span className="font-serif text-[10px] text-[#697f5f] uppercase font-bold tracking-wider">
                    {weddingData.gift.bankName}
                  </span>
                </div>
                <p className="font-serif text-xs text-[#222d1f]">
                  {weddingData.gift.accountHolder}
                </p>
                <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#dfd5c2]">
                  <span className="font-mono text-xs font-bold text-[#222d1f] tracking-wider">
                    {weddingData.gift.accountNumber}
                  </span>
                  <button
                    onClick={handleCopyBank}
                    className="flex items-center gap-1 py-1 px-2.5 rounded-md bg-[#52664b] hover:bg-[#44553f] text-white text-[10px] font-sans font-medium transition-all active:scale-95 cursor-pointer"
                  >
                    {copiedBank ? (
                      <>
                        <Check className="w-3 h-3 text-[#e8c872]" />
                        <span>Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin No. Akaun</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Family WhatsApp Contacts */}
              <div 
                data-swiper-parallax-y="-130"
                className="w-full max-w-[340px] space-y-1.5 my-1"
              >
                <p className="font-serif text-xs font-bold text-[#222d1f] text-left">
                  Hubungi Keluarga Pengantin:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {weddingData.contacts.map((contact, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/${contact.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 p-2 rounded-lg bg-[#f5efe4] border border-[#dfd5c2] hover:border-[#52664b] text-[10px] text-left transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#52664b] shrink-0" />
                      <div className="overflow-hidden">
                        <p className="font-serif font-bold text-[#222d1f] truncate leading-tight">
                          {contact.name}
                        </p>
                        <p className="text-[9px] text-[#697f5f] truncate">
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
                <p className="font-handwriting text-lg text-[#52664b]">
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
      <div className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2 py-2 px-1 rounded-full bg-[#faf7f0]/80 backdrop-blur-xs border border-[#ece4d3] shadow-sm pointer-events-auto">
        {slideTitles.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => swiperInstance?.slideTo(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center ${
              activeIndex === idx
                ? "w-2.5 h-6 bg-[#52664b] shadow-sm ring-1 ring-[#dfa528]"
                : "w-2 h-2 bg-[#52664b]/30 hover:bg-[#52664b]/80"
            }`}
            aria-label={`Pergi ke slaid ${slide.name}`}
            title={slide.name}
          />
        ))}
      </div>

      {/* Slide Index Badge (Top Right) */}
      <div className="fixed top-4 right-4 z-40 px-2.5 py-1 rounded-full bg-[#faf7f0]/85 border border-[#ece4d3] shadow-sm font-serif text-[11px] text-[#52664b] font-bold tracking-wider">
        {slideTitles[activeIndex]?.num} / 06
      </div>

      {/* Floating Vertical Navigation Arrows */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5">
        <button
          onClick={() => swiperInstance?.slidePrev()}
          disabled={activeIndex === 0}
          className="p-2 rounded-full bg-[#faf7f0]/85 hover:bg-[#faf7f0] border border-[#ece4d3] text-[#52664b] disabled:opacity-20 shadow-sm transition-all cursor-pointer"
          aria-label="Slaid Sebelumnya"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => swiperInstance?.slideNext()}
          disabled={activeIndex === slideTitles.length - 1}
          className="p-2 rounded-full bg-[#faf7f0]/85 hover:bg-[#faf7f0] border border-[#ece4d3] text-[#52664b] disabled:opacity-20 shadow-sm transition-all cursor-pointer"
          aria-label="Slaid Seterusnya"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
