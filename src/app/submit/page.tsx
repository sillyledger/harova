'use client'

import { useState } from 'react'

const CATEGORIES = [
  'IDE/CLI',
  'Lifestyle',
  'Note Taking',
  'Object Storage',
  'Productivity',
  'Streaming Service',
  'Web Hosting',
  'WordPress',
]

const SHORT_DESCRIPTION_LIMIT = 100
const SUBMIT_URL = 'https://client.ryoka.xyz/api/public/submit'

export default function SubmitPage() {
  const [name, setName] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [url, setUrl] = useState('')
  // Order matters: the first category selected is the primary one.
  const [categories, setCategories] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function toggleCategory(cat: string) {
    setCategories((prev) => {
      if (prev.includes(cat)) {
        return prev.filter((c) => c !== cat)
      }
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, cat]
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !shortDescription.trim() || !url.trim()) {
      setError('Brand name, short description, and website URL are required.')
      return
    }
    if (categories.length === 0) {
      setError('Pick at least one category.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          one_liner: shortDescription.trim(),
          long_description: longDescription.trim(),
          url: url.trim(),
          categories,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }

      setSubmitted(true)
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="container page">
        <a href="/" className="back-link">← Back to directory</a>
        <h1>Thanks — got it</h1>
        <p className="page-subtitle">One more thing before it's live.</p>
        <p>
          <strong>{name}</strong> is now in the review queue. We check every
          submission by hand, so it won't appear in the directory until it's
          been approved.
        </p>
      </div>
    )
  }

  return (
    <div className="container page">
      <a href="/" className="back-link">← Back to directory</a>

      <h1>Submit a tool</h1>
      <p className="page-subtitle">
        Know a tool that belongs here? Tell us about it below.
      </p>

      <form className="submit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Brand name</label>
          <input
            id="name"
            className="form-input"
            type="text"
            placeholder="e.g. Linear"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="shortDescription">
            Short description
            <span className="form-hint">
              {shortDescription.length}/{SHORT_DESCRIPTION_LIMIT} — shown on the directory card
            </span>
          </label>
          <input
            id="shortDescription"
            className="form-input"
            type="text"
            placeholder="One line on what it does"
            maxLength={SHORT_DESCRIPTION_LIMIT}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="longDescription">
            Long description
            <span className="form-hint">shown on the tool's own page</span>
          </label>
          <textarea
            id="longDescription"
            className="form-input form-textarea"
            placeholder="What it does, who it's for, what makes it worth listing"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="url">
            Website URL
            <span className="form-hint">include https://</span>
          </label>
          <input
            id="url"
            className="form-input"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Categories
            <span className="form-hint">
              pick up to 3 — the first one you pick is the primary category
            </span>
          </label>
          <div className="form-pills">
            {CATEGORIES.map((cat) => {
              const selected = categories.includes(cat)
              const isPrimary = selected && categories[0] === cat
              const disabled = !selected && categories.length >= 3
              return (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill form-pill${selected ? ' active' : ''}`}
                  disabled={disabled}
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                  {isPrimary && <span className="primary-tag"> · primary</span>}
                </button>
              )
            })}
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn-primary form-submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit for review'}
        </button>
      </form>
    </div>
  )
}
