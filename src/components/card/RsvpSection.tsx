"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Users, Heart, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { submitRSVP } from "@/lib/guestService";

interface RsvpSectionProps {
  onWishAdded?: () => void;
}

export default function RsvpSection({ onWishAdded }: RsvpSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState(true);
  const [pax, setPax] = useState(2);
  const [dietary, setDietary] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Sila masukkan nama anda");
      return;
    }
    if (!phone.trim()) {
      setError("Sila masukkan nombor telefon anda");
      return;
    }

    setLoading(true);
    try {
      await submitRSVP({
        name: name.trim(),
        phone: phone.trim(),
        attending,
        pax: attending ? pax : 0,
        dietary: dietary.trim() || undefined,
        message: message.trim() || undefined,
      });

      setSubmitted(true);
      if (onWishAdded && message.trim()) {
        onWishAdded();
      }

      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#c5a059", "#2e7d32", "#ffffff", "#f6efdb"],
        });
      } catch {
        // fallback
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Ralat tidak dijangka";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 max-w-xl mx-auto" id="rsvp">
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8c6d32] font-semibold">
          Pengesahan Kehadiran
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217] mt-1">
          RSVP Kehadiran
        </h2>
        <p className="text-xs sm:text-sm text-[#6f5b45] mt-1">
          Sila sahkan kehadiran anda selewat-lewatnya sebelum 15 November 2026
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-white border border-[#dfc285]/70 p-6 sm:p-8 shadow-xl relative"
      >
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#edf7ed] text-[#2e7d32] flex items-center justify-center mx-auto mb-4 border border-[#c8e6c9]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2d2217]">
              Terima Kasih, {name}!
            </h3>
            <p className="text-sm text-[#614f3c] mt-2 max-w-sm mx-auto leading-relaxed">
              {attending
                ? `Maklum balas kehadiran anda (${pax} orang) telah berjaya direkodkan. Kami amat berbesar hati menantikan kehadiran anda!`
                : "Terima kasih atas maklum balas anda. Doa dan ingatan tulus ikhlas anda amat kami hargai."}
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setPhone("");
                setMessage("");
              }}
              className="mt-6 text-xs text-[#8c6d32] hover:text-[#5e4120] underline font-medium cursor-pointer"
            >
              Hantar RSVP untuk tetamu lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Attendance Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#54412c] mb-2">
                Status Kehadiran *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    attending
                      ? "bg-[#1b382b] text-white border-[#1b382b] shadow-md"
                      : "bg-[#fbf9f5] text-[#5e4c37] border-[#e2d5c0] hover:bg-[#f6eee0]"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    !attending
                      ? "bg-[#66533c] text-white border-[#66533c] shadow-md"
                      : "bg-[#fbf9f5] text-[#5e4c37] border-[#e2d5c0] hover:bg-[#f6eee0]"
                  }`}
                >
                  Tidak Hadir
                </button>
              </div>
            </div>

            {/* Guest Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#54412c] mb-1.5">
                Nama Penuh *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Encik Ahmad &amp; Puan Sarah"
                className="w-full px-4 py-2.5 rounded-xl border border-[#d9caa9] bg-[#fdfcf9] text-sm text-[#2d2217] placeholder:text-[#ab9880] focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#54412c] mb-1.5">
                Nombor Telefon / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 012-3456789"
                className="w-full px-4 py-2.5 rounded-xl border border-[#d9caa9] bg-[#fdfcf9] text-sm text-[#2d2217] placeholder:text-[#ab9880] focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
              />
            </div>

            {/* Number of Pax */}
            {attending && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#54412c] mb-2 flex items-center justify-between">
                  <span>Bilangan Hadir (Pax) *</span>
                  <span className="text-[11px] text-[#8c6d32] font-normal flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Termasuk pasangan / anak
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPax(num)}
                      className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                        pax === num
                          ? "bg-[#c5a059] text-white border-[#c5a059] shadow-sm scale-105"
                          : "bg-white text-[#54412c] border-[#e2d5c0] hover:bg-[#f6eee0]"
                      }`}
                    >
                      {num} {num === 5 ? "+" : ""}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dietary */}
            {attending && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#54412c] mb-1.5">
                  Catatan Diet / Khas (Pilihan)
                </label>
                <input
                  type="text"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  placeholder="Contoh: Vegetarian, Alahan makanan laut, dll."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#d9caa9] bg-[#fdfcf9] text-sm text-[#2d2217] placeholder:text-[#ab9880] focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
              </div>
            )}

            {/* Wishes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#54412c] mb-1.5 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#c5a059]" />
                Ucapan &amp; Doa Buat Pengantin
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Titipkan doa &amp; ucapan manis buat mempelai..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#d9caa9] bg-[#fdfcf9] text-sm text-[#2d2217] placeholder:text-[#ab9880] focus:outline-none focus:ring-2 focus:ring-[#c5a059] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#996515] via-[#c5a059] to-[#8c6d32] text-white font-serif font-bold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl hover:brightness-105 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Hantar Pengesahan Kehadiran
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
