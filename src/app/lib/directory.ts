export const API_URL = 'https://client.ryoka.xyz/api/public/directory'

export interface DirectoryEntry {
  id: string
  name: string
  category: string
  categories: string[] | null
  one_liner: string
  long_description: string | null
  url: string
  type: 'ryoka' | 'affiliate' | 'neutral'
  show_on_directory: boolean
  slug: string
}

export function entryCategories(entry: DirectoryEntry): string[] {
  if (entry.categories && entry.categories.length > 0) return entry.categories
  if (entry.category) return [entry.category]
  return []
}

export async function getEntries(): Promise<DirectoryEntry[]> {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    if (!Array.isArray(data)) return []
    return data.filter((e: DirectoryEntry) => e.show_on_directory)
  } catch {
    return []
  }
}
