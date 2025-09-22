import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Brain, Users, MessageCircle, FileText, BarChart3, Lock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Maanam <span className="text-base font-normal">Heal. Grow. Thrive.</span></h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            <Shield className="h-4 w-4 mr-2" />
            Privacy-First Mental Health Support
          </Badge>
          <h2 className="text-5xl font-bold text-balance mb-6">
            Your mental health journey, <span className="text-primary">supported by AI</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Access confidential mental health support with AI-powered assessments, crisis detection, and personalized
            resources. Your privacy and wellbeing are our top priorities.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">Start Your Journey</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/resources">Explore Resources</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Comprehensive Mental Health Support</h3>
            <p className="text-muted-foreground text-lg">
              Evidence-based tools and AI assistance designed with your privacy in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI Support Chat</CardTitle>
                <CardDescription>24/7 AI companion with crisis detection and empathetic responses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Crisis intervention protocols</li>
                  <li>• Personalized coping strategies</li>
                  <li>• Anonymous conversations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Self-Assessment Tools</CardTitle>
                <CardDescription>Validated PHQ-9 and GAD-7 assessments for depression and anxiety</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Track mood patterns</li>
                  <li>• Progress monitoring</li>
                  <li>• Professional-grade tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Resource Library</CardTitle>
                <CardDescription>Curated psychoeducational content and coping strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Evidence-based articles</li>
                  <li>• Guided exercises</li>
                  <li>• Crisis resources</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Privacy Protection</CardTitle>
                <CardDescription>End-to-end encryption and anonymous data handling</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• No personal identifiers</li>
                  <li>• Secure data storage</li>
                  <li>• HIPAA-compliant design</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>Monitor your mental health journey with detailed insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Mood trend analysis</li>
                  <li>• Assessment history</li>
                  <li>• Goal setting tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Professional Support</CardTitle>
                <CardDescription>Connect with mental health professionals when needed</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Crisis hotline integration</li>
                  <li>• Professional referrals</li>
                  <li>• Emergency protocols</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-3xl font-bold mb-6">Ready to prioritize your mental health?</h3>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands who trust Maanam for confidential, AI-powered mental health support. <span className="text-base font-normal">Heal. Grow. Thrive.</span>
          </p>
          <Button size="lg" asChild>
            <Link href="/register">Start Your Free Assessment</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold">Maanam <span className="text-base font-normal">Heal. Grow. Thrive.</span></span>
              </div>
              <p className="text-sm text-muted-foreground">Privacy-first mental health support powered by AI</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/crisis" className="hover:text-foreground">
                    Crisis Resources
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Privacy</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="hover:text-foreground">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Maanam. Heal. Grow. Thrive. All rights reserved. This is not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
