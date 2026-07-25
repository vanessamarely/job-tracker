'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, CheckCircle } from 'lucide-react'
import { ProfileSchema } from '@/lib/validations'
import type { Profile } from '@/types'

interface ProfileFormProps {
  profile: Profile
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [form, setForm] = useState({
    name: profile.name ?? '',
    email: profile.email ?? '',
    title: profile.title ?? '',
    baseCv: profile.baseCv ?? '',
    skills: profile.skills ?? '',
  })

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const parsed = ProfileSchema.safeParse(form)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const [k, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
        fieldErrors[k] = (msgs as string[])[0] ?? ''
      }
      setErrors(fieldErrors)
      return
    }

    setSaving(true)
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal info */}
      <section>
        <h2 className="text-sm font-semibold text-slate-800 mb-4">Información personal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nombre completo" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Ana García"
              className={input(!!errors.name)}
            />
          </Field>
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="ana@ejemplo.com"
              className={input(!!errors.email)}
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Título profesional" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Senior Software Engineer · 5 años de experiencia"
              className={input(!!errors.title)}
            />
          </Field>
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Skills */}
      <section>
        <h2 className="text-sm font-semibold text-slate-800 mb-1">Skills / Tecnologías</h2>
        <p className="text-xs text-slate-400 mb-3">Separadas por coma</p>
        <Field label="" error={errors.skills}>
          <input
            type="text"
            value={form.skills}
            onChange={(e) => set('skills', e.target.value)}
            placeholder="React, TypeScript, Node.js, PostgreSQL, AWS…"
            className={input(!!errors.skills)}
          />
        </Field>
      </section>

      <div className="border-t border-slate-100" />

      {/* Base CV */}
      <section>
        <h2 className="text-sm font-semibold text-slate-800 mb-1">CV Base</h2>
        <p className="text-xs text-slate-400 mb-3">
          Escribe o pega tu CV completo. Se usará como base para adaptarlo a cada oferta.
        </p>
        <Field label="" error={errors.baseCv}>
          <textarea
            value={form.baseCv}
            onChange={(e) => set('baseCv', e.target.value)}
            rows={20}
            placeholder={`NOMBRE APELLIDO\nana@ejemplo.com · linkedin.com/in/ana · GitHub: @ana\n\n── RESUMEN ──────────────────────\nIngeniería de software con 5 años de experiencia en desarrollo web full-stack…\n\n── EXPERIENCIA ──────────────────\nSenior Frontend Engineer @ Empresa XYZ (2022 – actualidad)\n• Lideré migración de React 16 a React 18, reduciendo re-renders en 40%\n• Implementé sistema de design tokens con Figma + Tailwind\n\n── EDUCACIÓN ────────────────────\nIngeniería en Sistemas, Universidad Nacional (2019)`}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white font-mono leading-relaxed"
            style={{ minHeight: '400px' }}
          />
        </Field>
      </section>

      {/* Save button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-600">
            <CheckCircle className="w-4 h-4" />
            Perfil guardado
          </span>
        )}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Guardar perfil
        </button>
      </div>
    </form>
  )
}

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
      {label && (
        <label className="block text-xs font-medium text-slate-700 mb-1.5">{label}</label>
      )}
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function input(hasError: boolean) {
  return `w-full px-3 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
    hasError ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white hover:border-slate-300'
  }`
}
