import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — Harova',
  description: 'How Harova uses affiliate links and how that affects what you see.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="container page">
      <a href="/" className="back-link">← Back to directory</a>

      <h1>Affiliate Disclosure</h1>
      <p className="page-subtitle">Last updated: July 2026</p>

      <p>
        Harova is a directory of software and services operated by Ryoka. Some
        of the links on this site are affiliate links. This page explains what
        that means for you.
      </p>

      <h2>What affiliate links are</h2>
      <p>
        An affiliate link is a referral link. If you click one and go on to sign
        up for or purchase a product, Harova may earn a commission from that
        company — at no additional cost to you. The price you pay is the same
        whether you use our link or go to the product directly.
      </p>

      <h2>How we mark them</h2>
      <p>
        Where an entry uses an affiliate link, we label it with an{' '}
        <strong>affiliate</strong> badge so you can see it at a glance. We don't
        try to hide which links are affiliate links, and we don't disguise them
        as neutral recommendations.
      </p>

      <h2>How it affects what you see</h2>
      <p>
        Affiliate relationships do not determine whether a tool is listed, and
        they do not buy a better position in our directory. Tools are included
        because we build them, recommend them, or think they're worth knowing
        about. Ryoka's own products are featured prominently — that's a
        deliberate editorial choice, separate from any affiliate arrangement,
        and it's noted on our{' '}
        <a href="/about" className="inline">About page</a>.
      </p>

      <h2>Why we use them</h2>
      <p>
        Affiliate commissions help cover the cost of running and maintaining
        Harova. They let us keep the directory free to browse, with no paywalls
        and no paid placement for sale.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, or you'd like to know whether a specific
        link is an affiliate link, email us at{' '}
        <a href="mailto:harova@ryoka.xyz" className="inline">harova@ryoka.xyz</a>.
      </p>
    </div>
  )
}
