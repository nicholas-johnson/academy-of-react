# Quest 3: Production Portal (Remix)

## Story Context

 The Academy's Remix portal is ready for the world! Deploy a complete, production-ready application with authentication, session management, and professional hosting. Show the world what Remix can do!

## Objective

Build and deploy a complete Remix application with:

- Multiple routes with loaders and actions
- Session-based authentication
- Resource routes (API endpoints)
- Production deployment to Fly.io or Vercel

## Technical Concepts

- Complete Remix app structure
- Cookie sessions
- Protected routes
- Resource routes
- Production deployment
- Environment variables

## Requirements

### 1. Application Structure

```
app/
├── root.tsx                          # Root with global layout
├── routes/
│   ├── _index.tsx                    # Home
│   ├── login.tsx                     # Login with action
│   ├── logout.tsx                    # Logout action
│   ├── students.tsx                  # Layout
│   ├── students._index.tsx           # List
│   ├── students.$id.tsx              # Detail
│   ├── students.new.tsx              # Create form
│   ├── battles.tsx                   # Layout
│   ├── battles._index.tsx            # List
│   ├── battles.new.tsx               # Create form
│   ├── admin.tsx                     # Protected layout
│   ├── admin._index.tsx              # Admin dashboard
│   └── api.students.ts               # Resource route
├── sessions.ts                       # Session utilities
└── utils/
    └── auth.server.ts                # Auth helpers
```

### 2. Session Management

Create `app/sessions.ts`:

```tsx
import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
      secrets: [process.env.SESSION_SECRET!],
      secure: process.env.NODE_ENV === "production",
    },
  });
```

### 3. Authentication Helper

Create `app/utils/auth.server.ts`:

```tsx
import { redirect } from "@remix-run/node";
import { getSession } from "~/sessions";

export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("userId")) {
    throw redirect("/login");
  }

  return session.get("userId");
}
```

### 4. Login Route

Create `app/routes/login.tsx`:

```tsx
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getSession, commitSession } from "~/sessions";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate credentials
  const user = await validateLogin(email, password);

  if (!user) {
    return json({ error: "Invalid credentials" }, { status: 400 });
  }

  // Create session
  const session = await getSession();
  session.set("userId", user.id);

  return redirect("/admin", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      {actionData?.error && <p>{actionData.error}</p>}
      <button type="submit">Login</button>
    </Form>
  );
}
```

### 5. Protected Admin Layout

Create `app/routes/admin.tsx`:

```tsx
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/utils/auth.server";

export async function loader({ request }) {
  const userId = await requireAuth(request);
  const user = await getUser(userId);

  return json({ user });
}

export default function AdminLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <header>
        <h1>Admin Panel</h1>
        <p>Welcome, {user.name}!</p>
        <Form method="post" action="/logout">
          <button>Logout</button>
        </Form>
      </header>

      <Outlet />
    </div>
  );
}
```

### 6. Resource Route (API)

Create `app/routes/api.students.ts`:

```tsx
import { json } from "@remix-run/node";

export async function loader() {
  const students = await db.students.findMany();
  return json(students);
}

export async function action({ request }) {
  if (request.method === "POST") {
    const body = await request.json();
    const student = await db.students.create({ data: body });
    return json(student, { status: 201 });
  }

  return json({ error: "Method not allowed" }, { status: 405 });
}
```

## Deployment Options

### Option A: Deploy to Fly.io

1. Install Fly CLI:

```bash
brew install flyctl  # or: curl -L https://fly.io/install.sh | sh
```

2. Login and initialize:

```bash
fly auth login
fly launch
```

3. Set environment variables:

```bash
fly secrets set SESSION_SECRET=your-secret-here
fly secrets set DATABASE_URL=your-db-url
```

4. Deploy:

```bash
fly deploy
```

### Option B: Deploy to Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Set environment variables in Vercel dashboard

## Environment Variables

Create `.env`:

```
SESSION_SECRET="your-secret-key"
DATABASE_URL="your-database-url"
NODE_ENV="production"
```

## Acceptance Criteria

- Complete app with multiple routes
- Session-based authentication works
- Protected routes redirect to login
- Login/logout functionality
- Resource routes for API access
- Deployed to production (Fly.io or Vercel)
- Environment variables configured
- HTTPS enabled
- TypeScript throughout
- Error boundaries on all routes

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables set
- [ ] Build succeeds locally (`npm run build`)
- [ ] All TypeScript errors resolved
- [ ] Authentication flow tested
- [ ] Protected routes work
- [ ] Resource routes tested
- [ ] Deployed successfully
- [ ] Production URL works
- [ ] SSL/HTTPS enabled

## Hints

<details>
<summary>Hint 1: Logout Action</summary>

```tsx
// app/routes/logout.tsx
import { redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/sessions";

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export function loader() {
  return redirect("/");
}
```

</details>

<details>
<summary>Hint 2: Meta Tags for SEO</summary>

```tsx
export const meta: MetaFunction = () => {
  return [
    { title: "Arcane Academy - Student Portal" },
    { name: "description", content: "Browse our magical students" },
  ];
};
```

</details>

<details>
<summary>Hint 3: Root Error Boundary</summary>

```tsx
// app/root.tsx
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html>
      <head>
        <title>Oops!</title>
      </head>
      <body>
        <h1>Application Error</h1>
        <p>{error.message}</p>
      </body>
    </html>
  );
}
```

</details>

## Bonus Challenges

- Add rate limiting for API routes
- Implement password reset flow
- Add email verification
- Set up monitoring (Sentry, LogRocket)
- Add caching headers for static assets
- Implement CSRF protection
- Add two-factor authentication
- Set up CI/CD pipeline
- Add E2E tests with Playwright

## Resources

- [Remix Deployment Docs](https://remix.run/docs/en/main/guides/deployment)
- [Fly.io Documentation](https://fly.io/docs/)
- [Vercel Remix Guide](https://vercel.com/guides/remix)

---

**Congratulations!** You've completed the Remix path and deployed a production full-stack application!

**Want to compare?** Try the [Next.js Path](../../nextjs-path/) to see React Server Components, or explore [Astro Path](../../astro-path/) for Islands Architecture.

**Course Complete!** Return to the [main README](../../../README.md) to celebrate your journey!
