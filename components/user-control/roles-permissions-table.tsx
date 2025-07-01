"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Save, RotateCcw } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
}

interface RolePermissions {
  [key: string]: boolean
}

interface PermissionsState {
  [permissionId: string]: RolePermissions
}

const permissions: Permission[] = [
  {
    id: "view_sequences",
    name: "Ver secuencias didácticas",
    description: "Permite ver todas las secuencias didácticas",
  },
  {
    id: "create_sequences",
    name: "Crear secuencias didácticas",
    description: "Permite crear nuevas secuencias didácticas",
  },
  {
    id: "approve_sequences",
    name: "Aprobar secuencias didácticas",
    description: "Permite aprobar o rechazar secuencias didácticas",
  },
  {
    id: "manage_poa",
    name: "Gestionar POA",
    description: "Permite acceder y modificar el Plan Operativo Anual",
  },
  {
    id: "manage_users",
    name: "Administrar usuarios",
    description: "Permite crear, editar y eliminar usuarios",
  },
  {
    id: "view_reports",
    name: "Ver reportes",
    description: "Permite acceder a los reportes del sistema",
  },
  {
    id: "export_data",
    name: "Exportar datos",
    description: "Permite exportar datos del sistema",
  },
  {
    id: "system_config",
    name: "Configuración del sistema",
    description: "Permite modificar la configuración del sistema",
  },
]

const roles = ["Administrador", "Supervisor", "Gerencia", "Maestro"]

const initialPermissions: PermissionsState = {
  view_sequences: {
    Administrador: true,
    Supervisor: true,
    Gerencia: true,
    Maestro: true,
  },
  create_sequences: {
    Administrador: true,
    Supervisor: false,
    Gerencia: false,
    Maestro: true,
  },
  approve_sequences: {
    Administrador: true,
    Supervisor: true,
    Gerencia: false,
    Maestro: false,
  },
  manage_poa: {
    Administrador: true,
    Supervisor: true,
    Gerencia: true,
    Maestro: false,
  },
  manage_users: {
    Administrador: true,
    Supervisor: false,
    Gerencia: false,
    Maestro: false,
  },
  view_reports: {
    Administrador: true,
    Supervisor: true,
    Gerencia: true,
    Maestro: false,
  },
  export_data: {
    Administrador: true,
    Supervisor: true,
    Gerencia: true,
    Maestro: true,
  },
  system_config: {
    Administrador: true,
    Supervisor: false,
    Gerencia: false,
    Maestro: false,
  },
}

export function RolesPermissionsTable() {
  const [permissionsState, setPermissionsState] = useState<PermissionsState>(initialPermissions)
  const [hasChanges, setHasChanges] = useState(false)

  const handlePermissionChange = (permissionId: string, role: string, checked: boolean) => {
    setPermissionsState((prev) => ({
      ...prev,
      [permissionId]: {
        ...prev[permissionId],
        [role]: checked,
      },
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log("Guardando permisos:", permissionsState)
    setHasChanges(false)
    // Aquí iría la lógica para guardar en el backend
  }

  const handleReset = () => {
    setPermissionsState(initialPermissions)
    setHasChanges(false)
  }

  const getRoleColor = (role: string) => {
    const colors = {
      Administrador: "text-red-700",
      Supervisor: "text-blue-700",
      Gerencia: "text-purple-700",
      Maestro: "text-green-700",
    }
    return colors[role as keyof typeof colors] || "text-gray-700"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">Configuración de Roles y Permisos</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Define los permisos para cada rol en el sistema
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset} disabled={!hasChanges} size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Restablecer
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium text-gray-700 min-w-[200px]">Permiso</TableHead>
                <TableHead className="font-medium text-gray-700 min-w-[300px]">Descripción</TableHead>
                {roles.map((role) => (
                  <TableHead key={role} className={`font-medium text-center min-w-[120px] ${getRoleColor(role)}`}>
                    {role}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{permission.name}</TableCell>
                  <TableCell className="text-gray-600 text-sm">{permission.description}</TableCell>
                  {roles.map((role) => (
                    <TableCell key={role} className="text-center">
                      <div className="flex justify-center">
                        <Checkbox
                          checked={permissionsState[permission.id]?.[role] || false}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, role, checked as boolean)}
                          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {permissions.map((permission) => (
            <Card key={permission.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{permission.name}</h3>
                  <p className="text-xs text-gray-600">{permission.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <div key={role} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className={`text-sm font-medium ${getRoleColor(role)}`}>{role}</span>
                      <Checkbox
                        checked={permissionsState[permission.id]?.[role] || false}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, role, checked as boolean)}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {hasChanges && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Tienes cambios sin guardar. No olvides hacer clic en "Guardar Cambios" para aplicar las modificaciones.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
