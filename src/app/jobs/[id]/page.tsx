import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Globe, DollarSign, Calendar, AlertCircle } from 'lucide-react'
import { getJobById, getProfile } from '@/lib/db'
import { StatusBadge } from '@/components/StatusBadge'
import { JobDetailTabs } from '@/components/JobDetailTabs'
import { JobDetailActions } from '@/components/JobDetailActions'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params
  const job = getJobById(id)

  if (!job) notFound()

  const profile = getProfile()

  const initials = job.empresa
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const formattedDate = new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(job.createdAt))

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-4xl mx-auto">
      {/* Back */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver a postulaciones
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Company avatar */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 border border-indigo-100 flex items-center justify-center shrink-0">
              <span className="text-indigo-700 text-lg font-bold">{initials}</span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">{job.empresa}</h1>
              <p className="text-slate-500 mt-0.5">{job.cargo}</p>

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <StatusBadge estado={job.estado} />

                {job.salary && (
                  <span className="inline-flex items-center gap-1 text-sm text-slate-500">
                    <DollarSign className="w-3.5 h-3.5" />
                    {job.salary.toLocaleString('es')} / año
                  </span>
                )}

                {job.deadline && (
                  <span className="inline-flex items-center gap-1 text-sm text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    Límite: {new Date(job.deadline).toLocaleDateString('es')}
                  </span>
                )}

                {job.url && (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Ver oferta
                  </a>
                )}
              </div>

              <p className="text-xs text-slate-400 mt-2">Agregado el {formattedDate}</p>
            </div>
          </div>

          <JobDetailActions job={job} />
        </div>

        {/* No base CV warning */}
        {!profile?.baseCv && (
          <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              No tienes un CV base guardado.{' '}
              <Link href="/profile" className="underline font-medium">
                Configura tu perfil
              </Link>{' '}
              para poder adaptar tu CV a cada oferta.
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <JobDetailTabs job={job} baseCv={profile?.baseCv ?? ''} />
      </div>
    </div>
  )
}
