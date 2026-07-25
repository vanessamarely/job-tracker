'use client'

import { Menu, BriefcaseBusiness } from 'lucide-react'

interface MobileHeaderProps {
  onToggleSidebar: () => void
}

export function MobileHeader({ onToggleSidebar }: MobileHeaderProps) {
  return (
    <header className="lg:hidden flex items-center gap-3 px-4 h-14 border-b border-slate-200 bg-white shrink-0">
      <button
        onClick={onToggleSidebar}
        className="p-2 -ml-1 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
          <BriefcaseBusiness className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-semibold text-slate-900">Job Tracker</span>
      </div>
    </header>
  )
}
