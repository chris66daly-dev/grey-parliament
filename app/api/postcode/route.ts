import { NextRequest, NextResponse } from 'next/server'
import { lookupPostcode } from '@/lib/postcode'

export async function GET(req: NextRequest) {
  const postcode = req.nextUrl.searchParams.get('postcode')
  if (!postcode) {
    return NextResponse.json({ error: 'Missing postcode parameter' }, { status: 400 })
  }

  const result = await lookupPostcode(postcode)
  if (!result) {
    return NextResponse.json({ error: 'Postcode not found or no MP on record' }, { status: 404 })
  }

  return NextResponse.json(result)
}
