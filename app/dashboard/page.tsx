"use client"

import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageCircle,
  FileText,
  BarChart3,
  Calendar,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useState } from "react"

interface DashboardStats {
  assessmentsCompleted: number
  chatSessions: number
  resourcesViewed: number
  lastAssessmentDate: string | null
  currentMoodTrend: "improving" | "stable" | "declining"
  streakDays: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    assessmentsCompleted: 3,
    chatSessions: 7,
    resourcesViewed: 12,
    lastAssessmentDate: "2024-01-15",
    currentMoodTrend: "improving",
    streakDays: 5,
  })

  if (!user) {
    return null // Will redirect via withAuth
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">
              Welcome back{user.isAnonymous ? "" : `, ${user.email?.split("@")[0]}`}
            </h1>
            <p className="text-muted-foreground mt-1">Here's how your mental health journey is progressing</p>
          </div>
          {user.isAnonymous && (
            <Badge variant="secondary" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Anonymous Mode
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border bg-card hover:bg-card/80 transition-colors cursor-pointer">
            <Link href="/dashboard/chat">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <MessageCircle className="h-8 w-8 text-primary" />
                  <Badge variant="outline">24/7</Badge>
                </div>
                <CardTitle className="text-lg">AI Support Chat</CardTitle>
                <CardDescription>Get immediate support and guidance</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="border-border bg-card hover:bg-card/80 transition-colors cursor-pointer">
            <Link href="/dashboard/assessments">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <Badge variant="outline">PHQ-9 • GAD-7</Badge>
                </div>
                <CardTitle className="text-lg">Take Assessment</CardTitle>
                <CardDescription>Track your mental health progress</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="border-border bg-card hover:bg-card/80 transition-colors cursor-pointer">
            <Link href="/dashboard/resources">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <FileText className="h-8 w-8 text-primary" />
                  <Badge variant="outline">Updated</Badge>
                </div>
                <CardTitle className="text-lg">Resource Library</CardTitle>
                <CardDescription>Explore coping strategies and guides</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="border-border bg-card hover:bg-card/80 transition-colors cursor-pointer">
            <Link href="/dashboard/progress">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <Badge variant="outline">Insights</Badge>
                </div>
                <CardTitle className="text-lg">Progress Tracking</CardTitle>
                <CardDescription>View your journey insights</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Assessments Completed</span>
                <span className="font-semibold">{stats.assessmentsCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Chat Sessions</span>
                <span className="font-semibold">{stats.chatSessions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Resources Viewed</span>
                <span className="font-semibold">{stats.resourcesViewed}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Progress Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Trend</span>
                <Badge
                  variant={
                    stats.currentMoodTrend === "improving"
                      ? "default"
                      : stats.currentMoodTrend === "stable"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {stats.currentMoodTrend}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Weekly Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Streak Days</span>
                <span className="font-semibold text-primary">{stats.streakDays} days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Weekly Check-in</p>
                  <p className="text-muted-foreground">Due in 2 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">Complete PHQ-9</p>
                  <p className="text-muted-foreground">Track your progress</p>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3" asChild>
                <Link href="/dashboard/assessments">Take Assessment</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Resources */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recommended for You</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/resources">View All</Link>
              </Button>
            </div>
            <CardDescription>Personalized resources based on your recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <Link href="/dashboard/resources/1">
                  <h4 className="font-semibold mb-2">Managing Anxiety in Daily Life</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Practical strategies for reducing anxiety and building resilience.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>5 min read</span>
                    <Badge variant="outline" className="text-xs">
                      Coping
                    </Badge>
                  </div>
                </Link>
              </div>

              <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <Link href="/dashboard/resources/2">
                  <h4 className="font-semibold mb-2">Sleep Hygiene for Better Mental Health</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    How quality sleep impacts your mood and mental wellbeing.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>7 min read</span>
                    <Badge variant="outline" className="text-xs">
                      Self-care
                    </Badge>
                  </div>
                </Link>
              </div>

              <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <Link href="/dashboard/resources/3">
                  <h4 className="font-semibold mb-2">Building a Support Network</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    The importance of social connections in mental health recovery.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>6 min read</span>
                    <Badge variant="outline" className="text-xs">
                      Education
                    </Badge>
                  </div>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
