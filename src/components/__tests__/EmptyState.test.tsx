import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BriefcaseBusiness } from 'lucide-react'
import { EmptyState } from '../EmptyState'

describe('EmptyState', () => {
  it('muestra el título y la descripción', () => {
    render(
      <EmptyState
        icon={BriefcaseBusiness}
        title="Sin postulaciones"
        description="Agrega tu primera oferta"
      />
    )
    expect(screen.getByText('Sin postulaciones')).toBeInTheDocument()
    expect(screen.getByText('Agrega tu primera oferta')).toBeInTheDocument()
  })

  it('renderiza la acción cuando se pasa una', () => {
    render(
      <EmptyState
        icon={BriefcaseBusiness}
        title="Sin resultados"
        description="Prueba otro filtro"
        action={<button>Agregar</button>}
      />
    )
    expect(screen.getByRole('button', { name: 'Agregar' })).toBeInTheDocument()
  })

  it('no renderiza ningún botón si no se pasa acción', () => {
    render(
      <EmptyState icon={BriefcaseBusiness} title="Sin resultados" description="Prueba otro filtro" />
    )
    expect(screen.queryByRole('button')).toBeNull()
  })
})
