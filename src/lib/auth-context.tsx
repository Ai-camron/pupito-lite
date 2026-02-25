'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { isOwnerEmail } from '@/lib/owner'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isOwner: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check for saved login state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('pupito_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('pupito_user')
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, accept any valid email/password combination
      if (email && password.length >= 8) {
        const newUser: User = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email,
          firstName: email.split('@')[0] || 'Anime',
          lastName: 'Fan',
          avatar: undefined
        }
        
        setUser(newUser)
        localStorage.setItem('pupito_user', JSON.stringify(newUser))
        return true
      }
      
      return false
    } catch {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demo purposes, accept any valid data
      if (email && password.length >= 8 && firstName && lastName) {
        const newUser: User = {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          email,
          firstName,
          lastName,
          avatar: undefined
        }
        
        setUser(newUser)
        localStorage.setItem('pupito_user', JSON.stringify(newUser))
        return true
      }
      
      return false
    } catch {
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('pupito_user')
  }

  const value = {
    user,
    isLoggedIn: !!user,
    isOwner: isOwnerEmail(user?.email),
    login,
    logout,
    signup,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
