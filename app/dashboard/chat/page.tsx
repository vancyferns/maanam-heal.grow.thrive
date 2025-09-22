"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, AlertTriangle, Shield, Phone, Heart, Bot, User, Loader2, Info } from "lucide-react"
import type { ChatMessage } from "@/lib/types"

export default function ChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [crisisDetected, setCrisisDetected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Load existing messages
    const loadMessages = async () => {
      if (!user) return

      try {
        const response = await fetch(`/api/chat?userId=${user.id}`)
        const data = await response.json()
        if (data.success) {
          setMessages(data.data)
        }
      } catch (error) {
        console.error("Failed to load messages:", error)
      }
    }

    loadMessages()
  }, [user])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || !user || isLoading) return

    const messageText = inputMessage.trim()
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          content: messageText,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setMessages((prev) => [...prev, data.data.userMessage, data.data.aiMessage])
        if (data.data.crisisDetected) {
          setCrisisDetected(true)
        }
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        userId: user.id,
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
        sentiment: "neutral",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">AI Support Chat</h1>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Private & Secure
            </Badge>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Online 24/7
          </Badge>
        </div>

        {/* Crisis Alert */}
        {crisisDetected && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">Crisis Support Resources Available</p>
                <p>If you're in immediate danger or having thoughts of self-harm, please reach out for help:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button size="sm" variant="destructive" className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Call 988
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1 bg-transparent">
                    <MessageCircle className="h-3 w-3" />
                    Text HOME to 741741
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5 text-primary" />
              Maanam AI Assistant <span className="text-base font-normal">Heal. Grow. Thrive.</span>
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>This AI provides support but is not a replacement for professional mental health care</span>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 pb-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Welcome to your safe space</h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      I'm here to listen and provide support. Feel free to share what's on your mind - this conversation
                      is private and secure.
                    </p>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}>
                    {!message.isUser && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.isUser ? "bg-primary text-primary-foreground ml-auto" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                        {message.crisisDetected && (
                          <Badge variant="destructive" className="text-xs">
                            Crisis Detected
                          </Badge>
                        )}
                      </div>
                    </div>

                    {message.isUser && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Typing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message here..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={!inputMessage.trim() || isLoading} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This conversation is private and encrypted. Press Enter to send.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
