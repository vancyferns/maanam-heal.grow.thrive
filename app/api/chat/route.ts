import { type NextRequest, NextResponse } from "next/server";
import { mockChatMessages, CRISIS_KEYWORDS } from "@/lib/mock-data";
import type { ChatMessage } from "@/lib/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Check for Gemini API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    let messages = mockChatMessages;
    if (userId) {
      messages = messages.filter((msg) => msg.userId === userId);
    }

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, content } = body;

    const crisisDetected = detectCrisis(content);
    const sentiment = analyzeSentiment(content);

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      content,
      isUser: true,
      timestamp: new Date(),
      crisisDetected,
      sentiment,
    };
    mockChatMessages.push(userMessage);

    const aiResponse = await generateAIResponse(content, crisisDetected);
    const aiMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      content: aiResponse,
      isUser: false,
      timestamp: new Date(),
      sentiment: "neutral",
    };
    mockChatMessages.push(aiMessage);

    return NextResponse.json({ success: true, data: { userMessage, aiMessage, crisisDetected } });
  } catch (error) {
    console.error("Chat POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process message" },
      { status: 500 }
    );
  }
}

// ---------- Helpers ----------

function detectCrisis(content: string): boolean {
  const lowerContent = content.toLowerCase();
  return CRISIS_KEYWORDS.some((keyword) => lowerContent.includes(keyword));
}

function analyzeSentiment(content: string): "positive" | "neutral" | "negative" | "crisis" {
  const lowerContent = content.toLowerCase();
  if (detectCrisis(content)) return "crisis";

  const positiveWords = ["good", "great", "happy", "better", "improving", "hopeful", "grateful"];
  const negativeWords = ["sad", "depressed", "anxious", "worried", "scared", "hopeless", "tired"];

  const positiveCount = positiveWords.filter((word) => lowerContent.includes(word)).length;
  const negativeCount = negativeWords.filter((word) => lowerContent.includes(word)).length;

  if (positiveCount > negativeCount) return "positive";
  if (negativeCount > positiveCount) return "negative";
  return "neutral";
}

async function generateAIResponse(userMessage: string, crisisDetected: boolean): Promise<string> {
  if (crisisDetected) {
    return `I'm very concerned about what you've shared. Your safety is the most important thing right now. Please consider reaching out to a crisis helpline immediately:

• National Suicide Prevention Lifeline: 988
• Crisis Text Line: Text HOME to 741741
• Emergency Services: 911

You don't have to go through this alone. There are people who want to help you. Would you like me to help you find local crisis resources?`;
  }

    const fallbacks = [
    "Hey, I hear you. That sounds rough… want to tell me more?",
    "Oh man… that really sucks. Do you want to talk about it?",
    "Wow, that must have been really hard. I'm listening.",
    "Yikes, I can imagine how that feels. Go on…",
  ];

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Ensure prompt is never too short
    const promptText = userMessage.trim().length > 2
      ? userMessage
      : "Hi! How are you feeling today?";


    /* tuning for the model */
    //     const prompt = `You are a compassionate mental health chatbot.
    // The user said: "${promptText}".
    // Respond in a supportive, empathetic, and safe way.`;


    /*tuning for bot */
    const prompt = `
      You are a compassionate and friendly listener who talks like a real human. 
      The user is sharing something personal and emotional. 
      Respond in natural sentences, sometimes using pauses or small interjections like "uh", "hmm", or "I see". 
      Use empathy, warmth, and conversational language. 
      Avoid being too polished or formal. 
      Do not lecture or sound like a template.
      User said: "${userMessage}".
      Reply in a way that shows you care and are really listening.
    `;


    const result = await model.generateContent(prompt);

    console.log("Gemini raw result:", result);

    // SDK may have result.response.text() or result.output_text
    const aiText =
      (result?.response?.text && typeof result.response.text === "function"
        ? result.response.text()
        : result?.response?.output_text) || "";

    return aiText || fallbacks[Math.floor(Math.random() * fallbacks.length)];
  } catch (err) {
    console.error("Gemini API error:", err);
    return "I'm here for you and ready to listen. Can you tell me more about how you're feeling?";
  }
}
