'use client'

import { useMemo, useState } from 'react'

// Soft, muted palette that matches the existing card/badge aesthetic
// (see --accent-bg / --affiliate-bg in globals.css for reference tones).
const LETTER_PALETTE: { bg: string; text: string }[] = [
  { bg: '#EEF2FF', text: '#4338CA' }, // indigo
  { bg: '#FEF3C7', text: '#92400E' }, // amber
  { bg: '#DCFCE7', text: '#166534' }, // green
  { bg: '#FCE7F3', text: '#9D174D' }, // pink
  { bg: '#E0F2FE', text: '#075985' }, // sky
  { bg: '#F3E8FF', text: '#6B21A8' }, // purple
  { bg: '#FFE4E6', text: '#9F1239' }, // rose
  { bg: '#ECFCCB', text: '#3F6212' }, // lime
]

function letterColors(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  }
  return LETTER_PALETTE[hash % LETTER_PALETTE.length]
}

function getDomain(url: string): string | null {
  if (!url) return null
  try {
    return new URL(url.startsWith('http') ? url : 'https://' + url).hostname
  } catch {
    return null
  }
}

type Stage = 'google' | 'clearbit' | 'letter'

interface FaviconProps {
  url: string
  name: string
  /** Outer tile size in px. Image and letter sizing scale off this. */
  size?: number
  className?: string
}

export default function Favicon({
  url,
  name,
  size = 36,
  className,
}: FaviconProps) {
  const domain = useMemo(() => getDomain(url), [url])
  const [stage, setStage] = useState<Stage>(domain ? 'google' : 'letter')

  const letter = name.charAt(0).toUpperCase()
  const colors = useMemo(() => letterColors(name), [name])

  const imgSize = Math.round(size * 0.56)
  const fontSize = Math.round(size * 0.42)

  const src =
    stage === 'google'
      ? `/api/favicon?domain=${encodeURIComponent(domain ?? '')}`
      : stage === 'clearbit'
      ? `https://logo.clearbit.com/${domain}?size=128`
      : null

  return (
    <div
      className={`favicon${className ? ` ${className}` : ''}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(6, Math.round(size * 0.22)),
        background: stage === 'letter' ? colors.bg : undefined,
      }}
    >
      {src ? (
        <img
          key={stage}
          src={src}
          alt=""
          style={{ width: imgSize, height: imgSize }}
          onError={() =>
            setStage((s) => (s === 'google' ? 'clearbit' : 'letter'))
          }
        />
      ) : (
        <span
          className="favicon-letter"
          style={{ fontSize, color: colors.text }}
        >
          {letter}
        </span>
      )}
    </div>
  )
}
