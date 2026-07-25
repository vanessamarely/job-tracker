'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Pencil, Loader2 } from 'lucide-react'
import { JobForm } from '@/components/JobForm'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import type { Job } from '@/types'

export function JobDetailActions({ job }: { job: Job }) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  async function handleDelete() {
    setConfirmingDelete(false)
    setDeleting(true)
    await fetch(`/api/jobs/${job.id}`, { method: 'DELETE' })
    router.push('/jobs')
    router.refresh()
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
          Editar
        </button>
        <button
          onClick={() => setConfirmingDelete(true)}
          disabled={deleting}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-sm text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          {deleting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
          Eliminar
        </button>
      </div>
      {editing && (
        <JobForm
          mode="edit"
          defaultValues={job}
          onClose={() => setEditing(false)}
        />
      )}
      {confirmingDelete && (
        <ConfirmDialog
          title="Eliminar postulación"
          description={`¿Eliminar la postulación a ${job.empresa}? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </>
  )
}
