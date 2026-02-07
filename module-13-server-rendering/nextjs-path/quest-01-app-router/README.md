# Quest 1: Academy Portal (Server Components)

## Story Context

🎉 The war is over, and the Academy wants to share its knowledge with the world! Your first task: Build a public-facing portal where anyone can browse our student directory and spell catalog. Use Next.js Server Components to fetch data directly on the server.

## Objective

Build an Academy Portal with:

- Server Components for data fetching
- Client Components for search/filter
- Streaming with Suspense
- Loading and error states

## Technical Concepts

- Next.js App Router
- async Server Components
- `'use client'` directive
- Suspense boundaries
- Loading states

## Requirements

### 1. Student Directory (Server Component)

Create `app/students/page.tsx`:

- Fetch students from API or mock data
- Display as cards/list
- Make it an async Server Component

### 2. Search Bar (Client Component)

Create `components/SearchBar.tsx`:

- Mark with `'use client'`
- Accept students as prop
- Filter based on search input
- Show filtered results

### 3. Streaming with Suspense

- Wrap slow-loading sections in Suspense
- Create loading components
- Show progressive content

### 4. Error Handling

Create `app/students/error.tsx`:

- Catch and display errors
- Provide retry button

## Acceptance Criteria

✅ Students page fetches data with async Server Component  
✅ Search component is marked `'use client'`  
✅ Search filters students without page reload  
✅ Suspense shows loading state for slow data  
✅ Error boundary catches and displays errors  
✅ TypeScript types for Student interface

## Hints

<details>
<summary>Hint 1: Server Component Structure</summary>

```tsx
// app/students/page.tsx
async function StudentsPage() {
  const students = await fetchStudents();
  return <StudentList students={students} />;
}
```

</details>

<details>
<summary>Hint 2: Client Component Pattern</summary>

```tsx
// components/SearchBar.tsx
"use client";

import { useState } from "react";

export function SearchBar({ students }) {
  const [search, setSearch] = useState("");
  // Filter logic...
}
```

</details>

<details>
<summary>Hint 3: Suspense Pattern</summary>

```tsx
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>
```

</details>

## Bonus Challenges

- Add spell directory page
- Implement sorting (name, house, power level)
- Add detail pages for individual students
- Implement parallel data fetching

---

**Next Quest**: [Quest 2: Battle Records →](../quest-02-server-actions/)
