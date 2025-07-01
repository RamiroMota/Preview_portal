"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, CheckCircle, XCircle, Calendar, User, BookOpen } from "lucide-react"
import { TablePagination } from "@/components/table-pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SequenceDetailModal } from "@/components/sequence-detail-modal"

const pendingReviewsData = [
  {
    id: 1,
    titulo: "Plan de Unidad de Expresiones Algebraicas",
    autor: "María Rodríguez",
    asignatura: "Matemáticas",
    fechaEnvio: "14 abr 2025",
  },
  {
    id: 2,
    titulo: "Cell Biology Lab Activities",
    autor: "John Smith",
    asignatura: "Biology",
    fechaEnvio: "13 abr 2025",
  },
  {
    id: 3,
    titulo: "Introducción a la Física Cuántica",
    autor: "Dr. Pedro Jiménez",
    asignatura: "Física",
    fechaEnvio: "12 abr 2025",
  },
  {
    id: 4,
    titulo: "Metodología de la Investigación",
    autor: "Lic. Carmen Vega",
    asignatura: "Metodología",
    fechaEnvio: "11 abr 2025",
  },
  {
    id: 5,
    titulo: "Gramática Avanzada del Inglés",
    autor: "Prof. Sarah Johnson",
    asignatura: "Inglés",
    fechaEnvio: "10 abr 2025",
  },
  {
    id: 6,
    titulo: "Psicología del Desarrollo",
    autor: "Dra. Laura Mendoza",
    asignatura: "Psicología",
    fechaEnvio: "09 abr 2025",
  },
  {
    id: 7,
    titulo: "Contabilidad Financiera",
    autor: "CPA José Ramírez",
    asignatura: "Contabilidad",
    fechaEnvio: "08 abr 2025",
  },
  {
    id: 8,
    titulo: "Diseño Gráfico Digital",
    autor: "Arq. Patricia Herrera",
    asignatura: "Diseño",
    fechaEnvio: "07 abr 2025",
  },
  {
    id: 9,
    titulo: "Sociología Contemporánea",
    autor: "Dr. Manuel Castro",
    asignatura: "Sociología",
    fechaEnvio: "06 abr 2025",
  },
  {
    id: 10,
    titulo: "Educación Física Adaptada",
    autor: "Prof. Andrea Flores",
    asignatura: "Educación Física",
    fechaEnvio: "05 abr 2025",
  },
]

// Datos detallados de ejemplo para el modal
const getDetailedData = (id: number) => ({
  id: id,
  title: "Plan de Unidad de Expresiones Algebraicas",
  author: "Maria Rodriguez",
  subject: "Matemáticas",
  submittedDate: "2025-04-15",
  status: "Pendiente",
  programa: "Licenciatura en Educación",
  ciclo: "2025-A",
  nombre: "Maria Rodriguez",
  perfil: "Maestría en Educación",
  posgrado: "Doctorado en Ciencias",
  asignatura: "Matemáticas Avanzadas",
  aprendizajes: "Comprensión de expresiones algebraicas y su aplicación",
  horas: 40,
  impacto: "Desarrollo de habilidades analíticas para la resolución de problemas",
  competencia: "Análisis matemático y razonamiento lógico",
  criterio1: "Evaluación continua",
  porcentaje1: 30,
  criterio2: "Examen final",
  porcentaje2: 40,
  criterio3: "Participación",
  porcentaje3: 30,
  bienvenida: "Bienvenidos al curso de álgebra",
  contextualizacion: "El álgebra es fundamental para el desarrollo matemático",
  introduccion: "Estudiaremos conceptos fundamentales del álgebra",
  tema: "Expresiones Algebraicas",
  subtema1: "Operaciones básicas",
  subtema2: "Factorización",
  objetivo: "Comprender y aplicar expresiones algebraicas",
  evidencia: "Resolver problemas algebraicos complejos",
  instrumento: "Evaluación escrita",
  actividad_inicio: "Introducción al tema",
  actividad_desarrollo: "Ejercicios prácticos",
  actividad_cierre: "Repaso general",
  actividad_final: "Proyecto integrador",
  criterio_eval1: "Precisión en los cálculos",
  criterio_eval2: "Metodología de resolución",
  instrumento1: "Rúbrica de evaluación",
  instrumento2: "Lista de cotejo",
  nombre_firma: "María Rodríguez",
  firma_academia: "Academia de Matemáticas",
  firma_coordinacion: "Coordinación Académica",
  dia: 15,
  mes: "Abril",
  anio: 2025,
})

