# Side Quest: Watchlist

**A movie and TV show tracker** — Search, save, rate, and track what you're watching.

## What You'll Build

A fully functional watchlist app where you can:

- Search for movies and TV shows using the TMDB API
- Add items to your watchlist
- Track watch progress (Want to Watch → Watching → Completed)
- Rate and review what you've watched
- Filter and sort your collection

## API Setup

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).

1. Create a free account at https://www.themoviedb.org/signup
2. Go to Settings → API → Request an API Key
3. Copy your API key (v3 auth)

## Module Progression

### After Module 2: Basic Display

- Create a `MovieCard` component using JSX
- Display hardcoded movie data (title, poster, year, rating)
- Style the card with CSS

### After Module 3: State

- Add "Add to Watchlist" button with state
- Toggle between "Want to Watch" / "Watching" / "Completed"
- Track user ratings with star selection

### After Module 4: Forms

- Build a search form
- Filter watchlist by status
- Add notes/review form for movies

### After Module 5: Effects (useEffect)

- Fetch movies from TMDB API on search
- Debounce search input
- Persist watchlist to localStorage
- Load saved data on mount
- Multiple views: Search / Watchlist / Statistics

### After Module 6: Styling

- Style movie cards with CSS Modules or Styled Components
- Create star rating components with dynamic styling
- Build responsive grid layouts with Tailwind

### After Module 7: The Children Prop

- Create `MovieList`, `MovieCard`, and `Rating` components
- Pass movie data via props
- Use composition for card layouts

### After Module 8: React Router

- Route-based views for search and watchlist
- URL parameters for movie details

### After Module 9: Refs

- Auto-focus search input
- Scroll to newly added movie
- Video trailer modal (YouTube embed)

### After Module 10: Context

- Theme context (dark/light mode)
- User preferences (default sort, view mode)

### After Module 11: Custom Hooks

- `useMovieSearch(query)` — search with loading/error states
- `useWatchlist()` — CRUD operations for watchlist
- `useDebounce(value, delay)` — debounce search input

### After Module 12: Performance

- Memoize filtered/sorted lists
- Lazy load movie detail pages
- Virtualized list for large watchlists

### After Module 13: Server Rendering

- Server-rendered public "My Favorites" page
- SEO-friendly movie detail pages
- Shareable watchlist links

---

## Handling CORS with Vite Proxy

When calling external APIs from localhost, you may encounter CORS errors. Vite's built-in proxy solves this.

### The Problem

```
Access to fetch at 'https://api.themoviedb.org/3/search/movie'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

### The Solution: Vite Proxy

Configure `vite.config.ts` to proxy API requests through your dev server:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Requests to /api/* will be proxied to TMDB
      "/api/tmdb": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tmdb/, ""),
        // Optional: Add API key to all requests
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            const url = new URL(proxyReq.path, "https://api.themoviedb.org");
            url.searchParams.set(
              "api_key",
              process.env.VITE_TMDB_API_KEY || "",
            );
            proxyReq.path = url.pathname + url.search;
          });
        },
      },
    },
  },
});
```

### Usage in Your Code

```typescript
// Instead of calling TMDB directly:
// fetch('https://api.themoviedb.org/3/search/movie?query=...')

// Call your proxy:
const response = await fetch(`/api/tmdb/search/movie?query=${query}`);
const data = await response.json();
```

### Environment Variables

Create a `.env` file (don't commit this!):

```
VITE_TMDB_API_KEY=your_api_key_here
```

Access in code:

```typescript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

---

## Routes (Module 13+)

```
/                   → Home / Search
/search?q=...       → Search results
/movie/:id          → Movie details
/watchlist          → Your watchlist
/watchlist/:status  → Filtered by status
/stats              → Watch statistics
```

## Resources

- [TMDB API Docs](https://developers.themoviedb.org/3)
- [TMDB Image URLs](https://developers.themoviedb.org/3/getting-started/images)
- [Vite Proxy Config](https://vitejs.dev/config/server-options.html#server-proxy)
