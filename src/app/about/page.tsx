import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Harova',
  description: 'What Harova is, and how it relates to Ryoka.',
}

export default function AboutPage() {
  return (
    <div className="container page">
      <a href="/" className="back-link">← Back to directory</a>

      <h1>About Harova</h1>
      <p className="page-subtitle">A curated directory of software, services, and platforms.</p>

      <p>
        Harova is a public directory of tools worth knowing about — editors,
        note apps, hosting, productivity software, and more — organized by
        category with quick, no-nonsense descriptions. The goal is simple: help
        you find the right tool for your stack without wading through noise.
      </p>

      <h2>How it relates to Ryoka</h2>
      <p>
        Harova is a project by{' '}
        <a href="https://ryoka.xyz" className="inline" target="_blank" rel="noopener noreferrer">Ryoka</a>.
        Some of the tools featured here are Ryoka's own products, and we surface
        them prominently — that's by design, and we think it's better to be
        upfront about it than to pretend otherwise. Everything else is included
        because we think it's genuinely useful.
      </p>

      <h2>How entries work</h2>
      <p>
        We don't do star ratings or paid placement. Entries are either tools we
        build, tools we recommend, or tools we've included for coverage. Where a
        link is an affiliate link, we say so — see our{' '}
        <a href="/affiliate-disclosure" className="inline">affiliate disclosure</a>{' '}
        for details.
      </p>

      <h2>Contact</h2>
      <p>
        Questions, corrections, or want your tool listed? Email us at{' '}
        <a href="mailto:harova@ryoka.xyz" className="inline">harova@ryoka.xyz</a>.
      </p>
    </div>
  )
}
