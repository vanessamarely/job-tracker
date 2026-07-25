import { z } from 'zod'

export const JobEstadoEnum = z.enum(['wishlist', 'applied', 'interviewing', 'offer', 'rejected'])
export const JobPriorityEnum = z.enum(['high', 'medium', 'low'])

export const CreateJobSchema = z.object({
  empresa: z
    .string()
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  cargo: z
    .string()
    .min(2, 'Cargo requerido')
    .max(200, 'Máximo 200 caracteres'),
  url: z.string().url('URL inválida').optional().nullable().or(z.literal('')),
  descripcion: z.string().optional().nullable(),
  estado: JobEstadoEnum.default('wishlist'),
  salary: z
    .number({ error: 'Debe ser un número' })
    .int('Sin decimales')
    .positive('Debe ser positivo')
    .optional()
    .nullable(),
  priority: JobPriorityEnum.default('medium'),
  deadline: z.string().optional().nullable(),
})

export const UpdateJobSchema = CreateJobSchema.partial().extend({
  adaptedCv: z.string().optional().nullable(),
  coverLetter: z.string().optional().nullable(),
  interviewNotes: z.string().optional().nullable(),
})

export const ProfileSchema = z.object({
  name: z.string().max(100, 'Máximo 100 caracteres'),
  email: z
    .string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  title: z.string().max(200, 'Máximo 200 caracteres'),
  baseCv: z.string(),
  skills: z.string(),
})

export type CreateJobFormValues = z.infer<typeof CreateJobSchema>
export type UpdateJobFormValues = z.infer<typeof UpdateJobSchema>
export type ProfileFormValues = z.infer<typeof ProfileSchema>
