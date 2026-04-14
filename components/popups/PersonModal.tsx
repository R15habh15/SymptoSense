"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, User, Users } from "lucide-react";
import { useTestSession } from "@/hooks/useTestSession";
import { useRouter } from "next/navigation";

export function PersonModal() {
  const router = useRouter();
  const {
    setIsSelf, setPersonName, setShowPersonModal,
    setSessionId, language, resetFlow,
  } = useTestSession();

  const [selectedSelf, setSelectedSelf] = useState<boolean>(true);
  const [otherName, setOtherName] = useState("");

  const handleContinue = async () => {
    const finalName = selectedSelf ? "Myself" : otherName || "Family member";
    setIsSelf(selectedSelf);
    setPersonName(finalName);
    setShowPersonModal(false);

    let sessionId = `local-${Date.now()}`;
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personName: finalName, isSelf: selectedSelf, language }),
      });
      if (res.ok) {
        const data = await res.json();
        sessionId = data.sessionId;
      }
    } catch {}

    setSessionId(sessionId);
    resetFlow();
    router.push(`/test/${sessionId}`);
  };

  const options = [
    { id: true, icon: <User size={28} color="#00C9A7" />, title: "Myself", subtitle: "My own symptoms" },
    { id: false, icon: <Users size={28} color="#0096FF" />, title: "Someone else", subtitle: "Family or friend" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(7,13,26,0.9)",
          backdropFilter: "blur(12px)",
          zIndex: 200,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
        }}
        className="person-backdrop"
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="person-sheet"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="drag-handle" />

          <button onClick={() => setShowPersonModal(false)} className="modal-close-btn">
            <X size={16} />
          </button>

          <div className="modal-inner">
            <div style={{ fontSize: 32, marginBottom: 12 }}>👤</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 6 }}>
              Who are we checking?
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 24, lineHeight: 1.5 }}>
              This helps personalize the questions.
            </p>

            {/* Option cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              {options.map((opt) => {
                const isSel = selectedSelf === opt.id;
                return (
                  <motion.button
                    key={String(opt.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSelf(opt.id)}
                    id={`person-option-${opt.id}`}
                    style={{
                      background: isSel ? "rgba(0,201,167,0.10)" : "rgba(255,255,255,0.04)",
                      border: `2px solid ${isSel ? "#00C9A7" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: "14px",
                      padding: "18px 12px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: "10px",
                      position: "relative",
                      minHeight: "110px",
                    }}
                  >
                    {isSel && (
                      <div style={{ position: "absolute", top: 8, right: 8 }}>
                        <CheckCircle2 size={16} color="#00C9A7" fill="rgba(0,201,167,0.2)" />
                      </div>
                    )}
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: isSel ? "rgba(0,201,167,0.12)" : "rgba(255,255,255,0.06)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {opt.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: isSel ? "#00C9A7" : "#fff" }}>
                        {opt.title}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3, lineHeight: 1.3 }}>
                        {opt.subtitle}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Name input */}
            <AnimatePresence>
              {!selectedSelf && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: "hidden", marginBottom: "16px" }}
                >
                  <div style={{ paddingTop: 4 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600,
                      color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                      Who are you checking for?
                    </label>
                    <input
                      type="text"
                      value={otherName}
                      onChange={(e) => setOtherName(e.target.value)}
                      placeholder='e.g. "My mother", "My child"'
                      id="person-name-input"
                      style={{
                        width: "100%", background: "#162035",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px", color: "#fff",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "15px",
                        padding: "13px 16px", outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleContinue}
              id="person-continue-btn"
              style={{
                width: "100%", padding: "15px",
                background: "linear-gradient(135deg, #00C9A7, #00A88A)",
                border: "none", borderRadius: "14px",
                color: "#fff", fontWeight: 700, fontSize: 15,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Start Test →
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .person-sheet {
          background: #0F1829;
          border-radius: 24px 24px 0 0;
          border: 1px solid rgba(255,255,255,0.1);
          width: 100%;
          position: relative;
          box-shadow: 0 -20px 60px rgba(0,0,0,0.6);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .drag-handle {
          width: 40px; height: 4px;
          background: rgba(255,255,255,0.15);
          border-radius: 2px; margin: 12px auto 4px;
        }
        .modal-close-btn {
          position: absolute; top: 14px; right: 16px;
          background: rgba(255,255,255,0.06); border: none;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.5);
          border-radius: 8px;
        }
        .modal-inner { padding: 8px 20px 24px; }

        @media (min-width: 540px) {
          .person-backdrop { align-items: center !important; padding: 24px; }
          .person-sheet {
            border-radius: 24px !important;
            max-width: 500px !important;
            padding-bottom: 0 !important;
          }
          .drag-handle { display: none; }
          .modal-inner { padding: 8px 36px 36px; }
        }
      `}</style>
    </AnimatePresence>
  );
}
