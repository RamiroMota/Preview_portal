"use client"

import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Register fonts (optional - you can use system fonts)
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
})

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

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#374151",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 3,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 2,
  },
  value: {
    fontSize: 9,
    color: "#1f2937",
    lineHeight: 1.3,
  },
  statusBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "3 8",
    borderRadius: 12,
    fontSize: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  statusApproved: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
  },
  statusRejected: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  statusInReview: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
  },
  criteriaContainer: {
    backgroundColor: "#f9fafb",
    padding: 8,
    borderRadius: 4,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  criteriaText: {
    fontSize: 9,
    fontWeight: "bold",
  },
  percentageBadge: {
    backgroundColor: "#e5e7eb",
    padding: "2 6",
    borderRadius: 3,
    fontSize: 8,
    fontWeight: "bold",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginVertical: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#6b7280",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
  },
  grid: {
    flexDirection: "row",
    marginBottom: 8,
  },
  gridItem: {
    flex: 1,
    marginRight: 10,
  },
})

interface PDFDocumentProps {
  data: SequenceData
}

export function PDFDocument({ data }: PDFDocumentProps) {
  const getStatusStyle = (status: string) => {
    const baseStyle = styles.statusBadge
    switch (status) {
      case "Aprobado":
        return [baseStyle, styles.statusApproved]
      case "Rechazado":
        return [baseStyle, styles.statusRejected]
      case "En Supervisión":
        return [baseStyle, styles.statusInReview]
      default:
        return baseStyle
    }
  }

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Secuencia Didáctica</Text>
          <Text style={styles.subtitle}>Sistema de Supervisión Académica</Text>
        </View>

        {/* Información General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Información General</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>ID:</Text>
              <Text style={styles.value}>#{data.id}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Estado:</Text>
              <Text style={getStatusStyle(data.status)}>{data.status}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Título:</Text>
              <Text style={styles.value}>{data.title}</Text>
            </View>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Programa:</Text>
              <Text style={styles.value}>{data.programa}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Ciclo:</Text>
              <Text style={styles.value}>{data.ciclo}</Text>
            </View>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Fecha de Envío:</Text>
              <Text style={styles.value}>{data.submittedDate}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Horas:</Text>
              <Text style={styles.value}>{data.horas} horas</Text>
            </View>
          </View>
        </View>

        {/* Información del Docente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Información del Docente</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.value}>{data.nombre}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Perfil:</Text>
              <Text style={styles.value}>{data.perfil}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Posgrado:</Text>
              <Text style={styles.value}>{data.posgrado}</Text>
            </View>
          </View>
        </View>

        {/* Información Académica */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎓 Información Académica</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Asignatura:</Text>
              <Text style={styles.value}>{data.asignatura}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Aprendizajes Esperados:</Text>
              <Text style={styles.value}>{data.aprendizajes}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Impacto:</Text>
              <Text style={styles.value}>{data.impacto}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Competencia:</Text>
              <Text style={styles.value}>{data.competencia}</Text>
            </View>
          </View>
        </View>

        {/* Criterios de Evaluación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Criterios de Evaluación</Text>
          <View style={styles.criteriaContainer}>
            <Text style={styles.criteriaText}>{data.criterio1}</Text>
            <Text style={styles.percentageBadge}>{data.porcentaje1}%</Text>
          </View>
          <View style={styles.criteriaContainer}>
            <Text style={styles.criteriaText}>{data.criterio2}</Text>
            <Text style={styles.percentageBadge}>{data.porcentaje2}%</Text>
          </View>
          <View style={styles.criteriaContainer}>
            <Text style={styles.criteriaText}>{data.criterio3}</Text>
            <Text style={styles.percentageBadge}>{data.porcentaje3}%</Text>
          </View>
        </View>

        {/* Contenido del Curso */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Contenido del Curso</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Bienvenida:</Text>
              <Text style={styles.value}>{data.bienvenida}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Contextualización:</Text>
              <Text style={styles.value}>{data.contextualizacion}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Introducción:</Text>
              <Text style={styles.value}>{data.introduccion}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Tema Principal:</Text>
              <Text style={styles.value}>{data.tema}</Text>
            </View>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Subtema 1:</Text>
              <Text style={styles.value}>{data.subtema1}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Subtema 2:</Text>
              <Text style={styles.value}>{data.subtema2}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Objetivo:</Text>
              <Text style={styles.value}>{data.objetivo}</Text>
            </View>
          </View>
        </View>
      </Page>

      <Page size="LETTER" style={styles.page}>
        {/* Actividades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Actividades</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Actividad de Inicio:</Text>
              <Text style={styles.value}>{data.actividad_inicio}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Actividad de Desarrollo:</Text>
              <Text style={styles.value}>{data.actividad_desarrollo}</Text>
            </View>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Actividad de Cierre:</Text>
              <Text style={styles.value}>{data.actividad_cierre}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Actividad Final:</Text>
              <Text style={styles.value}>{data.actividad_final}</Text>
            </View>
          </View>
        </View>

        {/* Evaluación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✏️ Evaluación</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Evidencia:</Text>
              <Text style={styles.value}>{data.evidencia}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Instrumento:</Text>
              <Text style={styles.value}>{data.instrumento}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Criterio de Evaluación 1:</Text>
              <Text style={styles.value}>{data.criterio_eval1}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Criterio de Evaluación 2:</Text>
              <Text style={styles.value}>{data.criterio_eval2}</Text>
            </View>
          </View>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Instrumento 1:</Text>
              <Text style={styles.value}>{data.instrumento1}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Instrumento 2:</Text>
              <Text style={styles.value}>{data.instrumento2}</Text>
            </View>
          </View>
        </View>

        {/* Firmas y Validaciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Firmas y Validaciones</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Nombre y Firma:</Text>
              <Text style={styles.value}>{data.nombre_firma}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Firma Academia:</Text>
              <Text style={styles.value}>{data.firma_academia}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Firma Coordinación:</Text>
              <Text style={styles.value}>{data.firma_coordinacion}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.value}>
                📅 Fecha: {data.dia} de {data.mes} de {data.anio}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Sistema de Supervisión Académica - Documento generado automáticamente</Text>
          <Text>Fecha de generación: {new Date().toLocaleDateString("es-ES")}</Text>
        </View>
      </Page>
    </Document>
  )
}
