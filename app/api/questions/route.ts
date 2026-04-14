import { NextRequest, NextResponse } from "next/server";
import { QUESTIONS, getQuestion } from "@/lib/questionTree";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const question = getQuestion(id);
    if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });
    return NextResponse.json(question);
  }

  return NextResponse.json(Object.values(QUESTIONS));
}
