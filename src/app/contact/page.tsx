import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact — Harova',
  description: 'Get in touch with the Harova team.',
}
export default function ContactPage() {
  return (
    <div className="container page">
      <a href="/" className="back-link">← Back to directory</a>
      <h1>Contact</h1>
      <p className="page-subtitle">We read every message.</p>
      <p>
        Harova is a project by Ryoka. Whether you've spotted an error in a
        listing, want your tool considered for the directory, or have a question
        about how the site works, the fastest way to reach us is email.
      </p>
      <p>
        <a href="mailto:harova@ryoka.xyz" className="inline">harova@ryoka.xyz</a>
      </p>
      <h2>Suggesting a tool</h2>
      <p>
        Want a tool listed? Use the{' '}
        <a href="/submit" className="inline">Submit a tool</a>{' '}
        page — takes a couple minutes. We can't promise every submission makes
        it in, but we review all of them.
      </p>
      <h2>Corrections</h2>
      <p>
        If a listing is out of date or wrong — changed pricing, a dead link, a
        description that no longer fits — let us know and we'll fix it. Include
        the tool name and what's off.
      </p>
      <h2>Affiliate &amp; editorial questions</h2>
      <p>
        For how we handle affiliate links and featured placement, see our{' '}
        <a href="/affiliate-disclosure" className="inline">Affiliate Disclosure</a>{' '}
        and{' '}
        <a href="/about" className="inline">About page</a>. Anything they don't
        cover, just ask.
      </p>
    </div>
  )
}
