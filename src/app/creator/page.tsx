import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About the Creator — Pieter Borremans',
  description:
    'Harova was created by Pieter Borremans, founder of Ryoka, maker of Sorano, Aegos Intel, TWO Docs, Kira, Kiroka, and other micro-SaaS software. He is also a blogger and writer on Indiehacker.blog.',
}

// ─── Person schema (JSON-LD) ───
// Invisible on the page. Tells Google "this page is about a specific person,"
// their role, and their other verified profiles (sameAs).
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pieter Borremans',
  url: 'https://harova.xyz/creator',
  // TODO: replace with a hosted headshot URL (e.g. your pieter.tw photo)
  image: 'https://pieter.tw/REPLACE-WITH-PHOTO.jpg',
  jobTitle: 'Founder',
  description:
    'Founder of Ryoka and maker of Sorano, Aegos Intel, TWO Docs, Kira, Kiroka, and other micro-SaaS software. Writer and blogger on Indiehacker.blog, based between Taiwan and London.',
  worksFor: {
    '@type': 'Organization',
    name: 'Ryoka',
    url: 'https://ryoka.xyz',
  },
  sameAs: [
    'https://pieter.tw',
    'https://www.indiehacker.blog',
    'https://pieterborremans.com',
    'https://ryoka.xyz',
    'https://github.com/sillyledger',
    'https://www.linkedin.com/in/pieter-borremans/',
    'https://www.youtube.com/@pieterborremans',
    'https://www.tiktok.com/@borremanspieter',
    'https://www.pinterest.com/borremanspieter/',
    'https://open.spotify.com/show/765k4LuyZrS2sYEkXHOZ47',
  ],
}

export default function CreatorPage() {
  return (
    <div className="container page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <a href="/" className="back-link">← Back to directory</a>

      <h1>About the Creator</h1>
      <p className="page-subtitle">Harova is built and maintained by Pieter Borremans.</p>

      <p>
        Harova was created by <strong>Pieter Borremans</strong>, founder of{' '}
        <a href="https://ryoka.xyz" className="inline" target="_blank" rel="noopener noreferrer">Ryoka</a>{' '}
        — an umbrella and permanent-capital company that builds, acquires, and
        invests in software and other assets for the long term.
      </p>

      <p>
        Born in Asia and raised in Belgium, Pieter has spent 25 years living and
        working across countries, now based between Taiwan and London. He builds
        micro-SaaS software from first principles and documents the process in
        public.
      </p>

      <h2>Things Pieter has built</h2>
      <p>
        Alongside Harova, Pieter is the maker of a range of micro-SaaS products
        under and around Ryoka, including:
      </p>
      <ul>
        <li><strong>Ryoka</strong> — the parent company and operating system tying it all together.</li>
        <li><strong>Sorano</strong></li>
        <li><strong>Aegos Intel</strong></li>
        <li><strong>TWO Docs</strong></li>
        <li><strong>Kira</strong></li>
        <li><strong>Kiroka</strong></li>
        <li>and other apps and experiments, with more in progress.</li>
      </ul>

      <h2>Writing &amp; elsewhere</h2>
      <p>
        Pieter is also a blogger and writer, publishing on{' '}
        <a href="https://www.indiehacker.blog" className="inline" target="_blank" rel="noopener noreferrer">Indiehacker.blog</a>{' '}
        about the psychological and emotional side of building software alone —
        not just tactics and revenue. You can find more of his work at{' '}
        <a href="https://pieter.tw" className="inline" target="_blank" rel="noopener noreferrer">pieter.tw</a> and{' '}
        <a href="https://pieterborremans.com" className="inline" target="_blank" rel="noopener noreferrer">pieterborremans.com</a>.
      </p>

      <h2>Find Pieter online</h2>
      <ul>
        <li><a href="https://www.linkedin.com/in/pieter-borremans/" className="inline" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://www.youtube.com/@pieterborremans" className="inline" target="_blank" rel="noopener noreferrer">YouTube</a></li>
        <li><a href="https://www.tiktok.com/@borremanspieter" className="inline" target="_blank" rel="noopener noreferrer">TikTok</a></li>
        <li><a href="https://www.pinterest.com/borremanspieter/" className="inline" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
        <li><a href="https://open.spotify.com/show/765k4LuyZrS2sYEkXHOZ47" className="inline" target="_blank" rel="noopener noreferrer">Spotify (podcast)</a></li>
      </ul>

      <h2>Get in touch</h2>
      <p>
        Reach Pieter and the Harova team at{' '}
        <a href="mailto:harova@ryoka.xyz" className="inline">harova@ryoka.xyz</a>.
      </p>
    </div>
  )
}
