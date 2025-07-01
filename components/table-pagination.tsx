"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TablePagination({ currentPage, totalPages, onPageChange }: TablePaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
      <div className="text-sm text-gray-600 order-2 sm:order-1">
        Página {currentPage} de {totalPages}
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-3"
        >
          <ChevronLeft className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>

        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="min-w-[32px] px-2 sm:px-3"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="h-4 w-4 sm:ml-1" />
        </Button>
      </div>
    </div>
  )
}
