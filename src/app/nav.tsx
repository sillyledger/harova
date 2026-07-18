'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { API_URL, DirectoryEntry, entryCategories } from './lib/directory'
import { categoryLabel, categorySlug } from './lib/categories'

interface NavCategory {
  label: string
  slug: string
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [categories, setCategories] = useState<NavCategory[]>([])
  const categoriesRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: DirectoryEntry[]) => {
        const set = new Set<string>()
        data
          .filter((e) => e.show_on_directory)
          .forEach((e) => {
            entryCategories(e).forEach((c) => set.add(c))
          })
        setCategories(
          Array.from(set)
            .sort()
            .map((c) => ({ label: categoryLabel(c), slug: categorySlug(c) }))
        )
      })
      .catch(() => {
        setCategories([])
      })
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(e.target as Node)
      ) {
        setCategoriesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <div className="nav-left">
          <a href="/" className="logo">harova<span className="logo-dot"></span></a>
          <div className="nav-menu">
            <a href="/" className={active('/') ? 'active' : ''}>Browse</a>
            <div className="nav-dropdown-wrap" ref={categoriesRef}>
              <button
                type="button"
                className={`nav-dropdown-trigger${categoriesOpen ? ' active' : ''}`}
                onClick={() => setCategoriesOpen((v) => !v)}
              >
                Categories
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {categoriesOpen && (
                <div className="nav-mega-menu">
                  <div className="nav-mega-grid">
                    {categories.map((cat) => (
                      <a
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setCategoriesOpen(false)}
                      >
                        {cat.label}
                      </a>
                    ))}
                  </div>
                  <a
                    href="/"
                    className="nav-mega-all"
                    onClick={() => setCategoriesOpen(false)}
                  >
                    All Categories →
                  </a>
                </div>
              )}
            </div>
            <a href="/about" className={active('/about') ? 'active' : ''}>About</a>
            <a href="/creator" className={active('/creator') ? 'active' : ''}>Creator</a>
          </div>
        </div>
        <div className="nav-cta">
          <a href="/submit" className="btn-secondary">Submit Tool</a>
          <a href="/contact" className="btn-primary">Contact</a>
        </div>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></svg>
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          <a href="/">Browse</a>
          {categories.map((cat) => (
            <a key={cat.slug} href={`/category/${cat.slug}`} className="nav-mobile-category">{cat.label}</a>
          ))}
          <a href="/">All Categories</a>
          <a href="/about">About</a>
          <a href="/creator">Creator</a>
          <a href="/submit" className="btn-secondary">Submit Tool</a>
          <a href="/contact" className="btn-primary">Contact</a>
        </div>
      )}
    </nav>
  )
}
