"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, AlertTriangle, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { PHQ9_QUESTIONS, RESPONSE_OPTIONS } from "@/lib/types"

export default function PHQ9AssessmentPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<number[]>(new Array(PHQ9_QUESTIONS.length).fill(-1))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResponseChange = (value: string) => {
    const newResponses = [...responses]
    newResponses[currentQuestion] = Number.parseInt(value)
    setResponses(newResponses)
  }

  const canProceed = responses[currentQuestion] !== -1
  const isLastQuestion = currentQuestion === PHQ9_QUESTIONS.length - 1
  const progress = ((currentQuestion + 1) / PHQ9_QUESTIONS.length) * 100

  const handleNext = () => {
    if (canProceed && !isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    if (!canProceed || !user) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          type: "PHQ9",
          responses,
        }),
      })

      const data = await response.json()
      if (data.success) {
        router.push(`/dashboard/assessments/phq9/results?id=${data.data.id}`)
      } else {
        throw new Error("Failed to submit assessment")
      }
    } catch (error) {
      console.error("Error submitting assessment:", error)
      alert("Failed to submit assessment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">PHQ-9 Depression Assessment</h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {PHQ9_QUESTIONS.length}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Over the last 2 weeks, how often have you been bothered by the following problems? Please answer honestly
            for the most accurate results.
          </AlertDescription>
        </Alert>

        {/* Question Card */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-balance">{PHQ9_QUESTIONS[currentQuestion]}</CardTitle>
            <CardDescription>
              Select the option that best describes your experience over the past 2 weeks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={responses[currentQuestion].toString()}
              onValueChange={handleResponseChange}
              className="space-y-4"
            >
              {RESPONSE_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Crisis Warning for Question 9 */}
            {currentQuestion === 8 && responses[currentQuestion] >= 1 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  If you're having thoughts of hurting yourself, please reach out for help immediately:
                  <div className="mt-2 space-y-1">
                    <div>• National Suicide Prevention Lifeline: 988</div>
                    <div>• Crisis Text Line: Text HOME to 741741</div>
                    <div>• Emergency Services: 911</div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {isLastQuestion ? (
                <Button onClick={handleSubmit} disabled={!canProceed || isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Complete Assessment"}
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!canProceed}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <div className="flex items-center justify-center gap-2">
          {PHQ9_QUESTIONS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                index === currentQuestion
                  ? "bg-primary text-primary-foreground"
                  : responses[index] !== -1
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
