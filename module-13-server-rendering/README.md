# Module 13: Modern Server Rendering

Everything you've built so far runs entirely in the browser. The server sends an empty HTML shell, the browser downloads your JavaScript bundle, and *then* React renders the UI. This is called **client-side rendering** (CSR), and it works fine for many applications — but it has real downsides.

Users on slow connections stare at a blank page while JavaScript downloads. Search engines may not index your content properly. Data fetching can't start until the component mounts, adding another round trip. Server rendering solves these problems by generating HTML on the server and sending a complete page to the browser immediately.

This module introduces three modern frameworks that build on React (or alongside it) to give you server rendering with excellent developer experience. You'll choose one path to focus on, but the tutorial below covers the core ideas behind all three.

## Why Server Render?

With client-side rendering, this is what the browser initially receives:

```html
<html>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

Empty. The user sees nothing until `bundle.js` downloads, parses, executes, fetches data, and renders. On a fast connection that might take a second; on a slow mobile connection it can take many seconds.

With server rendering, the browser receives real content immediately:

```html
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
```

The user sees content instantly. JavaScript still loads in the background to make the page interactive (a process called **hydration**), but the perceived performance is dramatically better.

**Server rendering benefits:**
- Faster first contentful paint — users see content sooner
- Better SEO — search crawlers see real HTML, not an empty div
- Progressive enhancement — basic content works without JavaScript
- Server-side data access — fetch data close to your database, not from the client

## Key Concepts

Before diving into frameworks, a few terms you'll see everywhere:

**SSR (Server-Side Rendering)** — generate HTML on the server for each request. Content is always fresh but requires a running server.

**SSG (Static Site Generation)** — generate HTML at build time. Lightning fast because pages are pre-built, but content can go stale.

**Hydration** — the process where React takes over server-rendered HTML and makes it interactive. The server sends the structure; the client adds event handlers and state.

**Server Components** — React components that run *only* on the server. They can access databases and file systems directly, and they never ship JavaScript to the client.

**Islands Architecture** — a pattern where most of the page is static HTML, with small "islands" of interactivity that hydrate independently.

## The Three Frameworks

### Next.js — The Full-Stack React Framework

Next.js is the most popular React framework. It uses a file-based router where folders in `app/` become URL paths, and components are Server Components by default:

```jsx
// app/spells/page.js — this is a Server Component
async function SpellsPage() {
  const spells = await fetch('https://api.academy.com/spells')
    .then(res => res.json())

  return (
    <ul>
      {spells.map(spell => <li key={spell.id}>{spell.name}</li>)}
    </ul>
  )
}
```

No `useState`, no `useEffect`, no loading states. The component is async — it fetches data before the HTML is sent. When you need interactivity (forms, event handlers, hooks), you mark a component with `"use client"`:

```jsx
"use client"
import { useState } from 'react'

export function SpellFilter({ onFilter }) {
  const [search, setSearch] = useState('')
  return <input value={search} onChange={e => setSearch(e.target.value)} />
}
```

For mutations, Server Actions let you write server-side functions that forms call directly:

```jsx
async function addSpell(formData) {
  "use server"
  const name = formData.get('name')
  await db.spells.create({ name })
}

export default function NewSpell() {
  return (
    <form action={addSpell}>
      <input name="name" />
      <button type="submit">Create</button>
    </form>
  )
}
```

**Best for:** Full applications, e-commerce, dashboards, anything that mixes static and dynamic content.

### Remix — Web Standards First

Remix leans heavily on web platform fundamentals. Data loading uses **loaders** (for GET requests) and **actions** (for mutations), keeping the mental model close to how HTTP actually works:

```jsx
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export async function loader() {
  const spells = await db.spells.findMany()
  return json({ spells })
}

export default function SpellsPage() {
  const { spells } = useLoaderData()
  return <ul>{spells.map(s => <li key={s.id}>{s.name}</li>)}</ul>
}
```

Forms use the native `<form>` element with progressive enhancement — they work even without JavaScript:

```jsx
import { Form } from "@remix-run/react"

export async function action({ request }) {
  const formData = await request.formData()
  await db.spells.create({ name: formData.get('name') })
  return redirect('/spells')
}

export default function NewSpell() {
  return (
    <Form method="post">
      <input name="name" required />
      <button type="submit">Create</button>
    </Form>
  )
}
```

**Best for:** Forms-heavy applications, progressive enhancement, teams that value web standards.

### Astro — Content-First with Islands

Astro takes a radically different approach: it ships **zero JavaScript by default**. Pages are written in `.astro` files with a frontmatter section that runs at build time:

```astro
---
const spells = await fetch('https://api.academy.com/spells')
  .then(r => r.json())
---

<html>
  <body>
    <h1>Spell Library</h1>
    <ul>
      {spells.map(spell => <li>{spell.name}</li>)}
    </ul>
  </body>
</html>
```

This produces pure HTML — no JavaScript. When you need interactivity, you add React components as "islands" with explicit hydration directives:

```astro
---
import SpellSearch from '../components/SpellSearch.jsx'
---

<h1>Spells</h1>
<SpellSearch client:visible />
```

`client:visible` means the component only hydrates when it scrolls into view. Other options include `client:load` (immediately) and `client:idle` (when the browser is idle). Most of the page stays as static HTML.

**Best for:** Blogs, documentation sites, marketing pages, content-heavy sites where performance matters most.

## Choosing a Path

| | Next.js | Remix | Astro |
|---|---|---|---|
| Default rendering | Server Components | SSR | Static |
| JavaScript shipped | Only client components | Full app | Only islands |
| Data fetching | async components / fetch | Loaders | Frontmatter |
| Mutations | Server Actions | Actions | API routes |
| Best for | Full apps, hybrid | Forms, web standards | Content sites |

There's no wrong choice. All three are production-ready and well-maintained. Pick the one that interests you most — the concepts transfer between them.

## Common Mistakes

**Putting hooks in Server Components.** Server Components can't use `useState`, `useEffect`, or event handlers. If you need interactivity, create a separate Client Component with `"use client"`.

**Over-using Client Components.** It's tempting to slap `"use client"` on everything when something doesn't work. Push interactivity to the smallest possible component — keep the rest on the server.

**Confusing SSR with SSG.** SSR generates HTML per-request (always fresh, needs a server). SSG generates at build time (instant, but can be stale). Most frameworks let you choose per-page.

## Exercises

Choose one path and complete its three quests:

### Next.js Path

1. **App Router** — Build a static student directory with file-based routing and `generateStaticParams`
2. **Server Actions** — Create a spell management system with server-side mutations
3. **Deployment** — Deploy to production with streaming and Suspense

[Start Next.js Path →](./nextjs-path/)

### Remix Path

1. **Nested Routes** — Build a layout system with loaders and outlets
2. **Loaders & Actions** — Create forms with server-side data loading and mutations
3. **Deployment** — Deploy to production

[Start Remix Path →](./remix-path/)

### Astro Path

1. **Static Pages** — Build a static spell encyclopedia with zero JavaScript
2. **Islands Architecture** — Add interactive React islands with partial hydration
3. **Deployment** — Deploy to production with hybrid rendering

[Start Astro Path →](./astro-path/)

## Running the Code

Each path starts with scaffolding a new project:

```bash
# Next.js
npx create-next-app@latest

# Remix
npx create-remix@latest

# Astro
npm create astro@latest
```

Slides compare all three frameworks with architecture diagrams:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 12: State Management](../module-12-state-management/)
