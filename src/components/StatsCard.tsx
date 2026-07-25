import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: number
  icon: LucideIcon
  color: 'indigo' | 'blue' | 'amber' | 'emerald' | 'red' | 'slate'
  subtitle?: string
}

const colorMap = {
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', value: 'text-indigo-700' },
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   value: 'text-blue-700'   },
  amber:  { bg: 'bg-amber-50',  icon: 'text-amber-600',  value: 'text-amber-700'  },
  emerald:{ bg: 'bg-emerald-50',icon: 'text-emerald-600',value: 'text-emerald-700'},
  red:    { bg: 'bg-red-50',    icon: 'text-red-500',    value: 'text-red-600'    },
  slate:  { bg: 'bg-slate-100', icon: 'text-slate-500',  value: 'text-slate-700'  },
}

export function StatsCard({ label, value, icon: Icon, color, subtitle }: StatsCardProps) {
  const c = colorMap[color]
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <p className={`text-3xl font-bold mt-1 ${c.value}`}>{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
      </div>
    </div>
  )
}
