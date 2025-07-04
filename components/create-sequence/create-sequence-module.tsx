"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, FileText, User, GraduationCap, Target, CheckCircle, TrendingUp, PenTool, Users } from "lucide-react"

interface FormData {
  // Información General
  programa: string
  ciclo: string
  titulo: string

  // Información del Docente
  nombre: string
  perfil: string
  posgrado: string

  // Información Académica
  asignatura: string
  aprendizajes: string
  horas: string
  impacto: string
  competencia: string

  // Criterios de Evaluación
  criterio1: string
  porcentaje1: string
  criterio2: string
  porcentaje2: string
  criterio3: string
  porcentaje3: string

  // Contenido del Curso
  bienvenida: string
  contextualizacion: string
  introduccion: string
  tema: string
  subtema1: string
  subtema2: string
  objetivo: string
  evidencia: string
  instrumento: string

  // Actividades
  actividad_inicio: string
  actividad_desarrollo: string
  actividad_cierre: string
  actividad_final: string

  // Evaluación
  criterio_eval1: string
  criterio_eval2: string
  instrumento1: string
  instrumento2: string

  // Firmas
  nombre_firma: string
  firma_academia: string
  firma_coordinacion: string
}

const initialFormData: FormData = {
  programa: "",
  ciclo: "",
  titulo: "",
  nombre: "",
  perfil: "",
  posgrado: "",
  asignatura: "",
  aprendizajes: "",
  horas: "",
  impacto: "",
  competencia: "",
  criterio1: "",
  porcentaje1: "",
  criterio2: "",
  porcentaje2: "",
  criterio3: "",
  porcentaje3: "",
  bienvenida: "",
  contextualizacion: "",
  introduccion: "",
  tema: "",
  subtema1: "",
  subtema2: "",
  objetivo: "",
  evidencia: "",
  instrumento: "",
  actividad_inicio: "",
  actividad_desarrollo: "",
  actividad_cierre: "",
  actividad_final: "",
  criterio_eval1: "",
  criterio_eval2: "",
  instrumento1: "",
  instrumento2: "",
  nombre_firma: "",
  firma_academia: "",
  firma_coordinacion: "",
}

const programas = [
  "Licenciatura en Educación",
  "Licenciatura en Matemáticas",
  "Ingeniería en Sistemas",
  "Licenciatura en Psicología",
  "Administración de Empresas",
  "Derecho",
  "Medicina",
  "Arquitectura",
]

const ciclos = ["2025-A", "2025-B", "2026-A", "2026-B"]

const areasAcademicas = [
  "Academia de Matemáticas",
  "Academia de Ciencias",
  "Academia de Humanidades",
  "Academia de Ingeniería",
  "Academia de Medicina",
  "Academia de Artes",
  "Academia de Educación",
  "Academia de Administración",
]

