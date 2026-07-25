import { NextRequest, NextResponse } from 'next/server'
import { getJobById, updateJob, deleteJob } from '@/lib/db'
import { UpdateJobSchema } from '@/lib/validations'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const job = getJobById(id)
    if (!job) {
      return NextResponse.json({ error: 'Postulación no encontrada' }, { status: 404 })
    }
    return NextResponse.json(job)
  } catch {
    return NextResponse.json({ error: 'Error al obtener postulación' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()
    const parsed = UpdateJobSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const job = updateJob(id, parsed.data)
    if (!job) {
      return NextResponse.json({ error: 'Postulación no encontrada' }, { status: 404 })
    }
    return NextResponse.json(job)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar postulación' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const existing = getJobById(id)
    if (!existing) {
      return NextResponse.json({ error: 'Postulación no encontrada' }, { status: 404 })
    }
    deleteJob(id)
    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar postulación' }, { status: 500 })
  }
}
