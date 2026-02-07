# Path B: Remix Quests

## Quest 1: Loader Academy

Build a student directory using Remix loaders for data fetching.

### Learning Objectives

- Remix file-based routing
- Data loading with loaders
- useLoaderData hook
- TypeScript with Remix

### Key Concepts

```typescript
// app/routes/students.$id.tsx
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const student = await db.students.findById(params.id)
  return json({ student })
}

export default function StudentRoute() {
  const { student } = useLoaderData<typeof loader>()
  return <div>{student.name}</div>
}
```

### What You'll Build

- `/students` - Student list (loader fetches data)
- `/students/$id` - Student detail page
- Automatic data invalidation
- Type-safe loader data

---

## Quest 2: Action Forms

Create a spell management system using Remix actions for mutations.

### Learning Objectives

- Form submissions with actions
- Progressive enhancement
- useNavigation for loading states
- Form validation

### Key Concepts

```typescript
// app/routes/spells.new.tsx
import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, useNavigation } from '@remix-run/react'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('name')

  await db.spells.create({ name })
  return redirect('/spells')
}

export default function NewSpellRoute() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method="post">
      <input name="name" required />
      <button disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Spell'}
      </button>
    </Form>
  )
}
```

### What You'll Build

- Create spell form (action)
- Edit spell form (loader + action)
- Delete spell (action)
- Form validation and errors

---

## Quest 3: Nested Routes

Build a complex layout system with nested routes and outlets.

### Learning Objectives

- Nested routing with Outlet
- Shared layouts
- Pathless layouts
- Index routes

### Key Concepts

```typescript
// app/routes/academy.tsx
import { Outlet } from '@remix-run/react'

export default function AcademyLayout() {
  return (
    <div>
      <nav>
        <Link to="/academy/students">Students</Link>
        <Link to="/academy/spells">Spells</Link>
      </nav>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  )
}

// app/routes/academy.students.tsx
export default function StudentsRoute() {
  return <div>Student List</div>
}
```

### What You'll Build

- Academy layout with navigation
- Nested student routes
- Nested spell routes
- Shared loading states

---

## Setup Instructions

```bash
npx create-remix@latest remix-academy
cd remix-academy
npm run dev
```

## Resources

- [Remix Docs](https://remix.run/docs)
- [Loaders](https://remix.run/docs/en/main/route/loader)
- [Actions](https://remix.run/docs/en/main/route/action)
- [Nested Routes](https://remix.run/docs/en/main/guides/routing)
