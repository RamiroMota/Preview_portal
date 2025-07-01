import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
            <span className="hidden sm:inline">Sistema de Supervisión Académica</span>
            <span className="sm:hidden">Supervisión</span>
          </h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>Ramiro Mota Pérez</span>
          </div>
          <div className="sm:hidden">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="text-gray-600">
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
