"use client"

import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function Home() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <Dashboard />
}
