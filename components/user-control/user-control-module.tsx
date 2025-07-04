"use client"

import { useState } from "react"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Shield } from "lucide-react"
import { UsersTable } from "./users-table"
import { RolesPermissionsTable } from "./roles-permissions-table"

type ActiveTab = "users" | "roles"

export function UserControlModule() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("users")

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Panel de Control de Usuarios</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Gestión de usuarios y permisos del sistema</p>
      </div>

      {/* Tabs Navigation */}
      <Card className="shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg border border-gray-500">
              <Button
                variant={activeTab === "users" ? "control" : "default"}
                size="sm"
                onClick={() => setActiveTab("users")}
                className={`flex items-center gap-2 ${
                  activeTab === "users" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <Users className="h-4 w-4" />
                Usuarios
              </Button>
              <Button
                variant={activeTab === "roles" ? "control" : "default"}
                size="sm"
                onClick={() => setActiveTab("roles")}
                className={`flex items-center gap-2 ${
                  activeTab === "roles" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                <Shield className="h-4 w-4" />
                Roles y Permisos
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tab Content */}
      {activeTab === "users" && <UsersTable />}
      {activeTab === "roles" && <RolesPermissionsTable />}
    </div>
  )
}
