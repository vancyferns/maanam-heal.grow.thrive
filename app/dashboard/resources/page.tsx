"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Search,
  Clock,
  BookOpen,
  Heart,
  Brain,
  Shield,
  Phone,
  Filter,
  Star,
  Bookmark,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import type { Resource } from "@/lib/types"

const categories = [
  { id: "all", label: "All Resources", icon: FileText },
  { id: "coping", label: "Coping Strategies", icon: Heart },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "crisis", label: "Crisis Support", icon: Phone },
  { id: "self-care", label: "Self-Care", icon: Shield },
]

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Understanding Depression: A Comprehensive Guide",
    description: "Learn about the symptoms, causes, and treatment options for depression.",
    content: "Depression is a common mental health condition that affects millions of people worldwide...",
    category: "education",
    tags: ["depression", "mental health", "symptoms", "treatment"],
    readTime: 8,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "5-Minute Breathing Exercise for Anxiety",
    description: "A quick breathing technique to help manage anxiety in the moment.",
    content: "When anxiety strikes, controlled breathing can help calm your nervous system...",
    category: "coping",
    tags: ["anxiety", "breathing", "coping skills", "mindfulness"],
    readTime: 3,
    createdAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    title: "Crisis Resources and Emergency Contacts",
    description: "Important phone numbers and resources for mental health emergencies.",
    content: "If you are in crisis, please reach out for help immediately...",
    category: "crisis",
    tags: ["crisis", "emergency", "hotline", "support"],
    readTime: 2,
    createdAt: new Date("2024-01-03"),
  },
  {
    id: "4",
    title: "Building Healthy Sleep Habits",
    description: "How quality sleep impacts your mood and mental wellbeing.",
    content: "Sleep and mental health are closely connected. Poor sleep can worsen depression and anxiety...",
    category: "self-care",
    tags: ["sleep", "self-care", "routine", "wellness"],
    readTime: 6,
    createdAt: new Date("2024-01-04"),
  },
  {
    id: "5",
    title: "Progressive Muscle Relaxation Technique",
    description: "A step-by-step guide to reducing physical tension and stress.",
    content: "Progressive muscle relaxation is a technique that involves tensing and relaxing muscle groups...",
    category: "coping",
    tags: ["relaxation", "stress", "tension", "mindfulness"],
    readTime: 10,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "6",
    title: "Understanding Anxiety Disorders",
    description: "Different types of anxiety disorders and their symptoms.",
    content: "Anxiety disorders are among the most common mental health conditions...",
    category: "education",
    tags: ["anxiety", "disorders", "symptoms", "types"],
    readTime: 12,
    createdAt: new Date("2024-01-06"),
  },
]

export default function ResourcesPage() {
  const { user } = useAuth()
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>([])

  useEffect(() => {
    let filtered = resources

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((resource) => resource.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Sort resources
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "shortest":
          return a.readTime - b.readTime
        case "longest":
          return b.readTime - a.readTime
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredResources(filtered)
  }, [resources, selectedCategory, searchQuery, sortBy])

  const toggleBookmark = (resourceId: string) => {
    setBookmarkedResources((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId],
    )
  }

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((cat) => cat.id === category)
    return categoryData?.icon || FileText
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "coping":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "education":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "crisis":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "self-care":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Resource Library</h1>
          <p className="text-muted-foreground mt-1">
            Evidence-based resources and tools to support your mental health journey
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="shortest">Shortest</SelectItem>
                    <SelectItem value="longest">Longest</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-6">
            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
              </p>
              {bookmarkedResources.length > 0 && (
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Bookmark className="h-4 w-4" />
                  {bookmarkedResources.length} Bookmarked
                </Button>
              )}
            </div>

            {/* Resource Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const CategoryIcon = getCategoryIcon(resource.category)
                return (
                  <Card
                    key={resource.id}
                    className="border-border bg-card hover:bg-card/80 transition-colors cursor-pointer group"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="h-5 w-5 text-primary" />
                          <Badge className={getCategoryColor(resource.category)} variant="outline">
                            {resource.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.preventDefault()
                            toggleBookmark(resource.id)
                          }}
                        >
                          <Bookmark
                            className={`h-4 w-4 ${
                              bookmarkedResources.includes(resource.id)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </Button>
                      </div>
                      <CardTitle className="text-lg text-balance group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-sm">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{resource.readTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>4.8</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/dashboard/resources/${resource.id}`}>Read Article</Link>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Try adjusting your search terms or filters to find the resources you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured Resources */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Featured Resources
            </CardTitle>
            <CardDescription>Highly recommended resources for mental health support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-red-500" />
                  <h4 className="font-semibold">Crisis Support Hotlines</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  24/7 crisis support and suicide prevention resources
                </p>
                <Button size="sm" variant="destructive" asChild>
                  <Link href="/crisis">Get Help Now</Link>
                </Button>
              </div>
              <div className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold">Mental Health First Aid</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how to recognize and respond to mental health crises
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/dashboard/resources/mental-health-first-aid">Learn More</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
