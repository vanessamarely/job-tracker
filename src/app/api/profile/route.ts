import { NextRequest, NextResponse } from 'next/server'
import { getProfile, updateProfile } from '@/lib/db'
import { ProfileSchema } from '@/lib/validations'

export async function GET() {
  try {
    const profile = getProfile()
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: 'Error al obtener perfil' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = ProfileSchema.partial().safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const profile = updateProfile(parsed.data)
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar perfil' }, { status: 500 })
  }
}
