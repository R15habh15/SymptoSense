import { NextRequest, NextResponse } from "next/server";
import { computeScore } from "@/lib/scoring";

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();
    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "answers array required" }, { status: 400 });
    }
    const result = computeScore(answers);
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Scoring failed" }, { status: 500 });
  }
}
