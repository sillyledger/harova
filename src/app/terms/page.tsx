import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use — Harova',
  description: 'The terms governing your use of Harova.',
}

export default function TermsPage() {
  return (
    <div className="container page">
      <a href="/" className="back-link">← Back to directory</a>

      <h1>Terms of Use</h1>
      <p className="page-subtitle">Last updated: July 2026</p>

      <p>
        Harova is a public software directory operated by Ryoka. By accessing or
        using the site, you agree to these terms. If you don't agree, please
        don't use the site.
      </p>

      <h2>What Harova is</h2>
      <p>
        Harova lists software, services, and platforms with short descriptions
        and links. It's an informational directory. We don't sell the tools
        listed here, and we're not a party to any transaction between you and a
        third-party tool you find through us.
      </p>

      <h2>No warranty on listings</h2>
      <p>
        We try to keep entries accurate, but the information on Harova is
        provided "as is," without warranties of any kind. Tools change their
        features, pricing, and availability without telling us. We don't
        guarantee that any listing is current, complete, or error-free, and a
        listing is not an endorsement or a guarantee of a tool's quality,
        security, or fitness for your needs. Do your own evaluation before
        relying on any tool.
      </p>

      <h2>Third-party sites</h2>
      <p>
        Harova links to third-party websites and services, some via affiliate
        links (see our{' '}
        <a href="/affiliate-disclosure" className="inline">Affiliate Disclosure</a>).
        We don't control those sites and aren't responsible for their content,
        terms, pricing, or how they handle your data. Your use of any linked
        site is governed by that site's own terms.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Ryoka and Harova are not liable
        for any loss or damage arising from your use of the site or from any
        tool, service, or website you access through it. This includes decisions
        you make based on information found on Harova.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Harova name, design, and original content are the property of Ryoka.
        Product names, logos, and trademarks belonging to the tools we list
        remain the property of their respective owners, and their appearance
        here does not imply any affiliation with or endorsement by them, except
        where a tool is a Ryoka product.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don't use Harova to break the law, scrape or overload the site, or
        interfere with its operation. We may restrict access to anyone who
        misuses the site.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the site evolves, and may change or remove
        listings at any time. The date at the top reflects the most recent
        change. Continued use of the site means you accept the current terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email us at{' '}
        <a href="mailto:harova@ryoka.xyz" className="inline">harova@ryoka.xyz</a>.
      </p>
    </div>
  )
}
