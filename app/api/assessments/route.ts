import { type NextRequest, NextResponse } from "next/server";
import { mockAssessments } from "@/lib/mock-data";
import type { Assessment } from "@/lib/types";

// Define valid assessment types
const assessmentTypes = ["PHQ9", "GAD7"] as const;
type AssessmentType = (typeof assessmentTypes)[number];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const type = searchParams.get("type") as AssessmentType | null;

    let filteredAssessments = mockAssessments;

    if (userId) {
      filteredAssessments = filteredAssessments.filter(
        (assessment) => assessment.userId === userId
      );
    }

    if (type && assessmentTypes.includes(type)) {
      filteredAssessments = filteredAssessments.filter(
        (assessment) => assessment.type === type
      );
    }

    return NextResponse.json({ success: true, data: filteredAssessments });
  } catch (error) {
    console.error("GET assessments error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch assessments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, responses } = body;

    // Validate type
    if (!assessmentTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: "Invalid assessment type" },
        { status: 400 }
      );
    }

    // Validate responses
    if (!Array.isArray(responses) || !responses.every((r) => typeof r === "number")) {
      return NextResponse.json(
        { success: false, error: "Invalid responses format" },
        { status: 400 }
      );
    }

    // Calculate total score
    const totalScore = responses.reduce((sum: number, response: number) => sum + response, 0);

    // Determine severity
    const severity = getSeverity(type, totalScore);

    // Generate recommendations
    const recommendations = generateRecommendations(type, severity);

    const newAssessment: Assessment = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      type,
      responses,
      score: totalScore,
      severity: severity as Assessment["severity"],
      completedAt: new Date(),
      recommendations,
    };

    // Save to mock DB
    mockAssessments.push(newAssessment);

    return NextResponse.json({ success: true, data: newAssessment });
  } catch (error) {
    console.error("POST assessments error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save assessment" },
      { status: 500 }
    );
  }
}

// ---------- Helpers ----------

function getSeverity(type: AssessmentType, totalScore: number): string {
  const thresholds: Record<AssessmentType, [number, string][]> = {
    PHQ9: [
      [4, "minimal"],
      [9, "mild"],
      [14, "moderate"],
      [19, "moderately-severe"],
      [Infinity, "severe"],
    ],
    GAD7: [
      [4, "minimal"],
      [9, "mild"],
      [14, "moderate"],
      [Infinity, "severe"],
    ],
  };

  const list = thresholds[type];
  return list.find(([max]) => totalScore <= max)![1];
}

function generateRecommendations(type: AssessmentType, severity: string): string[] {
  const baseRecommendations = {
    PHQ9: {
      minimal: ["Maintain healthy lifestyle habits", "Continue regular exercise and sleep routine"],
      mild: [
        "Consider regular exercise and sleep hygiene",
        "Practice mindfulness and relaxation techniques",
        "Connect with supportive friends and family",
      ],
      moderate: [
        "Consider speaking with a mental health professional",
        "Engage in regular physical activity",
        "Practice stress management techniques",
        "Maintain social connections",
      ],
      "moderately-severe": [
        "Strongly recommend consulting a mental health professional",
        "Consider therapy or counseling",
        "Reach out to trusted friends and family",
        "Contact your healthcare provider",
      ],
      severe: [
        "Seek immediate professional help",
        "Contact a mental health crisis line if needed",
        "Reach out to emergency services if you feel unsafe",
        "Connect with a trusted person for support",
      ],
    },
    GAD7: {
      minimal: ["Practice relaxation techniques", "Maintain regular exercise"],
      mild: [
        "Try deep breathing exercises",
        "Limit caffeine intake",
        "Practice progressive muscle relaxation",
        "Consider talking to a counselor",
      ],
      moderate: [
        "Consider professional counseling or therapy",
        "Practice anxiety management techniques",
        "Limit alcohol and caffeine",
        "Maintain regular sleep schedule",
      ],
      severe: [
        "Seek professional mental health treatment",
        "Consider medication evaluation with a doctor",
        "Practice grounding techniques",
        "Build a strong support network",
      ],
    },
  } as const;

  const recs = baseRecommendations[type]?.[severity as keyof typeof baseRecommendations.PHQ9];
  return recs ?? [];
}
