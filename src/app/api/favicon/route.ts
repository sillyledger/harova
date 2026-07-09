import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

export const dynamic = 'force-dynamic'

const SIZE = 64
// A domain that will never have an indexed favicon — used purely to learn
// what Google's "no favicon found" placeholder image looks like right now.
const REFERENCE_DOMAIN = 'zz-no-such-domain-9f3k2x.invalid'
const REFERENCE_TTL_MS = 60 * 60 * 1000 // re-check hourly in case Google changes the asset

let referenceHash: string | null = null
let referenceHashAt = 0

async function fetchHash(
  domain: string
): Promise<{ hash: string; ok: boolean }> {
  try {
    const res = await fetch(
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
        domain
      )}&sz=${SIZE}`,
      { cache: 'no-store', signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) return { hash: '', ok: false }
    const buf = Buffer.from(await res.arrayBuffer())
    return { hash: createHash('sha256').update(buf).digest('hex'), ok: true }
  } catch {
    return { hash: '', ok: false }
  }
}

async function getReferenceHash(): Promise<string | null> {
  const now = Date.now()
  if (referenceHash && now - referenceHashAt < REFERENCE_TTL_MS) {
    return referenceHash
  }
  const { hash, ok } = await fetchHash(REFERENCE_DOMAIN)
  if (ok) {
    referenceHash = hash
    referenceHashAt = now
  }
  return referenceHash
}

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get('domain')
  if (!domain) {
    return NextResponse.json({ error: 'missing domain' }, { status: 400 })
  }

  const [{ hash, ok }, refHash] = await Promise.all([
    fetchHash(domain),
    getReferenceHash(),
  ])

  if (!ok) {
    // Google's lookup itself failed — let the client fall through.
    return new NextResponse(null, { status: 404 })
  }

  const isGenericPlaceholder = refHash !== null && hash === refHash

  if (isGenericPlaceholder) {
    return new NextResponse(null, {
      status: 404,
      headers: { 'Cache-Control': 'public, max-age=86400' },
    })
  }

  return NextResponse.redirect(
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
      domain
    )}&sz=${SIZE}`,
    {
      status: 302,
      headers: { 'Cache-Control': 'public, max-age=86400' },
    }
  )
}
