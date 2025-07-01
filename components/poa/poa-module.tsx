"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Save, Eye, Edit, Plus, User, Calendar, ArrowLeft } from "lucide-react"
import { NewPOAForm } from "./new-poa-form" // Importar el nuevo componente

interface POAItem {
  id: number
  programa: string
  coordinador: string
  ciclo: string
  estado: "Activo" | "En Revisión" | "Completado" | "Pendiente"
  fechaCreacion: string
  observaciones: string
}

const poaData: POAItem[] = [
  {
    id: 1,
    programa: "Licenciatura en Matemáticas",
    coordinador: "Dr. María González",
    ciclo: "2025-A",
    estado: "Activo",
    fechaCreacion: "15 ene 2025",
    observaciones: "Programa en desarrollo normal, sin observaciones especiales.",
  },
  {
    id: 2,
    programa: "Ingeniería en Sistemas",
    coordinador: "Ing. Carlos Ruiz",
    ciclo: "2025-A",
    estado: "En Revisión",
    fechaCreacion: "12 ene 2025",
    observaciones: "Pendiente revisión de contenidos del módulo 3.",
  },
  {
    id: 3,
    programa: "Licenciatura en Psicología",
    coordinador: "Dra. Ana Martínez",
    ciclo: "2025-A",
    estado: "Completado",
    fechaCreacion: "10 ene 2025",
    observaciones: "Programa completado exitosamente. Excelentes resultados.",
  },
  {
    id: 4,
    programa: "Administración de Empresas",
    coordinador: "Lic. Luis Pérez",
    ciclo: "2025-A",
    estado: "Pendiente",
    fechaCreacion: "08 ene 2025",
    observaciones: "Esperando aprobación de recursos adicionales.",
  },
  {
    id: 5,
    programa: "Licenciatura en Educación",
    coordinador: "Prof. Sofia Torres",
    ciclo: "2025-A",
    estado: "Activo",
    fechaCreacion: "05 ene 2025",
    observaciones: "Programa funcionando correctamente.",
  },
  {
    id: 6,
    programa: "Derecho",
    coordinador: "Abg. Roberto Silva",
    ciclo: "2025-A",
    estado: "En Revisión",
    fechaCreacion: "03 ene 2025",
    observaciones: "Revisión de marco legal actualizado.",
  },
]

