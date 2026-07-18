# Harova — project context for Claude Code

## What this is
Harova (harova.xyz) is a public software directory — a marketing-forward
positioning tool for Ryoka's product ecosystem. It lists Ryoka's own
products (Sorano, TWO Docs, Aegos Intel, Kira) alongside third-party
tools, and is the public/promotional counterpart to Kiroka (which stays
neutral and auth-gated).

## Stack
- Next.js 14 (App Router), TypeScript, deployed on Vercel
- Repo: sillyledger/harova, deploys automatically on push to main
- No test suite, no CMS — all content lives in Supabase (see below)

## Data — read this before touching anything
Harova has no database of its own. Every page reads live from:
https://client.ryoka.xyz/api/public/directory

This is Ryoka OS's public API, backed by Ryoka OS's Supabase project.
Admin editing of entries happens in the separate Ryoka OS repo/dashboard,
not here. Never add a local data store, mock data file, or a second
source of truth — always fetch from that endpoint.

Each directory entry:
```ts
{
  id: string
  name: string
  category: string              // legacy single-category mirror field
  categories: string[] | null   // current multi-category field
  one_liner: string
  long_description: string | null
  url: string
  type: 'ryoka' | 'affiliate' | 'neutral'
  show_on_directory: boolean
  slug: string
}
```
`category` is a legacy mirror — Ryoka OS writes `categories[0]` into it so
Kiroka keeps working unchanged. Always prefer `categories`, falling back
to `[category]` only if `categories` is empty. Use `entryCategories()`
from `src/app/lib/directory.ts` instead of re-deriving this inline.

## Design system
Don't introduce new colors, fonts, or spacing scales — everything lives
in `src/app/globals.css` as CSS custom properties (`--bg`, `--text`,
`--text-secondary`, `--border`, `--accent`, `--pill-active-bg`, etc.)
plus reusable classes (`.card`, `.category-tag`, `.filter-pill`,
`.section-label`, `.btn-primary`, `.btn-secondary`, `.page`). Fonts are
DM Sans (headings/logo) and Plus Jakarta Sans (body), already loaded in
`layout.tsx` — don't re-import.

## Established patterns
- Slugs: tool slugs are generated with a slugify + collision-safe suffix
  in Ryoka OS on insert. Harova only ever reads `entry.slug`, never
  generates one.
- Card overlay pattern: cards use a full-bleed absolutely-positioned
  `<a class="card-link-overlay">` (z-index 1) so the whole card links to
  `/tool/[slug]`. Anything inside the card needing its own link (external
  site icon, category tags) must be `position: relative; z-index: 2` or
  its click gets swallowed by the overlay.
- `MAX_TAGS = 2`: cards show the first 2 categories plus a `+N` overflow
  pill with a title tooltip listing the rest.
- Favicon fallback: `components/Favicon.tsx` does Google favicon →
  Clearbit → colored letter tile, with a server-side SHA-256 check
  (`api/favicon/route.ts`) to detect Google's generic placeholder image
  (Google returns a placeholder image, not an error, for missing favicons).

## Conventions for new code
- Shared logic goes in `src/app/lib/` (types, fetchers, slug/label
  helpers) — not redeclared per page. If you're about to copy-paste an
  interface or a LABEL_OVERRIDES map into a third file, import it from
  `lib/` instead.
- Shared UI goes in `src/app/components/`.
- Full build must pass before a task is done: `npx next build`.
- Don't invent external URLs (e.g. for other Ryoka products) if you don't
  have them — leave a clearly marked placeholder instead of guessing a
  domain.
- Prefer editing existing files over creating parallel ones; if something
  already renders (e.g. footer, category tags), fix it in place rather
  than adding a second version.

## Company/product context (for bios, footer links, schema)
Ryoka is the parent company. Products: TWO Docs, Sorano, Aegos Intel,
Kira (renamed from Tenkaro — Tenkaro no longer exists). Kiroka is a
separate, auth-gated, neutral product — don't conflate it with Kira.
Pieter Borremans is the founder.