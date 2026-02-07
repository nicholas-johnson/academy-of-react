# Side Quest: Link Saver

**A bookmark manager** — Save, organize, and rediscover articles and links.

## What You'll Build

A "read it later" app where you can:
- Save links with automatic metadata fetching
- Organize with tags and collections
- Search and filter your saved links
- Track read/unread status
- Archive old links

## API Setup

This project can work with:
1. **localStorage only** — No external API needed
2. **Metadata API** — Fetch title/description/image from URLs

For metadata fetching, options include:
- [Open Graph scraping](https://ogp.me/) via a proxy
- [LinkPreview API](https://www.linkpreview.net/) (free tier)
- [Microlink API](https://microlink.io/) (free tier)

---

## Module Progression

### After Module 2: Basic Display
- Create a `LinkCard` component using JSX
- Display URL, title, and favicon
- Show domain name extracted from URL

### After Module 3: State
- Add new link (URL input)
- Toggle read/unread status
- Delete links

### After Module 4: Props & Composition
- Create `LinkList`, `LinkCard`, `TagBadge` components
- Pass link data via props
- Compose card with image preview, title, tags

### After Module 5: Forms
- Full link form (URL, title override, notes, tags)
- Tag input with autocomplete
- Edit existing links

### After Module 6: Lists & Keys
- Render links with proper keys
- Sort by: date added, title, domain
- Filter by: tag, read status, domain

### After Module 7: Effects
- Fetch metadata when URL is added
- Persist to localStorage
- Load saved links on mount
- Debounce search

### After Module 8: Managing State
- Multiple views: All / Unread / Archive / By Tag
- Collection management
- Reading statistics

### After Module 9: Refs
- Auto-focus URL input
- Copy link to clipboard button
- Scroll to newly added link

### After Module 10: Context
- Theme context (dark/light mode)
- Default view preferences
- Reading list settings

### After Module 11: Custom Hooks
- `useLinks()` — CRUD operations
- `useLinkMetadata(url)` — fetch Open Graph data
- `useTags()` — tag management with suggestions

### After Module 12: Performance
- Lazy load link previews/images
- Virtualized list for large collections
- Memoize filtered results

### After Module 13: Server Rendering
- Public reading list page
- SEO-friendly link previews
- Browser extension landing page

---

## Handling CORS with Vite Proxy

Fetching metadata from URLs requires handling CORS, since you can't directly fetch other websites from the browser.

### The Problem

```typescript
// This WON'T work — CORS blocked
const response = await fetch('https://example.com/article')
const html = await response.text()
// Parse Open Graph tags... ❌
```

### Solution 1: Use a Metadata API

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/metadata': {
        target: 'https://api.microlink.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/metadata/, '')
      }
    }
  }
})
```

Usage:

```typescript
async function fetchMetadata(url: string) {
  const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`)
  const data = await response.json()
  
  return {
    title: data.data.title,
    description: data.data.description,
    image: data.data.image?.url,
    favicon: data.data.logo?.url
  }
}
```

### Solution 2: Your Own Proxy Server

For production, run your own metadata fetcher:

```typescript
// Simple Express server (server.js)
import express from 'express'
import { JSDOM } from 'jsdom'

const app = express()

app.get('/api/metadata', async (req, res) => {
  const { url } = req.query
  
  const response = await fetch(url)
  const html = await response.text()
  const dom = new JSDOM(html)
  const doc = dom.window.document
  
  res.json({
    title: doc.querySelector('meta[property="og:title"]')?.content 
           || doc.title,
    description: doc.querySelector('meta[property="og:description"]')?.content,
    image: doc.querySelector('meta[property="og:image"]')?.content
  })
})
```

Then proxy to it:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true
    }
  }
}
```

---

## Data Model

```typescript
interface Link {
  id: string
  url: string
  title: string
  description?: string
  image?: string
  favicon?: string
  domain: string        // Extracted from URL
  tags: string[]
  notes?: string
  status: 'unread' | 'read' | 'archived'
  createdAt: string     // ISO date
  readAt?: string       // When marked as read
}

interface Tag {
  name: string
  color: string
  count: number  // Number of links with this tag
}

interface Collection {
  id: string
  name: string
  description?: string
  linkIds: string[]
}
```

## URL Parsing Helper

```typescript
function extractDomain(url: string): string {
  try {
    const { hostname } = new URL(url)
    return hostname.replace('www.', '')
  } catch {
    return url
  }
}

function getFaviconUrl(url: string): string {
  const domain = extractDomain(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}
```

## Routes (Module 13+)

```
/                    → All links (default: unread)
/unread              → Unread links
/archive             → Archived links
/tag/:tag            → Links by tag
/collection/:id      → Collection view
/search?q=...        → Search results
/add                 → Add link (mobile-friendly)
/settings            → Preferences
```

## Browser Extension Idea (Advanced)

After completing the course, extend this into a browser extension:
- Right-click "Save to Link Saver"
- Toolbar button to quick-save current page
- Sync with your web app

## Resources

- [Microlink API](https://microlink.io/docs/api/getting-started/overview) — Free metadata fetching
- [Open Graph Protocol](https://ogp.me/) — Metadata standard
- [Favicon fetching](https://www.google.com/s2/favicons) — Google's favicon service
- [JSDOM](https://github.com/jsdom/jsdom) — Server-side HTML parsing
