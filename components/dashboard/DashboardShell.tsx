"use client";

import { useTestSession } from "@/hooks/useTestSession";
import { Sidebar } from "./Sidebar";
import { Navbar } from "@/components/shared/Navbar";
import { MobileBottomNav } from "@/components/shared/MobileBottomNav";
import { AuthGateModal } from "@/components/popups/AuthGateModal";
import { LanguageModal } from "@/components/popups/LanguageModal";
import { PersonModal } from "@/components/popups/PersonModal";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { showAuthGate, showLanguageModal, showPersonModal } = useTestSession();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#070D1A",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Desktop sidebar (hidden on mobile) ── */}
      <div className="desktop-sidebar">
        <Sidebar />
      </div>

      {/* ── Main column ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Mobile-only top navbar */}
        <div className="mobile-navbar">
          <Navbar />
        </div>

        {/* Page content */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 16px",
          }}
          className="main-content"
        >
          {children}
        </main>
      </div>

      {/* ── Mobile bottom nav ── */}
      <div className="mobile-bottom-nav">
        <MobileBottomNav />
      </div>

      {/* ── Modals ── */}
      {showAuthGate && <AuthGateModal />}
      {showLanguageModal && <LanguageModal />}
      {showPersonModal && <PersonModal />}

      <style>{`
        /* Desktop: show sidebar, hide mobile elements */
        .desktop-sidebar {
          display: flex;
          width: 260px;
          flex-shrink: 0;
        }
        .mobile-navbar {
          display: none;
        }
        .mobile-bottom-nav {
          display: none;
        }
        .main-content {
          padding: 24px !important;
        }

        /* Mobile: hide sidebar, show navbar + bottom nav */
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-navbar {
            display: block !important;
          }
          .mobile-bottom-nav {
            display: block !important;
          }
          .main-content {
            padding: 16px 14px 88px !important;
          }
        }
      `}</style>
    </div>
  );
}