export function CreateSequenceModule() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    // Validaciones básicas
    if (!formData.titulo.trim()) newErrors.titulo = "El título es requerido"
    if (!formData.programa) newErrors.programa = "El programa es requerido"
    if (!formData.ciclo) newErrors.ciclo = "El ciclo es requerido"
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre del docente es requerido"
    if (!formData.asignatura.trim()) newErrors.asignatura = "La asignatura es requerida"
    if (!formData.horas.trim()) newErrors.horas = "Las horas son requeridas"

    // Validar porcentajes
    const p1 = Number.parseInt(formData.porcentaje1) || 0
    const p2 = Number.parseInt(formData.porcentaje2) || 0
    const p3 = Number.parseInt(formData.porcentaje3) || 0

    if (p1 + p2 + p3 !== 100) {
      newErrors.porcentajes = "Los porcentajes deben sumar 100%"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simular envío a API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitSuccess(true)
      setFormData(initialFormData)

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error("Error al enviar:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setErrors({})
    setSubmitSuccess(false)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Crear Secuencia Didáctica</h2>
        <p className="text-gray-600 mt-2">Completa el formulario para crear una nueva secuencia didáctica</p>
      </div>

      {submitSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            ¡Secuencia didáctica creada exitosamente! Ha sido enviada para revisión.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información General */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              Información General
            </CardTitle>
            <CardDescription>Datos básicos de la secuencia didáctica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="programa">Programa *</Label>
                <Select value={formData.programa} onValueChange={(value) => handleInputChange("programa", value)}>
                  <SelectTrigger className={errors.programa ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona un programa" />
                  </SelectTrigger>
                  <SelectContent>
                    {programas.map((programa) => (
                      <SelectItem key={programa} value={programa}>
                        {programa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.programa && <p className="text-sm text-red-500">{errors.programa}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciclo">Ciclo *</Label>
                <Select value={formData.ciclo} onValueChange={(value) => handleInputChange("ciclo", value)}>
                  <SelectTrigger className={errors.ciclo ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecciona un ciclo" />
                  </SelectTrigger>
                  <SelectContent>
                    {ciclos.map((ciclo) => (
                      <SelectItem key={ciclo} value={ciclo}>
                        {ciclo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ciclo && <p className="text-sm text-red-500">{errors.ciclo}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="titulo">Título de la Secuencia *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleInputChange("titulo", e.target.value)}
                placeholder="Ej: Plan de Unidad de Expresiones Algebraicas"
                className={errors.titulo ? "border-red-500" : ""}
              />
              {errors.titulo && <p className="text-sm text-red-500">{errors.titulo}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Información del Docente */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5" />
              Información del Docente
            </CardTitle>
            <CardDescription>Datos del docente responsable</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre Completo *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Nombre completo del docente"
                  className={errors.nombre ? "border-red-500" : ""}
                />
                {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="perfil">Perfil Académico</Label>
                <Input
                  id="perfil"
                  value={formData.perfil}
                  onChange={(e) => handleInputChange("perfil", e.target.value)}
                  placeholder="Ej: Maestría en Educación"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="posgrado">Posgrado</Label>
              <Input
                id="posgrado"
                value={formData.posgrado}
                onChange={(e) => handleInputChange("posgrado", e.target.value)}
                placeholder="Ej: Doctorado en Ciencias de la Educación"
              />
            </div>
          </CardContent>
        </Card>

        {/* Información Académica */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="h-5 w-5" />
              Información Académica
            </CardTitle>
            <CardDescription>Detalles académicos de la secuencia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="asignatura">Asignatura *</Label>
                <Input
                  id="asignatura"
                  value={formData.asignatura}
                  onChange={(e) => handleInputChange("asignatura", e.target.value)}
                  placeholder="Nombre de la asignatura"
                  className={errors.asignatura ? "border-red-500" : ""}
                />
                {errors.asignatura && <p className="text-sm text-red-500">{errors.asignatura}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="horas">Horas *</Label>
                <Input
                  id="horas"
                  type="number"
                  value={formData.horas}
                  onChange={(e) => handleInputChange("horas", e.target.value)}
                  placeholder="Número de horas"
                  className={errors.horas ? "border-red-500" : ""}
                />
                {errors.horas && <p className="text-sm text-red-500">{errors.horas}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aprendizajes">Aprendizajes Esperados</Label>
              <Textarea
                id="aprendizajes"
                value={formData.aprendizajes}
                onChange={(e) => handleInputChange("aprendizajes", e.target.value)}
                placeholder="Describe los aprendizajes esperados..."
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="impacto">Impacto</Label>
              <Textarea
                id="impacto"
                value={formData.impacto}
                onChange={(e) => handleInputChange("impacto", e.target.value)}
                placeholder="Describe el impacto esperado..."
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="competencia">Competencia</Label>
              <Textarea
                id="competencia"
                value={formData.competencia}
                onChange={(e) => handleInputChange("competencia", e.target.value)}
                placeholder="Describe las competencias a desarrollar..."
                className="min-h-[80px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Criterios de Evaluación */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle className="h-5 w-5" />
              Criterios de Evaluación
            </CardTitle>
            <CardDescription>Define los criterios y porcentajes de evaluación (deben sumar 100%)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errors.porcentajes && (
              <Alert variant="destructive">
                <AlertDescription>{errors.porcentajes}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="criterio1">Criterio 1</Label>
                <Input
                  id="criterio1"
                  value={formData.criterio1}
                  onChange={(e) => handleInputChange("criterio1", e.target.value)}
                  placeholder="Ej: Evaluación continua"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="porcentaje1">Porcentaje 1 (%)</Label>
                <Input
                  id="porcentaje1"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.porcentaje1}
                  onChange={(e) => handleInputChange("porcentaje1", e.target.value)}
                  placeholder="30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="criterio2">Criterio 2</Label>
                <Input
                  id="criterio2"
                  value={formData.criterio2}
                  onChange={(e) => handleInputChange("criterio2", e.target.value)}
                  placeholder="Ej: Examen final"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="porcentaje2">Porcentaje 2 (%)</Label>
                <Input
                  id="porcentaje2"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.porcentaje2}
                  onChange={(e) => handleInputChange("porcentaje2", e.target.value)}
                  placeholder="40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="criterio3">Criterio 3</Label>
                <Input
                  id="criterio3"
                  value={formData.criterio3}
                  onChange={(e) => handleInputChange("criterio3", e.target.value)}
                  placeholder="Ej: Participación"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="porcentaje3">Porcentaje 3 (%)</Label>
                <Input
                  id="porcentaje3"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.porcentaje3}
                  onChange={(e) => handleInputChange("porcentaje3", e.target.value)}
                  placeholder="30"
                />
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Total:{" "}
              {(Number.parseInt(formData.porcentaje1) || 0) +
                (Number.parseInt(formData.porcentaje2) || 0) +
                (Number.parseInt(formData.porcentaje3) || 0)}
              %
            </div>
          </CardContent>
        </Card>

        {/* Contenido del Curso */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5" />
              Contenido del Curso
            </CardTitle>
            <CardDescription>Estructura y contenido de la secuencia didáctica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bienvenida">Bienvenida</Label>
              <Textarea
                id="bienvenida"
                value={formData.bienvenida}
                onChange={(e) => handleInputChange("bienvenida", e.target.value)}
                placeholder="Mensaje de bienvenida para los estudiantes..."
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contextualizacion">Contextualización</Label>
              <Textarea
                id="contextualizacion"
                value={formData.contextualizacion}
                onChange={(e) => handleInputChange("contextualizacion", e.target.value)}
                placeholder="Contextualización del curso..."
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="introduccion">Introducción</Label>
              <Textarea
                id="introduccion"
                value={formData.introduccion}
                onChange={(e) => handleInputChange("introduccion", e.target.value)}
                placeholder="Introducción al tema..."
                className="min-h-[80px] resize-none"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="tema">Tema Principal</Label>
              <Input
                id="tema"
                value={formData.tema}
                onChange={(e) => handleInputChange("tema", e.target.value)}
                placeholder="Tema principal de la secuencia"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subtema1">Subtema 1</Label>
                <Input
                  id="subtema1"
                  value={formData.subtema1}
                  onChange={(e) => handleInputChange("subtema1", e.target.value)}
                  placeholder="Primer subtema"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtema2">Subtema 2</Label>
                <Input
                  id="subtema2"
                  value={formData.subtema2}
                  onChange={(e) => handleInputChange("subtema2", e.target.value)}
                  placeholder="Segundo subtema"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="objetivo">Objetivo</Label>
              <Textarea
                id="objetivo"
                value={formData.objetivo}
                onChange={(e) => handleInputChange("objetivo", e.target.value)}
                placeholder="Objetivo de la secuencia didáctica..."
                className="min-h-[80px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actividades */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Actividades
            </CardTitle>
            <CardDescription>Define las actividades de la secuencia didáctica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="actividad_inicio">Actividad de Inicio</Label>
                <Textarea
                  id="actividad_inicio"
                  value={formData.actividad_inicio}
                  onChange={(e) => handleInputChange("actividad_inicio", e.target.value)}
                  placeholder="Describe la actividad de inicio..."
                  className="min-h-[100px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actividad_desarrollo">Actividad de Desarrollo</Label>
                <Textarea
                  id="actividad_desarrollo"
                  value={formData.actividad_desarrollo}
                  onChange={(e) => handleInputChange("actividad_desarrollo", e.target.value)}
                  placeholder="Describe la actividad de desarrollo..."
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="actividad_cierre">Actividad de Cierre</Label>
                <Textarea
                  id="actividad_cierre"
                  value={formData.actividad_cierre}
                  onChange={(e) => handleInputChange("actividad_cierre", e.target.value)}
                  placeholder="Describe la actividad de cierre..."
                  className="min-h-[100px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="actividad_final">Actividad Final</Label>
                <Textarea
                  id="actividad_final"
                  value={formData.actividad_final}
                  onChange={(e) => handleInputChange("actividad_final", e.target.value)}
                  placeholder="Describe la actividad final..."
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evaluación */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PenTool className="h-5 w-5" />
              Evaluación
            </CardTitle>
            <CardDescription>Instrumentos y criterios de evaluación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="evidencia">Evidencia</Label>
                <Textarea
                  id="evidencia"
                  value={formData.evidencia}
                  onChange={(e) => handleInputChange("evidencia", e.target.value)}
                  placeholder="Describe las evidencias de aprendizaje..."
                  className="min-h-[80px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instrumento">Instrumento</Label>
                <Textarea
                  id="instrumento"
                  value={formData.instrumento}
                  onChange={(e) => handleInputChange("instrumento", e.target.value)}
                  placeholder="Describe los instrumentos de evaluación..."
                  className="min-h-[80px] resize-none"
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="criterio_eval1">Criterio de Evaluación 1</Label>
                <Input
                  id="criterio_eval1"
                  value={formData.criterio_eval1}
                  onChange={(e) => handleInputChange("criterio_eval1", e.target.value)}
                  placeholder="Primer criterio de evaluación"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="criterio_eval2">Criterio de Evaluación 2</Label>
                <Input
                  id="criterio_eval2"
                  value={formData.criterio_eval2}
                  onChange={(e) => handleInputChange("criterio_eval2", e.target.value)}
                  placeholder="Segundo criterio de evaluación"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instrumento1">Instrumento 1</Label>
                <Input
                  id="instrumento1"
                  value={formData.instrumento1}
                  onChange={(e) => handleInputChange("instrumento1", e.target.value)}
                  placeholder="Primer instrumento"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instrumento2">Instrumento 2</Label>
                <Input
                  id="instrumento2"
                  value={formData.instrumento2}
                  onChange={(e) => handleInputChange("instrumento2", e.target.value)}
                  placeholder="Segundo instrumento"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Firmas y Validaciones */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              Firmas y Validaciones
            </CardTitle>
            <CardDescription>Información de firmas y validaciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre_firma">Nombre y Firma</Label>
                <Input
                  id="nombre_firma"
                  value={formData.nombre_firma}
                  onChange={(e) => handleInputChange("nombre_firma", e.target.value)}
                  placeholder="Nombre para la firma"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firma_academia">Firma Academia</Label>
                <Select
                  value={formData.firma_academia}
                  onValueChange={(value) => handleInputChange("firma_academia", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una academia" />
                  </SelectTrigger>
                  <SelectContent>
                    {areasAcademicas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firma_coordinacion">Firma Coordinación</Label>
              <Input
                id="firma_coordinacion"
                value={formData.firma_coordinacion}
                onChange={(e) => handleInputChange("firma_coordinacion", e.target.value)}
                placeholder="Coordinación Académica"
              />
            </div>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none sm:min-w-[200px]">
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Guardando..." : "Guardar Secuencia"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex-1 sm:flex-none sm:min-w-[150px] border border-gray-300"
          >
            Limpiar Formulario
          </Button>
        </div>
      </form>
    </div>
  )
}
