"use client";

import { motion } from "framer-motion";
import { CalendarPlus, MapPin, Navigation, Calendar as CalendarIcon, Clock } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function EventDetailsSection() {
  const downloadIcsCalendar = () => {
    // Generate .ics calendar file content
    const startDate = "20261128T030000Z"; // 11:00 AM MYT (UTC+8) -> 03:00 UTC
    const endDate = "20261128T080000Z"; // 4:00 PM MYT (UTC+8) -> 08:00 UTC
    const summary = weddingData.event.calendarSummary;
    const description = weddingData.event.calendarDescription;
    const location = `${weddingData.event.venueName}, ${weddingData.event.address}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Walimatulurus//Wedding Invitation//MS",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Walimatulurus-Harith-Aisyah.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openGoogleCalendar = () => {
    const startDate = "20261128T030000Z";
    const endDate = "20261128T080000Z";
    const text = encodeURIComponent(weddingData.event.calendarSummary);
    const details = encodeURIComponent(weddingData.event.calendarDescription);
    const location = encodeURIComponent(`${weddingData.event.venueName}, ${weddingData.event.address}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(url, "_blank");
  };

  return (
    <section className="py-12 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8c6d32] font-semibold">
          Lokasi &amp; Tarikh
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217] mt-1">
          Maklumat Majlis
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl bg-gradient-to-b from-white to-[#fcf9f2] border-2 border-[#d4af37]/40 p-6 sm:p-10 shadow-lg text-center overflow-hidden"
      >
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#c5a059]/60 pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#c5a059]/60 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#c5a059]/60 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#c5a059]/60 pointer-events-none" />

        {/* Date block */}
        <div className="mb-6 pb-6 border-b border-[#ebdcc3]">
          <div className="w-12 h-12 rounded-full bg-[#f7efdf] text-[#8c6d32] flex items-center justify-center mx-auto mb-3">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217]">
            {weddingData.event.dateFormatted}
          </h3>
          {weddingData.event.islamicDate && (
            <p className="text-sm font-serif italic text-[#8c6d32] mt-1">
              {weddingData.event.islamicDate}
            </p>
          )}
          <p className="text-sm text-[#5d4a36] font-medium mt-2 flex items-center justify-center gap-1.5">
            <Clock className="w-4 h-4 text-[#c5a059]" />
            {weddingData.event.timeFormatted}
          </p>

          {/* Add to Calendar Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={openGoogleCalendar}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#c5a059]/60 text-xs font-semibold text-[#6f5426] hover:bg-[#faf4e8] transition-colors shadow-sm cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#c5a059]" />
              Google Calendar
            </button>
            <button
              onClick={downloadIcsCalendar}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#c5a059]/60 text-xs font-semibold text-[#6f5426] hover:bg-[#faf4e8] transition-colors shadow-sm cursor-pointer"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#c5a059]" />
              Apple / Outlook (.ics)
            </button>
          </div>
        </div>

        {/* Venue block */}
        <div className="mb-8">
          <div className="w-12 h-12 rounded-full bg-[#f7efdf] text-[#8c6d32] flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217]">
            {weddingData.event.venueName}
          </h3>
          {weddingData.event.hallName && (
            <p className="text-sm font-serif text-[#8c6d32] font-semibold mt-0.5">
              {weddingData.event.hallName}
            </p>
          )}
          <p className="text-xs sm:text-sm text-[#614f3c] mt-2 max-w-md mx-auto leading-relaxed">
            {weddingData.event.address}
          </p>
        </div>

        {/* Navigation Action Buttons (Google Maps & Waze) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
          <a
            href={weddingData.event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2d2217] text-[#f7efdf] font-medium text-xs sm:text-sm shadow-md hover:bg-[#453625] transition-all hover:scale-[1.02]"
          >
            <MapPin className="w-4 h-4 text-[#e0c487]" />
            Buka Google Maps
          </a>

          <a
            href={weddingData.event.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#33ccff] to-[#00bfff] text-white font-medium text-xs sm:text-sm shadow-md hover:opacity-95 transition-all hover:scale-[1.02]"
          >
            <Navigation className="w-4 h-4" />
            Pandu Guna Waze
          </a>
        </div>
      </motion.div>
    </section>
  );
}
