"use client"

import { PendingReviewsTable } from "./pending-reviews-table"
import { ReviewedSequencesTable } from "./reviewed-sequences-table"

export function SupervisionModule() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sistema de Supervisión Académica</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Gestión integral de secuencias didácticas y procesos de supervisión
        </p>
      </div>

      <PendingReviewsTable />
      <ReviewedSequencesTable />
    </div>
  )
}
