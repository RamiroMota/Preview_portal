"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  User,
  BookOpen,
  Calendar,
  GraduationCap,
  Target,
  TrendingUp,
  CheckCircle,
  FileText,
  Users,
  PenTool,
  Download,
  XCircle,
} from "lucide-react"
import { generatePDF } from "@/utils/pdf-generator"
import { useState } from "react"

interface SequenceData {
  id: number
  title: string
  author: string
  subject: string
  submittedDate: string
  status: string
  programa: string
  ciclo: string
  nombre: string
  perfil: string
  posgrado: string
  asignatura: string
  aprendizajes: string
  horas: number
  impacto: string
  competencia: string
  criterio1: string
  porcentaje1: number
  criterio2: string
  porcentaje2: number
  criterio3: string
  porcentaje3: number
  bienvenida: string
  contextualizacion: string
  introduccion: string
  tema: string
  subtema1: string
  subtema2: string
  objetivo: string
  evidencia: string
  instrumento: string
  actividad_inicio: string
  actividad_desarrollo: string
  actividad_cierre: string
  actividad_final: string
  criterio_eval1: string
  criterio_eval2: string
  instrumento1: string
  instrumento2: string
  nombre_firma: string
  firma_academia: string
  firma_coordinacion: string
  dia: number
  mes: string
  anio: number
}

interface SequenceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  data: SequenceData | null
  showActions?: boolean
  onApprove?: () => void
  onReject?: () => void
  isApproving?: boolean
  isRejecting?: boolean
}