export function PendingReviewsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof pendingReviewsData)[0] | null>(null)
  const [selectedDetailData, setSelectedDetailData] = useState<any>(null)
  const [rejectReason, setRejectReason] = useState("")
  const itemsPerPage = 4
  const totalPages = Math.ceil(pendingReviewsData.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = pendingReviewsData.slice(startIndex, endIndex)

  const handleViewDetails = (item: (typeof pendingReviewsData)[0]) => {
    const detailData = getDetailedData(item.id)
    setSelectedDetailData(detailData)
    setIsDetailModalOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">Revisiones Pendientes</CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600">
          Secuencias didácticas esperando su revisión
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden lg:block rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium text-gray-700 w-16">No.</TableHead>
                <TableHead className="font-medium text-gray-700">Título</TableHead>
                <TableHead className="font-medium text-gray-700">Autor</TableHead>
                <TableHead className="font-medium text-gray-700">Asignatura</TableHead>
                <TableHead className="font-medium text-gray-700">Fecha de Envío</TableHead>
                <TableHead className="font-medium text-gray-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-500">{startIndex + index + 1}</TableCell>
                  <TableCell className="font-medium text-gray-900">{item.titulo}</TableCell>
                  <TableCell className="text-gray-600">{item.autor}</TableCell>
                  <TableCell className="text-gray-600">{item.asignatura}</TableCell>
                  <TableCell className="text-gray-600">{item.fechaEnvio}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(item)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(item)
                          setIsRejectModalOpen(true)
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {currentData.map((item, index) => (
            <Card key={item.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{startIndex + index + 1}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm leading-tight">{item.titulo}</h3>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{item.autor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{item.asignatura}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{item.fechaEnvio}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleViewDetails(item)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aprobar
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedItem(item)
                        setIsRejectModalOpen(true)
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Rechazar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        {/* Modal de Rechazo */}
        <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
          <DialogContent className="sm:max-w-[600px] mx-4 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                <XCircle className="h-5 w-5" />
                Rechazar Secuencia
              </DialogTitle>
            </DialogHeader>

            {selectedItem && (
              <div className="space-y-6">
                <div className="text-sm text-gray-600">
                  {selectedItem.titulo} por {selectedItem.autor}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Asignatura</Label>
                      <div className="text-sm text-gray-900 mt-1">{selectedItem.asignatura}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Estado</Label>
                      <div className="text-sm text-gray-900 mt-1">Pendiente</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Fecha de Envío</Label>
                      <div className="text-sm text-gray-900 mt-1">{selectedItem.fechaEnvio}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">ID</Label>
                      <div className="text-sm text-gray-900 mt-1">#{selectedItem.id}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="reject-reason" className="text-sm font-medium text-gray-700">
                    Motivo de Rechazo
                  </Label>
                  <Textarea
                    id="reject-reason"
                    placeholder="Por favor explique por qué esta secuencia está siendo rechazada"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setIsRejectModalOpen(false)
                      setSelectedItem(null)
                      setRejectReason("")
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      console.log("Rechazando secuencia:", selectedItem.id, "Motivo:", rejectReason)
                      setIsRejectModalOpen(false)
                      setSelectedItem(null)
                      setRejectReason("")
                    }}
                  >
                    Rechazar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Detalle */}
        <SequenceDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false)
            setSelectedDetailData(null)
          }}
          data={selectedDetailData}
        />
      </CardContent>
    </Card>
  )
}
