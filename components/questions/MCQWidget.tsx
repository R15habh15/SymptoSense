"use client";

import { motion } from "framer-motion";
import type { QuestionOption } from "@/lib/questionTree";

interface MCQWidgetProps {
  options: QuestionOption[];
  selected: string[];
  onSelect: (ids: string[]) => void;
  multiSelect?: boolean;
}

export function MCQWidget({ options, selected, onSelect, multiSelect }: MCQWidgetProps) {
  const toggle = (id: string) => {
    if (multiSelect) {
      if (selected.includes(id)) {
        onSelect(selected.filter((s) => s !== id));
      } else {
        onSelect([...selected, id]);
      }
    } else {
      onSelect([id]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      {options.map((opt, i) => {
        const isSel = selected.includes(opt.id);
        const isRF = opt.redFlag;

        return (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={
              !isSel
                ? {
                    y: -2,
                    boxShadow: isRF
                      ? "0 8px 24px rgba(255,71,87,0.25)"
                      : "0 8px 24px rgba(0,201,167,0.2)",
                    borderColor: isRF ? "#FF4757" : "#00C9A7",
                  }
                : {}
            }
            whileTap={{ scale: 0.96 }}
            onClick={() => toggle(opt.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "13px 20px",
              borderRadius: "14px",
              border: `1.5px solid ${
                isSel
                  ? isRF
                    ? "#FF4757"
                    : "#00C9A7"
                  : "rgba(255,255,255,0.1)"
              }`,
              background: isSel
                ? isRF
                  ? "rgba(255,71,87,0.15)"
                  : "rgba(0,201,167,0.12)"
                : "rgba(255,255,255,0.03)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: isSel ? 600 : 500,
              color: isSel ? (isRF ? "#FF4757" : "#00C9A7") : "rgba(255,255,255,0.8)",
              transition: "border-color 0.15s, background 0.15s, color 0.15s",
              minHeight: "48px",
              textAlign: "left",
            }}
            id={`mcq-option-${opt.id}`}
          >
            {opt.emoji && (
              <span style={{ fontSize: 20, flexShrink: 0 }}>{opt.emoji}</span>
            )}
            <span>{opt.label}</span>
            {isRF && !isSel && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 10,
                  color: "#FF4757",
                  background: "rgba(255,71,87,0.12)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontWeight: 700,
                }}
              >
                ⚠️ URGENT
              </span>
            )}
            {isSel && (
              <span style={{ marginLeft: "auto", fontSize: 16 }}>
                {isRF ? "🚨" : "✓"}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
