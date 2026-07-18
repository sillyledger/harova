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

// Only for categories with a mapped icon. Anything not listed here falls
// back to a generic icon via categoryIcon() — so a brand-new category still
// renders something sensible instead of a blank/broken icon.
export const ICON_MAP: Record<string, string> = {
  'Cloud Infrastructure': 'ti-cloud',
  'Cloud Storage': 'ti-database',
  'Domain Registrar': 'ti-world',
  FinTech: 'ti-credit-card',
  'Fitness & Health': 'ti-heartbeat',
  'IDE/CLI': 'ti-terminal-2',
  Lifestyle: 'ti-sparkles',
  'Note Taking': 'ti-notes',
  'Payment Processing': 'ti-cash',
  Productivity: 'ti-bolt',
  'Web Hosting': 'ti-server-2',
  WordPress: 'ti-brand-wordpress',
}

export function categoryIcon(category: string): string {
  return ICON_MAP[category] || 'ti-apps'
}
