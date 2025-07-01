"use client";

import { pdf } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { createElement } from "react";
import { POAPDFDocument } from "@/components/poa/poa-pdf-document"; // Importar el nuevo componente de PDF para POA

interface SequenceData {
  id: number;
  title: string;
  author: string;
  subject: string;
  submittedDate: string;
  status: string;
  programa: string;
  ciclo: string;
  nombre: string;
  perfil: string;
  posgrado: string;
  asignatura: string;
  aprendizajes: string;
  horas: number;
  impacto: string;
  competencia: string;
  criterio1: string;
  porcentaje1: number;
  criterio2: string;
  porcentaje2: number;
  criterio3: string;
  porcentaje3: number;
  bienvenida: string;
  contextualizacion: string;
  introduccion: string;
  tema: string;
  subtema1: string;
  subtema2: string;
  objetivo: string;
  evidencia: string;
  instrumento: string;
  actividad_inicio: string;
  actividad_desarrollo: string;
  actividad_cierre: string;
  actividad_final: string;
  criterio_eval1: string;
  criterio_eval2: string;
  instrumento1: string;
  instrumento2: string;
  nombre_firma: string;
  firma_academia: string;
  firma_coordinacion: string;
  dia: number;
  mes: string;
  anio: number;
}

interface YearlyPercentage {
  year: number;
  value: number;
}

interface POARecordData {
  id: number;
  title: string;
  observation: string;
  date: string;
  yearlyPercentages: YearlyPercentage[];
}

