import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ToolCard from '../../components/ToolCard'
import { getEntries, entryCategories } from '../../lib/directory'
import { categoryLabel, categorySlug } from '../../lib/categories'

const SITE_URL = 'https://harova.xyz'

export const dynamic = 'force-dynamic'

function allCategories(entries: Awaited<ReturnType<typeof getEntries>>) {
  const set = new Set<string>()
  entries.forEach((e) => {
    entryCategories(e).forEach((c) => set.add(c))
  })
  return Array.from(set).sort()
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const entries = await getEntries()
  const category = allCategories(entries).find(
    (c) => categorySlug(c) === params.slug
  )

  if (!category) {
    return { title: 'Category not found — Harova' }
  }

  const title = `${categoryLabel(category)} — Harova`
  const description = `${categoryLabel(category)} tools in the Harova directory.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/category/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/category/${params.slug}`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const entries = await getEntries()
  const categories = allCategories(entries)
  const category = categories.find((c) => categorySlug(c) === params.slug)

  if (!category) {
    notFound()
  }

  const filtered = entries.filter((e) =>
    entryCategories(e).includes(category)
  )

  return (
    <div className="container">
      <div className="page" style={{ maxWidth: 960 }}>
        <div className="back-link">
          <Link href="/">Browse</Link> / {categoryLabel(category)}
        </div>

        <h1>{categoryLabel(category)}</h1>
        <div className="count">Showing {filtered.length} tools</div>

        <div className="filters">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/category/${categorySlug(c)}`}
              className={`filter-pill ${c === category ? 'active' : ''}`}
            >
              {categoryLabel(c)}
            </Link>
          ))}
        </div>

        <div className="grid">
          {filtered.map((e) => (
            <ToolCard key={e.id} entry={e} />
          ))}
        </div>
      </div>
    </div>
  )
}
