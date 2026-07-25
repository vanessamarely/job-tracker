'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Loader2 } from 'lucide-react'
import { CreateJobSchema } from '@/lib/validations'
import { logger } from '@/lib/logger'
import type { Job, JobEstado, JobPriority } from '@/types'

interface JobFormProps {
  onClose: () => void
  defaultValues?: Partial<Job>
  mode?: 'create' | 'edit'
}

const ESTADOS: { value: JobEstado; label: string }[] = [
  { value: 'wishlist', label: 'Lista de deseos' },
  { value: 'applied', label: 'Postulado' },
  { value: 'interviewing', label: 'Entrevistas' },
  { value: 'offer', label: 'Oferta recibida' },
  { value: 'rejected', label: 'Descartado' },
]

const PRIORITIES: { value: JobPriority; label: string }[] = [
  { value: 'high', label: '🔴 Alta' },
  { value: 'medium', label: '🟡 Media' },
  { value: 'low', label: '⚪ Baja' },
]

type FieldErrors = Partial<Record<keyof Job, string[]>>

export function JobForm({ onClose, defaultValues, mode = 'create' }: JobFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const [form, setForm] = useState({
    empresa: defaultValues?.empresa ?? '',
    cargo: defaultValues?.cargo ?? '',
    url: defaultValues?.url ?? '',
    descripcion: defaultValues?.descripcion ?? '',
    estado: (defaultValues?.estado ?? 'wishlist') as JobEstado,
    salary: defaultValues?.salary?.toString() ?? '',
    priority: (defaultValues?.priority ?? 'medium') as JobPriority,
    deadline: defaultValues?.deadline ?? '',
  })

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      ...form,
      salary: form.salary ? parseInt(form.salary, 10) : null,
      url: form.url || null,
      descripcion: form.descripcion || null,
      deadline: form.deadline || null,
    }

    const parsed = CreateJobSchema.safeParse(payload)
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors as FieldErrors)
      return
    }

    setLoading(true)
    try {
      const url =
        mode === 'edit' && defaultValues?.id
          ? `/api/jobs/${defaultValues.id}`
          : '/api/jobs'
      const method = mode === 'edit' ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })

      if (!res.ok) {
        const err = await res.json()
        logger.error('Error al guardar la postulación', err)
        return
      }

      const job: Job = await res.json()
      router.refresh()
      onClose()
      if (mode === 'create') {
        router.push(`/jobs/${job.id}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            {mode === 'create' ? 'Nueva postulación' : 'Editar postulación'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Empresa */}
          <Field label="Empresa *" error={errors.empresa?.[0]}>
            <input
              type="text"
              value={form.empresa}
              onChange={(e) => set('empresa', e.target.value)}
              placeholder="Google, Meta, Startups…"
              className={inputClass(!!errors.empresa)}
            />
          </Field>

          {/* Cargo */}
          <Field label="Cargo / Posición *" error={errors.cargo?.[0]}>
            <input
              type="text"
              value={form.cargo}
              onChange={(e) => set('cargo', e.target.value)}
              placeholder="Senior Frontend Engineer"
              className={inputClass(!!errors.cargo)}
            />
          </Field>

          {/* URL */}
          <Field label="URL de la oferta" error={errors.url?.[0]}>
            <input
              type="url"
              value={form.url}
              onChange={(e) => set('url', e.target.value)}
              placeholder="https://jobs.example.com/123"
              className={inputClass(!!errors.url)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            {/* Estado */}
            <Field label="Estado" error={errors.estado?.[0]}>
              <select
                value={form.estado}
                onChange={(e) => set('estado', e.target.value)}
                className={selectClass}
              >
                {ESTADOS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            {/* Prioridad */}
            <Field label="Prioridad" error={errors.priority?.[0]}>
              <select
                value={form.priority}
                onChange={(e) => set('priority', e.target.value)}
                className={selectClass}
              >
                {PRIORITIES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Salary */}
            <Field label="Salario (USD / año)" error={errors.salary?.[0]}>
              <input
                type="number"
                value={form.salary}
                onChange={(e) => set('salary', e.target.value)}
                placeholder="80000"
                min={0}
                className={inputClass(!!errors.salary)}
              />
            </Field>

            {/* Deadline */}
            <Field label="Fecha límite" error={errors.deadline?.[0]}>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => set('deadline', e.target.value)}
                className={inputClass(!!errors.deadline)}
              />
            </Field>
          </div>

          {/* Descripción */}
          <Field label="Descripción de la oferta" error={errors.descripcion?.[0]}>
            <textarea
              value={form.descripcion}
              onChange={(e) => set('descripcion', e.target.value)}
              rows={4}
              placeholder="Pega aquí la descripción del puesto…"
              className={inputClass(!!errors.descripcion)}
            />
          </Field>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'create' ? 'Agregar postulación' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputBase =
  'w-full px-3 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'

function inputClass(hasError: boolean) {
  return `${inputBase} ${hasError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'}`
}

const selectClass = `${inputBase} border-slate-200 bg-white hover:border-slate-300 cursor-pointer`
