"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, Info, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { GAD7_QUESTIONS, RESPONSE_OPTIONS } from "@/lib/types"

export default function GAD7AssessmentPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<number[]>(new Array(GAD7_QUESTIONS.length).fill(-1))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<any>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  


  useEffect(() => {
    if (assessmentResult && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [assessmentResult])

  const handleResponseChange = (value: string) => {
    const newResponses = [...responses]
    newResponses[currentQuestion] = Number.parseInt(value)
    setResponses(newResponses)
  }

  const canProceed = responses[currentQuestion] !== -1
  const isLastQuestion = currentQuestion === GAD7_QUESTIONS.length - 1
  const progress = ((currentQuestion + 1) / GAD7_QUESTIONS.length) * 100

  const handleNext = () => {
    if (canProceed && !isLastQuestion) setCurrentQuestion(currentQuestion + 1)
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1)
  }

  const handleSubmit = async () => {
    if (!canProceed || !user) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          type: "GAD7",
          responses,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setAssessmentResult(data.data)
        // resultsRef.current?.scrollIntoView({ behavior: "smooth" })
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
            <h1 className="text-2xl font-bold">GAD-7 Anxiety Assessment</h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {GAD7_QUESTIONS.length}
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
            <CardTitle className="text-lg text-balance">{GAD7_QUESTIONS[currentQuestion]}</CardTitle>
            <CardDescription>
              Select the option that best describes your experience over the past 2 weeks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={responses[currentQuestion].toString()} onValueChange={handleResponseChange} className="space-y-4">
              {RESPONSE_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>

              {isLastQuestion ? (
                <Button onClick={handleSubmit} disabled={!canProceed || isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Complete Assessment"}
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!canProceed}>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Question Navigation */}
        <div className="flex items-center justify-center gap-2">
          {GAD7_QUESTIONS.map((_, index) => (
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

        {/* Assessment Result Card */}
        {assessmentResult && (
          <Card className="border-border bg-card" id="gad7-results" ref={resultsRef}>
            <CardHeader>
              <CardTitle>Assessment Completed</CardTitle>
              <CardDescription>
                Your GAD-7 score: {assessmentResult.score}/21 ({assessmentResult.severity})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {assessmentResult.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
