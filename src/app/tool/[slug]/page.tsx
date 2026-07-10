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
  long_description: string | null
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
    description: entry.long_description || entry.one_liner || undefined,
    applicationCategory: entry.category || undefined,
    url: entry.url || undefined,
  }

  const claimHref = `mailto:harova@ryoka.xyz?subject=${encodeURIComponent(
    `Claim / verify: ${entry.name}`
  )}&body=${encodeURIComponent(
    `I'd like to claim and get verified as the owner of ${entry.name} on Harova.`
  )}`

  const reportHref = `mailto:harova@ryoka.xyz?subject=${encodeURIComponent(
    `Correction: ${entry.name}`
  )}&body=${encodeURIComponent(
    `Something looks off on the ${entry.name} page:\n\n`
  )}`

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <style>{`
        .tool-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 280px;
          gap: 40px;
          align-items: start;
          margin-top: 8px;
        }
        .tool-sidebar {
          position: sticky;
          top: 24px;
        }
        .tool-sidebar-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
        }
        .tool-cta-primary {
          display: block;
          text-align: center;
          width: 100%;
          box-sizing: border-box;
        }
        .tool-cta-label {
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 2px;
        }
        .tool-cta-link {
          font-size: 13px;
          color: var(--accent);
        }
        .tool-cta-link:hover {
          text-decoration: underline;
        }
        .tool-cta-divider {
          border-top: 1px solid var(--border);
          margin: 14px 0;
        }
        @media (max-width: 760px) {
          .tool-layout {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .tool-sidebar {
            position: static;
            order: -1;
          }
        }
      `}</style>

      <div className="page" style={{ maxWidth: 960 }}>
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

        <p style={{ fontSize: '16px', marginBottom: '20px', maxWidth: '640px' }}>
          {entry.one_liner || ''}
        </p>

        <div className="tool-layout">
          <div className="tool-main">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '4px',
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

            {entry.long_description && (
              <>
                <div className="section-label" style={{ marginTop: '40px' }}>
                  About {entry.name}
                </div>
                <div style={{ maxWidth: '600px' }}>
                  {entry.long_description
                    .split(/\n+/)
                    .map((para) => para.trim())
                    .filter(Boolean)
                    .map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>
              </>
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
          </div>

          <aside className="tool-sidebar">
            <div className="tool-sidebar-card">
              {entry.url && (
                <a
                  className="btn-primary tool-cta-primary"
                  href={entry.url}
                  target="_blank"
                  rel={rel}
                >
                  Visit website ↗
                </a>
              )}

              <div className="tool-cta-divider" />

              <div className="tool-cta-label">Own this tool?</div>
              <a className="tool-cta-link" href={claimHref}>
                Claim / get verified →
              </a>

              <div className="tool-cta-divider" />

              <div className="tool-cta-label">Something look off?</div>
              <a className="tool-cta-link" href={reportHref}>
                Let us know →
              </a>
            </div>
          </aside>
        </div>

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
