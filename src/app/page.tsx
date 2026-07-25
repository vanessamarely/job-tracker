export const dynamic = 'force-dynamic'

import {
  BriefcaseBusiness,
  Send,
  MessageSquare,
  Trophy,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { getAllJobs } from '@/lib/db'
import { StatsCard } from '@/components/StatsCard'
import { JobCard } from '@/components/JobCard'
import { AddJobButton } from '@/components/AddJobButton'
import { EmptyState } from '@/components/EmptyState'

export default function DashboardPage() {
  const jobs = getAllJobs()

  const counts = {
    total: jobs.length,
    wishlist: jobs.filter((j) => j.estado === 'wishlist').length,
    applied: jobs.filter((j) => j.estado === 'applied').length,
    interviewing: jobs.filter((j) => j.estado === 'interviewing').length,
    offer: jobs.filter((j) => j.estado === 'offer').length,
    rejected: jobs.filter((j) => j.estado === 'rejected').length,
  }

  const recent = jobs.slice(0, 6)

  const pipeline: Array<{
    key: keyof typeof counts
    label: string
    color: string
    bar: string
  }> = [
    { key: 'wishlist', label: 'Lista de deseos', color: 'text-slate-600', bar: 'bg-slate-300' },
    { key: 'applied', label: 'Postulados', color: 'text-blue-600', bar: 'bg-blue-400' },
    { key: 'interviewing', label: 'Entrevistas', color: 'text-amber-600', bar: 'bg-amber-400' },
    { key: 'offer', label: 'Ofertas', color: 'text-emerald-600', bar: 'bg-emerald-400' },
  ]

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            {counts.total === 0
              ? 'Comienza agregando tu primera postulación'
              : `${counts.total} postulación${counts.total !== 1 ? 'es' : ''} en seguimiento`}
          </p>
        </div>
        <AddJobButton />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total" value={counts.total} icon={BriefcaseBusiness} color="indigo" subtitle="postulaciones" />
        <StatsCard label="Postulados" value={counts.applied} icon={Send} color="blue" subtitle="enviadas" />
        <StatsCard label="Entrevistas" value={counts.interviewing} icon={MessageSquare} color="amber" subtitle="activas" />
        <StatsCard label="Ofertas" value={counts.offer} icon={Trophy} color="emerald" subtitle="recibidas" />
      </div>

      {/* Pipeline */}
      {counts.total > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-700">Pipeline de postulaciones</h2>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {pipeline.map(({ key, label, color, bar }) => {
              const count = counts[key]
              const pct = counts.total > 0 ? Math.round((count / counts.total) * 100) : 0
              return (
                <div key={key} className="text-center">
                  <p className={`text-2xl font-bold ${color}`}>{count}</p>
                  <p className="text-xs text-slate-500 mt-0.5 mb-2">{label}</p>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{pct}%</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recent jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-700">Postulaciones recientes</h2>
          {counts.total > 6 && (
            <Link href="/jobs" className="text-xs text-indigo-600 hover:underline">Ver todas →</Link>
          )}
        </div>

        {recent.length === 0 ? (
          <EmptyState
            icon={BriefcaseBusiness}
            title="Aún no tienes postulaciones"
            description="Agrega tu primera oferta y empieza a hacer seguimiento"
            action={<AddJobButton />}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

