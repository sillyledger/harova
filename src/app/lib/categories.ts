// Only for categories that want a shorter/friendlier label than their raw
// value. Anything not listed here just displays as its raw category string —
// so a brand-new category always shows up, it just won't be "prettified"
// until someone adds an override for it.
export const LABEL_OVERRIDES: Record<string, string> = {
  'IDE/CLI': 'IDE / CLI',
  'Note Taking': 'Note taking',
  'Streaming Service': 'Streaming',
  'Web Hosting': 'Web hosting',
}

export function categoryLabel(category: string): string {
  return LABEL_OVERRIDES[category] || category
}

export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\//g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
