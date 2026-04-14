"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { Settings, LogOut, User } from "lucide-react";

export function ProfileDropdown() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const name = session?.user?.name ?? "Guest User";
  const email = session?.user?.email ?? "";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div style={{ position: "relative" }}>
      <motion.button
        whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px",
          padding: "10px 12px",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.2s",
        }}
        id="profile-dropdown-btn"
      >
        {/* Avatar */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00C9A7, #0096FF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 13,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {initials || <User size={16} />}
        </div>

        <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </div>
          {email && (
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {email}
            </div>
          )}
        </div>

        <Settings size={15} color="rgba(255,255,255,0.3)" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: 0,
              right: 0,
              background: "#162035",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
              zIndex: 100,
            }}
          >
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "#FF4757",
                  fontWeight: 500,
                }}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            ) : (
              <a
                href="/auth/login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 16px",
                  fontSize: 14,
                  color: "#00C9A7",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <User size={16} />
                Sign In
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
