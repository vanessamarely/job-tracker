'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { JobForm } from '@/components/JobForm'

export function AddJobButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Nueva postulación
      </button>
      {open && <JobForm onClose={() => setOpen(false)} />}
    </>
  )
}
