# Quest 3: Production Academy Portal

## Story Context

🌐 The Academy Portal is ready for the world! Your final task: Deploy a complete, production-ready Next.js application featuring multiple rendering strategies, protected routes, and professional hosting. This is your capstone project!

## Objective

Build and deploy a complete Academy Portal with:

- Multiple rendering strategies (SSG, ISR, Dynamic)
- Protected admin routes
- API routes for data
- Production deployment to Vercel

## Technical Concepts

- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- Dynamic rendering
- Route handlers (API routes)
- Middleware for authentication
- Deployment to Vercel

## Requirements

### 1. Multiple Rendering Strategies

**Static (SSG)**:

```tsx
// app/page.tsx - Home page (rarely changes)
export default async function Home() {
  return <HomePage />;
}
```

**ISR**:

```tsx
// app/students/page.tsx - Revalidate every hour
export const revalidate = 3600;

export default async function StudentsPage() {
  const students = await fetchStudents();
  return <StudentDirectory students={students} />;
}
```

**Dynamic**:

```tsx
// app/battles/page.tsx - Always fresh
export const dynamic = "force-dynamic";

export default async function BattlesPage() {
  const battles = await fetchBattles();
  return <BattleList battles={battles} />;
}
```

### 2. API Route Handlers

Create `app/api/students/route.ts`:

```tsx
import { NextResponse } from "next/server";

export async function GET() {
  const students = await db.students.findMany();
  return NextResponse.json(students);
}

export async function POST(request: Request) {
  const body = await request.json();
  const student = await db.students.create({ data: body });
  return NextResponse.json(student);
}
```

### 3. Protected Routes with Middleware

Create `middleware.ts`:

```tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
```

### 4. Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy!

## Application Structure

```
app/
├── page.tsx                    # Home (SSG)
├── students/
│   ├── page.tsx                # Directory (ISR)
│   └── [id]/
│       └── page.tsx            # Detail (SSG with params)
├── battles/
│   ├── page.tsx                # List (Dynamic)
│   └── [id]/
│       └── page.tsx            # Detail (Dynamic)
├── admin/
│   ├── layout.tsx              # Admin layout
│   ├── page.tsx                # Dashboard
│   └── battles/
│       └── page.tsx            # Admin battles
├── api/
│   ├── students/
│   │   └── route.ts            # GET, POST /api/students
│   └── battles/
│       └── route.ts            # GET, POST, DELETE /api/battles
└── login/
    └── page.tsx                # Login form
```

## Acceptance Criteria

- Home page uses Static Generation (SSG)
- Students page uses ISR (revalidates periodically)
- Battles page uses Dynamic rendering
- API routes handle CRUD operations
- Admin routes protected with middleware
- Deployed to Vercel with custom domain (optional)
- Environment variables configured
- Production build optimized
- TypeScript throughout
- Error boundaries in place

## Environment Variables

Create `.env.local`:

```
DATABASE_URL="your_database_url"
NEXT_PUBLIC_API_URL="your_api_url"
AUTH_SECRET="your_secret_key"
```

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables set in Vercel
- [ ] Build succeeds locally (`npm run build`)
- [ ] All TypeScript errors resolved
- [ ] Routes tested (SSG, ISR, Dynamic)
- [ ] Protected routes work correctly
- [ ] Deployed to Vercel successfully
- [ ] Production URL works
- [ ] (Optional) Custom domain configured

## Hints

<details>
<summary>Hint 1: Generating Static Params</summary>

```tsx
// For SSG with dynamic routes
export async function generateStaticParams() {
  const students = await fetchStudents();
  return students.map((s) => ({ id: s.id }));
}

export default async function StudentPage({ params }) {
  const student = await fetchStudent(params.id);
  return <StudentProfile student={student} />;
}
```

</details>

<details>
<summary>Hint 2: Route Handler with Multiple Methods</summary>

```tsx
// app/api/battles/route.ts
export async function GET() {
  const battles = await db.battles.findMany();
  return NextResponse.json(battles);
}

export async function POST(request: Request) {
  const body = await request.json();
  const battle = await db.battles.create({ data: body });
  return NextResponse.json(battle, { status: 201 });
}
```

</details>

<details>
<summary>Hint 3: Authentication in Middleware</summary>

```tsx
// middleware.ts
export function middleware(request: NextRequest) {
  const isAuthenticated = checkAuth(request);
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```

</details>

## Bonus Challenges

- Add search with query params (`/students?search=harry`)
- Implement caching with `fetch()` options
- Add loading skeletons for all pages
- Implement dark mode with cookies
- Set up preview mode for content
- Add analytics (Vercel Analytics)
- Configure custom domain
- Set up staging environment
- Add E2E tests with Playwright

## Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

---

**Congratulations!** You've completed the Next.js path and deployed a production React Server Components application!

**Want more?** Try the [Remix Path](../../remix-path/) or [Astro Path](../../astro-path/) to see different approaches to server rendering.

**Course Complete!** Return to the [main README](../../../README.md) to review your journey and explore next steps.
