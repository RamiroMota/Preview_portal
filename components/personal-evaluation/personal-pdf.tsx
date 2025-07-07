import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#94a3b8',
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 9,
  },
  tableColQuestion: {
    width: '75%',
    borderRightWidth: 1,
    borderColor: '#000',
    padding: 4,
  },
  tableColScore: {
    width: '25%',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 9,
  },
  cell: {
    fontSize: 9,
  },
  highlightBox: {
    padding: 6,
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 1,
  },
  redBox: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
  },
  yellowBox: {
    backgroundColor: '#fffbeb',
    borderColor: '#f59e0b',
  },
  blueBox: {
    backgroundColor: '#e0f2fe',
    borderColor: '#3b82f6',
  },
  greenBox: {
    backgroundColor: '#dcfce7',
    borderColor: '#22c55e',
  },
  evaluationParametersTable: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
  },
  evaluationParameterBox: {
    width: '23%',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    textAlign: 'center',
  },
  evaluationParameterText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  additionalSections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  additionalSectionCol: {
    width: '32%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  additionalSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  additionalSectionContent: {
    fontSize: 9,
  },
  activityTable: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activityTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  activityTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  activityTableColHeader: {
    width: '33.33%',
    padding: 8,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'left',
  },
  activityTableCol: {
    width: '33.33%',
    padding: 8,
    fontSize: 9,
    color: '#1f2937',
    textAlign: 'left',
  },
});

interface PersonalPDFProps {
  personIndex: number;
  selectedValues: Record<number, number[]>;
  personScore: number;
  skillsStrengths: string;
  skillsToImprove: string;
  performanceLevel: string;
  questions: string[];
  evaluatorName: string;
  evaluatorRole: string;
}

const PersonalPDF = ({
  personIndex,
  selectedValues,
  personScore,
  skillsStrengths,
  skillsToImprove,
  performanceLevel,
  questions,
  evaluatorName,
  evaluatorRole,
}: PersonalPDFProps) => {
  const getScoreBoxStyle = (score: number) => {
    if (score >= 0 && score <= 36) {
      return styles.redBox;
    } else if (score >= 37 && score <= 48) {
      return styles.yellowBox;
    } else if (score >= 49 && score <= 58) {
      return styles.blueBox;
    } else if (score >= 59 && score <= 68) {
      return styles.greenBox;
    }
    return {};
  };

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>Evaluación del Personal</Text>

        <Text style={styles.subtitle}>Información del Evaluador</Text>
        <Text>Nombre del evaluador: {evaluatorName}</Text>
        <Text>Cargo o Área académica: {evaluatorRole}</Text>

        <Text style={styles.subtitle}>Principales actividades {personIndex + 1}</Text>
        <View style={styles.activityTable}>
          <View style={styles.activityTableHeader}>
            <View style={styles.activityTableColHeader}>
              <Text style={styles.cell}>Nombre</Text>
            </View>
            <View style={styles.activityTableColHeader}>
              <Text style={styles.cell}>Cargo</Text>
            </View>
            <View style={styles.activityTableColHeader}>
              <Text style={styles.cell}>Descripción de las actividades</Text>
            </View>
          </View>
          <View style={styles.activityTableRow}>
            <View style={styles.activityTableCol}>
              <Text style={styles.cell}>Nombre</Text>
            </View>
            <View style={styles.activityTableCol}>
              <Text style={styles.cell}>Cargo</Text>
            </View>
            <View style={styles.activityTableCol}>
              <Text style={styles.cell}>Actividades</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Evaluación para Persona {personIndex + 1}
        </Text>

        {/* Evaluation Questions Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableColQuestion}>
              <Text style={styles.cell}>Pregunta</Text>
            </View>
            <View style={styles.tableColScore}>
              <Text style={styles.cell}>Puntaje</Text>
            </View>
          </View>
          {questions.map((question, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableColQuestion}>
                <Text style={styles.cell}>{question}</Text>
              </View>
              <View style={styles.tableColScore}>
                <Text style={styles.cell}>
                  {selectedValues[personIndex]?.[index] || 0}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total Score */}
        <View style={[styles.highlightBox, getScoreBoxStyle(personScore)]}>
          <Text style={styles.footerText}>
            Puntaje Obtenido: {personScore}
          </Text>
        </View>

        {/* Evaluation Parameters */}
        <Text style={styles.subtitle}>Parámetros de evaluación</Text>
        <View style={styles.evaluationParametersTable}>
          <View style={[styles.evaluationParameterBox, styles.redBox]}>
            <Text style={styles.evaluationParameterText}>0 - 36 Pts</Text>
            <Text style={styles.evaluationParameterText}>Desempeño Malo</Text>
          </View>
          <View style={[styles.evaluationParameterBox, styles.yellowBox]}>
            <Text style={styles.evaluationParameterText}>37 - 48 Pts</Text>
            <Text style={styles.evaluationParameterText}>
              Desempeño Regular
            </Text>
          </View>
          <View style={[styles.evaluationParameterBox, styles.blueBox]}>
            <Text style={styles.evaluationParameterText}>49 - 58 Pts</Text>
            <Text style={styles.evaluationParameterText}>Desempeño Bueno</Text>
          </View>
          <View style={[styles.evaluationParameterBox, styles.greenBox]}>
            <Text style={styles.evaluationParameterText}>59 - 68 Pts</Text>
            <Text style={styles.evaluationParameterText}>
              Desempeño Excelente
            </Text>
          </View>
        </View>

        {/* Additional Sections */}
        <Text style={styles.subtitle}>Secciones Adicionales</Text>
        <View style={styles.additionalSections}>
          <View style={styles.additionalSectionCol}>
            <Text style={styles.additionalSectionTitle}>
              Habilidades y características sobresalientes
            </Text>
            <Text style={styles.additionalSectionContent}>
              {skillsStrengths}
            </Text>
          </View>
          <View style={styles.additionalSectionCol}>
            <Text style={styles.additionalSectionTitle}>
              Habilidades y características a mejorar
            </Text>
            <Text style={styles.additionalSectionContent}>
              {skillsToImprove}
            </Text>
          </View>
          <View style={styles.additionalSectionCol}>
            <Text style={styles.additionalSectionTitle}>
              Nivel de desempeño obtenido
            </Text>
            <Text style={styles.additionalSectionContent}>
              {performanceLevel}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PersonalPDF;