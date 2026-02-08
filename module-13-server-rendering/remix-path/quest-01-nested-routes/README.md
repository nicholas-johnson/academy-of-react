# Quest 1: Academy Portal (Loaders)

## Story Context

Victory! The Academy wants to share knowledge with the world using Remix. Build a portal where wizards everywhere can browse students and spells. Learn the Remix way: loaders for data, progressive enhancement, and web fundamentals first!

## Objective

Build an Academy Portal with:

- Route loaders for data fetching
- Nested routes and layouts
- Error boundaries
- Progressive enhancement

## Technical Concepts

- Remix file-based routing
- `loader()` functions
- `useLoaderData()` hook
- Nested layouts with `<Outlet />`
- Error boundaries
- `defer()` for streaming

## Requirements

### 1. Student Directory Route

Create `app/routes/students._index.tsx`:

```tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const students = await fetchStudents();
  return json({ students });
}

export default function StudentsIndex() {
  const { students } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Student Directory</h1>
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}
```

### 2. Nested Layout

Create `app/routes/students.tsx`:

```tsx
import { Outlet } from "@remix-run/react";

export default function StudentsLayout() {
  return (
    <div>
      <nav>{/* Navigation */}</nav>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}
```

### 3. Error Boundary

Add to `app/routes/students._index.tsx`:

```tsx
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div>
      <h1>Error Loading Students</h1>
      <p>{error.message}</p>
    </div>
  );
}
```

### 4. Streaming with defer()

Create `app/routes/dashboard.tsx`:

```tsx
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export async function loader() {
  return defer({
    students: fetchStudents(), // Fast
    battleStats: fetchBattleStats(), // Slow - streams
  });
}

export default function Dashboard() {
  const { students, battleStats } = useLoaderData<typeof loader>();

  return (
    <div>
      {/* Renders immediately */}
      <StudentList students={students} />

      {/* Streams when ready */}
      <Suspense fallback={<LoadingStats />}>
        <Await resolve={battleStats}>
          {(stats) => <BattleStats data={stats} />}
        </Await>
      </Suspense>
    </div>
  );
}
```

## File Structure

```
app/
├── root.tsx                    # Root layout
├── routes/
│   ├── _index.tsx              # Home (/)
│   ├── students.tsx            # Layout (/students)
│   ├── students._index.tsx     # List (/students)
│   ├── students.$id.tsx        # Detail (/students/:id)
│   └── dashboard.tsx           # Dashboard with streaming
└── components/
    └── StudentCard.tsx
```

## Acceptance Criteria

- Students route uses loader function
- Data fetched with `useLoaderData()` hook
- Nested layout with `<Outlet />` works
- Error boundary catches and displays errors
- Dashboard uses `defer()` for streaming
- TypeScript types inferred from loader
- Progressive enhancement (works without JS!)

## Hints

<details>
<summary>Hint 1: Loader Function</summary>

```tsx
// Runs on server for each request
export async function loader() {
  const data = await fetchData();
  return json({ data }); // Serialize to JSON
}
```

</details>

<details>
<summary>Hint 2: Nested Routes Naming</summary>

- `students.tsx` - Parent layout
- `students._index.tsx` - Renders at `/students`
- `students.$id.tsx` - Renders at `/students/:id`

The `.` creates nesting!

</details>

<details>
<summary>Hint 3: Type Safety</summary>

```tsx
export async function loader() {
  return json({ students: await fetchStudents() });
}

export default function Component() {
  // TypeScript infers type from loader!
  const { students } = useLoaderData<typeof loader>();
}
```

</details>

## Bonus Challenges

- Add spell directory route
- Implement search with URL query params
- Create detail pages for individual students
- Add meta tags for SEO
- Implement breadcrumb navigation

---

**Next Quest**: [Quest 2: Battle Records →](../quest-02-loaders-actions/)
