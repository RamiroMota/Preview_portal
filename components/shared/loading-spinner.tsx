import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  isLoading: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="mt-2 text-gray-700">Cargando...</p>
      </div>
    </div>
  );
};
