'use client'

import { Download } from 'lucide-react'
import type { Job } from '@/types'

interface ExportCsvButtonProps {
  jobs: Job[]
}

const HEADERS = ['empresa', 'cargo', 'estado', 'salario_usd', 'prioridad', 'fecha_postulacion']

function escapeCsvValue(value: string): string {
  return value.includes(',') || value.includes('"') || value.includes('\n')
    ? `"${value.replace(/"/g, '""')}"`
    : value
}

function jobsToCsv(jobs: Job[]): string {
  const rows = jobs.map((job) =>
    [
      job.empresa,
      job.cargo,
      job.estado,
      job.salary ?? '',
      job.priority,
      job.createdAt.slice(0, 10),
    ]
      .map((value) => escapeCsvValue(String(value)))
      .join(',')
  )
  return [HEADERS.join(','), ...rows].join('\n')
}

export function ExportCsvButton({ jobs }: ExportCsvButtonProps) {
  function handleExport() {
    const csv = jobsToCsv(jobs)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const today = new Date().toISOString().slice(0, 10)

    const link = document.createElement('a')
    link.href = url
    link.download = `jobs-${today}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      disabled={jobs.length === 0}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-colors disabled:opacity-50 disabled:pointer-events-none"
    >
      <Download className="w-3.5 h-3.5" />
      Exportar CSV
    </button>
  )
}
