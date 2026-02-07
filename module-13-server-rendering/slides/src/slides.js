export const slides = [
  {
    type: 'title',
    content: {
      title: 'Modern Server Rendering',
      subtitle: 'Module 13: Next.js, Remix, and Astro',
      emoji: '🌐'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'The Problem with Client-Side React',
      points: [
        '📄 Empty HTML sent to browser — bad for SEO',
        '⏳ User sees blank screen until JS loads',
        '📱 Slow on mobile/low-powered devices',
        '🔄 Data fetching starts after component mounts',
        '🌍 Poor performance on slow networks'
      ],
      emoji: '😰'
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'CSR vs SSR',
      left: {
        label: 'Client-Side Rendering (CSR)',
        code: `<!-- What the server sends -->
<html>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>

// Browser downloads JS
// JS executes
// React renders
// THEN user sees content`
      },
      right: {
        label: 'Server-Side Rendering (SSR)',
        code: `<!-- What the server sends -->
<html>
  <body>
    <div id="root">
      <h1>Welcome, Harry!</h1>
      <ul>
        <li>Fireball</li>
        <li>Ice Lance</li>
      </ul>
    </div>
  </body>
</html>

// User sees content IMMEDIATELY`
      }
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Server Rendering Benefits',
      points: [
        '⚡ Faster First Contentful Paint (FCP)',
        '🔍 Better SEO — crawlers see real content',
        '📱 Works without JavaScript (progressive enhancement)',
        '🚀 Data fetched on server — closer to database',
        '🔐 Sensitive logic stays on server'
      ],
      emoji: '✨'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Three Modern Approaches',
      points: [
        '▲ Next.js — Hybrid rendering, Server Components, Vercel',
        '💿 Remix — Web standards, progressive enhancement, loaders',
        '🚀 Astro — Content-first, islands architecture, multi-framework'
      ],
      emoji: '🛠️'
    }
  },
  {
    type: 'title',
    content: {
      title: '▲ Next.js',
      subtitle: 'The React Framework for Production',
      emoji: '▲'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Next.js Key Features',
      points: [
        '📁 File-based routing — pages are files',
        '⚛️ Server Components — render on server by default',
        '🔄 Hybrid rendering — static, SSR, or client per page',
        '⚡ Streaming — progressive page loading',
        '🎯 Server Actions — mutations without API routes'
      ],
      emoji: '▲'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Next.js App Router Structure',
      code: `app/
├── layout.js          # Root layout (wraps all pages)
├── page.js            # Home page (/)
├── about/
│   └── page.js        # About page (/about)
├── spells/
│   ├── page.js        # Spell list (/spells)
│   └── [id]/
│       └── page.js    # Spell detail (/spells/123)
└── api/
    └── route.js       # API endpoint

// File = Route. Folders = URL segments.`,
      highlights: [
        'page.js = route component',
        'layout.js = shared wrapper',
        '[id] = dynamic segment',
        'Nested folders = nested routes'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Server Components (Default)',
      code: `// app/spells/page.js
// This runs on the SERVER — no "use client" directive

async function SpellsPage() {
  // Fetch directly — no useEffect needed!
  const spells = await fetch('https://api.academy.com/spells')
    .then(res => res.json())
  
  return (
    <div>
      <h1>Spell Library</h1>
      <ul>
        {spells.map(spell => (
          <li key={spell.id}>{spell.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SpellsPage`,
      highlights: [
        'async component — fetch in render!',
        'Runs on server only',
        'No useState, no useEffect',
        'Data fetched before HTML sent'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Client Components',
      code: `// app/components/SpellFilter.js
"use client"  // 👈 This makes it a Client Component

import { useState } from 'react'

export function SpellFilter({ onFilter }) {
  const [search, setSearch] = useState('')
  
  return (
    <input
      value={search}
      onChange={(e) => {
        setSearch(e.target.value)
        onFilter(e.target.value)
      }}
      placeholder="Search spells..."
    />
  )
}

// Use "use client" when you need:
// - useState, useEffect, or other hooks
// - Event handlers (onClick, onChange)
// - Browser-only APIs`,
      highlights: [
        '"use client" at top of file',
        'Now you can use hooks',
        'Hydrates on client',
        'Use sparingly — server is default'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Server Actions',
      code: `// app/spells/new/page.js
async function addSpell(formData) {
  "use server"  // 👈 This runs on the server!
  
  const name = formData.get('name')
  const power = formData.get('power')
  
  await db.spells.create({ name, power })
  revalidatePath('/spells')
}

export default function NewSpellPage() {
  return (
    <form action={addSpell}>
      <input name="name" placeholder="Spell name" />
      <input name="power" type="number" />
      <button type="submit">Create Spell</button>
    </form>
  )
}`,
      highlights: [
        '"use server" marks server action',
        'Form submits to server function',
        'No API route needed',
        'Works without JavaScript!'
      ]
    }
  },
  {
    type: 'title',
    content: {
      title: '💿 Remix',
      subtitle: 'Full Stack Web Framework',
      emoji: '💿'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Remix Philosophy',
      points: [
        '🌐 Web standards first — uses native fetch, FormData, Response',
        '📝 Forms are the API — no separate endpoint needed',
        '🔄 Loaders load data — actions mutate data',
        '⚡ Progressive enhancement — works without JS',
        '🎯 Nested routes — parallel data loading'
      ],
      emoji: '💿'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Remix Loaders',
      code: `// app/routes/spells.jsx
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

// Runs on the SERVER before render
export async function loader() {
  const spells = await db.spells.findMany()
  return json({ spells })
}

// Renders with data already loaded
export default function SpellsPage() {
  const { spells } = useLoaderData()
  
  return (
    <ul>
      {spells.map(spell => (
        <li key={spell.id}>{spell.name}</li>
      ))}
    </ul>
  )
}`,
      highlights: [
        'loader() fetches data on server',
        'useLoaderData() accesses it',
        'No loading states needed',
        'Data ready on first render'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Remix Actions',
      code: `// app/routes/spells.new.jsx
import { redirect } from "@remix-run/node"
import { Form } from "@remix-run/react"

// Handles form POST
export async function action({ request }) {
  const formData = await request.formData()
  const name = formData.get("name")
  
  await db.spells.create({ name })
  return redirect("/spells")
}

export default function NewSpell() {
  return (
    <Form method="post">
      <input name="name" required />
      <button type="submit">Create</button>
    </Form>
  )
}

// Form works even with JavaScript disabled!`,
      highlights: [
        'action() handles POST/PUT/DELETE',
        '<Form> progressively enhances',
        'Standard web form behavior',
        'redirect() for navigation'
      ]
    }
  },
  {
    type: 'title',
    content: {
      title: '🚀 Astro',
      subtitle: 'The Web Framework for Content',
      emoji: '🚀'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Astro Philosophy',
      points: [
        '📄 Content-focused — ships zero JS by default',
        '🏝️ Islands architecture — hydrate only what needs it',
        '🔀 Multi-framework — use React, Vue, Svelte together',
        '⚡ Static-first — pre-renders everything possible',
        '🎯 Partial hydration — client:load, client:visible, etc.'
      ],
      emoji: '🚀'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Astro Components',
      code: `---
// src/pages/spells.astro
// This is the "frontmatter" — runs at build time

const response = await fetch('https://api.academy.com/spells')
const spells = await response.json()
---

<html>
  <head>
    <title>Spell Library</title>
  </head>
  <body>
    <h1>Spells</h1>
    <ul>
      {spells.map(spell => (
        <li>{spell.name}</li>
      ))}
    </ul>
  </body>
</html>

<!-- Zero JavaScript shipped! Pure HTML. -->`,
      highlights: [
        '--- frontmatter runs at build',
        'HTML templating below',
        'No JS sent to client',
        'Lightning fast pages'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Astro Islands',
      code: `---
// src/pages/index.astro
import SpellSearch from '../components/SpellSearch.jsx'
import StaticHeader from '../components/Header.astro'
---

<StaticHeader />  <!-- Pure HTML, no JS -->

<!-- Hydrate when visible in viewport -->
<SpellSearch client:visible />

<!-- Hydrate immediately on load -->
<SpellSearch client:load />

<!-- Hydrate only on interaction -->
<SpellSearch client:idle />

<!-- Never hydrate (static HTML only) -->
<SpellSearch />`,
      highlights: [
        'client:visible — lazy hydration',
        'client:load — immediate hydration',
        'client:idle — when browser is idle',
        'No directive = static HTML'
      ]
    }
  },
  {
    type: 'rules',
    content: {
      title: 'When to Use Each',
      rules: [
        { rule: 'Next.js', example: 'Full apps, dashboards, e-commerce, hybrid static/dynamic', icon: '▲' },
        { rule: 'Remix', example: 'Forms-heavy apps, progressive enhancement, web standards', icon: '💿' },
        { rule: 'Astro', example: 'Blogs, docs, marketing sites, content-heavy', icon: '🚀' },
        { rule: 'Plain React', example: 'SPAs, internal tools, no SEO needs', icon: '⚛️' }
      ]
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'Framework Comparison',
      left: {
        label: 'Rendering',
        code: `Next.js:
  - Server Components (default)
  - Client Components ("use client")
  - Static Generation
  - ISR (Incremental)

Remix:
  - SSR (always)
  - Loaders + Actions
  - No static generation

Astro:
  - Static (default)
  - SSR (opt-in)
  - Islands (partial hydration)`
      },
      right: {
        label: 'Data Loading',
        code: `Next.js:
  - async components
  - Server Actions
  - fetch() with caching

Remix:
  - loader() function
  - action() for mutations
  - useLoaderData()

Astro:
  - Frontmatter (---)
  - fetch at build time
  - API routes for dynamic`
      }
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Key Concepts Summary',
      points: [
        '🖥️ SSR — Render HTML on server, send complete page',
        '📄 SSG — Generate HTML at build time',
        '⚛️ Server Components — React components that run on server',
        '🏝️ Islands — Hydrate only interactive parts',
        '🔄 Hydration — Making static HTML interactive'
      ],
      emoji: '📚'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Module 13 Paths',
      points: [
        '▲ Next.js Path — App Router, Server Components, Server Actions',
        '💿 Remix Path — Loaders, Actions, Nested Routes',
        '🚀 Astro Path — Static Generation, Islands Architecture'
      ],
      emoji: '🛤️'
    }
  },
  {
    type: 'title',
    content: {
      title: 'Go Full Stack!',
      subtitle: 'Choose your path and build for the web',
      emoji: '🚀'
    }
  }
];
