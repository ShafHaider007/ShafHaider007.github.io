import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    console.info('[rum]', payload)
    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json({ received: false }, { status: 400 })
  }
}
