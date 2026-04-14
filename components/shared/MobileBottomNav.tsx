"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Plus, Clock } from "lucide-react";
import { useTestSession } from "@/hooks/useTestSession";
import { useEffect, useState } from "react";

export function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { setShowLanguageModal, resetFlow } = useTestSession();
  const [isHistoryView, setIsHistoryView] = useState(false);

  // Check hash on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHistoryView(window.location.hash.includes("history"));
    }
  }, [pathname]);

  const handleNewTest = () => {
    resetFlow();
    setShowLanguageModal(true);
  };

  const scrollToHistory = () => {
    if (pathname === "/") {
      const element = document.getElementById("history-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#history-section");
    }
  };

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/" && !isHistoryView,
      onClick: () => {
        router.push("/");
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
    },
    {
      id: "new-test",
      label: "New Test",
      icon: Plus,
      active: false,
      onClick: handleNewTest,
      isAccent: true,
    },
    {
      id: "history",
      label: "History",
      icon: Clock,
      active: pathname === "/" && isHistoryView,
      onClick: scrollToHistory,
    },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(15,24,41,0.98)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "stretch",
        padding: "0 8px",
        height: "64px",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={tab.onClick}
            id={`mobile-nav-${tab.id}`}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              padding: "8px 4px",
              position: "relative",
            }}
          >
            {tab.isAccent ? (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00C9A7, #00A88A)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(0,201,167,0.4)",
                  marginBottom: 2,
                }}
              >
                <Icon size={22} color="#fff" />
              </motion.div>
            ) : (
              <>
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "12px",
                    background: tab.active ? "rgba(0,201,167,0.15)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    size={20}
                    color={tab.active ? "#00C9A7" : "rgba(255,255,255,0.4)"}
                  />
                </motion.div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: tab.active ? 700 : 500,
                    color: tab.active ? "#00C9A7" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {tab.label}
                </span>
              </>
            )}
          </button>
        );
      })}
    </nav>
  );
}
