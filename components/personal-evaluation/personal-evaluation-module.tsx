import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
  },
});

const areasAcademicas = [
  "Responsable De La Dirección Académica Y Administrativa",
  "Responsable De Mantenimiento Menor",
  "Responsable Del Departamento Psicopedagógico De Licenciatura",
  "Coordinadora De Becas",
  "Responsable De Mantenimiento General",
  "Coordinadora De Vinculación",
  "Director De Calidad De Vida",
  "Directora De Las Licenciaturas En Psicologías",
  "Director De Planeación Educativa",
  "Director De La Licenciatura En Educación Física Y Deportiva Y Pedagogía",
  "Director De La Licenciatura En Químico Farmacobiólogo",
  "Rector",
  "Director De Actividades Cívicas, Culturales Y Deportivas De Nivel Básico",
  "Director De Administración Escolar Y Becas",
  "Vicerrector",
  "Director De Educación En Línea",
  "Director De La Licenciatura En Cirujano Odontólogo",
  "Directora Del Área De Idiomas",
  "Director De La Licenciatura En Médico Cirujano",
  "Director De Servicios Generales",
  "Director De La Licenciatura En Enfermería",
  "Directora Del Área De Ciencias En Negocios",
  "Directora De Nutrición",
  "Director De Finanzas",
  "Director De La Licenciatura En Derecho",
  "Director De Ciencias En Ingeniería",
  "Director De Auditoría",
  "Director De Mercadotecnia",
  "Director De Capital Humano",
];

