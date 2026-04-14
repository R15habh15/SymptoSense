"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { useTestSession } from "@/hooks/useTestSession";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const { setShowLanguageModal, resetFlow } = useTestSession();

  const handleNewTest = () => {
    resetFlow();
    setShowLanguageModal(true);
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "60px",
        background: "rgba(7,13,26,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: "12px",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          flex: 1,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "10px",
            background: "linear-gradient(135deg, #00C9A7, #0096FF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Activity size={18} color="#fff" />
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: "16px",
            color: "#fff",
            letterSpacing: "-0.3px",
          }}
        >
          SymptoSense
        </span>
      </Link>

      {/* Language toggle */}
      <LanguageToggle />

      {/* Start test CTA — hidden on very small screens */}
      <button
        onClick={handleNewTest}
        id="navbar-new-test-btn"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 16px",
          background: "linear-gradient(135deg, #00C9A7, #00A88A)",
          border: "none",
          borderRadius: "10px",
          color: "#fff",
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          whiteSpace: "nowrap",
        }}
        className="navbar-cta"
      >
        + New Test
      </button>

      <style>{`
        @media (max-width: 400px) {
          .navbar-cta { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
