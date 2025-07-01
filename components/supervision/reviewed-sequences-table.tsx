"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Download, User, BookOpen } from 'lucide-react'
import { TablePagination } from "../shared/table-pagination"
import { SequenceDetailModal } from "../sequence-detail-modal"
import { generatePDF } from "@/utils/pdf-generator"
import { LoadingSpinner } from "@/components/shared/loading-spinner";

const reviewedSequencesData = [
  { id: 1, titulo: "Modern Literature Analysis", autor: "Ana García", asignatura: "Literature", estado: "Aprobado" },
  {
    id: 2,
    titulo: "Introduction to Programming",
    autor: "Carlos López",
    asignatura: "Computer Science",
    estado: "Rechazado",
  },
  {
    id: 3,
    titulo: "World War II Research Project",
    autor: "Patricia Fernández",
    asignatura: "History",
    estado: "Aprobado",
  },
  { id: 4, titulo: "Química Orgánica Básica", autor: "Dr. Fernando Ruiz", asignatura: "Química", estado: "Aprobado" },
  {
    id: 5,
    titulo: "Álgebra Lineal Aplicada",
    autor: "Prof. Isabel Moreno",
    asignatura: "Matemáticas",
    estado: "Rechazado",
  },
  { id: 6, titulo: "Anatomía Humana", autor: "Dra. Claudia Vargas", asignatura: "Medicina", estado: "Aprobado" },
  { id: 7, titulo: "Marketing Digital", autor: "Lic. Roberto Díaz", asignatura: "Marketing", estado: "Aprobado" },
  {
    id: 8,
    titulo: "Derecho Constitucional",
    autor: "Abg. María Elena Soto",
    asignatura: "Derecho",
    estado: "Rechazado",
  },
  {
    id: 9,
    titulo: "Ecología y Medio Ambiente",
    autor: "Biol. Jorge Mendoza",
    asignatura: "Biología",
    estado: "Aprobado",
  },
  {
    id: 10,
    titulo: "Administración de Empresas",
    autor: "MBA Carlos Herrera",
    asignatura: "Administración",
    estado: "Aprobado",
  },
]

export function ReviewedSequencesTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<number | null>(null)
  const itemsPerPage = 4
  const totalPages = Math.ceil(reviewedSequencesData.length / itemsPerPage)

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedDetailData, setSelectedDetailData] = useState<any>(null)

  const getDetailData = (item: (typeof reviewedSequencesData)[0]) => ({
    id: item.id,
    title: item.titulo,
    author: item.autor,
    subject: item.asignatura,
    submittedDate: "2025-04-15",
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
  })

  const handleViewDetails = (item: (typeof reviewedSequencesData)[0]) => {
    const detailData = getDetailData(item)
    setSelectedDetailData(detailData)
    setIsDetailModalOpen(true)
  }

  const handleDownloadPDF = async (item: (typeof reviewedSequencesData)[0]) => {
    setIsGeneratingPDF(item.id)
    try {
      const detailData = getDetailData(item)
      await generatePDF(detailData, `secuencia-didactica-${item.titulo.replace(/\s+/g, "-").toLowerCase()}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPDF(null)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = reviewedSequencesData.slice(startIndex, endIndex)

  const getStatusBadge = (estado: string) => {
    if (estado === "Aprobado") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Aprobado
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Rechazado
        </span>
      )
    }
  }

  return (
    <Card>
      <LoadingSpinner isLoading={isGeneratingPDF !== null} />
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">Secuencias Revisadas</CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-600">
          Secuencias didácticas previamente revisadas
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
                  <TableCell>{getStatusBadge(item.estado)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(item)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadPDF(item)}
                        disabled={isGeneratingPDF === item.id}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        {isGeneratingPDF === item.id ? "..." : "PDF"}
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
                      {getStatusBadge(item.estado)}
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
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(item)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownloadPDF(item)}
                    disabled={isGeneratingPDF === item.id}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isGeneratingPDF === item.id ? "Generando..." : "PDF"}
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
