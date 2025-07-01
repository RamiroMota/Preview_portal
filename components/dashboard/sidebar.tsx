"use client";

import { Button } from "@/components/ui/button";
import {
  Home,
  ClipboardCheck,
  FileText,
  GraduationCap,
  PlusCircle,
  Menu,
  Users,
} from "lucide-react";
import type { ActiveModule } from "./dashboard";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SidebarProps {
  activeModule: ActiveModule;
  onModuleChange: (module: ActiveModule) => void;
}

const menuItems = [
  {
    id: "home" as ActiveModule,
    label: "Inicio",
    icon: Home,
    description: "Panel principal",
  },
  {
    id: "supervision" as ActiveModule,
    label: "Sistema de Supervisión Académica",
    icon: ClipboardCheck,
    description: "Gestión de secuencias didácticas",
  },
  {
    id: "create-sequence" as ActiveModule,
    label: "Crear Secuencia Didáctica",
    icon: PlusCircle,
    description: "Formulario de nueva secuencia",
  },
  {
    id: "poa" as ActiveModule,
    label: "POA - Programa Operativo Anual",
    icon: FileText,
    description: "Planificación académica anual",
  },
  {
    id: "personal-evaluation" as ActiveModule,
    label: "Evaluación del personal",
    icon: Users, // Using Users icon for now, can be changed later
    description: "Gestión de evaluación de personal",
  },
  {
    id: "user-control" as ActiveModule,
    label: "Control de Usuarios",
    icon: Users,
    description: "Gestión de usuarios y permisos",
  },
];

function SidebarContent({
  activeModule,
  onModuleChange,
  onItemClick,
}: SidebarProps & { onItemClick?: () => void }) {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              Portal Académico
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              Módulos del Sistema
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-auto p-3 sm:p-4 ${
                isActive
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                onModuleChange(item.id);
                onItemClick?.();
              }}
            >
              <div className="flex items-start space-x-3 w-full">
                <Icon
                  className={`h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                />
                <div className="text-left min-w-0 flex-1">
                  <div className="font-medium text-sm sm:text-base truncate">
                    {item.label}
                  </div>
                  <div
                    className={`text-xs ${
                      isActive ? "text-blue-100" : "text-gray-500"
                    } truncate`}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </nav>

      <div className="p-3 sm:p-4 border-t border-gray-200">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-blue-800 font-medium">
            Portal Académico v1.1.9
          </p>
          <p className="text-xs text-blue-600">Sistema Integral de Gestión</p>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="fixed top-4 left-4 z-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <SidebarContent
              activeModule={activeModule}
              onModuleChange={onModuleChange}
              onItemClick={() => setIsOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-80 border-r border-gray-200">
        <SidebarContent
          activeModule={activeModule}
          onModuleChange={onModuleChange}
        />
      </div>
    </>
  );
}
