"use client";

import { useTestSession } from "@/hooks/useTestSession";

export function LanguageToggle() {
  const { language, setLanguage } = useTestSession();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "8px",
        padding: "3px",
        gap: "2px",
      }}
    >
      {(["en", "hi"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          style={{
            padding: "5px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: language === lang ? 600 : 400,
            background: language === lang ? "#00C9A7" : "transparent",
            color: language === lang ? "#fff" : "rgba(255,255,255,0.5)",
            transition: "all 0.2s ease",
          }}
        >
          {lang === "en" ? "EN" : "हि"}
        </button>
      ))}
    </div>
  );
}
