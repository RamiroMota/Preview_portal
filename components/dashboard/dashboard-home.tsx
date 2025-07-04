"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  ClockAlert,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  BookOpen,
  PlusCircle,
} from "lucide-react";
import { RadialChartCard } from "./radial-chart-card";

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Bienvenido al Portal Académico
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Sistema integral para la gestión académica y administrativa
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
        <Card className="bg-yellow-100 text-yellow-500 text-center shadow-2xl border border-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Secuencias Pendientes
            </CardTitle>
            <ClockAlert className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 desde la semana pasada
            </p>
          </CardContent>
        </Card>

        <Card className="bg-blue-100 text-blue-500 text-center shadow-2xl border border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              POAs Activos
            </CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Para el ciclo 2025-A
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-100 text-green-500 text-center shadow-2xl border border-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Docentes Activos
            </CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+3 nuevos este mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ClipboardCheck className="h-4 w-4 sm:h-5 sm:w-5" />
              Sistema de Supervisión Académica
            </CardTitle>
            <CardDescription className="text-sm">
              Gestiona secuencias didácticas, revisiones y aprobaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Secuencias pendientes
                </span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">En supervisión</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Revisadas</span>
                <span className="font-semibold">156</span>
              </div>
              <Button className="w-full text-sm">Acceder al Sistema</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Crear Secuencia Didáctica
            </CardTitle>
            <CardDescription className="text-sm">
              Formulario para crear nuevas secuencias didácticas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Plantillas disponibles
                </span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Borradores guardados
                </span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Creadas este mes</span>
                <span className="font-semibold">18</span>
              </div>
              <Button className="w-full text-sm">Crear Nueva Secuencia</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
              POA - Programa Operativo Anual
            </CardTitle>
            <CardDescription className="text-sm">
              Planificación y seguimiento de programas académicos anuales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">POAs activos</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">En revisión</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completados</span>
                <span className="font-semibold">24</span>
              </div>
              <Button className="w-full text-sm">Gestionar POAs</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actividad reciente */}
      <Card className="bg-purple-100 text-purple-500 text-center items-center shadow-2xl border border-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            Actividad Reciente
          </CardTitle>
          <CardDescription className="text-sm">
            Últimas acciones realizadas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                <ClipboardCheck className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  Secuencia "Álgebra Lineal" aprobada
                </p>
                <p className="text-xs text-gray-500">Hace 2 horas</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  POA "Matemáticas 2025-A" actualizado
                </p>
                <p className="text-xs text-gray-500">Hace 4 horas</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  Nueva secuencia enviada para revisión
                </p>
                <p className="text-xs text-gray-500">Hace 6 horas</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-purple-100 p-2 rounded-full flex-shrink-0">
                <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  Secuencia "Física Cuántica" creada
                </p>
                <p className="text-xs text-gray-500">Hace 8 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
