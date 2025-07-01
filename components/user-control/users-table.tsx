"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Edit, User, Mail } from "lucide-react"
import { TablePagination } from "../shared/table-pagination"

interface UserData {
  id: number
  nombre: string
  email: string
  rol: string
  estado: boolean
  fechaCreacion: string
}

const usersData: UserData[] = [
  {
    id: 1,
    nombre: "María López",
    email: "maria@example.com",
    rol: "Administrador",
    estado: true,
    fechaCreacion: "15 ene 2025",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    email: "juan@example.com",
    rol: "Supervisor",
    estado: true,
    fechaCreacion: "12 ene 2025",
  },
  {
    id: 3,
    nombre: "Ana García",
    email: "ana@example.com",
    rol: "Gerencia",
    estado: true,
    fechaCreacion: "10 ene 2025",
  },
  {
    id: 4,
    nombre: "Carlos Rodríguez",
    email: "carlos@example.com",
    rol: "Maestro",
    estado: true,
    fechaCreacion: "08 ene 2025",
  },
  {
    id: 5,
    nombre: "Sara Fernández",
    email: "sara@example.com",
    rol: "Maestro",
    estado: false,
    fechaCreacion: "05 ene 2025",
  },
  {
    id: 6,
    nombre: "Luis Martínez",
    email: "luis@example.com",
    rol: "Supervisor",
    estado: true,
    fechaCreacion: "03 ene 2025",
  },
  {
    id: 7,
    nombre: "Carmen Vega",
    email: "carmen@example.com",
    rol: "Maestro",
    estado: true,
    fechaCreacion: "01 ene 2025",
  },
  {
    id: 8,
    nombre: "Roberto Silva",
    email: "roberto@example.com",
    rol: "Gerencia",
    estado: false,
    fechaCreacion: "28 dic 2024",
  },
]

export function UsersTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState(usersData)
  const itemsPerPage = 5

  // Filtrar usuarios por término de búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.rol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredUsers.slice(startIndex, endIndex)

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, estado: !user.estado } : user)))
  }

  const getRoleBadge = (rol: string) => {
    const roleConfig = {
      Administrador: { color: "bg-red-100 text-red-800", label: "Administrador" },
      Supervisor: { color: "bg-blue-100 text-blue-800", label: "Supervisor" },
      Gerencia: { color: "bg-purple-100 text-purple-800", label: "Gerencia" },
      Maestro: { color: "bg-green-100 text-green-800", label: "Maestro" },
    }

    const config = roleConfig[rol as keyof typeof roleConfig] || roleConfig["Maestro"]
    return <Badge className={`${config.color} border-0 text-xs`}>{config.label}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">Gestión de Usuarios</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Administra los usuarios del sistema y sus estados
            </CardDescription>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium text-gray-700">Nombre</TableHead>
                <TableHead className="font-medium text-gray-700">Correo electrónico</TableHead>
                <TableHead className="font-medium text-gray-700">Rol</TableHead>
                <TableHead className="font-medium text-gray-700">Estado</TableHead>
                <TableHead className="font-medium text-gray-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{user.nombre}</TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.rol)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={user.estado}
                        onCheckedChange={() => handleToggleStatus(user.id)}
                        className="data-[state=checked]:bg-purple-600"
                      />
                      <span className={`text-sm ${user.estado ? "text-green-600" : "text-gray-400"}`}>
                        {user.estado ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {currentData.map((user) => (
            <Card key={user.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getRoleBadge(user.rol)}
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={user.estado}
                          onCheckedChange={() => handleToggleStatus(user.id)}
                          className="data-[state=checked]:bg-purple-600"
                          size="sm"
                        />
                        <span className={`text-xs ${user.estado ? "text-green-600" : "text-gray-400"}`}>
                          {user.estado ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm leading-tight">{user.nombre}</h3>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Creado: {user.fechaCreacion}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </CardContent>
    </Card>
  )
}
