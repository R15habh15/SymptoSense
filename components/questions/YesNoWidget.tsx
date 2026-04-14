"use client";

import { motion } from "framer-motion";

interface YesNoWidgetProps {
  selected: string[];
  onSelect: (ids: string[]) => void;
  yesLabel?: string;
  noLabel?: string;
}

export function YesNoWidget({
  selected,
  onSelect,
  yesLabel = "Yes",
  noLabel = "No",
}: YesNoWidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {[
        { id: "yes", label: yesLabel, emoji: "✅", color: "#00C9A7", bg: "rgba(0,201,167,0.12)" },
        { id: "no",  label: noLabel,  emoji: "❌", color: "#FF4757", bg: "rgba(255,71,87,0.10)" },
      ].map((opt) => {
        const isSel = selected.includes(opt.id);
        return (
          <motion.button
            key={opt.id}
            whileHover={
              !isSel
                ? {
                    scale: 1.01,
                    borderColor: opt.color,
                    boxShadow: `0 0 20px ${opt.bg}`,
                  }
                : {}
            }
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect([opt.id])}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "22px 24px",
              borderRadius: "16px",
              border: `2px solid ${isSel ? opt.color : "rgba(255,255,255,0.1)"}`,
              background: isSel ? opt.bg : "rgba(255,255,255,0.03)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              fontWeight: isSel ? 700 : 500,
              color: isSel ? opt.color : "rgba(255,255,255,0.8)",
              textAlign: "left",
              minHeight: "80px",
              transition: "all 0.15s ease",
              width: "100%",
            }}
            id={`yesno-${opt.id}`}
          >
            <span style={{ fontSize: 30 }}>{opt.emoji}</span>
            <span style={{ flex: 1 }}>{opt.label}</span>
            {isSel && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: opt.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: "#fff",
                }}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
