import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const API_URL = 'https://client.ryoka.xyz/api/public/directory'
const SITE_URL = 'https://harova.xyz'

export const dynamic = 'force-dynamic'

interface DirectoryEntry {
  id: string
  name: string
  category: string
  one_liner: string
  url: string
  type: 'ryoka' | 'affiliate' | 'neutral'
  show_on_directory: boolean
  slug: string
}

async function getEntries(): Promise<DirectoryEntry[]> {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    if (!Array.isArray(data)) return []
    return data.filter((e: DirectoryEntry) => e.show_on_directory)
  } catch {
    return []
  }
}

function getDomain(url: string): string | null {
  if (!url) return null
  try {
    return new URL(url.startsWith('http') ? url : 'https://' + url).hostname
  } catch {
    return null
  }
}

function faviconSrc(url: string): string | null {
  const domain = getDomain(url)
  return domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    : null
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const entries = await getEntries()
  const entry = entries.find((e) => e.slug === params.slug)

  if (!entry) {
    return { title: 'Tool not found — Harova' }
  }

  const title = `${entry.name} — Harova`
  const description =
    entry.one_liner || `${entry.name} in the Harova software directory.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/tool/${entry.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tool/${entry.slug}`,
      type: 'website',
    },
  }
}

function TypeBadge({ type }: { type: string }) {
  if (type === 'ryoka') {
    return <span className="type-badge type-ryoka">Ryoka</span>
  }
  if (type === 'affiliate') {
    return <span className="type-badge type-affiliate">Affiliate</span>
  }
  return null
}

function SimilarCard({ entry }: { entry: DirectoryEntry }) {
  const src = faviconSrc(entry.url)
  const letter = entry.name.charAt(0).toUpperCase()
  return (
    <a className="card" href={`/tool/${entry.slug}`}>
      <div className="card-header">
        <div className="favicon">
          {src ? (
            <img src={src} alt="" />
          ) : (
            <span className="favicon-letter">{letter}</span>
          )}
        </div>
        <div className="card-name">{entry.name}</div>
      </div>
      <div className="card-oneliner">{entry.one_liner || ''}</div>
      <div className="card-footer">
        <span className="category-tag">{entry.category || ''}</span>
        <TypeBadge type={entry.type} />
      </div>
    </a>
  )
}

export default async function ToolPage({
  params,
}: {
  params: { slug: string }
}) {
  const entries = await getEntries()
  const entry = entries.find((e) => e.slug === params.slug)

  if (!entry) {
    notFound()
  }

  const src = faviconSrc(entry.url)
  const letter = entry.name.charAt(0).toUpperCase()

  const similar = entries
    .filter(
      (e) =>
        e.slug !== entry.slug &&
        e.category === entry.category
    )
    .slice(0, 6)

  const rel =
    entry.type === 'affiliate'
      ? 'sponsored nofollow noopener noreferrer'
      : 'noopener noreferrer'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: entry.name,
    description: entry.one_liner || undefined,
    applicationCategory: entry.category || undefined,
    url: entry.url || undefined,
  }

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page">
        <a className="back-link" href="/">
          ← Back to directory
        </a>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '16px',
          }}
        >
          <div
            className="favicon"
            style={{ width: '52px', height: '52px', borderRadius: '12px' }}
          >
            {src ? (
              <img
                src={src}
                alt=""
                style={{ width: '28px', height: '28px' }}
              />
            ) : (
              <span
                className="favicon-letter"
                style={{ fontSize: '20px' }}
              >
                {letter}
              </span>
            )}
          </div>
          <h1 style={{ marginBottom: 0 }}>{entry.name}</h1>
        </div>

        <p style={{ fontSize: '16px', marginBottom: '20px' }}>
          {entry.one_liner || ''}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px',
            flexWrap: 'wrap',
          }}
        >
          <span className="category-tag">{entry.category || ''}</span>
          <TypeBadge type={entry.type} />
        </div>

        {entry.url && (
          <a
            className="btn-primary"
            href={entry.url}
            target="_blank"
            rel={rel}
            style={{ display: 'inline-block' }}
          >
            Visit website ↗
          </a>
        )}

        {similar.length > 0 && (
          <>
            <div className="section-label" style={{ marginTop: '48px' }}>
              Similar tools
            </div>
            <div className="grid">
              {similar.map((e) => (
                <SimilarCard key={e.id} entry={e} />
              ))}
            </div>
          </>
        )}

        <footer style={{ marginTop: '48px' }}>
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/affiliate-disclosure">Affiliate Disclosure</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
          <span>Harova — a Ryoka project</span>
        </footer>
      </div>
    </div>
  )
}
