"use client"

import { Input } from "@/components/ui/input"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GripVertical, Save, Trash2, Download } from "lucide-react"
import { generatePOAPDF } from "@/utils/pdf-generator" // Importar la nueva función de PDF

interface YearlyPercentage {
  year: number
  value: number
}

interface Purpose {
  id: number
  title: string
  observation: string
  date: string
  yearlyPercentages: YearlyPercentage[]
}

const initialPurposes = [
  {
    id: 1,
    title:
      "Fortalecer la calidad de la formación de estudiantes de licenciatura y posgrado en sus diversas modalidades educativas.",
  },
  {
    id: 2,
    title:
      "Fortalecer la planta docente a través de programas de formación, evaluación y consolidación de la docencia, investigación y extensión y vinculación de la cultura.",
  },
  {
    id: 3,
    title:
      "Contribuir a la aprobación y desarrollo de programas educativos de licenciatura y posgrados de calidad y pertinencia regional, nacional e internacional.",
  },
  {
    id: 4,
    title:
      "Fortalecer los vínculos institucionales con los sectores sociales, y el impacto social de la Universidad a través de la Extensión Universitaria.",
  },
  { id: 5, title: "Desarrollar procesos de gestión de calidad y mejora continua de manera sistemática." },
  {
    id: 6,
    title: "Garantizar infraestructura física y académica necesaria para la operatividad de la oferta académica.",
  },
  { id: 7, title: "Apoyar la toma de decisiones basada en indicadores de resultados." },
]

const initialYears = Array.from({ length: 9 }, (_, i) => 2022 + i).map((year) => ({
  year,
  value: 0,
}))

export function NewPOAForm() {
  const [purposesList, setPurposesList] = useState(initialPurposes)
  const [selectedPurpose, setSelectedPurpose] = useState<{ id: number; title: string } | null>(null)
  const [observation, setObservation] = useState("")
  const [yearlyPercentages, setYearlyPercentages] = useState<YearlyPercentage[]>(initialYears)
  const [savedRecords, setSavedRecords] = useState<Purpose[]>([])
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<number | null>(null)

  useEffect(() => {
    if (selectedPurpose) {
      // Reset percentages when a new purpose is selected
      setYearlyPercentages(initialYears)
      setObservation("")
    }
  }, [selectedPurpose])

  const handleSelectPurpose = (purpose: { id: number; title: string }) => {
    setSelectedPurpose(purpose)
  }

  const handlePercentageChange = (year: number, value: string) => {
    setYearlyPercentages((prev) =>
      prev.map((item) => (item.year === year ? { ...item, value: Number.parseInt(value) || 0 } : item)),
    )
  }

  const handleSaveRecord = () => {
    if (selectedPurpose) {
      const newRecord: Purpose = {
        id: Date.now(), // Unique ID for the record
        title: selectedPurpose.title,
        observation: observation,
        date: new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        yearlyPercentages: yearlyPercentages,
      }
      setSavedRecords((prev) => [...prev, newRecord])
      setSelectedPurpose(null) // Clear selection after saving
      setObservation("")
      setYearlyPercentages(initialYears) // Reset percentages
    }
  }

  const handleDeleteRecord = (id: number) => {
    setSavedRecords((prev) => prev.filter((record) => record.id !== id))
  }

  const handleDownloadPDF = async (record: Purpose) => {
    setIsGeneratingPDF(record.id)
    try {
      await generatePOAPDF(record, `poa-proposito-${record.title.replace(/\s+/g, "-").toLowerCase()}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPDF(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Sección Objetivo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Objetivo:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm">
            Un objetivo o finalidad es una meta o fin último hacia el cual se dirigen las acciones o las operaciones de
            algún proyecto específico. Todo lo que hacemos tiene un fin, un sentido final adonde queremos llegar, que es
            la sumatoria de los pasos dados para alcanzarlo.
          </p>
        </CardContent>
      </Card>

      {/* Lista de propósitos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Lista de propósitos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Panel Izquierdo: Lista de propósitos */}
            <div className="border rounded-md p-4 bg-gray-50">
              <ul className="space-y-2">
                {purposesList.map((purpose) => (
                  <li
                    key={purpose.id}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
                      selectedPurpose?.id === purpose.id ? "bg-blue-100 text-blue-800 font-medium" : ""
                    }`}
                    onClick={() => handleSelectPurpose(purpose)}
                  >
                    <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="flex-1 text-sm">
                      {purpose.id}. {purpose.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Panel Derecho: Formulario de propósito seleccionado */}
            <div className="border rounded-md p-4 flex flex-col justify-between">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Crea tu lista de propósitos (realistas) para 2025
                </h3>
                {selectedPurpose ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="selected-title" className="text-sm font-medium text-gray-700">
                        Propósito Seleccionado
                      </Label>
                      <Input id="selected-title" value={selectedPurpose.title} readOnly className="bg-gray-100" />
                    </div>

                    {/* Tabla de Año y Porcentaje */}
                    <Card className="mt-4">
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="font-medium text-gray-700">Año</TableHead>
                              <TableHead className="font-medium text-gray-700 text-right">Porcentaje</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {yearlyPercentages.map((item) => (
                              <TableRow key={item.year}>
                                <TableCell className="font-medium text-gray-900">{item.year}</TableCell>
                                <TableCell className="text-right">
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={item.value}
                                    onChange={(e) => handlePercentageChange(item.year, e.target.value)}
                                    className="w-20 text-right"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Label htmlFor="observation" className="text-sm font-medium text-gray-700">
                        Observación
                      </Label>
                      <Textarea
                        id="observation"
                        placeholder="Añade una observación para este propósito..."
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                    <Button onClick={handleSaveRecord} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Registro
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    Selecciona un propósito de la lista para comenzar
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de propósitos */}
      <Card>
        <CardHeader className="bg-gray-800 text-white rounded-t-lg">
          <CardTitle className="text-lg font-semibold">Tabla de propósitos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-b-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium text-gray-700 w-16">#</TableHead>
                  <TableHead className="font-medium text-gray-700">Título</TableHead>
                  <TableHead className="font-medium text-gray-700">Fecha</TableHead>
                  <TableHead className="font-medium text-gray-700">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedRecords.length > 0 ? (
                  savedRecords.map((record, index) => (
                    <TableRow key={record.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-500">{index + 1}</TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {record.title}
                        {record.observation && <p className="text-xs text-gray-600 mt-1">Obs: {record.observation}</p>}
                      </TableCell>
                      <TableCell className="text-gray-600">{record.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadPDF(record)}
                            disabled={isGeneratingPDF === record.id}
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Descargar PDF</span>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteRecord(record.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                      No hay registros guardados. Selecciona un propósito y guarda un registro.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
