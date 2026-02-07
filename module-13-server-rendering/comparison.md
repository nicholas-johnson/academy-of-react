# Module 13: Comparison Guide

## When to Choose Each Framework

### Next.js

**Best For:**

- E-commerce sites
- SaaS applications
- Dashboards and admin panels
- Hybrid static/dynamic apps
- When you need Vercel's ecosystem

**Pros:**

- Largest community
- Built by Vercel (hosting + framework)
- Server Components (cutting edge)
- Excellent developer experience
- Great documentation
- Incremental Static Regeneration

**Cons:**

- Vercel-centric (though works elsewhere)
- Complexity can be overwhelming
- Rapid API changes
- Large bundle size

**Learning Curve:** Medium to High

---

### Remix

**Best For:**

- Form-heavy applications
- Traditional web apps
- When progressive enhancement matters
- When you love web standards
- Multi-page applications

**Pros:**

- Web fundamentals focus
- Excellent form handling
- Progressive enhancement by default
- Nested routing is powerful
- Works without JavaScript
- Great for traditional web apps

**Cons:**

- Smaller community than Next.js
- Fewer UI libraries/examples
- Less marketing/buzz
- Learning curve for nested routes

**Learning Curve:** Medium

---

### Astro

**Best For:**

- Content-heavy sites
- Blogs and documentation
- Marketing pages
- Multi-framework projects
- When performance is critical

**Pros:**

- Fastest performance (minimal JS)
- Multi-framework support
- Content collections for Markdown
- Zero JavaScript by default
- Partial hydration (islands)
- Easy to learn

**Cons:**

- Less suitable for highly interactive apps
- Smaller ecosystem
- Server rendering is newer feature
- Not pure React (uses .astro files)

**Learning Curve:** Low to Medium

---

## Feature Comparison

| Feature                  | Next.js                    | Remix                | Astro         |
| ------------------------ | -------------------------- | -------------------- | ------------- |
| **Routing**              | File-based (App Router)    | File-based           | File-based    |
| **SSR**                  | Yes (Server Components)    | Yes (Loaders)        | Yes (opt-in)  |
| **SSG**                  | Yes (generateStaticParams) | Yes (loader headers) | Yes (default) |
| **Data Fetching**        | Server Components, fetch   | Loaders              | Props, fetch  |
| **Mutations**            | Server Actions             | Actions              | API Routes    |
| **Forms**                | Good (Server Actions)      | Excellent            | Basic         |
| **TypeScript**           | Excellent                  | Excellent            | Excellent     |
| **Learning Curve**       | Medium-High                | Medium               | Low-Medium    |
| **Performance**          | Good                       | Good                 | Excellent     |
| **Bundle Size**          | Large                      | Medium               | Minimal       |
| **Developer Experience** | Excellent                  | Great                | Great         |

---

## Code Comparison

### Routing a Page

**Next.js (App Router):**

```typescript
// app/students/[id]/page.tsx
export default async function StudentPage({ params }: { params: { id: string } }) {
  const student = await fetchStudent(params.id)
  return <div>{student.name}</div>
}
```

**Remix:**

```typescript
// app/routes/students.$id.tsx
export async function loader({ params }: LoaderFunctionArgs) {
  const student = await db.students.findById(params.id)
  return json({ student })
}

export default function StudentRoute() {
  const { student } = useLoaderData<typeof loader>()
  return <div>{student.name}</div>
}
```

**Astro:**

```astro
---
// src/pages/students/[id].astro
const { id } = Astro.params
const student = await fetchStudent(id)
---
<html><body><div>{student.name}</div></body></html>
```

---

### Handling Forms

**Next.js:**

```typescript
// app/actions.ts
'use server'
export async function createStudent(formData: FormData) {
  await db.students.create({ name: formData.get('name') })
  revalidatePath('/students')
}

// app/students/new/page.tsx
import { createStudent } from '../actions'
export default function NewStudent() {
  return <form action={createStudent}>
    <input name="name" />
    <button>Create</button>
  </form>
}
```

**Remix:**

```typescript
// app/routes/students.new.tsx
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  await db.students.create({ name: formData.get('name') })
  return redirect('/students')
}

export default function NewStudent() {
  return <Form method="post">
    <input name="name" />
    <button>Create</button>
  </Form>
}
```

**Astro:**

```astro
---
// src/pages/api/students.json.ts
export async function POST({ request }) {
  const data = await request.json()
  await db.students.create(data)
  return new Response(null, { status: 201 })
}
---

<!-- src/pages/students/new.astro -->
<form>
  <input name="name" />
  <button>Create</button>
</form>
<script>
  document.querySelector('form').onsubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    await fetch('/api/students.json', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(data))
    })
  }
</script>
```

---

## Recommendation by Use Case

### Building a Blog?

→ **Astro** (best performance, content-focused)

### Building a SaaS Dashboard?

→ **Next.js** (Server Components, great for complex apps)

### Building a Form-Heavy App?

→ **Remix** (best form handling, progressive enhancement)

### Building E-commerce?

→ **Next.js** (ISR, great community, lots of examples)

### Building Marketing Site?

→ **Astro** (fastest, zero JS by default)

### Building Admin Panel?

→ **Next.js** or **Remix** (both excellent)

### Learning First Framework?

→ **Astro** (easiest) or **Next.js** (most popular)

---

## Which Should You Learn?

### Learn Next.js If:

- You want the most job opportunities
- You're building complex, interactive apps
- You want cutting-edge features
- You don't mind complexity

### Learn Remix If:

- You love web standards
- You're building form-heavy apps
- You value progressive enhancement
- You want a simpler mental model

### Learn Astro If:

- You're building content sites
- Performance is top priority
- You want to use multiple frameworks
- You want the easiest learning curve

### Learn All Three?

They're more similar than different! Once you know one well, picking up the others is straightforward. The React fundamentals (Modules 1-12) apply to all of them.

---

## Conclusion

**There's no wrong choice!** All three are excellent frameworks that solve real problems. Choose based on your project needs, not hype.

**Start with what excites you**, and you can always learn the others later. The React knowledge from Modules 1-12 transfers completely.
