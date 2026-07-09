'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <div className="nav-left">
          <a href="/" className="logo">harova<span className="logo-dot"></span></a>
          <div className="nav-menu">
            <a href="/" className={active('/') ? 'active' : ''}>Browse</a>
            <a href="#">
              Categories
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </a>
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
          <a href="#">Categories</a>
          <a href="/about">About</a>
          <a href="/creator">Creator</a>
          <a href="submit" className="btn-secondary">Submit Tool</a>
          <a href="/contact" className="btn-primary">Contact</a>
        </div>
      )}
    </nav>
  )
}
