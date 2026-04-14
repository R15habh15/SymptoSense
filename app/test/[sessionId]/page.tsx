"use client";

import { useEffect } from "react";
import { useTestSession } from "@/hooks/useTestSession";
import { QuestionShell } from "@/components/questions/QuestionShell";

interface TestPageProps {
  params: { sessionId: string };
}

export default function TestPage({ params }: TestPageProps) {
  const { sessionId, setSessionId, resetFlow } = useTestSession();

  useEffect(() => {
    if (params.sessionId !== sessionId) {
      setSessionId(params.sessionId);
      resetFlow();
    }
  }, [params.sessionId]);

  return <QuestionShell sessionId={params.sessionId} />;
}
