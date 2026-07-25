'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { MobileHeader } from './MobileHeader'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function close() {
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div
        aria-hidden="true"
        onClick={close}
        className={[
          'fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden',
          'transition-opacity duration-300',
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={close} />

      {/* Content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <MobileHeader onToggleSidebar={() => setSidebarOpen((o) => !o)} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </>
  )
}
