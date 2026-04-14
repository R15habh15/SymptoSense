"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Chrome } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTestSession } from "@/hooks/useTestSession";

export function AuthGateModal() {
  const { setShowAuthGate, setShowLanguageModal } = useTestSession();

  const handleClose = () => setShowAuthGate(false);
  const handleGoogle = async () => { setShowAuthGate(false); await signIn("google", { callbackUrl: "/" }); };
  const handleEmail = () => { setShowAuthGate(false); window.location.href = "/auth/login"; };
  const handleCreate = () => { setShowAuthGate(false); window.location.href = "/auth/signup"; };
  const handleGuest = () => { setShowAuthGate(false); setShowLanguageModal(true); };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(7,13,26,0.88)",
          backdropFilter: "blur(10px)",
          zIndex: 200,
          display: "flex",
          alignItems: "flex-end",      /* bottom-sheet on mobile */
          justifyContent: "center",
          padding: "0",
        }}
        className="modal-backdrop"
      >
        {/* Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="modal-sheet"
          style={{
            background: "#0F1829",
            width: "100%",
            maxWidth: "480px",
            position: "relative",
            boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
          }}
        >
          {/* Drag handle */}
          <div className="drag-handle" />

          {/* Close */}
          <button onClick={handleClose} className="modal-close-btn">
            <X size={16} />
          </button>

          <div className="modal-inner">
            <div style={{ fontSize: 44, marginBottom: 16 }}>🔐</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>
              Sign in to continue
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 28, lineHeight: 1.6 }}>
              Save your symptom history and get personalized health insights over time.
            </p>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleGoogle} id="auth-google-btn"
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "12px", padding: "14px",
                background: "#fff", border: "none", borderRadius: "12px",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: "12px",
              }}>
              <Chrome size={20} color="#4285F4" /> Continue with Google
            </motion.button>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleEmail} id="auth-email-btn"
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "12px", padding: "14px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: "12px",
              }}>
              <Mail size={20} /> Sign in with Email
            </motion.button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>or</span>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            </div>

            <button onClick={handleGuest} id="auth-guest-btn"
              style={{ width: "100%", padding: "12px", background: "transparent", border: "none",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#00C9A7", fontWeight: 500 }}>
              Continue as guest (results won't be saved)
            </button>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Don't have an account? </span>
              <button onClick={handleCreate} style={{ background: "none", border: "none", color: "#00C9A7",
                fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                Create one
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .modal-sheet {
          border-radius: 24px 24px 0 0;
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .drag-handle {
          width: 40px; height: 4px;
          background: rgba(255,255,255,0.15);
          border-radius: 2px;
          margin: 12px auto 4px;
        }
        .modal-close-btn {
          position: absolute; top: 14px; right: 16px;
          background: rgba(255,255,255,0.06); border: none;
          border-radius: "8px"; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.5);
          border-radius: 8px;
        }
        .modal-inner {
          padding: 12px 24px 28px;
        }
        @media (min-width: 540px) {
          .modal-backdrop {
            align-items: center !important;
            padding: 24px !important;
          }
          .modal-sheet {
            border-radius: 24px !important;
            max-width: 420px !important;
            padding-bottom: 0 !important;
          }
          .drag-handle { display: none; }
          .modal-inner { padding: 8px 36px 36px; }
          .modal-close-btn { top: 16px; right: 16px; }
        }
      `}</style>
    </AnimatePresence>
  );
}
