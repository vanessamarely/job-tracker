'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Building2, ArrowRight, DollarSign, Calendar, Star } from 'lucide-react'
import { StatusBadge } from '@/components/StatusBadge'
import { isFavorite, toggleFavorite } from '@/lib/favorites'
import type { Job } from '@/types'

interface JobCardProps {
  job: Job
}

const priorityDot: Record<string, string> = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-slate-300',
}

export function JobCard({ job }: JobCardProps) {
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setFavorite(isFavorite(job.id))
  }, [job.id])

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(job.id)
    setFavorite((prev) => !prev)
  }

  const initials = job.empresa
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const formattedDate = new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(job.createdAt))

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group relative block bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-200 hover:shadow-md transition-all"
    >
      <button
        type="button"
        onClick={handleToggleFavorite}
        aria-label={favorite ? 'Quitar de favoritos' : 'Marcar como favorito'}
        aria-pressed={favorite}
        className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-50 transition-colors"
      >
        <Star
          className={`w-4 h-4 transition-colors ${
            favorite ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
          }`}
        />
      </button>

      <div className="flex items-start gap-4">
        {/* Company initials avatar */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center shrink-0 border border-indigo-100">
          <span className="text-indigo-700 text-xs font-bold">{initials}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 pr-6">
            <div>
              <p className="font-semibold text-slate-900 text-sm truncate">{job.empresa}</p>
              <p className="text-slate-500 text-sm truncate mt-0.5">{job.cargo}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <StatusBadge estado={job.estado} size="sm" />

            {job.salary && (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                <DollarSign className="w-3 h-3" />
                {job.salary.toLocaleString('es')}
              </span>
            )}

            <span
              title={`Prioridad: ${job.priority}`}
              className={`w-2 h-2 rounded-full ${priorityDot[job.priority]}`}
            />
          </div>

          <div className="flex items-center gap-1 mt-2.5">
            <Calendar className="w-3 h-3 text-slate-300" />
            <span className="text-[11px] text-slate-400">{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-100" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-100 rounded w-1/2" />
          <div className="h-3 bg-slate-100 rounded w-2/3" />
          <div className="h-5 bg-slate-100 rounded w-24 mt-3" />
        </div>
      </div>
    </div>
  )
}

export { Building2 }
