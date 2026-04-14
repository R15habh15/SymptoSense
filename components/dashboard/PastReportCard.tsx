"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Clock, User } from "lucide-react";
import type { PastSession } from "@/hooks/useTestSession";

interface PastReportCardProps {
  session: PastSession;
}

const urgencyColors = {
  Low:    { bg: "rgba(46,213,115,0.1)",  border: "#2ED573", text: "#2ED573" },
  Medium: { bg: "rgba(255,165,2,0.1)",   border: "#FFA502", text: "#FFA502" },
  High:   { bg: "rgba(255,71,87,0.1)",   border: "#FF4757", text: "#FF4757" },
};

export function PastReportCard({ session }: PastReportCardProps) {
  const colors = urgencyColors[session.urgency as keyof typeof urgencyColors] || urgencyColors.Low;
  const date = new Date(session.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Link
      href={`/test/${session.sessionId}/results`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <motion.div
        whileTap={{ scale: 0.98 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "16px",
          background: "rgba(15,24,41,0.6)",
          borderRadius: "16px",
          cursor: "pointer",
          border: "1px solid rgba(255,255,255,0.06)",
          borderLeft: `4px solid ${colors.border}`,
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background Subtle Gradient */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "40%",
          background: `linear-gradient(90deg, transparent, ${colors.border}05)`,
          pointerEvents: "none"
        }} />

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            <User size={12} color="rgba(255,255,255,0.3)" />
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {session.personName}
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Clock size={11} color="rgba(255,255,255,0.2)" />
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{date}</div>
          </div>
        </div>

        {/* Badge & Action */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: "8px",
              background: colors.bg,
              border: `1px solid ${colors.border}40`,
              fontSize: 10,
              fontWeight: 800,
              color: colors.text,
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
            }}
          >
            {session.urgency.toUpperCase()}
          </div>
          <ChevronRight size={18} color="rgba(255,255,255,0.15)" />
        </div>
      </motion.div>
    </Link>
  );
}
