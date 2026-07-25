---
name: write-tests
description: Genera tests para el job-tracker siguiendo las convenciones del proyecto
---

# Skill: Write Tests — job-tracker

## Stack de testing

- **Framework:** Vitest
- **UI:** React Testing Library + `@testing-library/user-event`
- **Entorno DOM:** jsdom (configurado en `vitest.config.ts`)
- **Mocking de DB:** `vi.mock('@/lib/db')` — nunca toques la SQLite real en tests

## Cómo correr los tests

```bash
npm run test           # modo watch
npm run test -- --run  # una sola vez (CI)
```

## Estructura de archivos de test

```
src/
  components/
    JobCard.tsx
    __tests__/
      JobCard.test.tsx      ← tests del componente
  lib/
    db.ts
    __tests__/
      db.test.ts            ← tests de la capa de datos
    validations.ts
    __tests__/
      validations.test.ts   ← tests de schemas Zod
```

## Convenciones para `describe` e `it`

```typescript
describe('JobCard', () => {          // nombre del componente/función
  it('muestra empresa y cargo', ...) // describe comportamiento, no implementación
  it('badge cambia según estado', ...)
  it('no muestra salary si es null', ...)
})
```

Cubre siempre: **happy path · caso vacío · caso de error · valores en el límite**.

## Cómo mockear la DB

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest'

vi.mock('@/lib/db', () => ({
  getAllJobs: vi.fn(),
  getJobById: vi.fn(),
  createJob: vi.fn(),
  updateJob: vi.fn(),
  deleteJob: vi.fn(),
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
}))

import { getAllJobs, getJobById } from '@/lib/db'

beforeEach(() => {
  vi.clearAllMocks()
})
```

## Ejemplo completo — test de componente

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JobCard } from '../JobCard'
import type { Job } from '@/types'

const mockJob: Job = {
  id: 'uuid-123',
  empresa: 'Platzi',
  cargo: 'Frontend Developer',
  url: null,
  descripcion: null,
  estado: 'applied',
  salary: 80000,
  priority: 'high',
  adaptedCv: null,
  coverLetter: null,
  interviewNotes: null,
  deadline: null,
  createdAt: '2026-07-01T00:00:00.000Z',
  updatedAt: '2026-07-01T00:00:00.000Z',
}

describe('JobCard', () => {
  it('muestra empresa y cargo', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText('Platzi')).toBeInTheDocument()
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
  })

  it('muestra el salary formateado', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText(/80/)).toBeInTheDocument()
  })

  it('no muestra salary cuando es null', () => {
    render(<JobCard job={{ ...mockJob, salary: null }} />)
    expect(screen.queryByText(/80/)).not.toBeInTheDocument()
  })
})
```

## Ejemplo completo — test de función de DB

```typescript
import { describe, it, expect } from 'vitest'
import { CreateJobSchema } from '@/lib/validations'

describe('CreateJobSchema', () => {
  it('valida un job correcto', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Google',
      cargo: 'Software Engineer',
      estado: 'applied',
    })
    expect(result.success).toBe(true)
  })

  it('rechaza empresa vacía', () => {
    const result = CreateJobSchema.safeParse({
      empresa: '',
      cargo: 'Software Engineer',
    })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.empresa).toBeDefined()
  })

  it('rechaza empresa menor a 2 caracteres', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'A',
      cargo: 'Software Engineer',
    })
    expect(result.success).toBe(false)
  })
})
```
