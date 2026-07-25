export const dynamic = 'force-dynamic'

import { getProfile } from '@/lib/db'
import { ProfileForm } from '@/components/ProfileForm'
import { FileText } from 'lucide-react'

export default function ProfilePage() {
  const profile = getProfile()

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Mi CV</h1>
        <p className="text-sm text-slate-500 mt-1">
          Tu CV base se usa como punto de partida para adaptar cada postulación
        </p>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4 mb-6">
        <FileText className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-indigo-700">¿Cómo funciona el CV adaptado?</p>
          <p className="text-xs text-indigo-500 mt-1 leading-relaxed">
            Guarda tu CV completo aquí. Al abrir cualquier postulación → pestaña{' '}
            <strong>CV Adaptado</strong>, encontrarás una copia prellenada con tu CV base que
            puedes modificar para ese puesto específico sin afectar el original.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}
