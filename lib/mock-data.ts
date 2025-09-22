import type { Assessment, Resource, ChatMessage } from "./types"

export const mockAssessments: Assessment[] = [
  {
    id: "1",
    userId: "user1",
    type: "PHQ9",
    responses: [1, 2, 1, 2, 0, 1, 1, 0, 0],
    score: 8,
    severity: "mild",
    completedAt: new Date("2024-01-15"),
    recommendations: [
      "Consider regular exercise and sleep hygiene",
      "Practice mindfulness and relaxation techniques",
      "Connect with supportive friends and family",
    ],
  },
  {
    id: "2",
    userId: "user1",
    type: "GAD7",
    responses: [2, 1, 2, 1, 0, 1, 1],
    score: 8,
    severity: "mild",
    completedAt: new Date("2024-01-15"),
    recommendations: ["Try deep breathing exercises", "Limit caffeine intake", "Consider talking to a counselor"],
  },
]

export const mockResources: Resource[] = [
  {
    id: "1",
    title: "Understanding Depression: A Comprehensive Guide",
    description: "Learn about the symptoms, causes, and treatment options for depression.",
    content: "Depression is a common mental health condition...",
    category: "education",
    tags: ["depression", "mental health", "symptoms"],
    readTime: 8,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "5-Minute Breathing Exercise for Anxiety",
    description: "A quick breathing technique to help manage anxiety in the moment.",
    content: "When anxiety strikes, controlled breathing can help...",
    category: "coping",
    tags: ["anxiety", "breathing", "coping skills"],
    readTime: 3,
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    title: "Crisis Resources and Emergency Contacts",
    description: "Important phone numbers and resources for mental health emergencies.",
    content: "If you are in crisis, please reach out for help immediately...",
    category: "crisis",
    tags: ["crisis", "emergency", "hotline"],
    readTime: 2,
    createdAt: new Date("2024-01-03"),
  },
]

export const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    userId: "user1",
    content: "Hi, I've been feeling really anxious lately.",
    isUser: true,
    timestamp: new Date("2024-01-15T10:00:00"),
    sentiment: "negative",
  },
  {
    id: "2",
    userId: "user1",
    content:
      "I understand you're feeling anxious. That must be difficult for you. Can you tell me more about what's been triggering these feelings?",
    isUser: false,
    timestamp: new Date("2024-01-15T10:00:30"),
    sentiment: "neutral",
  },
]

// Crisis keywords for detection
export const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "end it all",
  "not worth living",
  "better off dead",
  "hurt myself",
  "self harm",
  "cutting",
  "overdose",
  "jump off",
  "can't go on",
  "no point",
  "hopeless",
  "worthless",
  "burden",
]

// Positive coping strategies
export const COPING_STRATEGIES = [
  "Take 5 deep breaths",
  "Go for a short walk",
  "Listen to calming music",
  "Practice progressive muscle relaxation",
  "Call a trusted friend or family member",
  "Write in a journal",
  "Try a mindfulness exercise",
  "Engage in a creative activity",
]
