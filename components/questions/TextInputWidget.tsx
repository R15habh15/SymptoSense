"use client";

import { useRef, useState } from "react";

interface TextInputWidgetProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export function TextInputWidget({
  value,
  onChange,
  placeholder = "Describe your symptoms in detail…",
  maxLength = 500,
}: TextInputWidgetProps) {
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    // Auto-resize
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
        id="text-input-widget"
        style={{
          width: "100%",
          background: "#162035",
          border: `1.5px solid ${focused ? "#00C9A7" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "16px",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          lineHeight: 1.7,
          padding: "18px 20px",
          outline: "none",
          resize: "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focused ? "0 0 0 3px rgba(0,201,167,0.12)" : "none",
          minHeight: 120,
          overflow: "hidden",
        }}
      />
      {/* Character counter */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          right: 14,
          fontSize: 12,
          color:
            value.length > maxLength * 0.9
              ? "#FFA502"
              : "rgba(255,255,255,0.25)",
        }}
      >
        {value.length}/{maxLength}
      </div>
    </div>
  );
}
