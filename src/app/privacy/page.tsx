import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Harova',
  description: 'What data Harova collects, and what it does not.',
}

export default function PrivacyPage() {
  return (
    <div className="container page">
      <a href="/" className="back-link">← Back to directory</a>

      <h1>Privacy Policy</h1>
      <p className="page-subtitle">Last updated: July 2026</p>

      <p>
        Harova is a public software directory operated by Ryoka. We've built it
        to collect as little about you as possible. This policy explains what
        that means in practice.
      </p>

      <h2>What we don't collect</h2>
      <p>
        Harova has no user accounts, no login, and no sign-up. We don't ask for
        your name, email, or any personal details to browse the directory, and
        we don't build profiles of visitors or sell data to anyone.
      </p>

      <h2>Server logs</h2>
      <p>
        Harova is hosted on Vercel. Like most web hosts, Vercel automatically
        records standard technical information when you visit — such as your IP
        address, browser type, and the pages you request — for security and to
        keep the site running. This data is handled under Vercel's own privacy
        practices. See{' '}
        <a href="https://vercel.com/legal/privacy-policy" className="inline" target="_blank" rel="noopener noreferrer">Vercel's Privacy Policy</a>{' '}
        for details.
      </p>

      <h2>Tool logos</h2>
      <p>
        To display logos for the tools we list, Harova loads favicon images from
        Google's public favicon service. This means your browser sends a request
        to Google to fetch those images, which Google may log under its own
        privacy practices. We don't send Google any information about you beyond
        what a normal image request involves.
      </p>

      <h2>Links to other sites</h2>
      <p>
        Harova links out to third-party tools and services. Some of these are
        affiliate links — see our{' '}
        <a href="/affiliate-disclosure" className="inline">Affiliate Disclosure</a>.
        Once you click through to another site, that site's own privacy policy
        and cookies apply. We have no control over how those sites handle your
        data.
      </p>

      <h2>Analytics</h2>
      <p>
        Harova does not currently use third-party analytics or advertising
        trackers beyond the standard hosting logs described above. If this
        changes, we'll update this policy.
      </p>

      <h2>Cookies</h2>
      <p>
        Harova does not set its own tracking cookies. Third-party sites you
        click through to may set their own cookies once you leave Harova.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the site evolves. The date at the top
        reflects the most recent change.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Email us at{' '}
        <a href="mailto:harova@ryoka.xyz" className="inline">harova@ryoka.xyz</a>.
      </p>
    </div>
  )
}
