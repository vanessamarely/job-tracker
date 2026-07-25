import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '../StatusBadge'
import type { JobEstado } from '@/types'

describe('StatusBadge', () => {
  const estados: JobEstado[] = ['wishlist', 'applied', 'interviewing', 'offer', 'rejected']

  it.each(estados)('renderiza una etiqueta para el estado "%s"', (estado) => {
    render(<StatusBadge estado={estado} />)
    expect(screen.getByText(/./)).toBeInTheDocument()
  })

  it('muestra la etiqueta en español para "rejected"', () => {
    render(<StatusBadge estado="rejected" />)
    expect(screen.getByText('Descartado')).toBeInTheDocument()
  })

  it('usa el tamaño compacto cuando se pasa size="sm"', () => {
    const { container } = render(<StatusBadge estado="applied" size="sm" />)
    expect(container.querySelector('.text-\\[11px\\]')).not.toBeNull()
  })
})
