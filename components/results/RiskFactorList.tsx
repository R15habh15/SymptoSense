"use client";

import { motion } from "framer-motion";
import type { Factor } from "@/lib/scoring";

interface RiskFactorListProps {
  factors: Factor[];
}

export function RiskFactorList({ factors }: RiskFactorListProps) {
  const top = factors.slice(0, 8);

  return (
    <div
      style={{
        background: "#0F1829",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "24px",
      }}
    >
      <h3
        style={{
          fontSize: 17,
          fontWeight: 800,
          color: "#fff",
          marginBottom: 18,
          letterSpacing: "-0.3px",
        }}
      >
        Contributing Factors
      </h3>

      {top.length === 0 ? (
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>No factors recorded.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {top.map((factor, i) => (
            <motion.div
              key={factor.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "12px",
                border: `1px solid ${factor.isRedFlag ? "rgba(255,71,87,0.2)" : "rgba(255,255,255,0.05)"}`,
              }}
            >
              {/* Red flag dot */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: factor.isRedFlag ? "#FF4757" : "rgba(255,255,255,0.12)",
                  flexShrink: 0,
                }}
              />

              {/* Label */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: factor.isRedFlag ? "#FF4757" : "rgba(255,255,255,0.85)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {factor.label}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2, textTransform: "capitalize" }}>
                  {factor.category?.replace(/_/g, " ")}
                </div>
              </div>

              {/* Score chip */}
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  background: factor.isRedFlag
                    ? "rgba(255,71,87,0.15)"
                    : factor.score >= 20
                    ? "rgba(255,165,2,0.12)"
                    : "rgba(0,201,167,0.10)",
                  color: factor.isRedFlag
                    ? "#FF4757"
                    : factor.score >= 20
                    ? "#FFA502"
                    : "#00C9A7",
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                +{factor.score} pts
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
