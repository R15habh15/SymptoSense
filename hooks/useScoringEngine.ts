"use client";

import { useCallback } from "react";
import { computeScore } from "@/lib/scoring";
import { useTestSession } from "./useTestSession";

export function useScoringEngine() {
  const { answers, setScoreResult, setIsLoadingResults } = useTestSession();

  const computeAndStore = useCallback(() => {
    setIsLoadingResults(true);
    // Simulate async computation with trust-building delay
    return new Promise<ReturnType<typeof computeScore>>((resolve) => {
      setTimeout(() => {
        const result = computeScore(answers);
        setScoreResult(result);
        setIsLoadingResults(false);
        resolve(result);
      }, 2500); // 2.5s minimum for UX trust
    });
  }, [answers, setScoreResult, setIsLoadingResults]);

  return { computeAndStore };
}
