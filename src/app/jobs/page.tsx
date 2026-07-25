import { getAllJobs } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { AddJobButton } from '@/components/AddJobButton'
import { ExportCsvButton } from '@/components/ExportCsvButton'
import { SearchBox } from '@/components/SearchBox'
import { EmptyState } from '@/components/EmptyState'
import { BriefcaseBusiness } from 'lucide-react'
import { JobsFilter } from '@/components/JobsFilter'
import type { JobEstado } from '@/types'

interface PageProps {
  searchParams: Promise<{ estado?: string; q?: string }>
}

const ESTADOS: Array<{ value: JobEstado | 'all'; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'wishlist', label: 'Lista de deseos' },
  { value: 'applied', label: 'Postulados' },
  { value: 'interviewing', label: 'Entrevistas' },
  { value: 'offer', label: 'Ofertas' },
  { value: 'rejected', label: 'Descartados' },
]

export default async function JobsPage({ searchParams }: PageProps) {
  const { estado, q } = await searchParams
  const allJobs = getAllJobs()
  const byEstado =
    estado && estado !== 'all'
      ? allJobs.filter((j) => j.estado === estado)
      : allJobs
  const query = q?.trim().toLowerCase() ?? ''
  const filteredJobs = query
    ? byEstado.filter(
        (j) =>
          j.empresa.toLowerCase().includes(query) ||
          j.cargo.toLowerCase().includes(query)
      )
    : byEstado

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Postulaciones</h1>
          <p className="text-sm text-slate-500 mt-1">{filteredJobs.length} resultados</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportCsvButton jobs={filteredJobs} />
          <AddJobButton />
        </div>
      </div>

      {/* Filter tabs + búsqueda */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <JobsFilter estadoOptions={ESTADOS} currentEstado={estado ?? 'all'} />
        <SearchBox initialQuery={q ?? ''} />
      </div>

      {/* Grid */}
      {filteredJobs.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={BriefcaseBusiness}
            title={query ? 'Sin resultados para tu búsqueda' : 'Sin postulaciones en esta categoría'}
            description={
              estado && estado !== 'all'
                ? 'Prueba otro filtro o agrega una nueva postulación'
                : 'Agrega tu primera postulación para empezar'
            }
            action={<AddJobButton />}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
