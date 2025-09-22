import { type NextRequest, NextResponse } from "next/server"
import { mockChatMessages, CRISIS_KEYWORDS } from "@/lib/mock-data"
import type { ChatMessage } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    let messages = mockChatMessages
    if (userId) {
      messages = messages.filter((msg) => msg.userId === userId)
    }

    return NextResponse.json({
      success: true,
      data: messages,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch messages",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, content } = body

    // Detect crisis keywords
    const crisisDetected = detectCrisis(content)
    const sentiment = analyzeSentiment(content)

    // Save user message
    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      content,
      isUser: true,
      timestamp: new Date(),
      crisisDetected,
      sentiment,
    }

    mockChatMessages.push(userMessage)

    // Generate AI response
    const aiResponse = await generateAIResponse(content, crisisDetected)
    const aiMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      content: aiResponse,
      isUser: false,
      timestamp: new Date(),
      sentiment: "neutral",
    }

    mockChatMessages.push(aiMessage)

    return NextResponse.json({
      success: true,
      data: {
        userMessage,
        aiMessage,
        crisisDetected,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process message",
      },
      { status: 500 },
    )
  }
}

function detectCrisis(content: string): boolean {
  const lowerContent = content.toLowerCase()
  return CRISIS_KEYWORDS.some((keyword) => lowerContent.includes(keyword))
}

function analyzeSentiment(content: string): "positive" | "neutral" | "negative" | "crisis" {
  const lowerContent = content.toLowerCase()

  if (detectCrisis(content)) return "crisis"

  const positiveWords = ["good", "great", "happy", "better", "improving", "hopeful", "grateful"]
  const negativeWords = ["sad", "depressed", "anxious", "worried", "scared", "hopeless", "tired"]

  const positiveCount = positiveWords.filter((word) => lowerContent.includes(word)).length
  const negativeCount = negativeWords.filter((word) => lowerContent.includes(word)).length

  if (positiveCount > negativeCount) return "positive"
  if (negativeCount > positiveCount) return "negative"
  return "neutral"
}

async function generateAIResponse(userMessage: string, crisisDetected: boolean): Promise<string> {
  // In a real implementation, this would use an AI service like OpenAI or Groq
  // For now, we'll use rule-based responses

  if (crisisDetected) {
    return `I'm very concerned about what you've shared. Your safety is the most important thing right now. Please consider reaching out to a crisis helpline immediately:

• National Suicide Prevention Lifeline: 988
• Crisis Text Line: Text HOME to 741741
• Emergency Services: 911

You don't have to go through this alone. There are people who want to help you. Would you like me to help you find local crisis resources?`
  }

  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety")) {
    return "I understand you're feeling anxious. That can be really overwhelming. Have you tried any breathing exercises? Sometimes taking slow, deep breaths can help calm your nervous system. Would you like me to guide you through a simple breathing technique?"
  }

  if (lowerMessage.includes("depressed") || lowerMessage.includes("sad")) {
    return "I hear that you're going through a difficult time. Depression can make everything feel harder. It's important to remember that these feelings, while very real and valid, are temporary. Have you been able to maintain any daily routines or activities that usually bring you some comfort?"
  }

  if (lowerMessage.includes("sleep") || lowerMessage.includes("tired")) {
    return "Sleep issues can really impact how we feel during the day. Good sleep hygiene can make a big difference. This includes keeping a regular sleep schedule, avoiding screens before bed, and creating a calm environment. Are there specific things that are keeping you awake?"
  }

  // Default empathetic response
  return "Thank you for sharing that with me. It takes courage to talk about what you're going through. I'm here to listen and support you. Can you tell me more about how you've been feeling lately, or is there something specific you'd like to talk about?"
}