export const generatePDF = async (data: SequenceData, filename?: string) => {
  try {
    // Define styles
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
    });

    const getStatusStyle = (status: string) => {
      const baseStyle = styles.statusBadge;
      switch (status) {
        case "Aprobado":
          return [baseStyle, styles.statusApproved];
        case "Rechazado":
          return [baseStyle, styles.statusRejected];
        case "En Supervisión":
          return [baseStyle, styles.statusInReview];
        default:
          return baseStyle;
      }
    };

    // Create PDF Document using createElement
    const PDFDocument = createElement(
      Document,
      {},
      createElement(
        Page,
        { size: "LETTER", style: styles.page },
        // Header
        createElement(
          View,
          { style: styles.header },
          createElement(Text, { style: styles.title }, "Secuencia Didáctica"),
          createElement(
            Text,
            { style: styles.subtitle },
            "Sistema de Supervisión Académica"
          )
        ),

        // Información General
        createElement(
          View,
          { style: styles.section },
          createElement(
            Text,
            { style: styles.sectionTitle },
            "📋 Información General"
          ),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "ID:"),
              createElement(Text, { style: styles.value }, `#${data.id}`)
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Estado:"),
              createElement(
                Text,
                { style: getStatusStyle(data.status) },
                data.status
              )
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Título:"),
              createElement(Text, { style: styles.value }, data.title)
            )
          ),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Programa:"),
              createElement(Text, { style: styles.value }, data.programa)
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Ciclo:"),
              createElement(Text, { style: styles.value }, data.ciclo)
            )
          ),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Fecha de Envío:"),
              createElement(Text, { style: styles.value }, data.submittedDate)
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Horas:"),
              createElement(
                Text,
                { style: styles.value },
                `${data.horas} horas`
              )
            )
          )
        ),

        // Información del Docente
        createElement(
          View,
          { style: styles.section },
          createElement(
            Text,
            { style: styles.sectionTitle },
            "👤 Información del Docente"
          ),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Nombre:"),
              createElement(Text, { style: styles.value }, data.nombre)
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Perfil:"),
              createElement(Text, { style: styles.value }, data.perfil)
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Posgrado:"),
              createElement(Text, { style: styles.value }, data.posgrado)
            )
          )
        ),

        // Información Académica
        createElement(
          View,
          { style: styles.section },
          createElement(
            Text,
            { style: styles.sectionTitle },
            "🎓 Información Académica"
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Asignatura:"),
              createElement(Text, { style: styles.value }, data.asignatura)
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(
                Text,
                { style: styles.label },
                "Aprendizajes Esperados:"
              ),
              createElement(Text, { style: styles.value }, data.aprendizajes)
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Impacto:"),
              createElement(Text, { style: styles.value }, data.impacto)
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Competencia:"),
              createElement(Text, { style: styles.value }, data.competencia)
            )
          )
        ),

        // Criterios de Evaluación
        createElement(
          View,
          { style: styles.section },
          createElement(
            Text,
            { style: styles.sectionTitle },
            "✅ Criterios de Evaluación"
          ),
          createElement(
            View,
            { style: styles.criteriaContainer },
            createElement(Text, { style: styles.criteriaText }, data.criterio1),
            createElement(
              Text,
              { style: styles.percentageBadge },
              `${data.porcentaje1}%`
            )
          ),
          createElement(
            View,
            { style: styles.criteriaContainer },
            createElement(Text, { style: styles.criteriaText }, data.criterio2),
            createElement(
              Text,
              { style: styles.percentageBadge },
              `${data.porcentaje2}%`
            )
          ),
          createElement(
            View,
            { style: styles.criteriaContainer },
            createElement(Text, { style: styles.criteriaText }, data.criterio3),
            createElement(
              Text,
              { style: styles.percentageBadge },
              `${data.porcentaje3}%`
            )
          )
        ),

        // Contenido del Curso
        createElement(
          View,
          { style: styles.section },
          createElement(
            Text,
            { style: styles.sectionTitle },
            "🎯 Contenido del Curso"
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Bienvenida:"),
              createElement(Text, { style: styles.value }, data.bienvenida)
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(
                Text,
                { style: styles.label },
                "Contextualización:"
              ),
              createElement(
                Text,
                { style: styles.value },
                data.contextualizacion
              )
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Introducción:"),
              createElement(Text, { style: styles.value }, data.introduccion)
            )
          ),
          createElement(View, { style: styles.separator }),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Tema Principal:"),
              createElement(Text, { style: styles.value }, data.tema)
            )
          ),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Subtema 1:"),
              createElement(Text, { style: styles.value }, data.subtema1)
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Subtema 2:"),
              createElement(Text, { style: styles.value }, data.subtema2)
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Objetivo:"),
              createElement(Text, { style: styles.value }, data.objetivo)
            )
          )
        )
      ),

      // Segunda página
      createElement(
        Page,
        { size: "LETTER", style: styles.page },
        // Actividades
        createElement(
          View,
          { style: styles.section },
          createElement(Text, { style: styles.sectionTitle }, "📈 Actividades"),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(
                Text,
                { style: styles.label },
                "Actividad de Inicio:"
              ),
              createElement(
                Text,
                { style: styles.value },
                data.actividad_inicio
              )
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(
                Text,
                { style: styles.label },
                "Actividad de Desarrollo:"
              ),
              createElement(
                Text,
                { style: styles.value },
                data.actividad_desarrollo
              )
            )
          ),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(
                Text,
                { style: styles.label },
                "Actividad de Cierre:"
              ),
              createElement(
                Text,
                { style: styles.value },
                data.actividad_cierre
              )
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Actividad Final:"),
              createElement(Text, { style: styles.value }, data.actividad_final)
            )
          )
        ),

        // Evaluación
        createElement(
          View,
          { style: styles.section },
          createElement(Text, { style: styles.sectionTitle }, "✏️ Evaluación"),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Evidencia:"),
              createElement(Text, { style: styles.value }, data.evidencia)
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(Text, { style: styles.label }, "Instrumento:"),
              createElement(Text, { style: styles.value }, data.instrumento)
            )
          ),
          createElement(View, { style: styles.separator }),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(
                Text,
                { style: styles.label },
                "Criterio de Evaluación 1:"
              ),
              createElement(Text, { style: styles.value }, data.criterio_eval1)
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(
                Text,
                { style: styles.label },
                "Criterio de Evaluación 2:"
              ),
              createElement(Text, { style: styles.value }, data.criterio_eval2)
            )
          ),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Instrumento 1:"),
              createElement(Text, { style: styles.value }, data.instrumento1)
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Instrumento 2:"),
              createElement(Text, { style: styles.value }, data.instrumento2)
            )
          )
        ),

        // Firmas y Fechas
        createElement(
          View,
          { style: styles.section },
          createElement(
            Text,
            { style: styles.sectionTitle },
            "👥 Firmas y Validaciones"
          ),
          createElement(
            View,
            { style: styles.grid },
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Nombre y Firma:"),
              createElement(Text, { style: styles.value }, data.nombre_firma)
            ),
            createElement(
              View,
              { style: styles.gridItem },
              createElement(Text, { style: styles.label }, "Firma Academia:"),
              createElement(Text, { style: styles.value }, data.firma_academia)
            )
          ),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(
                Text,
                { style: styles.label },
                "Firma Coordinación:"
              ),
              createElement(
                Text,
                { style: styles.value },
                data.firma_coordinacion
              )
            )
          ),
          createElement(View, { style: styles.separator }),
          createElement(
            View,
            { style: styles.row },
            createElement(
              View,
              { style: styles.column },
              createElement(
                Text,
                { style: styles.value },
                `📅 Fecha: ${data.dia} de ${data.mes} de ${data.anio}`
              )
            )
          )
        ),

        // Footer
        createElement(
          View,
          { style: styles.footer },
          createElement(
            Text,
            {},
            "Sistema de Supervisión Académica - Documento generado automáticamente"
          ),
          createElement(
            Text,
            {},
            `Fecha de generación: ${new Date().toLocaleDateString("es-ES")}`
          )
        )
      )
    );

    // Generate PDF blob
    const blob = await pdf(PDFDocument).toBlob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || `secuencia-didactica-${data.id}.pdf`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error al generar el PDF. Por favor, inténtelo de nuevo.");
  }
};

export const generatePDFBlob = async (data: SequenceData): Promise<Blob> => {
  const { pdf, Document, Page, Text, View, StyleSheet } = await import(
    "@react-pdf/renderer"
  );
  const { createElement } = await import("react");

  // Similar implementation but return blob directly
  // ... (implementation would be similar to above)
  throw new Error("Not implemented yet");
};

export const generatePDFBuffer = async (
  data: SequenceData
): Promise<ArrayBuffer> => {
  const blob = await generatePDFBlob(data);
  return await blob.arrayBuffer();
};

export const generatePOAPDF = async (
  data: POARecordData,
  filename?: string
) => {
  try {
    const blob = await pdf(
      createElement(Document, {}, createElement(POAPDFDocument, { data }))
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || `poa-record-${data.id}.pdf`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating POA PDF:", error);
    alert("Error al generar el PDF del POA. Por favor, inténtelo de nuevo.");
  }
};
