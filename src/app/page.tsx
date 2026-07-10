'use client'

import { useState, useEffect, useMemo } from 'react'
import Favicon from './components/Favicon'

const API_URL = 'https://client.ryoka.xyz/api/public/directory'

// Only for categories that want a shorter/friendlier label than their raw
// value. Anything not listed here just displays as its raw category string —
// so a brand-new category always shows up, it just won't be "prettified"
// until someone adds an override for it.
const LABEL_OVERRIDES: Record<string, string> = {
  'IDE/CLI': 'IDE / CLI',
  'Note Taking': 'Note taking',
  'Streaming Service': 'Streaming',
  'Web Hosting': 'Web hosting',
}

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

function TypeBadge({ type }: { type: string }) {
  if (type === 'ryoka') {
    return <span className="type-badge type-ryoka">Ryoka</span>
  }
  if (type === 'affiliate') {
    return <span className="type-badge type-affiliate">Affiliate</span>
  }
  return null
}

const MAX_TAGS = 2

function Card({ entry }: { entry: DirectoryEntry }) {
  const cats =
    entry.categories && entry.categories.length > 0
      ? entry.categories
      : entry.category
      ? [entry.category]
      : []

  const visibleCats = cats.slice(0, MAX_TAGS)
  const hiddenCats = cats.slice(MAX_TAGS)

  const externalRel =
    entry.type === 'affiliate'
      ? 'sponsored noopener noreferrer'
      : 'noopener noreferrer'

  return (
    <div className="card">
      <a
        className="card-link-overlay"
        href={`/tool/${entry.slug}`}
        aria-label={entry.name}
      />

      {entry.url && (
        <a
          className="card-external"
          href={entry.url}
          target="_blank"
          rel={externalRel}
          aria-label={`Visit ${entry.name} website`}
        >
          ↗
        </a>
      )}

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
          {visibleCats.map((c) => (
            <span
              key={c}
              className="category-tag"
              style={{ fontSize: '11px', padding: '3px 9px' }}
            >
              {c}
            </span>
          ))}
          {hiddenCats.length > 0 && (
            <span
              className="category-tag card-tag-more"
              style={{ fontSize: '11px', padding: '3px 9px' }}
              title={hiddenCats.join(', ')}
            >
              +{hiddenCats.length}
            </span>
          )}
        </div>
        <TypeBadge type={entry.type} />
      </div>
    </div>
  )
}

export default function Home() {
  const [entries, setEntries] = useState<DirectoryEntry[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.filter((e: DirectoryEntry) => e.show_on_directory))
      })
      .catch(() => {
        setEntries([])
      })
  }, [])

  const categoryOptions = useMemo(() => {
    const set = new Set<string>()
    entries.forEach((e) => {
      const cats =
        e.categories && e.categories.length > 0
          ? e.categories
          : e.category
          ? [e.category]
          : []
      cats.forEach((c) => set.add(c))
    })
    return [
      { label: 'All', value: 'all' },
      ...Array.from(set)
        .sort()
        .map((c) => ({ label: LABEL_OVERRIDES[c] || c, value: c })),
    ]
  }, [entries])

  const filtered = entries.filter((e) => {
    const cats =
      e.categories && e.categories.length > 0
        ? e.categories
        : e.category
        ? [e.category]
        : []
    const matchesCategory =
      activeCategory === 'all' || cats.includes(activeCategory)
    const matchesSearch =
      !searchTerm ||
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.one_liner && e.one_liner.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featured = filtered.filter((e) => e.type === 'ryoka')
  const rest = filtered.filter((e) => e.type !== 'ryoka')

  return (
    <div className="container">
      <style>{`
        .card { position: relative; }
        .card-header { padding-right: 30px; }
        .card-link-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
        }
        .card-external {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 7px;
          color: var(--text-muted);
          font-size: 13px;
          line-height: 1;
          text-decoration: none;
          border: 1px solid transparent;
          transition: color 0.12s ease, background 0.12s ease, border-color 0.12s ease;
        }
        .card-external:hover {
          color: var(--accent);
          background: var(--bg);
          border-color: var(--border);
        }
        .card-tag-more {
          color: var(--text-muted);
        }
      `}</style>

      <div className="hero">
        <h1>Find the right tools for your stack</h1>
        <p>
          A curated directory of software, services, and platforms — reviewed
          and organized.
        </p>
      </div>

      <div className="search-bar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search tools, platforms, services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters">
        {categoryOptions.map((cat) => (
          <button
            key={cat.value}
            className={`filter-pill ${activeCategory === cat.value ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="count">Showing {filtered.length} tools</div>

      {featured.length > 0 && (
        <>
          <div className="section-label">Featured</div>
          <div className="grid">
            {featured.map((e) => (
              <Card key={e.id} entry={e} />
            ))}
          </div>
        </>
      )}

      <div className="section-label">All tools</div>
      <div className="grid">
        {rest.map((e) => (
          <Card key={e.id} entry={e} />
        ))}
      </div>

      <footer>
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
  )
}
