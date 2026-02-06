# Path C: Astro Quests

## Quest 1: Static Spells

Build a completely static spell encyclopedia using Astro.

### Learning Objectives
- Astro file structure
- Static generation by default
- Content collections
- Markdown/MDX support

### Key Concepts
```astro
---
// src/pages/spells/[id].astro
export async function getStaticPaths() {
  const spells = await fetchSpells()
  return spells.map(spell => ({
    params: { id: spell.id },
    props: { spell }
  }))
}

const { spell } = Astro.props
---

<html>
  <head><title>{spell.name}</title></head>
  <body>
    <h1>{spell.name}</h1>
    <p>{spell.description}</p>
  </body>
</html>
```

### What You'll Build
- `/spells` - Static spell list
- `/spells/[id]` - Individual spell pages
- Content from Markdown files
- Zero JavaScript by default

---

## Quest 2: Island Architecture

Add interactive React components as islands in your static site.

### Learning Objectives
- Component islands
- Partial hydration
- client:load, client:visible directives
- Multi-framework support

### Key Concepts
```astro
---
// src/pages/battle.astro
import BattleSimulator from '../components/BattleSimulator.tsx'
import SpellCounter from '../components/SpellCounter.tsx'
---

<html>
  <body>
    <h1>Battle Arena</h1>
    
    <!-- Static content -->
    <p>Welcome to the arena</p>
    
    <!-- Interactive island - loads immediately -->
    <BattleSimulator client:load />
    
    <!-- Interactive island - loads when visible -->
    <SpellCounter client:visible />
  </body>
</html>
```

```tsx
// src/components/BattleSimulator.tsx
import { useState } from 'react'

export default function BattleSimulator() {
  const [score, setScore] = useState(0)
  return (
    <div>
      <p>Score: {score}</p>
      <button onClick={() => setScore(score + 1)}>
        Cast Spell
      </button>
    </div>
  )
}
```

### What You'll Build
- Static layout with interactive islands
- React components in Astro
- Optimized JavaScript loading
- Performance comparison

---

## Quest 3: Hybrid Rendering

Mix static and dynamic content with SSR and API routes.

### Learning Objectives
- SSR in Astro
- API routes
- Hybrid rendering strategy
- Environment variables

### Key Concepts
```astro
---
// src/pages/students.astro
export const prerender = false // Enable SSR for this page

const students = await fetch('http://api.academy.com/students')
  .then(r => r.json())
---

<html>
  <body>
    <h1>Current Students</h1>
    <ul>
      {students.map(s => <li>{s.name}</li>)}
    </ul>
  </body>
</html>
```

```typescript
// src/pages/api/spells.json.ts
export async function GET() {
  const spells = await db.spells.findAll()
  return new Response(JSON.stringify(spells), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export async function POST({ request }) {
  const data = await request.json()
  const spell = await db.spells.create(data)
  return new Response(JSON.stringify(spell), { status: 201 })
}
```

### What You'll Build
- Static pages for content
- SSR pages for dynamic data
- API routes for data mutations
- Environment-based configuration

---

## Setup Instructions

```bash
npm create astro@latest astro-academy
cd astro-academy
npm install @astrojs/react
npm run dev
```

## Resources
- [Astro Docs](https://docs.astro.build)
- [Islands Architecture](https://docs.astro.build/en/concepts/islands/)
- [SSR in Astro](https://docs.astro.build/en/guides/server-side-rendering/)
- [React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
