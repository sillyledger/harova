'use client'

import { useState, useEffect, useMemo } from 'react'
import { API_URL, DirectoryEntry, entryCategories } from './lib/directory'
import { categoryLabel } from './lib/categories'
import ToolCard from './components/ToolCard'

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
      entryCategories(e).forEach((c) => set.add(c))
    })
    return [
      { label: 'All', value: 'all' },
      ...Array.from(set)
        .sort()
        .map((c) => ({ label: categoryLabel(c), value: c })),
    ]
  }, [entries])

  const filtered = entries.filter((e) => {
    const cats = entryCategories(e)
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
              <ToolCard key={e.id} entry={e} />
            ))}
          </div>
        </>
      )}

      <div className="section-label">All tools</div>
      <div className="grid">
        {rest.map((e) => (
          <ToolCard key={e.id} entry={e} />
        ))}
      </div>
    </div>
  )
}
