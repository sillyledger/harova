import type { Metadata } from 'next'
import Link from 'next/link'
import { getEntries, entryCategories } from '../lib/directory'
import { categoryIcon, categoryLabel, categorySlug } from '../lib/categories'

const SITE_URL = 'https://harova.xyz'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'All categories — Harova'
  const description = 'Browse the full Harova directory by category.'

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/categories` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/categories`,
      type: 'website',
    },
  }
}

export default async function CategoriesPage() {
  const entries = await getEntries()

  const set = new Set<string>()
  entries.forEach((e) => {
    entryCategories(e).forEach((c) => set.add(c))
  })

  const categories = Array.from(set)
    .map((category) => ({
      label: categoryLabel(category),
      slug: categorySlug(category),
      icon: categoryIcon(category),
      count: entries.filter((e) => entryCategories(e).includes(category))
        .length,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: categories.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/category/${c.slug}`,
    })),
  }

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="page" style={{ maxWidth: 960 }}>
        <div className="back-link">
          <Link href="/">Browse</Link> / Categories
        </div>

        <h1>All categories</h1>
        <div className="page-subtitle">
          Browse the Harova directory by category
        </div>

        <div className="category-grid">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="category-card"
            >
              <div className="category-card-icon">
                <i className={`ti ${c.icon}`} />
              </div>
              <div>
                <div className="card-name">{c.label}</div>
                <div className="category-card-count">
                  {c.count} {c.count === 1 ? 'tool' : 'tools'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
