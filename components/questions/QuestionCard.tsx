"use client";

import { motion } from "framer-motion";

interface QuestionCardProps {
  text: string;
  subtext?: string;
  category?: string;
  children: React.ReactNode;
}

const categoryIcons: Record<string, string> = {
  cardiac: "❤️",
  respiratory: "🫁",
  neurological: "🧠",
  infection: "🦠",
  gastrointestinal: "🫁",
  dermatological: "🩹",
  mental_health: "🧘",
  general: "💊",
  triage: "🏥",
};

export function QuestionCard({ text, subtext, category, children }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      style={{
        width: "100%",
        maxWidth: "680px",
        margin: "0 auto",
      }}
    >
      {/* Category pill */}
      {category && (
        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: "999px",
              background: "rgba(0,201,167,0.10)",
              border: "1px solid rgba(0,201,167,0.2)",
              fontSize: 12,
              fontWeight: 600,
              color: "#00C9A7",
              textTransform: "capitalize",
            }}
          >
            {categoryIcons[category] ?? "💊"}{" "}
            {category.replace(/_/g, " ")}
          </span>
        </div>
      )}

      {/* Question text */}
      <h2
        style={{
          fontSize: "clamp(20px, 4vw, 28px)",
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-0.5px",
          lineHeight: 1.3,
          marginBottom: subtext ? 10 : 28,
        }}
      >
        {text}
      </h2>

      {subtext && (
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 28,
            lineHeight: 1.6,
          }}
        >
          {subtext}
        </p>
      )}

      {/* Widget area */}
      {children}
    </motion.div>
  );
}
