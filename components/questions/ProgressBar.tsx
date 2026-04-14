"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  percent: number;
  questionNumber: number;
  total: number;
}

export function ProgressBar({ percent, questionNumber, total }: ProgressBarProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
      {/* Bar */}
      <div
        style={{
          flex: 1,
          height: 5,
          background: "rgba(255,255,255,0.08)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, percent)}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #00C9A7, #0096FF)",
            borderRadius: "999px",
            boxShadow: "0 0 12px rgba(0,201,167,0.4)",
          }}
        />
      </div>
      {/* Counter */}
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "rgba(255,255,255,0.4)",
          whiteSpace: "nowrap",
          minWidth: 60,
        }}
      >
        Q {questionNumber} of ~{total}
      </span>
    </div>
  );
}
