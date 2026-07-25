'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  ChevronRight,
  X,
} from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/jobs', label: 'Postulaciones', icon: BriefcaseBusiness },
  { href: '/profile', label: 'Mi CV', icon: FileText },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  function handleNavClick() {
    onClose?.()
  }

  return (
    <aside
      className={[
        // Base: fixed on mobile (overlay), relative on desktop (in-flow)
        'fixed lg:relative',
        'inset-y-0 left-0 lg:inset-auto',
        'z-50 lg:z-auto',
        'w-64 lg:w-60 h-full',
        'flex flex-col shrink-0',
        'border-r border-slate-200',
        // Smooth slide transition
        'transition-transform duration-300 ease-in-out',
        // Desktop: always visible; mobile: controlled by isOpen
        'lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
      style={{ background: 'var(--sidebar-bg)' }}
    >
      {/* Logo + mobile close button */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm shrink-0">
            <BriefcaseBusiness className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 leading-none">Job Tracker</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Gestiona tu búsqueda</p>
          </div>
          {/* Close button — only visible on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 shrink-0"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 pb-2">
          Menú
        </p>
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={handleNavClick}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}
                />
                {label}
              </span>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer hint */}
      <div className="px-4 py-4 border-t border-slate-100">
        <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-3">
          <p className="text-xs font-medium text-indigo-700">Consejo del día</p>
          <p className="text-[11px] text-indigo-500 mt-1 leading-relaxed">
            Personaliza tu CV para cada oferta. Aumenta tus chances hasta un 40%.
          </p>
        </div>
      </div>
    </aside>
  )
}

