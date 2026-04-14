# SymptoSense 🩺

**SymptoSense** is a high-fidelity, professional-grade healthcare SaaS platform designed for smart symptom triage and health monitoring. Built with a focus on visual excellence, clinical reliability, and cross-platform accessibility, it provides users with an instant, data-driven assessment of their health risks.

---

## ✨ Key Features

### 🧠 Advanced Triage Engine
- **8-Question Weighted Algorithm**: Evaluates age, symptoms, severity, duration, progression, and critical indicators to calculate a precise risk score (0-30).
- **Multilingual Support**: Fully localized interface and engine supporting **English**, **Hindi (हिन्दी)**, and **Marathi (मराठी)**.
- **Family Profiles**: Run assessments for yourself or managed family members, each with distinct health histories.

### 📊 Professional Dashboard
- **Risk Score Analytics**: Visualized health trends using custom SVG-based line charts.
- **Triage History**: Full audit trail of past assessments with detailed symptom markers and logic paths.
- **Interactive UI**: Modern, responsive design using a custom "Deep Crimson" design system tailored for healthcare trust.

### 🛡️ Security & Performance
- **Next.js 15 App Router**: Leveraging the latest React features for ultra-fast navigation and SEO.
- **JWT & Auth Guards**: Secure authentication flow with protected dashboard routes.
- **PostgreSQL Persistence**: Reliable data storage for all user reports and account preferences (Backend Ready).
- **Fully Responsive**: Pixel-perfect layout for Desktop, Tablet, and Mobile.

---

## 🚀 Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS (Custom Design System) + Tailwind CSS (Core Utils)
- **Fonts**: [Inter](https://rsms.me/inter/) (UI) & [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (Technical details)
- **State Management**: React Context API (AppContext)

### Backend (Integration Ready)
- **API**: Flask (Python)
- **Database**: PostgreSQL
- **Architecture**: RESTful Service

---

## 🛠️ Usage & Installation

### 1. Prerequisites
- Node.js 18.x or higher
- npm or yarn

### 2. Clone the Repository
```bash
git clone https://github.com/taksh1507/SymptoSense.git
cd SymptoSense/symptosense
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🎨 Design System

SymptoSense uses a unified design system defined in `globals.css`:

- **Primary Red**: `#B91C1C` (Deep Crimson)
- **Background**: `#F9FAFB` (Soft Grey)
- **Surface**: `#FFFFFF` (White)
- **Border**: `#E5E7EB`
- **Shadows**: Custom tiered shadows (`--shadow-sm` to `--shadow-lg`) for depth.

---

## ⚠️ Disclaimer
**SymptoSense is a decision support tool and is not a replacement for professional medical advice, diagnosis, or treatment.** In case of a medical emergency, please contact local emergency services or visit a hospital immediately.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

Developed with ❤️ for a Healthier Future.
