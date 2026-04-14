"use client";

import { motion } from "framer-motion";
import type { Urgency } from "@/lib/scoring";

interface UrgencyBannerProps {
  urgency: Urgency;
  score: number;
  recommendation: string;
}

const urgencyConfig = {
  Low: {
    color: "#2ED573",
    bg: "linear-gradient(135deg, rgba(46,213,115,0.2), rgba(46,213,115,0.08))",
    border: "rgba(46,213,115,0.3)",
    label: "LOW RISK",
    emoji: "✅",
    subtext: "Your symptoms appear manageable",
  },
  Medium: {
    color: "#FFA502",
    bg: "linear-gradient(135deg, rgba(255,165,2,0.2), rgba(255,165,2,0.08))",
    border: "rgba(255,165,2,0.3)",
    label: "MEDIUM RISK",
    emoji: "⚠️",
    subtext: "Medical attention recommended within 24 hours",
  },
  High: {
    color: "#FF4757",
    bg: "linear-gradient(135deg, rgba(255,71,87,0.25), rgba(255,71,87,0.1))",
    border: "rgba(255,71,87,0.4)",
    label: "HIGH RISK",
    emoji: "🚨",
    subtext: "Seek immediate medical evaluation",
  },
};

export function UrgencyBanner({ urgency, score, recommendation }: UrgencyBannerProps) {
  const cfg = urgencyConfig[urgency];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "20px",
        padding: "28px 32px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      {/* Emoji + label */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: 44 }}>{cfg.emoji}</span>
        <div>
          <div
            style={{
              fontSize: "clamp(22px, 5vw, 32px)",
              fontWeight: 900,
              color: cfg.color,
              letterSpacing: "-0.5px",
            }}
          >
            {cfg.label}
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
            {cfg.subtext}
          </div>
        </div>
      </div>

      {/* Score pill */}
      <div style={{ marginLeft: "auto" }}>
        <div
          style={{
            background: cfg.color,
            borderRadius: "16px",
            padding: "10px 20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>
            {score}
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
            / 100
          </div>
        </div>
      </div>

      {/* Recommendation */}
      {recommendation && (
        <div
          style={{
            width: "100%",
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            borderTop: `1px solid ${cfg.border}`,
            paddingTop: 16,
            lineHeight: 1.6,
          }}
        >
          {recommendation}
        </div>
      )}
    </motion.div>
  );
}
