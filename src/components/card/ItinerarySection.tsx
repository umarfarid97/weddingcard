"use client";

import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { weddingData } from "@/data/weddingData";

export default function ItinerarySection() {
  return (
    <section className="py-12 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8c6d32] font-semibold">
          Jadual Acara
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d2217] mt-1">
          Atur Cara Majlis
        </h2>
        <div className="w-16 h-0.5 bg-[#c5a059] mx-auto mt-3 opacity-60" />
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#dfc285]/60 ml-4 sm:ml-8 space-y-8">
        {weddingData.itinerary.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#fbf9f5] border-2 border-[#c5a059] flex items-center justify-center text-[#8c6d32] shadow-sm group-hover:bg-[#c5a059] group-hover:text-white transition-colors">
              <Sparkles className="w-3 h-3" />
            </div>

            {/* Content card */}
            <div className="rounded-2xl bg-white/75 border border-[#e8dac0] p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8f1e3] text-[#714e25] text-xs font-semibold">
                <Clock className="w-3 h-3 text-[#c5a059]" />
                {item.time}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2d2217] mt-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-xs sm:text-sm text-[#6c5943] mt-1 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