export function SequenceDetailModal({
  isOpen,
  onClose,
  data,
  showActions = false,
  onApprove,
  onReject,
  isApproving = false,
  isRejecting = false,
}: SequenceDetailModalProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  if (!data) return null

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generatePDF(data, `secuencia-didactica-${data.title.replace(/\s+/g, "-").toLowerCase()}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Pendiente: { color: "bg-yellow-100 text-yellow-800", label: "Pendiente" },
      Aprobado: { color: "bg-green-100 text-green-800", label: "Aprobado" },
      Rechazado: { color: "bg-red-100 text-red-800", label: "Rechazado" },
      "En Supervisión": { color: "bg-blue-100 text-blue-800", label: "En Supervisión" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["Pendiente"]

    return <Badge className={`${config.color} border-0`}>{config.label}</Badge>
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-xl font-semibold">
              <FileText className="h-6 w-6" />
              Detalle de Secuencia Didáctica
            </DialogTitle>
            <div className="flex items-center gap-2">
              {showActions && data?.status === "Pendiente" && (
                <>
                  <Button
                    onClick={onApprove}
                    disabled={isApproving || isRejecting}
                    className="bg-green-200 text-green-700 border border-green-700 hover:bg-green-500 hover:text-green-100"
                    size="sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isApproving ? "Aprobando..." : "Aprobar"}
                  </Button>
                  <Button onClick={onReject} disabled={isApproving || isRejecting} variant="destructive" size="sm" className="bg-red-200 text-red-700 border border-red-700 hover:bg-red-500 hover:text-red-100">
                    <XCircle className="h-4 w-4 mr-2" />
                    Rechazar
                  </Button>
                </>
              )}
              <Button
                onClick={handleDownloadPDF}
                className="bg-amber-200 text-amber-700 border border-amber-700 hover:bg-amber-500 hover:text-amber-100"
                disabled={isGeneratingPDF}
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGeneratingPDF ? "Generando..." : "Descargar PDF"}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-80px)] px-6 pb-6">
          <div className="space-y-6">
            {/* Información General */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5" />
                  Información General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">ID</label>
                    <p className="text-sm text-gray-900 mt-1">#{data.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Estado</label>
                    <div className="mt-1">{getStatusBadge(data.status)}</div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Título</label>
                  <p className="text-sm text-gray-900 mt-1">{data.title}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Programa</label>
                    <p className="text-sm text-gray-900 mt-1">{data.programa}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Ciclo</label>
                    <p className="text-sm text-gray-900 mt-1">{data.ciclo}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Fecha de Envío</label>
                    <p className="text-sm text-gray-900 mt-1">{data.submittedDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Horas</label>
                    <p className="text-sm text-gray-900 mt-1">{data.horas} horas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información del Docente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5" />
                  Información del Docente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nombre</label>
                    <p className="text-sm text-gray-900 mt-1">{data.nombre}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Perfil</label>
                    <p className="text-sm text-gray-900 mt-1">{data.perfil}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Posgrado</label>
                  <p className="text-sm text-gray-900 mt-1">{data.posgrado}</p>
                </div>
              </CardContent>
            </Card>

            {/* Información Académica */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="h-5 w-5" />
                  Información Académica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Asignatura</label>
                  <p className="text-sm text-gray-900 mt-1">{data.asignatura}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Aprendizajes Esperados</label>
                  <p className="text-sm text-gray-900 mt-1">{data.aprendizajes}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Impacto</label>
                  <p className="text-sm text-gray-900 mt-1">{data.impacto}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Competencia</label>
                  <p className="text-sm text-gray-900 mt-1">{data.competencia}</p>
                </div>
              </CardContent>
            </Card>

            {/* Criterios de Evaluación */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5" />
                  Criterios de Evaluación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{data.criterio1}</span>
                    <Badge variant="secondary">{data.porcentaje1}%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{data.criterio2}</span>
                    <Badge variant="secondary">{data.porcentaje2}%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{data.criterio3}</span>
                    <Badge variant="secondary">{data.porcentaje3}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contenido del Curso */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5" />
                  Contenido del Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Bienvenida</label>
                  <p className="text-sm text-gray-900 mt-1">{data.bienvenida}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Contextualización</label>
                  <p className="text-sm text-gray-900 mt-1">{data.contextualizacion}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Introducción</label>
                  <p className="text-sm text-gray-900 mt-1">{data.introduccion}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-700">Tema Principal</label>
                  <p className="text-sm text-gray-900 mt-1">{data.tema}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Subtema 1</label>
                    <p className="text-sm text-gray-900 mt-1">{data.subtema1}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Subtema 2</label>
                    <p className="text-sm text-gray-900 mt-1">{data.subtema2}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Objetivo</label>
                  <p className="text-sm text-gray-900 mt-1">{data.objetivo}</p>
                </div>
              </CardContent>
            </Card>

            {/* Actividades */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5" />
                  Actividades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Actividad de Inicio</label>
                    <p className="text-sm text-gray-900 mt-1">{data.actividad_inicio}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Actividad de Desarrollo</label>
                    <p className="text-sm text-gray-900 mt-1">{data.actividad_desarrollo}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Actividad de Cierre</label>
                    <p className="text-sm text-gray-900 mt-1">{data.actividad_cierre}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Actividad Final</label>
                    <p className="text-sm text-gray-900 mt-1">{data.actividad_final}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evaluación */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <PenTool className="h-5 w-5" />
                  Evaluación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Evidencia</label>
                  <p className="text-sm text-gray-900 mt-1">{data.evidencia}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Instrumento</label>
                  <p className="text-sm text-gray-900 mt-1">{data.instrumento}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Criterio de Evaluación 1</label>
                    <p className="text-sm text-gray-900 mt-1">{data.criterio_eval1}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Criterio de Evaluación 2</label>
                    <p className="text-sm text-gray-900 mt-1">{data.criterio_eval2}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Instrumento 1</label>
                    <p className="text-sm text-gray-900 mt-1">{data.instrumento1}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Instrumento 2</label>
                    <p className="text-sm text-gray-900 mt-1">{data.instrumento2}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Firmas y Fechas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Firmas y Validaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nombre y Firma</label>
                    <p className="text-sm text-gray-900 mt-1">{data.nombre_firma}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Firma Academia</label>
                    <p className="text-sm text-gray-900 mt-1">{data.firma_academia}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Firma Coordinación</label>
                    <p className="text-sm text-gray-900 mt-1">{data.firma_coordinacion}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Fecha: {data.dia} de {data.mes} de {data.anio}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
