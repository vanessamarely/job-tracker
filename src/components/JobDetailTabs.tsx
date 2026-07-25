'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2 } from 'lucide-react'
import type { Job } from '@/types'

type Tab = 'descripcion' | 'cv' | 'carta' | 'notas'

interface JobDetailTabsProps {
  job: Job
  baseCv: string
}

export function JobDetailTabs({ job, baseCv }: JobDetailTabsProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('descripcion')
  const [adaptedCv, setAdaptedCv] = useState(job.adaptedCv ?? '')
  const [coverLetter, setCoverLetter] = useState(job.coverLetter ?? '')
  const [interviewNotes, setInterviewNotes] = useState(job.interviewNotes ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function save(field: 'adaptedCv' | 'coverLetter' | 'interviewNotes', value: string) {
    setSaving(true)
    try {
      await fetch(`/api/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      })
      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'descripcion', label: 'Descripción' },
    { id: 'cv', label: 'CV Adaptado' },
    { id: 'carta', label: 'Carta de interés' },
    { id: 'notas', label: 'Notas de entrevista' },
  ]

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-slate-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'descripcion' && (
        <div>
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:underline mb-4"
            >
              Ver oferta original →
            </a>
          )}
          {job.descripcion ? (
            <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed bg-slate-50 rounded-xl p-5 border border-slate-200 text-sm">
              {job.descripcion}
            </div>
          ) : (
            <EmptyState text="Sin descripción. Edita la postulación para agregar una." />
          )}
        </div>
      )}

      {activeTab === 'cv' && (
        <EditorPanel
          label="CV adaptado para esta oferta"
          hint={
            !adaptedCv
              ? 'Tu CV base está precargado. Personalízalo según los requisitos de esta oferta.'
              : undefined
          }
          value={adaptedCv || baseCv}
          onChange={(v) => setAdaptedCv(v)}
          onSave={() => save('adaptedCv', adaptedCv || baseCv)}
          saving={saving}
          saved={saved}
          placeholder="Adapta tu CV para esta posición específica…"
        />
      )}

      {activeTab === 'carta' && (
        <EditorPanel
          label="Carta de interés"
          value={coverLetter}
          onChange={setCoverLetter}
          onSave={() => save('coverLetter', coverLetter)}
          saving={saving}
          saved={saved}
          placeholder={`Estimado equipo de ${job.empresa},\n\nMe dirijo a ustedes para expresar mi interés en la posición de ${job.cargo}…`}
        />
      )}

      {activeTab === 'notas' && (
        <EditorPanel
          label="Notas de entrevistas y seguimiento"
          hint="Registra preguntas técnicas, feedback recibido, próximos pasos, etc."
          value={interviewNotes}
          onChange={setInterviewNotes}
          onSave={() => save('interviewNotes', interviewNotes)}
          saving={saving}
          saved={saved}
          placeholder="📋 Entrevista técnica — 15 Jul 2026&#10;- Preguntas sobre React hooks&#10;- Algoritmo de BFS/DFS&#10;&#10;📋 Entrevista con RRHH — 20 Jul 2026&#10;- Preguntaron sobre trabajo en equipo…"
        />
      )}
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function EditorPanel({
  label,
  hint,
  value,
  onChange,
  onSave,
  saving,
  saved,
  placeholder,
}: {
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
  onSave: () => void
  saving: boolean
  saved: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-800">{label}</p>
          {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          {saved ? '¡Guardado!' : 'Guardar'}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={18}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white font-mono leading-relaxed"
        style={{ minHeight: '400px' }}
      />
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  )
}
