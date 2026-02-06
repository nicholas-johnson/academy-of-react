# Quest 1: Knowledge Base (Static + Islands)

## Story Context

📚 The Academy needs a lightning-fast knowledge base for spell documentation! Unlike traditional React apps that ship JavaScript for everything, we'll use Astro to ship pure HTML by default, with React "islands" of interactivity only where needed.

## Objective

Build an Academy Knowledge Base with:
- Static pages for spell documentation (zero JS!)
- React island for interactive search
- React island for filterable spell list
- Content Collections for type-safe content

## Technical Concepts

- `.astro` file format
- React components as islands
- Client directives (`client:load`, `client:visible`, `client:idle`)
- Content Collections
- Zero JavaScript by default

## Requirements

### 1. Static Spell Pages

Create `src/pages/spells/index.astro`:
```astro
---
import Layout from '../../layouts/Layout.astro';
import { getCollection } from 'astro:content';

const spells = await getCollection('spells');
---

<Layout title="Spell Directory">
  <h1>All Spells</h1>
  
  <!-- Pure HTML - No JavaScript shipped! -->
  {spells.map((spell) => (
    <div class="spell-card">
      <h3>{spell.data.name}</h3>
      <p>{spell.data.description}</p>
      <span>Type: {spell.data.type}</span>
      <span>Power: {spell.data.power}</span>
    </div>
  ))}
</Layout>

<style>
  .spell-card {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
  }
</style>
```

### 2. Interactive Search Island

Create `src/islands/SearchBar.jsx`:
```jsx
import { useState } from 'react';

export default function SearchBar({ spells }) {
  const [search, setSearch] = useState('');
  
  const filtered = spells.filter(spell =>
    spell.data.name.toLowerCase().includes(search.toLowerCase()) ||
    spell.data.description.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search spells..."
        style={{ padding: '0.5rem', width: '100%' }}
      />
      
      <div>
        {filtered.length === 0 && <p>No spells found</p>}
        {filtered.map((spell) => (
          <div key={spell.id} className="spell-result">
            <h4>{spell.data.name}</h4>
            <p>{spell.data.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Use Island in Page

Update `src/pages/spells/search.astro`:
```astro
---
import Layout from '../../layouts/Layout.astro';
import SearchBar from '../../islands/SearchBar.jsx';
import { getCollection } from 'astro:content';

const spells = await getCollection('spells');
---

<Layout title="Search Spells">
  <h1>Search Spells</h1>
  
  <!-- React island - loads immediately -->
  <SearchBar client:load spells={spells} />
</Layout>
```

### 4. Content Collections

Create `src/content/config.ts`:
```ts
import { defineCollection, z } from 'astro:content';

const spellsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.enum(['fire', 'ice', 'lightning', 'healing', 'defense']),
    power: z.number().min(1).max(100),
    manaCost: z.number(),
    description: z.string(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'master']),
  })
});

export const collections = {
  spells: spellsCollection
};
```

Create content files in `src/content/spells/`:
```markdown
---
# src/content/spells/fireball.md
name: Fireball
type: fire
power: 85
manaCost: 40
description: A powerful ball of flame that explodes on impact
difficulty: advanced
---

The Fireball spell is one of the most iconic offensive spells...
```

### 5. Filterable Spell List

Create `src/islands/SpellFilter.jsx`:
```jsx
import { useState } from 'react';

export default function SpellFilter({ spells }) {
  const [typeFilter, setTypeFilter] = useState('all');
  
  const filtered = typeFilter === 'all'
    ? spells
    : spells.filter(s => s.data.type === typeFilter);
  
  return (
    <div>
      <div>
        <button onClick={() => setTypeFilter('all')}>All</button>
        <button onClick={() => setTypeFilter('fire')}>Fire</button>
        <button onClick={() => setTypeFilter('ice')}>Ice</button>
        <button onClick={() => setTypeFilter('lightning')}>Lightning</button>
        <button onClick={() => setTypeFilter('healing')}>Healing</button>
      </div>
      
      <div>
        {filtered.map(spell => (
          <div key={spell.id}>
            <h3>{spell.data.name}</h3>
            <p>{spell.data.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Use with `client:visible` directive:
```astro
<!-- Only loads JS when scrolled into view! -->
<SpellFilter client:visible spells={spells} />
```

## Client Directives Comparison

| Directive | When to Use | JS Load Time |
|-----------|-------------|--------------|
| `client:load` | Above-the-fold, critical | Page load |
| `client:idle` | Important but not critical | Browser idle |
| `client:visible` | Below-the-fold content | Scrolls into view |
| `client:media` | Responsive components | Media query matches |
| (none) | Static only | Never! |

## File Structure

```
src/
├── content/
│   ├── config.ts
│   └── spells/
│       ├── fireball.md
│       ├── ice-shield.md
│       └── lightning-bolt.md
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   ├── spells/
│   │   ├── index.astro           # Static list
│   │   ├── search.astro          # With search island
│   │   └── [id].astro            # Dynamic routes
│   └── students.astro
└── islands/
    ├── SearchBar.jsx             # React island
    └── SpellFilter.jsx           # React island
```

## Acceptance Criteria

✅ Static spells page with zero JavaScript  
✅ SearchBar island with `client:load`  
✅ SpellFilter island with `client:visible`  
✅ Content Collections configured with types  
✅ At least 5 spell content files  
✅ Detail pages for individual spells  
✅ TypeScript types from Content Collections  
✅ Build succeeds (`npm run build`)  

## Hints

<details>
<summary>Hint 1: Astro Component Basics</summary>

```astro
---
// Frontmatter - runs at build time (or request time in SSR)
const data = await fetchData();
---

<!-- Template - uses JSX-like syntax -->
<div>
  <h1>{data.title}</h1>
  {data.items.map(item => <p>{item}</p>)}
</div>

<style>
  /* Scoped CSS - won't leak! */
  h1 { color: blue; }
</style>
```
</details>

<details>
<summary>Hint 2: Using Content Collections</summary>

```astro
---
import { getCollection, getEntry } from 'astro:content';

// Get all spells
const allSpells = await getCollection('spells');

// Get specific spell
const fireball = await getEntry('spells', 'fireball');

// Filter by criteria
const fireSpells = await getCollection('spells', ({ data }) => {
  return data.type === 'fire';
});
---
```
</details>

<details>
<summary>Hint 3: Dynamic Routes</summary>

```astro
---
// src/pages/spells/[id].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const spells = await getCollection('spells');
  return spells.map(spell => ({
    params: { id: spell.id },
    props: { spell }
  }));
}

const { spell } = Astro.props;
---

<h1>{spell.data.name}</h1>
<p>{spell.data.description}</p>
```
</details>

## Performance Comparison

Check bundle sizes:
```bash
npm run build
# Check dist/ folder size

# Compare to a React app of similar complexity
# Astro: ~5-20KB JS (islands only)
# React SPA: ~100-150KB JS (full app)
```

## Bonus Challenges

- Add student directory with Content Collections
- Implement spell detail pages with MDX
- Add dark mode toggle (React island)
- Create a spell comparison tool
- Add sorting functionality
- Implement breadcrumb navigation
- Add View Transitions for smooth navigation

---

**Next Quest**: [Quest 2: Interactive Simulator →](../quest-02-interactive-simulator/)






