"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Analyzing your responses…",
  "Cross-referencing symptom patterns…",
  "Computing risk factors…",
  "Evaluating medical context…",
  "Building your health report…",
  "Almost there…",
];

export function LoadingOverlay() {
  const [messageIdx, setMessageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIdx((i) => (i + 1) % MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#070D1A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* EKG SVG animation */}
      <div style={{ marginBottom: 48, width: 280, height: 80 }}>
        <svg
          viewBox="0 0 280 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* EKG path */}
          <path
            d="M0,40 L40,40 L55,40 L65,10 L75,70 L85,40 L100,40 L110,40 L120,40 L130,40 L140,40 L150,40 L160,40 L175,10 L185,70 L195,40 L220,40 L280,40"
            stroke="#00C9A7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            style={{
              strokeDasharray: 800,
              strokeDashoffset: 800,
              animation: "ekgDraw 2s ease-in-out infinite",
            }}
          />

          {/* Moving pulse dot */}
          <circle r="5" fill="#00C9A7" opacity="0.9" filter="url(#glow)">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path="M0,40 L40,40 L55,40 L65,10 L75,70 L85,40 L100,40 L110,40 L120,40 L130,40 L140,40 L150,40 L160,40 L175,10 L185,70 L195,40 L220,40 L280,40"
            />
          </circle>
        </svg>
      </div>

      {/* Rotating message */}
      <div style={{ height: 32, position: "relative", overflow: "hidden", width: "100%", maxWidth: 400 }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {MESSAGES[messageIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Loading dots */}
      <div style={{ display: "flex", gap: "8px", marginTop: 24 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00C9A7",
            }}
          />
        ))}
      </div>

      {/* Subtext */}
      <p
        style={{
          marginTop: 20,
          fontSize: 13,
          color: "rgba(255,255,255,0.25)",
          textAlign: "center",
        }}
      >
        Our algorithm is reviewing your symptom profile
      </p>
    </div>
  );
}
