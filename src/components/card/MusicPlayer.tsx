"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { weddingData } from "@/data/weddingData";

interface MusicPlayerProps {
  autoPlayTrigger: boolean;
}

export default function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && !hasStarted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          // Browser prevented autoplay without interaction, wait for user click
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger, hasStarted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingData.audio.url}
        loop
        preload="auto"
      />

      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Expanded Info Pill (shows when playing) */}
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1b1510]/85 text-[#e6d5b0] border border-[#c5a059]/40 text-xs shadow-lg backdrop-blur-md animate-fade-in">
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-[#d4af37] rounded-full audio-bar-1" />
              <span className="w-0.5 bg-[#d4af37] rounded-full audio-bar-2" />
              <span className="w-0.5 bg-[#d4af37] rounded-full audio-bar-3" />
            </div>
            <span className="max-w-[130px] truncate text-[11px] font-medium">
              {weddingData.audio.title}
            </span>
            <button
              onClick={toggleMute}
              className="text-[#c5a059] hover:text-white transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Floating Circular Toggle Button */}
        <button
          onClick={togglePlay}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 transition-all duration-300 cursor-pointer ${
            isPlaying
              ? "bg-[#251b11] border-[#c5a059] text-[#e8d2a6] ring-4 ring-[#c5a059]/20"
              : "bg-[#f5ecda] border-[#9c793a] text-[#543d18] hover:bg-[#ebd9bd]"
          }`}
          aria-label={isPlaying ? "Pause music" : "Play wedding music"}
          title={isPlaying ? "Jeda Muzik" : "Mainkan Muzik"}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Music className="w-5 h-5 animate-spin" style={{ animationDuration: "6s" }} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#c5a059] text-[#1b1510] flex items-center justify-center text-[8px]">
                <Pause className="w-2.5 h-2.5 fill-current" />
              </div>
            </div>
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>
      </div>
    </>
  );
}
