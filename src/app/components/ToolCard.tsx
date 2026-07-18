import Link from 'next/link'
import Favicon from './Favicon'
import { DirectoryEntry, entryCategories } from '../lib/directory'
import { categoryLabel, categorySlug } from '../lib/categories'

function TypeBadge({ type }: { type: string }) {
  if (type === 'ryoka') {
    return <span className="type-badge type-ryoka">Ryoka</span>
  }
  if (type === 'affiliate') {
    return <span className="type-badge type-affiliate">Affiliate</span>
  }
  return null
}

const MAX_TAGS = 2

export default function ToolCard({ entry }: { entry: DirectoryEntry }) {
  const cats = entryCategories(entry)

  const visibleCats = cats.slice(0, MAX_TAGS)
  const hiddenCats = cats.slice(MAX_TAGS)

  const externalRel =
    entry.type === 'affiliate'
      ? 'sponsored noopener noreferrer'
      : 'noopener noreferrer'

  return (
    <div className="card">
      <a
        className="card-link-overlay"
        href={`/tool/${entry.slug}`}
        aria-label={entry.name}
      />

      {entry.url && (
        <a
          className="card-external"
          href={entry.url}
          target="_blank"
          rel={externalRel}
          aria-label={`Visit ${entry.name} website`}
        >
          ↗
        </a>
      )}

      <div className="card-header">
        <Favicon url={entry.url} name={entry.name} />
        <div className="card-name">{entry.name}</div>
      </div>
      <div className="card-oneliner">{entry.one_liner || ''}</div>
      <div className="card-footer">
        <div
          style={{
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {visibleCats.map((c) => (
            <Link
              key={c}
              href={`/category/${categorySlug(c)}`}
              className="category-tag"
              style={{ position: 'relative', zIndex: 2 }}
            >
              {categoryLabel(c)}
            </Link>
          ))}
          {hiddenCats.length > 0 && (
            <span
              className="category-tag card-tag-more"
              style={{ fontSize: '11px', padding: '3px 9px' }}
              title={hiddenCats.join(', ')}
            >
              +{hiddenCats.length}
            </span>
          )}
        </div>
        <TypeBadge type={entry.type} />
      </div>
    </div>
  )
}
