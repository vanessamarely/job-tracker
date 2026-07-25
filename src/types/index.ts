export type JobEstado = 'wishlist' | 'applied' | 'interviewing' | 'offer' | 'rejected'
export type JobPriority = 'high' | 'medium' | 'low'

export interface Job {
  id: string
  empresa: string
  cargo: string
  url: string | null
  descripcion: string | null
  estado: JobEstado
  salary: number | null
  priority: JobPriority
  adaptedCv: string | null
  coverLetter: string | null
  interviewNotes: string | null
  deadline: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateJobInput {
  empresa: string
  cargo: string
  url?: string | null
  descripcion?: string | null
  estado?: JobEstado
  salary?: number | null
  priority?: JobPriority
  deadline?: string | null
}

export interface UpdateJobInput extends Partial<CreateJobInput> {
  adaptedCv?: string | null
  coverLetter?: string | null
  interviewNotes?: string | null
}

export interface Profile {
  id: number
  name: string
  email: string
  title: string
  baseCv: string
  skills: string
}

export interface UpdateProfileInput {
  name?: string
  email?: string
  title?: string
  baseCv?: string
  skills?: string
}
