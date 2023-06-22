import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'

type Props = {
  name: string
  email: string
  password: string
}

export async function POST(request: Request) {
  try {
    const body: Props = await request.json()
    const { name, email, password } = body

    if (!email || !name || !password) {
      return new NextResponse('Missing info', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })

    return NextResponse.json(user)
  } catch (e) {
    console.error(e, 'REGISTRATION_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
