"use client"

import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Register fonts (optional - you can use system fonts)
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
})

interface YearlyPercentage {
  year: number
  value: number
}

interface POARecordData {
  id: number
  title: string
  observation: string
  date: string
  yearlyPercentages: YearlyPercentage[]
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
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    padding: 5,
    backgroundColor: "#f9fafb",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  tableCell: {
    fontSize: 9,
    color: "#1f2937",
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
})

interface POAPDFDocumentProps {
  data: POARecordData
}

export function POAPDFDocument({ data }: POAPDFDocumentProps) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Registro de Propósito POA</Text>
          <Text style={styles.subtitle}>Sistema de Supervisión Académica</Text>
        </View>

        {/* Información del Propósito */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Información del Propósito</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>ID de Registro:</Text>
              <Text style={styles.value}>#{data.id}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Fecha de Registro:</Text>
              <Text style={styles.value}>{data.date}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Título del Propósito:</Text>
              <Text style={styles.value}>{data.title}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Observación:</Text>
              <Text style={styles.value}>{data.observation || "N/A"}</Text>
            </View>
          </View>
        </View>

        {/* Porcentajes Anuales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Porcentajes Anuales</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Año</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Porcentaje</Text>
              </View>
            </View>
            {data.yearlyPercentages.map((item) => (
              <View style={styles.tableRow} key={item.year}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.year}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.value}%</Text>
                </View>
              </View>
            ))}
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
