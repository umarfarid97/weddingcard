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

      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2">
        {/* Floating Circular Toggle Button */}
        <button
          onClick={togglePlay}
          className={`relative w-11 h-11 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-300 cursor-pointer ${
            isPlaying
              ? "bg-[#52664b] border-[#dfa528] text-white ring-2 ring-[#dfa528]/30"
              : "bg-[#faf7f0] border-[#52664b]/40 text-[#52664b] hover:bg-[#f5efe4]"
          }`}
          aria-label={isPlaying ? "Pause music" : "Play wedding music"}
          title={isPlaying ? "Jeda Muzik" : "Mainkan Muzik"}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Music className="w-4 h-4 animate-spin" style={{ animationDuration: "6s" }} />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#dfa528] text-[#222d1f] flex items-center justify-center text-[7px]">
                <Pause className="w-2 h-2 fill-current" />
              </div>
            </div>
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        {/* Expanded Info Pill (shows when playing) */}
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#faf7f0]/90 text-[#283424] border border-[#ece4d3] text-xs shadow-md backdrop-blur-sm animate-fade-in">
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-[#dfa528] rounded-full audio-bar-1" />
              <span className="w-0.5 bg-[#dfa528] rounded-full audio-bar-2" />
              <span className="w-0.5 bg-[#dfa528] rounded-full audio-bar-3" />
            </div>
            <span className="max-w-[130px] truncate text-[11px] font-medium font-serif">
              {weddingData.audio.title}
            </span>
            <button
              onClick={toggleMute}
              className="text-[#52664b] hover:text-[#222d1f] transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
