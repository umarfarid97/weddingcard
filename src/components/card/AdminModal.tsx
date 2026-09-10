"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Users, CheckCircle, XCircle, Shield } from "lucide-react";
import { RSVPRecord } from "@/lib/storage";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [stats, setStats] = useState({
    totalResponses: 0,
    attendingCount: 0,
    declinedCount: 0,
    totalAttendingPax: 0,
  });
  const [loading, setLoading] = useState(false);
  const [pinError, setPinError] = useState(false);

  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp");
      const json = await res.json();
      if (json.success) {
        setRsvps(json.data || []);
        setStats(json.stats);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchRsvps();
    }
  }, [isOpen, isAuthenticated]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passcode is 1234 or empty for easy couple access
    if (pin === "1234" || pin === "") {
      setIsAuthenticated(true);
      setPinError(false);
      fetchRsvps();
    } else {
      setPinError(true);
    }
  };

  const downloadCsv = () => {
    if (rsvps.length === 0) return;

    const headers = ["Nama", "Telefon", "Kehadiran", "Pax", "Dietary / Nota", "Tarikh Daftar"];
    const rows = rsvps.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      r.attending ? "Hadir" : "Tidak Hadir",
      r.pax,
      `"${(r.dietary || "").replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleString("ms-MY"),
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Senarai-Tetamu-RSVP-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-2xl max-h-[88vh] rounded-3xl bg-white border border-[#dfc285] p-6 shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#ebdcc3]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#f8f1e3] text-[#8c6d32] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2d2217]">
                  Pengurusan Tetamu & RSVP
                </h3>
                <p className="text-[11px] text-[#8c6d32]">
                  Ringkasan kehadiran & muat turun senarai katering
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f5ecda] text-[#523d1e] hover:bg-[#ebd8bd] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* Simple Pin Protection */
            <div className="py-12 px-4 text-center max-w-xs mx-auto">
              <p className="text-xs text-[#6e5941] mb-4">
                Sila masukkan kod keselamatan (lalai: <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">1234</code>):
              </p>
              <form onSubmit={handlePinSubmit} className="space-y-3">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN: 1234"
                  className="w-full text-center px-4 py-2 rounded-xl border border-[#d9caa9] text-base text-[16px] tracking-widest focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                />
                {pinError && <p className="text-[11px] text-red-600">PIN salah. Cuba lagi.</p>}
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-xl bg-[#c5a059] text-white text-xs font-semibold hover:bg-[#a67d32] cursor-pointer"
                >
                  Buka Senarai
                </button>
              </form>
            </div>
          ) : (
            /* Dashboard View */
            <div className="flex-1 overflow-y-auto pt-4 space-y-5">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-[#fcf9f2] border border-[#ebdcc3] text-center">
                  <p className="text-[10px] uppercase font-bold text-[#8c6d32]">Jumlah Respon</p>
                  <p className="text-2xl font-serif font-bold text-[#2d2217] mt-0.5">
                    {stats.totalResponses}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-[#f0f9f1] border border-[#c8e6c9] text-center">
                  <p className="text-[10px] uppercase font-bold text-[#2e7d32]">Hadir (Pax)</p>
                  <p className="text-2xl font-serif font-bold text-[#1b5e20] mt-0.5">
                    {stats.totalAttendingPax}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-[#edf7ed] border border-[#c8e6c9] text-center">
                  <p className="text-[10px] uppercase font-bold text-[#2e7d32]">Respon Hadir</p>
                  <p className="text-2xl font-serif font-bold text-[#2e7d32] mt-0.5">
                    {stats.attendingCount}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-[#faf5f5] border border-[#f5c6cb] text-center">
                  <p className="text-[10px] uppercase font-bold text-[#c0392b]">Tidak Hadir</p>
                  <p className="text-2xl font-serif font-bold text-[#962d22] mt-0.5">
                    {stats.declinedCount}
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-[#5c4a35] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                  Senarai Tetamu ({rsvps.length})
                </span>
                <button
                  onClick={downloadCsv}
                  disabled={rsvps.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2d2217] text-[#f7efdf] text-xs font-semibold hover:bg-[#4a3a28] transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Eksport CSV / Excel
                </button>
              </div>

              {/* Table */}
              <div className="border border-[#ebdcc3] rounded-2xl overflow-hidden">
                {loading ? (
                  <div className="p-8 text-center text-xs text-[#8c6d32]">Memuatkan rekod...</div>
                ) : rsvps.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#8c6d32]">
                    Belum ada tetamu yang menghantar RSVP.
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#f8f1e3] text-[#543e21] sticky top-0 font-serif font-semibold">
                        <tr>
                          <th className="p-2.5">Nama</th>
                          <th className="p-2.5">Telefon</th>
                          <th className="p-2.5 text-center">Status</th>
                          <th className="p-2.5 text-center">Pax</th>
                          <th className="p-2.5">Catatan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f2e7d5]">
                        {rsvps.map((rsvp) => (
                          <tr key={rsvp.id} className="hover:bg-[#faf6ee]">
                            <td className="p-2.5 font-medium text-[#2d2217]">{rsvp.name}</td>
                            <td className="p-2.5 text-[#735e45]">{rsvp.phone}</td>
                            <td className="p-2.5 text-center">
                              {rsvp.attending ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  <CheckCircle className="w-3 h-3" /> Hadir
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                                  <XCircle className="w-3 h-3" /> Maaf
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-center font-bold text-[#2d2217]">
                              {rsvp.attending ? rsvp.pax : 0}
                            </td>
                            <td className="p-2.5 text-[#735e45] italic max-w-[150px] truncate">
                              {rsvp.dietary || rsvp.message || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
