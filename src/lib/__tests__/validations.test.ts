import { describe, it, expect } from 'vitest'
import { CreateJobSchema, UpdateJobSchema, ProfileSchema } from '../validations'

describe('CreateJobSchema', () => {
  it('valida un job con los campos mínimos requeridos', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Platzi',
      cargo: 'Frontend Developer',
    })
    expect(result.success).toBe(true)
  })

  it('valida un job con todos los campos opcionales', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Google',
      cargo: 'Senior Engineer',
      url: 'https://jobs.google.com/123',
      descripcion: 'Rol de ingeniería senior',
      estado: 'applied',
      salary: 5000,
      priority: 'high',
      deadline: '2026-08-01',
    })
    expect(result.success).toBe(true)
  })

  it('rechaza empresa vacía', () => {
    const result = CreateJobSchema.safeParse({
      empresa: '',
      cargo: 'Developer',
    })
    expect(result.success).toBe(false)
  })

  it('rechaza empresa menor a 2 caracteres', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'A',
      cargo: 'Developer',
    })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.empresa).toBeDefined()
  })

  it('rechaza empresa mayor a 100 caracteres', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'A'.repeat(101),
      cargo: 'Developer',
    })
    expect(result.success).toBe(false)
  })

  it('acepta salary como null', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Mercado Libre',
      cargo: 'React Engineer',
      salary: null,
    })
    expect(result.success).toBe(true)
  })

  it('rechaza salary negativo', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Mercado Libre',
      cargo: 'React Engineer',
      salary: -1000,
    })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.salary).toBeDefined()
  })

  it('rechaza salary con decimales', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Mercado Libre',
      cargo: 'React Engineer',
      salary: 1500.5,
    })
    expect(result.success).toBe(false)
  })

  it('rechaza URL inválida', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Platzi',
      cargo: 'Developer',
      url: 'no-es-una-url',
    })
    expect(result.success).toBe(false)
  })

  it('acepta URL vacía como string vacío', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Platzi',
      cargo: 'Developer',
      url: '',
    })
    expect(result.success).toBe(true)
  })

  it('aplica estado por defecto "wishlist"', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Platzi',
      cargo: 'Developer',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.estado).toBe('wishlist')
    }
  })

  it('aplica priority por defecto "medium"', () => {
    const result = CreateJobSchema.safeParse({
      empresa: 'Platzi',
      cargo: 'Developer',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.priority).toBe('medium')
    }
  })
})

describe('UpdateJobSchema', () => {
  it('acepta actualización parcial — solo estado', () => {
    const result = UpdateJobSchema.safeParse({ estado: 'interviewing' })
    expect(result.success).toBe(true)
  })

  it('acepta adaptedCv como texto largo', () => {
    const result = UpdateJobSchema.safeParse({
      adaptedCv: 'CV adaptado para el puesto de Frontend Developer en Platzi...',
    })
    expect(result.success).toBe(true)
  })

  it('acepta objeto vacío (sin cambios)', () => {
    const result = UpdateJobSchema.safeParse({})
    expect(result.success).toBe(true)
  })
})

describe('ProfileSchema', () => {
  it('valida un perfil completo', () => {
    const result = ProfileSchema.safeParse({
      name: 'Ana García',
      email: 'ana@example.com',
      title: 'Frontend Developer',
      baseCv: 'Experiencia en React y TypeScript...',
      skills: 'React, TypeScript, Next.js',
    })
    expect(result.success).toBe(true)
  })

  it('rechaza email inválido', () => {
    const result = ProfileSchema.safeParse({
      name: 'Ana García',
      email: 'no-es-email',
      title: 'Developer',
      baseCv: '',
      skills: '',
    })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.email).toBeDefined()
  })

  it('acepta email vacío', () => {
    const result = ProfileSchema.safeParse({
      name: 'Ana García',
      email: '',
      title: 'Developer',
      baseCv: '',
      skills: '',
    })
    expect(result.success).toBe(true)
  })
})
