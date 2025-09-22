"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Eye, EyeOff, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Mock authentication - in real app, this would call your auth API
      if (email && password) {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Store mock user session
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: "user1",
            email,
            isAnonymous: false,
          }),
        )

        router.push("/dashboard")
      } else {
        setError("Please enter both email and password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnonymousLogin = async () => {
    setIsLoading(true)
    try {
      // Create anonymous session
      await new Promise((resolve) => setTimeout(resolve, 500))

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: `anon_${Date.now()}`,
          email: null,
          isAnonymous: true,
        }),
      )

      router.push("/dashboard")
    } catch (err) {
      setError("Failed to create anonymous session")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Maanam <span className="text-base font-normal">Heal. Grow. Thrive.</span></h1>
          </div>
          <h2 className="text-3xl font-bold text-balance">Welcome back</h2>
          <p className="text-muted-foreground mt-2">Sign in to continue your mental health journey</p>
        </div>

        {/* Login Form */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent"
                onClick={handleAnonymousLogin}
                disabled={isLoading}
              >
                <Shield className="h-4 w-4 mr-2" />
                Continue Anonymously
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-2">
                Anonymous access provides full privacy with no data collection
              </p>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Your privacy is our priority. All data is encrypted and secure.</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
