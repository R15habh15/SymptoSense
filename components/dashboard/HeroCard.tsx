"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { useTestSession } from "@/hooks/useTestSession";

interface HeroCardProps {
  userName: string;
  statsThisMonth: number;
  lastUrgency: string | null;
  commonSymptom: string | null;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function HeroCard({ userName, statsThisMonth, lastUrgency, commonSymptom }: HeroCardProps) {
  const { setShowLanguageModal, resetFlow } = useTestSession();

  const handleStartTest = () => {
    resetFlow();
    setShowLanguageModal(true);
  };

  const statCards = [
    { label: "Tests this month", value: statsThisMonth || 0, icon: "📊", color: "#00C9A7" },
    {
      label: "Last urgency",
      value: lastUrgency ?? "—",
      icon: "⚠️",
      color: lastUrgency === "High" ? "#FF4757" : lastUrgency === "Medium" ? "#FFA502" : "#2ED573",
    },
    { label: "Common symptom", value: commonSymptom ?? "—", icon: "🔍", color: "#0096FF" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, #0F1829 0%, #162035 50%, #1C2942 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(0,201,167,0.12)",
          padding: "28px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glows */}
        <div style={{
          position: "absolute", top: "-50px", right: "-50px",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,201,167,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Greeting */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 6, fontWeight: 500 }}>
            {getGreeting()},
          </div>
          <h1 style={{
            fontSize: "clamp(22px, 6vw, 36px)",
            fontWeight: 800, color: "#fff",
            letterSpacing: "-1px", marginBottom: 10,
          }}>
            {userName} 👋
          </h1>
          <p style={{
            fontSize: "clamp(13px, 3.5vw, 15px)",
            color: "rgba(255,255,255,0.5)", marginBottom: 28,
            maxWidth: 460, lineHeight: 1.6,
          }}>
            How are you feeling today? Start a quick symptom check — it takes under 3 minutes.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(0,201,167,0.45)" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStartTest}
            id="hero-start-test-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #00C9A7, #00A88A)",
              border: "none",
              borderRadius: "14px",
              padding: "14px 24px",
              color: "#fff",
              fontWeight: 700,
              fontSize: "clamp(14px, 3.5vw, 16px)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              width: "100%",
              maxWidth: "320px",
              justifyContent: "center",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.35, 1, 1.35, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart size={18} fill="#fff" color="#fff" />
            </motion.span>
            Start Symptom Check
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </motion.div>

      {/* Stat cards — 3-col desktop, scroll on mobile */}
      <div className="stat-cards-row">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
            whileHover={{ translateY: -3, boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}
            style={{
              background: "#0F1829",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "20px",
              cursor: "default",
              minWidth: "140px",
              flex: 1,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
            <div style={{
              fontSize: "clamp(18px, 5vw, 26px)",
              fontWeight: 800, color: stat.color,
              marginBottom: 4, letterSpacing: "-0.5px",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 500, lineHeight: 1.3 }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .stat-cards-row {
          display: flex;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .stat-cards-row {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 4px;
          }
          .stat-cards-row::-webkit-scrollbar { display: none; }
        }
        @media (min-width: 481px) {
          .stat-cards-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
