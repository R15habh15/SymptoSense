import { prisma } from "./prisma";
import type { Answer, ScoreResult } from "../scoring";

export async function createTestSession(data: {
  userId?: string;
  personName: string;
  isSelf: boolean;
  language: string;
}) {
  return prisma.testSession.create({
    data: {
      userId: data.userId,
      personName: data.personName,
      isSelf: data.isSelf,
      language: data.language,
      answers: "[]",
    },
  });
}

export async function updateTestSessionAnswers(
  sessionId: string,
  answers: Answer[]
) {
  return prisma.testSession.update({
    where: { id: sessionId },
    data: { answers: JSON.stringify(answers) },
  });
}

export async function completeTestSession(
  sessionId: string,
  answers: Answer[],
  result: ScoreResult
) {
  return prisma.testSession.update({
    where: { id: sessionId },
    data: {
      answers: JSON.stringify(answers),
      score: result.score,
      urgency: result.urgency,
      factors: JSON.stringify(result.factors),
      primaryCategory: result.primaryCategory,
      recommendation: result.recommendation,
      completed: true,
    },
  });
}

export async function getTestSession(sessionId: string) {
  return prisma.testSession.findUnique({
    where: { id: sessionId },
  });
}

export async function getUserSessions(userId: string) {
  return prisma.testSession.findMany({
    where: { userId, completed: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}
