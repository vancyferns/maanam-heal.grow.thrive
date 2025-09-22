"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { User } from "./types"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser({
          ...userData,
          createdAt: new Date(userData.createdAt || Date.now()),
          lastActive: new Date(),
        })
      } catch (error) {
        console.error("Failed to parse stored user data:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call your auth API
    const userData = {
      id: `user_${Date.now()}`,
      email,
      createdAt: new Date(),
      lastActive: new Date(),
      isAnonymous: false,
    }

    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const loginAnonymously = async () => {
    const userData = {
      id: `anon_${Date.now()}`,
      email: "",
      createdAt: new Date(),
      lastActive: new Date(),
      isAnonymous: true,
    }

    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const register = async (email: string, password: string) => {
    // Mock registration - in real app, this would call your auth API
    const userData = {
      id: `user_${Date.now()}`,
      email,
      createdAt: new Date(),
      lastActive: new Date(),
      isAnonymous: false,
    }

    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  const updateLastActive = () => {
    if (user) {
      const updatedUser = { ...user, lastActive: new Date() }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    }
  }

  return {
    user,
    isLoading,
    login,
    loginAnonymously,
    register,
    logout,
    updateLastActive,
    isAuthenticated: !!user,
  }
}

// Higher-order component for protected routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth()

    if (isLoading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      )
    }

    if (!user) {
      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
      return null
    }

    return <Component {...props} />
  }
}
