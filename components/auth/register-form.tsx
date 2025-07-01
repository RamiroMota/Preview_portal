"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  GraduationCap,
  ArrowLeft,
  BadgeIcon as IdCard,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface RegisterFormProps {
  onBackToLogin: () => void;
}

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

export function RegisterForm({ onBackToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    curp: "",
    areaAcademica: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registerError, setRegisterError] = useState("");
  const { register, loading } = useAuth();

  const validateCURP = (curp: string) => {
    const curpRegex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/;
    return curpRegex.test(curp.toUpperCase());
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!formData.curp) {
      newErrors.curp = "La CURP es requerida";
    } else if (!validateCURP(formData.curp)) {
      newErrors.curp = "La CURP no tiene un formato válido";
    }

    if (!formData.areaAcademica) {
      newErrors.areaAcademica = "Debe seleccionar un área académica";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    if (!validateForm()) return;

    const success = await register(formData);
    if (!success) {
      setRegisterError("Error al registrar usuario. Intenta nuevamente.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <LoadingSpinner isLoading={loading} />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Crear Cuenta
          </CardTitle>
          <CardDescription className="text-gray-600">
            Completa el formulario para registrarte en el Portal Académico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {registerError && (
              <Alert variant="destructive">
                <AlertDescription>{registerError}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      handleInputChange("nombre", e.target.value)
                    }
                    className={`pl-10 ${errors.nombre ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.nombre && (
                  <p className="text-xs text-red-500">{errors.nombre}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="apellido"
                    type="text"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={(e) =>
                      handleInputChange("apellido", e.target.value)
                    }
                    className={`pl-10 ${
                      errors.apellido ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.apellido && (
                  <p className="text-xs text-red-500">{errors.apellido}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="curp">CURP</Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="curp"
                  type="text"
                  placeholder="CURP (18 caracteres)"
                  value={formData.curp}
                  onChange={(e) =>
                    handleInputChange("curp", e.target.value.toUpperCase())
                  }
                  className={`pl-10 ${errors.curp ? "border-red-500" : ""}`}
                  maxLength={18}
                />
              </div>
              {errors.curp && (
                <p className="text-sm text-red-500">{errors.curp}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="areaAcademica">Área Académica</Label>
              <Select
                value={formData.areaAcademica}
                onValueChange={(value) =>
                  handleInputChange("areaAcademica", value)
                }
              >
                <SelectTrigger
                  className={errors.areaAcademica ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Selecciona un área académica" />
                </SelectTrigger>
                <SelectContent>
                  {areasAcademicas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.areaAcademica && (
                <p className="text-sm text-red-500">{errors.areaAcademica}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`pl-10 pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`pl-10 pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={onBackToLogin}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Volver al inicio de sesión
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
