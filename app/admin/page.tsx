"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Clock,
  Heart,
  FileText,
} from "lucide-react"

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 1247,
  activeUsers: 892,
  anonymousUsers: 623,
  totalAssessments: 3456,
  chatSessions: 5678,
  crisisInterventions: 23,
  resourceViews: 8901,
}

const assessmentData = [
  { month: "Jan", PHQ9: 120, GAD7: 98 },
  { month: "Feb", PHQ9: 145, GAD7: 112 },
  { month: "Mar", PHQ9: 167, GAD7: 134 },
  { month: "Apr", PHQ9: 189, GAD7: 156 },
  { month: "May", PHQ9: 203, GAD7: 178 },
  { month: "Jun", PHQ9: 234, GAD7: 201 },
]

const severityDistribution = [
  { name: "Minimal", value: 45, color: "#10b981" },
  { name: "Mild", value: 30, color: "#f59e0b" },
  { name: "Moderate", value: 18, color: "#f97316" },
  { name: "Severe", value: 7, color: "#ef4444" },
]

const crisisData = [
  { date: "2024-01-15", time: "14:30", severity: "High", resolved: true },
  { date: "2024-01-14", time: "22:15", severity: "Critical", resolved: true },
  { date: "2024-01-13", time: "16:45", severity: "Medium", resolved: true },
  { date: "2024-01-12", time: "09:20", severity: "High", resolved: false },
]

export default function AdminDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">MindCare Admin</h1>
                <p className="text-sm text-muted-foreground">Institutional Analytics Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Protected
              </Badge>
              <Button variant="outline" size="sm">
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Privacy Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            This dashboard displays anonymized, aggregated data only. No personal information or individual user data is
            accessible to protect user privacy and comply with HIPAA regulations.
          </AlertDescription>
        </Alert>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8.2%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalAssessments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +15.3%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crisis Interventions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.crisisInterventions}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -5.2%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Management</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Assessment Trends */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Assessment Completion Trends</CardTitle>
                  <CardDescription>Monthly PHQ-9 and GAD-7 assessment completions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={assessmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="PHQ9" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="GAD7" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* User Engagement */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Platform usage statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Chat Sessions</span>
                      <span className="font-medium">{mockStats.chatSessions.toLocaleString()}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Resource Views</span>
                      <span className="font-medium">{mockStats.resourceViews.toLocaleString()}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Anonymous Users</span>
                      <span className="font-medium">{mockStats.anonymousUsers.toLocaleString()}</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Severity Distribution */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Mental Health Severity Distribution</CardTitle>
                <CardDescription>Aggregated assessment results (anonymized)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={severityDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {severityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-4">
                    {severityDistribution.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Assessment Analytics</CardTitle>
                <CardDescription>Detailed assessment completion and outcome data</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={assessmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="PHQ9" fill="#8884d8" />
                    <Bar dataKey="GAD7" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crisis" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Crisis Management Dashboard
                </CardTitle>
                <CardDescription>Monitor and track crisis interventions (anonymized data)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {crisisData.map((crisis, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{crisis.date}</span>
                          <span className="text-sm text-muted-foreground">{crisis.time}</span>
                        </div>
                        <Badge
                          variant={
                            crisis.severity === "Critical"
                              ? "destructive"
                              : crisis.severity === "High"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {crisis.severity}
                        </Badge>
                      </div>
                      <Badge variant={crisis.resolved ? "default" : "secondary"}>
                        {crisis.resolved ? "Resolved" : "Active"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Resource Usage Analytics
                </CardTitle>
                <CardDescription>Track resource engagement and effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-primary">2,456</div>
                    <div className="text-sm text-muted-foreground">Coping Resources</div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-primary">1,789</div>
                    <div className="text-sm text-muted-foreground">Educational Content</div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-primary">892</div>
                    <div className="text-sm text-muted-foreground">Crisis Resources</div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-primary">3,234</div>
                    <div className="text-sm text-muted-foreground">Self-Care Guides</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
