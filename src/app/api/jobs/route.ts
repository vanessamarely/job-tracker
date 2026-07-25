import { NextRequest, NextResponse } from 'next/server'
import { getAllJobs, createJob } from '@/lib/db'
import { CreateJobSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const estado = searchParams.get('estado')

    const jobs = getAllJobs()
    const filtered = estado ? jobs.filter((j) => j.estado === estado) : jobs

    return NextResponse.json(filtered)
  } catch {
    return NextResponse.json({ error: 'Error al obtener postulaciones' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = CreateJobSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const job = createJob(parsed.data)
    return NextResponse.json(job, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear postulación' }, { status: 500 })
  }
}