export function POAModule() {
  const [selectedPOA, setSelectedPOA] = useState<POAItem | null>(null)
  const [observations, setObservations] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [showNewPOAForm, setShowNewPOAForm] = useState(false) // Nuevo estado

  const handleRowSelect = (poa: POAItem) => {
    setSelectedPOA(poa)
    setObservations(poa.observaciones)
    setIsEditing(false)
  }

  const handleSaveObservations = () => {
    if (selectedPOA) {
      console.log("Guardando observaciones para POA:", selectedPOA.id, observations)
      setIsEditing(false)
      selectedPOA.observaciones = observations
    }
  }

  const getStatusBadge = (estado: POAItem["estado"]) => {
    const statusConfig = {
      Activo: { color: "bg-green-100 text-green-800", label: "Activo" },
      "En Revisión": { color: "bg-yellow-100 text-yellow-800", label: "En Revisión" },
      Completado: { color: "bg-blue-100 text-blue-800", label: "Completado" },
      Pendiente: { color: "bg-gray-100 text-gray-800", label: "Pendiente" },
    }

    const config = statusConfig[estado]
    return <Badge className={`${config.color} border-0 text-xs`}>{config.label}</Badge>
  }

  if (showNewPOAForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Nuevo POA</h2>
          <Button variant="outline" onClick={() => setShowNewPOAForm(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a POAs
          </Button>
        </div>
        <NewPOAForm />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">POA - Programa Operativo Anual</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Gestión y seguimiento de programas operativos anuales</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Tabla de POAs */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5" />
                    Programas Operativos Anuales
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Selecciona un programa para ver y editar sus observaciones
                  </CardDescription>
                </div>
                <Button size="sm" className="w-full sm:w-auto" onClick={() => setShowNewPOAForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo POA
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Desktop Table View */}
              <div className="hidden lg:block rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium text-gray-700">Programa</TableHead>
                      <TableHead className="font-medium text-gray-700">Coordinador</TableHead>
                      <TableHead className="font-medium text-gray-700">Ciclo</TableHead>
                      <TableHead className="font-medium text-gray-700">Estado</TableHead>
                      <TableHead className="font-medium text-gray-700">Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {poaData.map((poa) => (
                      <TableRow
                        key={poa.id}
                        className={`cursor-pointer hover:bg-gray-50 ${
                          selectedPOA?.id === poa.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                        }`}
                        onClick={() => handleRowSelect(poa)}
                      >
                        <TableCell className="font-medium text-gray-900">{poa.programa}</TableCell>
                        <TableCell className="text-gray-600">{poa.coordinador}</TableCell>
                        <TableCell className="text-gray-600">{poa.ciclo}</TableCell>
                        <TableCell>{getStatusBadge(poa.estado)}</TableCell>
                        <TableCell className="text-gray-600">{poa.fechaCreacion}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {poaData.map((poa) => (
                  <Card
                    key={poa.id}
                    className={`border cursor-pointer transition-colors ${
                      selectedPOA?.id === poa.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleRowSelect(poa)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusBadge(poa.estado)}
                            <span className="text-xs text-gray-500">{poa.ciclo}</span>
                          </div>
                          <h3 className="font-medium text-gray-900 text-sm leading-tight truncate">{poa.programa}</h3>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{poa.coordinador}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{poa.fechaCreacion}</span>
                        </div>
                      </div>

                      {selectedPOA?.id === poa.id && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-blue-600 font-medium">Seleccionado para edición</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de Observaciones */}
        <div className="xl:col-span-1">
          <Card className="h-fit sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedPOA ? "Observaciones y Comentarios" : "Selecciona un POA"}
              </CardTitle>
              <CardDescription className="text-sm">
                {selectedPOA
                  ? `${selectedPOA.programa} - ${selectedPOA.ciclo}`
                  : "Haz clic en una fila de la tabla para ver las observaciones"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedPOA ? (
                <>
                  {/* Información del POA seleccionado */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Estado:</span>
                      {getStatusBadge(selectedPOA.estado)}
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-sm font-medium text-gray-700 flex-shrink-0">Coordinador:</span>
                      <span className="text-sm text-gray-900 text-right">{selectedPOA.coordinador}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Fecha de Creación:</span>
                      <span className="text-sm text-gray-900">{selectedPOA.fechaCreacion}</span>
                    </div>
                  </div>

                  {/* Campo de observaciones */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="observations">Observaciones</Label>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                        <Edit className="h-4 w-4 mr-1" />
                        {isEditing ? "Cancelar" : "Editar"}
                      </Button>
                    </div>
                    <Textarea
                      id="observations"
                      placeholder="Escribe observaciones o comentarios sobre este POA..."
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      className="min-h-[120px] resize-none text-sm"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={handleSaveObservations} disabled={!isEditing} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalle
                    </Button>
                  </div>

                  {/* Historial de cambios */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Historial Reciente</h4>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <span className="font-medium">15 ene 2025:</span> POA creado por {selectedPOA.coordinador}
                      </div>
                      <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <span className="font-medium">16 ene 2025:</span> Estado actualizado a {selectedPOA.estado}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">
                    Selecciona un programa de la tabla para ver y editar sus observaciones
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total POAs</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{poaData.length}</p>
              </div>
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Activos</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {poaData.filter((p) => p.estado === "Activo").length}
                </p>
              </div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 sm:h-4 sm:w-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">En Revisión</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                  {poaData.filter((p) => p.estado === "En Revisión").length}
                </p>
              </div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 sm:h-4 sm:w-4 bg-yellow-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Completados</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                  {poaData.filter((p) => p.estado === "Completado").length}
                </p>
              </div>
              <div className="h-6 w-6 sm:h-8 sm:w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 sm:h-4 sm:w-4 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
