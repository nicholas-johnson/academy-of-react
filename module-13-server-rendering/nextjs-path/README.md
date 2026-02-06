# Path A: Next.js Quests

## Quest 1: Static Academy

Build a static student directory using Next.js App Router and Static Site Generation (SSG).

### Learning Objectives
- File-based routing with App Router
- Static generation with `generateStaticParams`
- Server Components by default
- Metadata API

### Key Concepts
```typescript
// app/students/[id]/page.tsx
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

export default async function StudentPage({ params }: { params: { id: string } }) {
  // Server Component - fetches at build time
  const student = await fetchStudent(params.id)
  return <div>{student.name}</div>
}
```

### What You'll Build
- `/` - Homepage with student list
- `/students/[id]` - Individual student pages (static)
- `/about` - Static about page

---

## Quest 2: Dynamic Spells

Create a spell management system with Server Actions for mutations.

### Learning Objectives
- Server Actions for mutations
- Client Components with "use client"
- Server vs Client Components
- Form actions without JavaScript

### Key Concepts
```typescript
// app/actions.ts
'use server'

export async function createSpell(formData: FormData) {
  const name = formData.get('name')
  // Server-side mutation
  await db.spells.create({ name })
  revalidatePath('/spells')
}

// app/spells/page.tsx
'use client'
import { createSpell } from '../actions'

export default function SpellsPage() {
  return (
    <form action={createSpell}>
      <input name="name" />
      <button type="submit">Create</button>
    </form>
  )
}
```

### What You'll Build
- Spell list with real-time updates
- Create spell form (Server Action)
- Delete spell button (Server Action)
- Optimistic updates

---

## Quest 3: Streaming Battle

Build a battle simulation with Streaming and Suspense for progressive loading.

### Learning Objectives
- Streaming with Suspense
- Loading UI with `loading.tsx`
- Error boundaries with `error.tsx`
- Parallel data fetching

### Key Concepts
```typescript
// app/battle/loading.tsx
export default function Loading() {
  return <BattleLoadingSkeleton />
}

// app/battle/page.tsx
import { Suspense } from 'react'

export default function BattlePage() {
  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <BattleStats />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <BattleHistory />
      </Suspense>
    </div>
  )
}
```

### What You'll Build
- Battle simulation with streaming updates
- Parallel loading of stats and history
- Error handling
- Loading skeletons

---

## Setup Instructions

```bash
npx create-next-app@latest nextjs-academy --typescript --tailwind --app
cd nextjs-academy
npm run dev
```

## Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
