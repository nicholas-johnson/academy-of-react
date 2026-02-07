# Quest 3: Lazy Academy - Solution Notes

## Overview
Code splitting with React.lazy and Suspense. Components load on-demand, creating separate JavaScript chunks for better performance.

## Key Concepts

### React.lazy
```typescript
const Component = lazy(() => import('./Component'))
```

Dynamic import - Webpack/Vite automatically code-splits.

### Suspense Boundary
```typescript
<Suspense fallback={<Loading />}>
  {condition && <LazyComponent />}
</Suspense>
```

Shows fallback while lazy component loads.

### Import Path
```typescript
// Must use default export
export default function Component() { }

// Import with lazy
const Component = lazy(() => import('./Component'))
```

lazy only works with default exports.

### Multiple Lazy Components
```typescript
<Suspense fallback={<Loading />}>
  {tab === 'a' && <LazyA />}
  {tab === 'b' && <LazyB />}
</Suspense>
```

Single Suspense can wrap multiple lazy components.

## Build Output
```
dist/
  index.js (main bundle)
  SpellLibrary-abc123.js (lazy chunk)
  BattleArena-def456.js (lazy chunk)
  StudentRoster-ghi789.js (lazy chunk)
```

Vite automatically creates separate chunks.

## Real-World Use Cases
- Admin panels (lazy load admin routes)
- Dashboard widgets (load on-demand)
- Modal dialogs (lazy load heavy modals)
- Route-based splitting (most common)

## Testing
1. Open DevTools Network tab
2. Refresh page - only main bundle loads
3. Click Spells tab - watch new JS file download
4. Click Battle tab - another JS file downloads
5. Each lazy component is separate chunk!

## What's Next
Module 13 covers server-side rendering with Next.js, Remix, and Astro for ultimate performance.
