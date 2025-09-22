export interface User {
  id: string
  email: string
  createdAt: Date
  lastActive: Date
  isAnonymous: boolean
}

export interface Assessment {
  id: string
  userId: string
  type: "PHQ9" | "GAD7"
  responses: number[]
  score: number
  severity: "minimal" | "mild" | "moderate" | "moderately-severe" | "severe"
  completedAt: Date
  recommendations: string[]
}

export interface ChatMessage {
  id: string
  userId: string
  content: string
  isUser: boolean
  timestamp: Date
  crisisDetected?: boolean
  sentiment?: "positive" | "neutral" | "negative" | "crisis"
}

export interface Resource {
  id: string
  title: string
  description: string
  content: string
  category: "coping" | "education" | "crisis" | "self-care"
  tags: string[]
  readTime: number
  createdAt: Date
}

export interface CrisisEvent {
  id: string
  userId: string
  messageId: string
  severity: "low" | "medium" | "high" | "critical"
  keywords: string[]
  timestamp: Date
  resolved: boolean
  interventionTaken: string[]
}

// PHQ-9 Depression Assessment
export const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself",
]

// GAD-7 Anxiety Assessment
export const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
]

export const RESPONSE_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
]
