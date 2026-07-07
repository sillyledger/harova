'use client'

import { useState, useEffect } from 'react'

const API_URL = 'https://client.ryoka.xyz/api/public/directory'

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'IDE / CLI', value: 'IDE/CLI' },
  { label: 'Note taking', value: 'Note Taking' },
  { label: 'Productivity', value: 'Productivity' },
  { label: 'Streaming', value: 'Streaming Service' },
  { label: 'Web hosting', value: 'Web Hosting' },
]

interface DirectoryEntry {
  id: string
  name: string
  category: string
  one_liner: string
  url: string
  type: 'ryoka' | 'affiliate' | 'neutral'
  show_on_directory: boolean
}

function getDomain(url: string): string | null {
  if (!url) return null
  try {
    return new URL(url.startsWith('http') ? url : 'https://' + url).hostname
  } catch {
    return null
  }
}

function Favicon({ url, name }: { url: string; name: string }) {
  const [imgFailed, setImgFailed] = useState(false)
  const domain = getDomain(url)
  const letter = name.charAt(0).toUpperCase()

  return (
    <div className="favicon">
      {domain && !imgFailed && (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          onError={() => setImgFailed(true)}
        />
      )}
      {(!domain || imgFailed) && (
        <span className="favicon-letter">{letter}</span>
      )}
    </div>
  )
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

function Card({ entry }: { entry: DirectoryEntry }) {
  return (
    <a
      className="card"
      href={entry.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-header">
        <Favicon url={entry.url} name={entry.name} />
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

  const filtered = entries.filter((e) => {
    const matchesCategory =
      activeCategory === 'all' || e.category === activeCategory
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
      <nav>
        <a href="/" className="logo">
          harova<span className="logo-dot"></span>
        </a>
        <div className="nav-links">
          <a href="/">Browse</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

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
        {CATEGORIES.map((cat) => (
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
