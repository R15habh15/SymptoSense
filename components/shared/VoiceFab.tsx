"use client";

import { useState } from "react";
import { Mic, MicOff, X } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceFabProps {
  onTranscript?: (text: string) => void;
}

export function VoiceFab({ onTranscript }: VoiceFabProps) {
  const { state, transcript, startListening, stopListening, isSupported } = useSpeech();
  const [dismissed, setDismissed] = useState(false);

  if (!isSupported || dismissed) return null;

  const isListening = state === "listening";

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // When transcript is ready, pass it up
  if (transcript && onTranscript) {
    onTranscript(transcript);
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "90px",
        right: "24px",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "12px",
      }}
    >
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            style={{
              background: "#0F1829",
              border: "1px solid rgba(0,201,167,0.3)",
              borderRadius: "12px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              maxWidth: "200px",
            }}
          >
            {/* Waveform bars */}
            <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
              {[1, 0.4, 0.7, 0.25, 0.9, 0.5, 0.8].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [h, 1, h * 0.5, 1, h] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                  style={{
                    width: 3,
                    height: 16,
                    background: "#00C9A7",
                    borderRadius: 2,
                    transformOrigin: "center",
                  }}
                />
              ))}
            </div>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Listening…</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: isListening
            ? "linear-gradient(135deg,#FF4757,#E63946)"
            : "linear-gradient(135deg,#00C9A7,#00A88A)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isListening
            ? "0 0 30px rgba(255,71,87,0.4)"
            : "0 0 30px rgba(0,201,167,0.3)",
        }}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
      >
        {isListening ? <MicOff size={22} color="#fff" /> : <Mic size={22} color="#fff" />}
      </motion.button>
    </div>
  );
}
