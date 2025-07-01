"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  loading: boolean
}

interface RegisterData {
  nombre: string
  apellido: string
  email: string
  curp: string
  areaAcademica: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular verificación de token almacenado
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simular validación (en producción esto sería una llamada real a la API)
      if (email === "admin@portal.edu" && password === "admin123") {
        const userData = {
          id: "1",
          name: "Ramiro Mota Pérez",
          email: email,
          role: "admin",
        }
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error("Error en login:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true)
    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simular registro exitoso
      const newUser = {
        id: Date.now().toString(),
        name: `${userData.nombre} ${userData.apellido}`,
        email: userData.email,
        role: "user",
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Error en registro:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
