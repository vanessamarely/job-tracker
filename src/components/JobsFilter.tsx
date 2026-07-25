'use client'

import { useRouter } from 'next/navigation'
import type { JobEstado } from '@/types'

interface Option {
  value: JobEstado | 'all'
  label: string
}

interface JobsFilterProps {
  estadoOptions: Option[]
  currentEstado: string
}

export function JobsFilter({ estadoOptions, currentEstado }: JobsFilterProps) {
  const router = useRouter()

  function handleChange(value: string) {
    const params = new URLSearchParams()
    if (value !== 'all') params.set('estado', value)
    router.push(`/jobs${params.size > 0 ? `?${params.toString()}` : ''}`)
  }

  return (
    <div className="flex gap-1.5 flex-wrap">
      {estadoOptions.map((opt) => {
        const isActive = opt.value === currentEstado
        return (
          <button
            key={opt.value}
            onClick={() => handleChange(opt.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-200 hover:text-indigo-600'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
