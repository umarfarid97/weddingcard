"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareHeart, Send, Heart, Sparkles } from "lucide-react";
import { WishRecord, getWishes, submitWish } from "@/lib/guestService";

interface WishesBoardProps {
  refreshTrigger?: number;
}

export default function WishesBoard({ refreshTrigger }: WishesBoardProps) {
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const fetchWishes = () => {
    try {
      const data = getWishes();
      setWishes(data);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchWishes();
  }, [refreshTrigger]);

  const handlePostWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    try {
      submitWish(name.trim(), message.trim());
      setName("");
      setMessage("");
      setShowInput(false);
      fetchWishes();
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8c6d32] font-semibold">
          Koleksi Ucapan
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217] mt-1">
          Buku Tamu &amp; Ucapan Doa
        </h2>
        <div className="w-16 h-0.5 bg-[#c5a059] mx-auto mt-3 opacity-60" />
      </div>

      {/* Button to toggle post wish form */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowInput(!showInput)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f6eee0] border border-[#c5a059]/60 text-xs sm:text-sm font-semibold text-[#543f21] hover:bg-[#eedfc9] transition-all shadow-sm cursor-pointer"
        >
          <MessageSquareHeart className="w-4 h-4 text-[#c5a059]" />
          {showInput ? "Tutup Ruangan Ucapan" : "Kirimkan Ucapan Anda"}
        </button>
      </div>

      {/* Slide-down quick wish form */}
      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <form
              onSubmit={handlePostWish}
              className="p-5 rounded-2xl bg-white border border-[#dfc285]/70 shadow-md space-y-3"
            >
              <div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama anda..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#d9caa9] bg-[#fdfcf9] text-xs sm:text-sm text-[#2d2217] placeholder:text-[#ab9880] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Titipkan bait-bait doa dan ucapan tahniah..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#d9caa9] bg-[#fdfcf9] text-xs sm:text-sm text-[#2d2217] placeholder:text-[#ab9880] focus:outline-none focus:ring-1 focus:ring-[#c5a059] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 rounded-xl bg-[#c5a059] text-white text-xs font-semibold hover:bg-[#ab8438] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {loading ? "Menghantar..." : <><Send className="w-3.5 h-3.5" /> Hantar Ucapan</>}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishes list stream */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {wishes.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#8c7458]">
            Jadilah yang pertama menitipkan ucapan doa!
          </div>
        ) : (
          wishes.map((wish, index) => (
            <motion.div
              key={wish.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-2xl bg-white/85 border border-[#e8dac0] shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-serif font-bold text-sm text-[#2d2217] flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-[#c5a059] fill-[#c5a059]" />
                  {wish.name}
                </span>
                <span className="text-[10px] text-[#9c846b] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#c5a059]" />
                  Tetamu
                </span>
              </div>
              <p className="text-xs text-[#52412e] leading-relaxed font-serif italic pl-4 border-l-2 border-[#dfc285]/50">
                &ldquo;{wish.message}&rdquo;
              </p>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
