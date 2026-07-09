import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Favicon from '../../components/Favicon'

const API_URL = 'https://client.ryoka.xyz/api/public/directory'
const SITE_URL = 'https://harova.xyz'

export const dynamic = 'force-dynamic'

interface DirectoryEntry {
  id: string
  name: string
  category: string
  categories: string[] | null
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
  const cats =
    entry.categories && entry.categories.length > 0
      ? entry.categories
      : entry.category
      ? [entry.category]
      : []
  return (
    <a className="card" href={`/tool/${entry.slug}`}>
      <div className="card-header">
        <Favicon url={entry.url} name={entry.name} />
        <div className="card-name">{entry.name}</div>
      </div>
      <div className="card-oneliner">{entry.one_liner || ''}</div>
      <div className="card-footer">
        <div
          style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {cats.map((c) => (
            <span key={c} className="category-tag">
              {c}
            </span>
          ))}
        </div>
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

  const cats =
    entry.categories && entry.categories.length > 0
      ? entry.categories
      : entry.category
      ? [entry.category]
      : []

  const similar = entries
    .filter((e) => {
      if (e.slug === entry.slug) return false
      const eCats =
        e.categories && e.categories.length > 0
          ? e.categories
          : e.category
          ? [e.category]
          : []
      return eCats.some((c) => cats.includes(c))
    })
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
          <Favicon url={entry.url} name={entry.name} size={52} />
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
          {cats.map((c) => (
            <span key={c} className="category-tag">
              {c}
            </span>
          ))}
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
