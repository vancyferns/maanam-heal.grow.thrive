"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart3, TrendingUp, Clock, AlertTriangle, CheckCircle, Info } from "lucide-react"
import Link from "next/link"
import type { Assessment } from "@/lib/types"

export default function AssessmentsPage() {
  const { user } = useAuth()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch(`/api/assessments?userId=${user?.id}`)
        const data = await response.json()
        if (data.success) {
          setAssessments(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch assessments:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchAssessments()
    }
  }, [user])

  const getLastAssessment = (type: "PHQ9" | "GAD7") => {
    return assessments
      .filter((a) => a.type === type)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0]
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minimal":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "mild":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "moderate":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "moderately-severe":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "severe":
        return "bg-red-600/10 text-red-600 border-red-600/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const lastPHQ9 = getLastAssessment("PHQ9")
  const lastGAD7 = getLastAssessment("GAD7")

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Mental Health Assessments</h1>
          <p className="text-muted-foreground mt-1">
            Track your mental health with validated clinical assessment tools
          </p>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            These assessments are screening tools and not diagnostic instruments. Please consult with a mental health
            professional for proper diagnosis and treatment.
          </AlertDescription>
        </Alert>

        {/* Assessment Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* PHQ-9 Depression Assessment */}
          <Card id="phq9-results" className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <CardTitle>PHQ-9 Depression Assessment</CardTitle>
                </div>
                {lastPHQ9 && (
                  <Badge className={getSeverityColor(lastPHQ9.severity)} variant="outline">
                    {lastPHQ9.severity}
                  </Badge>
                )}
              </div>
              <CardDescription>
                The Patient Health Questionnaire-9 (PHQ-9) is a validated tool for screening and monitoring depression
                severity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lastPHQ9 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last completed:</span>
                    <span>{new Date(lastPHQ9.completedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Score:</span>
                    <span className="font-semibold">
                      {lastPHQ9.score}/27 ({lastPHQ9.severity})
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{Math.round((lastPHQ9.score / 27) * 100)}%</span>
                    </div>
                    <Progress value={(lastPHQ9.score / 27) * 100} className="h-2" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No assessments completed yet</p>
                </div>
              )}
              <div className="flex gap-2">
                <Button className="flex-1" asChild>
                  <Link href="/dashboard/assessments/phq9">{lastPHQ9 ? "Retake Assessment" : "Take Assessment"}</Link>
                </Button>
                {lastPHQ9 && (
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/assessments/phq9/results">View Results</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* GAD-7 Anxiety Assessment */}
          <Card id="gad7-results" className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <CardTitle>GAD-7 Anxiety Assessment</CardTitle>
                </div>
                {lastGAD7 && (
                  <Badge className={getSeverityColor(lastGAD7.severity)} variant="outline">
                    {lastGAD7.severity}
                  </Badge>
                )}
              </div>
              <CardDescription>
                The Generalized Anxiety Disorder-7 (GAD-7) is a validated tool for screening and monitoring anxiety
                severity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lastGAD7 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last completed:</span>
                    <span>{new Date(lastGAD7.completedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Score:</span>
                    <span className="font-semibold">
                      {lastGAD7.score}/21 ({lastGAD7.severity})
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{Math.round((lastGAD7.score / 21) * 100)}%</span>
                    </div>
                    <Progress value={(lastGAD7.score / 21) * 100} className="h-2" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No assessments completed yet</p>
                </div>
              )}
              <div className="flex gap-2">
                <Button className="flex-1" asChild>
                  <Link href="/dashboard/assessments/gad7">{lastGAD7 ? "Retake Assessment" : "Take Assessment"}</Link>
                </Button>
                {lastGAD7 && (
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/assessments/gad7/results">View Results</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assessment History */}
        {assessments.length > 0 && (
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Assessment History
              </CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessments
                  .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
                  .slice(0, 5)
                  .map((assessment) => (
                    <div
                      key={assessment.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{assessment.type}</span>
                        </div>
                        <Badge className={getSeverityColor(assessment.severity)} variant="outline">
                          {assessment.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Score: {assessment.score}</span>
                        <span>{new Date(assessment.completedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
              </div>
              {assessments.length > 5 && (
                <div className="text-center mt-4">
                  <Button variant="outline" size="sm">
                    View All History
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        {(lastPHQ9 || lastGAD7) && (
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>Based on your recent assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lastPHQ9?.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
                {lastGAD7?.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Crisis Alert */}
        {(lastPHQ9?.severity === "severe" || lastGAD7?.severity === "severe") && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your recent assessment indicates severe symptoms. Please consider reaching out to a mental health
              professional or crisis support service immediately. If you're in immediate danger, call emergency
              services.
              <div className="mt-2">
                <Button variant="destructive" size="sm" asChild>
                  <Link href="/crisis">Get Crisis Support</Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </DashboardLayout>
  )
}
