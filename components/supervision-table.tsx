"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, CheckCircle, Calendar, User, BookOpen } from "lucide-react"
import { TablePagination } from "@/components/table-pagination"
import { SequenceDetailModal } from "@/components/sequence-detail-modal"

const supervisionData = [
  {
    id: 1,
    titulo: "Análisis de Datos Estadísticos",
    autor: "Dr. María González",
    asignatura: "Estadística",
    fechaEnvio: "15 abr 2025",
    estado: "En Supervisión",
  },
  {
    id: 2,
    titulo: "Fundamentos de Química Orgánica",
    autor: "Prof. Carlos Ruiz",
    asignatura: "Química",
    fechaEnvio: "14 abr 2025",
    estado: "En Supervisión",
  },
  {
    id: 3,
    titulo: "Historia del Arte Contemporáneo",
    autor: "Dra. Ana Martínez",
    asignatura: "Arte",
    fechaEnvio: "13 abr 2025",
    estado: "En Supervisión",
  },
  {
    id: 4,
    titulo: "Programación Avanzada en Python",
    autor: "Ing. Luis Pérez",
    asignatura: "Informática",
    fechaEnvio: "12 abr 2025",
    estado: "En Supervisión",
  },
  {
    id: 5,
    titulo: "Teorías de la Comunicación",
    autor: "Lic. Sofia Torres",
    asignatura: "Comunicación",
    fechaEnvio: "11 abr 2025",
    estado: "En Supervisión",
  },
  {
    id: 6,
    titulo: "Microeconomía Aplicada",
    autor: "Dr. Roberto Silva",
    asignatura: "Economía",
    fechaEnvio: "10 abr 2025",
    estado: "En Supervisión",
  },
  {
    id: 7,
    titulo: "Biología Molecular",
    autor: "Dra. Carmen López",
    asignatura: "Biología",
    fechaEnvio: "09 abr 2025",
    estado: "En Supervisión",
  },
  {
    id: 8,
    titulo: "Filosofía Moderna",
    autor: "Prof. Diego Morales",
    asignatura: "Filosofía",
    fechaEnvio: "08 abr 2025",
    estado: "En Supervisión",
  },
  {
    id: 9,
    titulo: "Cálculo Diferencial",
    autor: "Dr. Elena Vargas",
    asignatura: "Matemáticas",
    fechaEnvio: "07 abr 2025",
    estado: "En Supervisión",
  },
  {
    id: 10,
    titulo: "Literatura Latinoamericana",
    autor: "Prof. Miguel Santos",
    asignatura: "Literatura",
    fechaEnvio: "06 abr 2025",
    estado: "En Supervisión",
  },
]

export function SupervisionTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedDetailData, setSelectedDetailData] = useState<any>(null)
  const itemsPerPage = 4
  const totalPages = Math.ceil(supervisionData.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = supervisionData.slice(startIndex, endIndex)

  const handleViewDetails = (item: (typeof supervisionData)[0]) => {
    const detailData = {
      id: item.id,
      title: item.titulo,
      author: item.autor,
      subject: item.asignatura,
      submittedDate: item.fechaEnvio,
      status: item.estado,
      programa: "Licenciatura en Educación",
      ciclo: "2025-A",
      nombre: item.autor,
      perfil: "Maestría en Educación",
      posgrado: "Doctorado en Ciencias",
      asignatura: item.asignatura,
      aprendizajes: "Comprensión de conceptos fundamentales",
      horas: 40,
      impacto: "Desarrollo de habilidades analíticas",
      competencia: "Análisis y razonamiento lógico",
      criterio1: "Evaluación continua",
      porcentaje1: 30,
      criterio2: "Examen final",
      porcentaje2: 40,
      criterio3: "Participación",
      porcentaje3: 30,
      bienvenida: "Bienvenidos al curso",
      contextualizacion: "Contexto académico del curso",
      introduccion: "Introducción a los conceptos",
      tema: "Tema principal del curso",
      subtema1: "Subtema 1",
      subtema2: "Subtema 2",
      objetivo: "Objetivos de aprendizaje",
      evidencia: "Evidencias de aprendizaje",
      instrumento: "Instrumentos de evaluación",
      actividad_inicio: "Actividad inicial",
      actividad_desarrollo: "Actividad de desarrollo",
      actividad_cierre: "Actividad de cierre",
      actividad_final: "Proyecto final",
      criterio_eval1: "Criterio de evaluación 1",
      criterio_eval2: "Criterio de evaluación 2",
      instrumento1: "Instrumento 1",
      instrumento2: "Instrumento 2",
      nombre_firma: item.autor,
      firma_academia: "Academia correspondiente",
      firma_coordinacion: "Coordinación Académica",
      dia: 15,
      mes: "Abril",
      anio: 2025,
    }
    setSelectedDetailData(detailData)
    setIsDetailModalOpen(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">Secuencias de Supervisión</CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600">
          Secuencias didácticas en proceso de supervisión académica
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
                <TableHead className="font-medium text-gray-700">Estado</TableHead>
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
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {item.estado}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(item)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Supervisar
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
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {item.estado}
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

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(item)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-green-600 border-green-200 hover:bg-green-50"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Supervisar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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
