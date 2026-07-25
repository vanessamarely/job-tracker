import type { JobEstado } from '@/types'

const CONFIG: Record<
  JobEstado,
  { label: string; bg: string; text: string; dot: string }
> = {
  wishlist: {
    label: 'Lista de deseos',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
  },
  applied: {
    label: 'Postulado',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  interviewing: {
    label: 'Entrevistas',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  offer: {
    label: 'Oferta',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  rejected: {
    label: 'Descartado',
    bg: 'bg-red-50',
    text: 'text-red-600',
    dot: 'bg-red-400',
  },
}

interface StatusBadgeProps {
  estado: JobEstado
  size?: 'sm' | 'md'
}

export function StatusBadge({ estado, size = 'md' }: StatusBadgeProps) {
  const c = CONFIG[estado]
  const textSize = size === 'sm' ? 'text-[11px]' : 'text-xs'
  const padding = size === 'sm' ? 'px-1.5 py-0.5' : 'px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${c.bg} ${c.text} ${textSize} ${padding}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
}

export { CONFIG as StatusConfig }
