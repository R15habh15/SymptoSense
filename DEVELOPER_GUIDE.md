# SymptoSense Handover Documentation

This document provides a comprehensive technical overview of **SymptoSense**, a high-end medical triage application. It is designed to help developers understand the architecture and integrate production-ready features.

---

## 🚀 Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript
- **Styling**: Tailwind CSS + Framer Motion (premium animations)
- **State Management**: Zustand (with Persist for local history)
- **Database**: Prisma ORM with SQLite (Current local dev setup)
- **Authentication**: NextAuth.js (configured for Google & Credentials)

---

## 📂 Project Structure

- `app/`: Routing and API endpoints (Dashboard, Auth, Test flow, Results).
- `components/`: UI components (Dashboard, Popups, Questions, Results, Shared).
- `hooks/`: Custom state and logic (Session, Adaptive Questions, Scoring).
- `lib/`: Business logic (Medical question tree, Scoring algorithms, Database).
- `prisma/`: Database schema for Users and Sessions.
- `public/`: Assets and PWA manifest.

---

## ✨ Core Features Implemented

1. **Adaptive Question Engine**: 25+ questions across 10 medical categories. Uses branching logic to skip irrelevant questions based on user input.
2. **Deterministic Scoring Engine**: Calculates a 0-100 risk score and categorizes urgency (Low/Medium/High) without the unpredictability of LLMs.
3. **High-End UI/UX**: Dark mode aesthetic with EKG flow animations, heartbeat pulses, and smooth staggered transitions.
4. **Mobile-First Design**: Bottom-sheet drawers for mobile, sticky navbars, and touch-optimized buttons.
5. **Persistence**: Global Zustand store with LocalStorage persistence ensures users don't lose progress and can see history.

---

## 🛠️ Backend Roadmap (To-Dos)

Currently, the backend is a lightweight local setup. To go production:

1. **Production DB**: Change `DATABASE_URL` to PostgreSQL or MySQL in `.env`.
2. **Real Authentication**: 
   - Add a hashing library (like `bcryptjs`) for email/password.
   - Set up real Google Cloud credentials for Google Auth.
3. **API Hardening**: Add Zod validation to API routes and implement rate limiting.
4. **Data Analytics**: Start tracking common symptoms (anonymous) for regional health trends.

---

## 📈 Current Status
- ✅ Project Scaffolding
- ✅ Design System & UI Core
- ✅ Question Tree Logic (Branching)
- ✅ Scoring Algorithm
- ✅ Mobile Responsiveness
- ✅ Local History Store
- ⏳ Production Database Sync
- ⏳ Real Production Auth
