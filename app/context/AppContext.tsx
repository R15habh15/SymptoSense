'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

// Dashboard-level screens only (triage flow)
export type TriageScreen =
  | 'dashboard'
  | 'language'
  | 'person'
  | 'questions'
  | 'loading'
  | 'results';

export type Language = 'English' | 'Hindi' | 'Marathi';
export type PersonType = 'self' | 'family';
export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface AppState {
  triageScreen: TriageScreen;
  language: Language | null;
  personType: PersonType | null;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswers: Record<number, string>;
  riskScore: number;
  riskLevel: RiskLevel;
}

interface AppContextType extends AppState {
  setTriageScreen: (screen: TriageScreen) => void;
  setLanguage: (lang: Language) => void;
  setPersonType: (type: PersonType) => void;
  setAnswer: (qIndex: number, answer: string) => void;
  goToPrevQuestion: () => void;
  goToNextQuestion: () => void;
  startTest: () => void;
  cancelTest: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [state, setState] = useState<AppState>({
    triageScreen: 'dashboard',
    language: null,
    personType: null,
    currentQuestion: 0,
    totalQuestions: 8,
    selectedAnswers: {},
    riskScore: 0,
    riskLevel: 'Low',
  });

  const setTriageScreen = (screen: TriageScreen) =>
    setState((s) => ({ ...s, triageScreen: screen }));

  const setLanguage = (lang: Language) =>
    setState((s) => ({ ...s, language: lang }));

  const setPersonType = (type: PersonType) =>
    setState((s) => ({ ...s, personType: type }));

  const setAnswer = (qIndex: number, answer: string) =>
    setState((s) => ({
      ...s,
      selectedAnswers: { ...s.selectedAnswers, [qIndex]: answer },
    }));

  const goToPrevQuestion = () =>
    setState((s) => ({
      ...s,
      currentQuestion: Math.max(0, s.currentQuestion - 1),
    }));

  // Save completed test to database
  const saveTestToDatabase = async (
    answers: Record<number, string>,
    score: number,
    urgency: RiskLevel,
    userId?: string
  ) => {
    try {
      const symptoms = (answers[1] || '').split(',').filter(Boolean);
      const primaryCategory = symptoms[0] || 'general';

      const getRecommendation = (s: number) => {
        if (s >= 20) return 'Seek emergency care immediately.';
        if (s >= 10) return 'Consult your doctor within 24 hours.';
        return 'Monitor symptoms at home. See a doctor if they worsen.';
      };

      // Format answers as array for storage
      const answersArray = Object.entries(answers).map(([qId, answer]) => ({
        questionId: `q${qId}`,
        answer,
        timestamp: Date.now(),
      }));

      const payload = {
        userId: userId || null,
        personName: 'Myself',
        isSelf: true,
        language: 'en',
        answers: answersArray,
        result: {
          score,
          urgency,
          factors: symptoms.map((s) => ({ id: s, label: s, score: 0, isRedFlag: false, category: 'general' })),
          primaryCategory,
          recommendation: getRecommendation(score),
          hasRedFlag: score >= 20,
          symptomCount: symptoms.length,
          highestSeverity: urgency,
        },
      };

      // Create session first, then complete it
      const createRes = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: payload.userId, personName: payload.personName, isSelf: true, language: 'en' }),
      });
      const { sessionId } = await createRes.json();

      // Complete the session with answers and result
      await fetch('/api/sessions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, answers: payload.answers, result: payload.result }),
      });
    } catch (err) {
      console.error('Failed to save test to database:', err);
    }
  };

  const goToNextQuestion = () => {
    setState((s) => {
      const next = s.currentQuestion + 1;
      if (next >= s.totalQuestions) {
        // ── CALCULATE RISK SCORE ──
        let score = 0;
        const ans = s.selectedAnswers;

        if (ans[0] === 'elderly') score += 2;

        const symptoms = ans[1] ? ans[1].split(',') : [];
        symptoms.forEach(sym => {
          if (sym === 'fever') score += 2;
          if (sym === 'chest_pain') score += 5;
          if (sym === 'breathing') score += 4;
          if (sym === 'headache') score += 1;
          if (sym === 'cough') score += 2;
          if (sym === 'fatigue') score += 1;
        });

        const sevMult = ans[2] === 'severe' ? 3 : ans[2] === 'moderate' ? 2 : 1;
        score = score * sevMult;

        if (ans[3] === 'days') score += 2;
        if (ans[3] === 'long') score += 4;
        if (ans[4] === 'worse') score += 2;
        if (ans[5] === 'chest_pain' || ans[5] === 'breathing') score += 5;

        const history = ans[6] ? ans[6].split(',') : [];
        if (history.includes('diabetes') || history.includes('heart')) score += 2;

        if (ans[7] === 'unable') score += 3;
        if (ans[7] === 'slight') score += 1;

        const finalScore = Math.min(30, score);
        const finalLevel: RiskLevel = finalScore >= 20 ? 'High' : finalScore >= 10 ? 'Medium' : 'Low';

        return {
          ...s,
          triageScreen: 'loading',
          riskScore: finalScore,
          riskLevel: finalLevel,
        };
      }
      return { ...s, currentQuestion: next };
    });

    setTimeout(() => {
      setState((s) => {
        if (s.triageScreen === 'loading') {
          // Save to database (fire and forget)
          const userId = (session?.user as any)?.id;
          saveTestToDatabase(s.selectedAnswers, s.riskScore, s.riskLevel, userId);
          return { ...s, triageScreen: 'results' };
        }
        return s;
      });
    }, 2500);
  };

  const startTest = () =>
    setState((s) => ({ ...s, triageScreen: 'language' }));

  const cancelTest = () =>
    setState((s) => ({
      ...s,
      triageScreen: 'dashboard',
      currentQuestion: 0,
      selectedAnswers: {},
      personType: null,
    }));

  return (
    <AppContext.Provider
      value={{
        ...state,
        setTriageScreen,
        setLanguage,
        setPersonType,
        setAnswer,
        goToPrevQuestion,
        goToNextQuestion,
        startTest,
        cancelTest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
