"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function ContactsSection() {
  return (
    <section className="py-12 px-4 max-w-xl mx-auto text-center">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8c6d32] font-semibold">
          Hubungi Kami
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217] mt-1">
          Pertanyaan &amp; Bantuan
        </h2>
        <p className="text-xs text-[#6e5941] mt-1">
          Sebarang pertanyaan lanjut boleh hubungi pihak keluarga pengantin
        </p>
        <div className="w-16 h-0.5 bg-[#c5a059] mx-auto mt-3 opacity-60" />
      </div>

      <div className="space-y-3">
        {weddingData.contacts.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/80 border border-[#e5d5b8] shadow-xs"
          >
            <div className="text-left">
              <h4 className="font-serif font-bold text-sm text-[#2d2217]">
                {contact.name}
              </h4>
              <p className="text-[11px] text-[#8c6d32] font-medium">
                {contact.relation}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${contact.phone}?text=Salam,%20saya%20ingin%20bertanya%20mengenai%20Majlis%20Perkahwinan%20${encodeURIComponent(
                  weddingData.groom.name + " & " + weddingData.bride.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25d366]/15 text-[#128c7e] hover:bg-[#25d366] hover:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label={`WhatsApp ${contact.name}`}
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Call Button */}
              <a
                href={`tel:+${contact.phone}`}
                className="w-9 h-9 rounded-full bg-[#c5a059]/15 text-[#8c6d32] hover:bg-[#c5a059] hover:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label={`Call ${contact.name}`}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
