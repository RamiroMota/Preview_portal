"use client"

import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { user, logout } = useAuth()

  // Obtener fecha actual en formato español
  const getCurrentDate = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return now.toLocaleDateString("es-ES", options)
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-lg px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
            <span className="hidden sm:inline">Portal Académico</span>
            <span className="sm:hidden">Portal</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 truncate">
            <span className="hidden md:inline">{getCurrentDate()}</span>
            <span className="md:hidden">{new Date().toLocaleDateString("es-ES")}</span>
          </p>
        </div>

        <div className="flex items-center ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 p-2 sm:p-3">
                <div className="bg-blue-600 p-1.5 sm:p-2 rounded-full">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-32">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-32">{user?.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="sm:hidden">
                  <p className="font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <div className="hidden sm:block">Mi Cuenta</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