const PersonalEvaluationModule = () => {
  const [peopleCount, setPeopleCount] = useState(0);
  const [personScores, setPersonScores] = useState<number[]>([]);
  const [selectedValues, setSelectedValues] = useState<number[][]>([]);
  const [skillsStrengths, setSkillsStrengths] = useState<string>('');
  const [skillsToImprove, setSkillsToImprove] = useState<string>('');
  const [performanceLevel, setPerformanceLevel] = useState<string>('');
  const questions = [
    "Realiza su trabajo con enfoque de empatía hacia sus clientes (Internos o Externos)",
    "Demuestra actitud de servicio superando frecuentemente su desempeño requerido, generando valor agregado.",
    "Es eficaz al afrontar situaciones y problemas frecuentes.",
    "Realiza sus funciones y deberes propios del cargo sin que se requiera supervisión permanente.",
    "Soluciona de manera conjunta los problemas comunes de su área.",
    "Trasmite mensajes acertadamente (en tiempo, lugar y forma)",
    "Muestra una actitud positiva con sus compañeros, comunicándose con respeto Y trabajando de manera armoniosa",
    "Va más allá de los requisitos exigidos, para conocer un producto o servicios que cumpla y supere las expectativas del cliente.",
    "Realiza sus actividades con calidad.",
    "Programa su trabajo afín de cumplir con sus compromisos en cuanto a calidad y plazo.",
    "Administra de manera efectiva los recursos con los cuales cuenta, evitando desperdicios de cualquier índole.",
    "Cumple siempre con sus asistencias",
    "Da cumplimiento con la puntualidad en el ingreso a sus labores",
    "Da cumplimiento con el reglamento interior de trabajo",
    "Muestra actitud positiva cuando se le realiza una llamada de atención",
    "Conoce los procedimientos que le aplican según su puesto y de responsabilidad en relación a la calidad.",
    "Muestra compromiso hacia los objetivos de calidad.",
  ];

  return (
    <div className="p-8 bg-white rounded-lg shadow-md text-sm leading-relaxed">
      <h1 className="text-xl font-bold mb-4 text-center">
        Evaluación del personal
      </h1>

      {/* Evaluator Information */}
      <h2 className="text-lg font-bold mb-2">Información del Evaluador</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="evaluator-name" className="font-semibold">Nombre del evaluador:</Label>
          <Input
            id="evaluator-name"
            type="text"
            defaultValue="Fernando Arreola Merino"
            readOnly
          />
        </div>
        <div>
          <Label htmlFor="evaluator-role" className="font-semibold">Cargo o Área académica:</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un área académica" />
            </SelectTrigger>
            <SelectContent>
              {areasAcademicas.map((area, index) => (
                <SelectItem key={index} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="people-count">
            ¿Cuántas personas tienes a tu disposición?
          </Label>
          <Input
            id="people-count"
            type="number"
            min="0"
            max="10"
            value={peopleCount}
            onChange={(e) => {
              let count = Number(e.target.value);
              if (isNaN(count) || count < 0) {
                count = 0;
              } else if (count > 10) {
                count = 10;
              }
              setPeopleCount(count);
              setPersonScores(new Array(count).fill(0));
              setSelectedValues(
                Array.from({ length: count }, () =>
                  Array(questions.length).fill(0)
                )
              );
            }}
          />
        </div>
      </div>

      {/* Main Responsibilities Table */}
      {Array.from({ length: peopleCount }).map((_, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-lg font-bold mb-2">
            Principales actividades {index + 1}
          </h2>
          <div className="overflow-x-auto">
            <Table className="min-w-full bg-white border border-gray-200">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
                    Nombre
                  </TableHead>
                  <TableHead className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
                    Cargo
                  </TableHead>
                  <TableHead className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">
                    Descripción de las actividades
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="py-2 px-4 border-b text-sm text-gray-800">
                    <Input type="text" placeholder="Nombre" />
                  </TableCell>
                  <TableCell className="py-2 px-4 border-b text-sm text-gray-800">
                    <Input type="text" placeholder="Cargo" />
                  </TableCell>
                  <TableCell className="py-2 px-4 border-b text-sm text-gray-800">
                    <Textarea placeholder="Actividades" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      ))}

      {/* Evaluation Questions and Parameters (Dynamic) */}
      {Array.from({ length: peopleCount }).map((_, personIndex) => (
        <div key={`person-evaluation-${personIndex}`}>
          <h2 className="text-lg font-bold mb-2 mt-6">
            Evaluación para {`Persona ${personIndex + 1}`}
          </h2>
          <div className="mb-6">
            <div className="flex justify-center items-center mb-3 ">
              <div className="flex space-x-4 text-sm font-medium text-gray-800">
                <h2 className="text-lg text-center font-bold mb-2">
                  Escala de evaluación:
                </h2>
                <Badge variant="default" className="bg-red-100 text-red-800">
                  1 No Cumple
                </Badge>
                <Badge
                  variant="default"
                  className="bg-yellow-100 text-yellow-800"
                >
                  2 Cumple Medianamente
                </Badge>
                <Badge variant="default" className="bg-blue-100 text-blue-800">
                  3 Cumple Satisfactoriamente
                </Badge>
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800"
                >
                  4 Cumple y Excede
                </Badge>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
                <TableHeader className="bg-gray-100">
                  <TableRow className="bg-gray-100">
                    <TableHead className="py-2 px-4 border-b text-left text-sm font-medium text-gray-800">
                      Pregunta
                    </TableHead>
                    <TableHead className="py-2 px-4 border-b text-center text-sm font-medium text-gray-800">
                      1
                    </TableHead>
                    <TableHead className="py-2 px-4 border-b text-center text-sm font-medium text-gray-800">
                      2
                    </TableHead>
                    <TableHead className="py-2 px-4 border-b text-center text-sm font-medium text-gray-800">
                      3
                    </TableHead>
                    <TableHead className="py-2 px-4 border-b text-center text-sm font-medium text-gray-800">
                      4
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((question, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <TableCell className="py-2 px-4 border-b text-sm text-gray-800">
                        {question}
                      </TableCell>
                      {[1, 2, 3, 4].map((value) => (
                        <TableCell
                          key={value}
                          className="py-2 px-4 border-b text-center"
                        >
                          <RadioGroup
                            value={
                              selectedValues[personIndex]?.[
                                index
                              ]?.toString() || ""
                            }
                            onValueChange={(selectedValue) => {
                              const newSelectedValues = [...selectedValues];
                              if (!newSelectedValues[personIndex]) {
                                newSelectedValues[personIndex] = Array(
                                  questions.length
                                ).fill(0);
                              }
                              newSelectedValues[personIndex][index] =
                                parseInt(selectedValue);
                              setSelectedValues(newSelectedValues);

                              const newScores = [...personScores];
                              newScores[personIndex] = newSelectedValues[
                                personIndex
                              ].reduce((sum, val) => sum + val, 0);
                              setPersonScores(newScores);
                            }}
                            className="flex justify-center"
                          >
                            <RadioGroupItem
                              value={value.toString()}
                              id={`q${personIndex}-${index}-${value}`}
                            />
                          </RadioGroup>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Evaluation Parameters */}
          <div className="mb-6">
            <h2 className="text-lg text-center font-bold mb-2">
              Parámetros de evaluación
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
              <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="font-semibold text-red-700">0 - 36 Pts</div>
                <div className="text-red-600">Desempeño Malo</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-semibold text-yellow-700">37 - 48 Pts</div>
                <div className="text-yellow-600">Desempeño Regular</div>
              </div>
              <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-semibold text-blue-700">49 - 58 Pts</div>
                <div className="text-blue-600">Desempeño Bueno</div>
              </div>
              <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-700">59 - 68 Pts</div>
                <div className="text-green-600">Desempeño Excelente</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center justify-center">
                <Label htmlFor={`score-obtained-${personIndex}`}>
                  Puntaje obtenido
                </Label>
                <Input
                  id={`score-obtained-${personIndex}`}
                  type="number"
                  value={personScores[personIndex] || 0}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Additional Sections */}
      <h2 className="text-lg font-bold mb-2">Secciones Adicionales</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="skills-strengths" className="font-semibold">
            Habilidades y características sobresalientes
          </Label>
          <Textarea id="skills-strengths" rows={5} value={skillsStrengths} onChange={(e) => setSkillsStrengths(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="skills-to-improve" className="font-semibold">
            Habilidades y características a mejorar
          </Label>
          <Textarea id="skills-to-improve" rows={5} value={skillsToImprove} onChange={(e) => setSkillsToImprove(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="performance-level" className="font-semibold">Nivel de desempeño obtenido</Label>
          <Textarea id="performance-level" rows={5} value={performanceLevel} onChange={(e) => setPerformanceLevel(e.target.value)} />
        </div>
      </div>

      <div className="mt-6 flex justify-center items-center flex-col">
        <PDFDownloadLink
          document={
            <Document>
              <Page size="LETTER" style={styles.page}>
                <Text style={styles.title}>Evaluación del Personal</Text>

                <Text style={styles.subtitle}>Información del Evaluador</Text>
                <Text>Nombre: Fernando Arreola Merino</Text>

                {Array.from({ length: peopleCount }).map((_, personIndex) => (
                  <View
                    key={`person-pdf-${personIndex}`}
                    style={styles.section}
                  >
                    <Text style={styles.subtitle}>
                      Evaluación para Persona {personIndex + 1}
                    </Text>

                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>Pregunta</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>Puntuación</Text>
                        </View>
                      </View>

                      {questions.map((question, qIndex) => (
                        <View key={`q-pdf-${qIndex}`} style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{question}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {selectedValues[personIndex]?.[qIndex] || 0}
                            </Text>
                          </View>
                        </View>
                      ))}

                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>Puntaje Total</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>
                            {personScores[personIndex] || 0}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}

                <Text style={styles.subtitle}>Secciones Adicionales</Text>
                <Text>Habilidades y características sobresalientes: {skillsStrengths}</Text>
                <Text>Habilidades y características a mejorar: {skillsToImprove}</Text>
                <Text>Nivel de desempeño obtenido: {performanceLevel}</Text>
              </Page>
            </Document>
          }
          fileName="evaluacion_personal.pdf"
        >
          {({ loading }) => (
            <Button disabled={loading}>
              {loading ? "Generando PDF..." : "Generar PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default PersonalEvaluationModule;
