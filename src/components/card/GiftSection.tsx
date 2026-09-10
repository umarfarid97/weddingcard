"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { weddingData } from "@/data/weddingData";

export default function GiftSection() {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(weddingData.gift.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 px-4 max-w-xl mx-auto text-center">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8c6d32] font-semibold">
          Tanda Ingatan
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217] mt-1">
          Salam Kerbau / Hadiah
        </h2>
        <div className="w-16 h-0.5 bg-[#c5a059] mx-auto mt-3 opacity-60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-gradient-to-b from-white to-[#fbf8f0] border border-[#dfc285]/70 p-6 sm:p-8 shadow-md"
      >
        <div className="w-12 h-12 rounded-full bg-[#f6eee0] text-[#8c6d32] flex items-center justify-center mx-auto mb-3">
          <Gift className="w-6 h-6" />
        </div>

        <p className="text-xs sm:text-sm text-[#5a4834] leading-relaxed max-w-md mx-auto mb-6">
          Kehadiran dan doa restu anda adalah hadiah terindah buat kami. Namun jika anda ingin menitipkan tanda ingatan, ingatan tulus anda boleh disalurkan melalui:
        </p>

        {/* Bank Card */}
        <div className="p-5 rounded-2xl bg-[#281e14] text-[#f5ebd9] border border-[#c5a059]/40 text-left max-w-sm mx-auto shadow-lg relative overflow-hidden">
          {/* Subtle gold emblem */}
          <div className="absolute top-3 right-3 text-[#c5a059]/30 text-xs font-serif">✦ ✦</div>

          <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium">
            Bank Akaun
          </p>
          <h4 className="font-serif text-lg font-bold text-white mt-0.5">
            {weddingData.gift.bankName}
          </h4>

          <div className="mt-4">
            <p className="text-[11px] text-[#b8a58e]">Nama Pemegang Akaun</p>
            <p className="text-xs font-serif font-semibold text-[#f5ebd9] mt-0.5">
              {weddingData.gift.accountHolder}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-[#4a3a28] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#b8a58e]">Nombor Akaun</p>
              <p className="font-mono text-sm sm:text-base font-bold text-[#e8c878] tracking-wider">
                {weddingData.gift.accountNumber}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c5a059] text-[#1b1510] text-xs font-bold hover:bg-[#dfc285] transition-colors shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Disalin
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Salin
                </>
              )}
            </button>
          </div>
        </div>

        {/* DuitNow QR Toggle */}
        <div className="mt-6">
          <button
            onClick={() => setShowQr(!showQr)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8c6d32] hover:text-[#5e4120] transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            {showQr ? "Sembunyikan DuitNow QR" : "Papar DuitNow QR"}
          </button>

          {showQr && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 rounded-2xl bg-white border border-[#dfc285]/60 inline-block shadow-sm"
            >
              <div className="bg-white p-2 rounded-xl">
                <QRCodeSVG
                  value={weddingData.gift.qrValue || weddingData.gift.accountNumber}
                  size={180}
                  level="H"
                  includeMargin={true}
                  fgColor="#1b1510"
                />
              </div>
              <p className="text-[10px] text-[#8c6d32] font-semibold mt-2 uppercase tracking-wider">
                Imbas untuk bayar / transfer
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
