# Quest 3: Production Portal (Astro Deployment)

## Story Context

 The Academy's knowledge base is ready for the world! Deploy a complete, production-optimized Astro site with View Transitions, image optimization, and professional hosting. Show the world how fast websites can be!

## Objective

Build and deploy a complete Astro site with:

- View Transitions for smooth navigation
- Optimized images
- SEO optimization
- Production deployment to Netlify/Vercel
- Lighthouse score 95+

## Technical Concepts

- View Transitions API
- Image optimization
- SEO best practices
- Deployment strategies
- Performance auditing

## Requirements

### 1. Complete Site Structure

Build a full Academy portal:

```
src/
├── pages/
│   ├── index.astro                # Home
│   ├── about.astro                # About Academy
│   ├── spells/
│   │   ├── index.astro            # Spell directory
│   │   ├── search.astro           # Search (with island)
│   │   └── [id].astro             # Spell details
│   ├── students/
│   │   ├── index.astro            # Student directory
│   │   └── [id].astro             # Student profile
│   ├── battles/
│   │   ├── index.astro            # Battle history
│   │   ├── simulator.astro        # Interactive (with island)
│   │   └── [id].astro             # Battle details
│   └── 404.astro                  # Custom 404
├── layouts/
│   └── Layout.astro               # Main layout
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   └── SEO.astro
├── islands/
│   ├── SearchBar.jsx
│   ├── BattleSimulator.jsx
│   └── ThemeToggle.jsx
└── content/
    ├── config.ts
    ├── spells/
    ├── students/
    └── battles/
```

### 2. View Transitions

Add smooth navigation with View Transitions:

```astro
---
// src/layouts/Layout.astro
import { ViewTransitions } from 'astro:transitions';
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <ViewTransitions />
    <title>{title}</title>
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

Control specific transitions:

```astro
<h1 transition:name="page-title">{title}</h1>
<img src={hero} transition:name="hero-image" />
```

### 3. Image Optimization

Use Astro's Image component:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- Automatically optimized! -->
<Image
  src={heroImage}
  alt="Arcane Academy"
  width={1200}
  height={600}
  quality="high"
  format="webp"
/>
```

### 4. SEO Component

Create `src/components/SEO.astro`:

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
}

const { title, description, image, article } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const socialImage = image || '/og-image.jpg';
---

<head>
  <!-- Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={article ? 'article' : 'website'} />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={new URL(socialImage, Astro.site)} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={canonicalURL} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={new URL(socialImage, Astro.site)} />
</head>
```

Use in pages:

```astro
---
import SEO from '../components/SEO.astro';
---

<SEO
  title="Arcane Academy - Spell Directory"
  description="Browse our complete collection of magical spells"
/>
```

### 5. Astro Config for Production

Update `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://arcane-academy.com",
  integrations: [react()],
  output: "static", // or 'hybrid' for SSR
  build: {
    inlineStylesheets: "auto",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
          },
        },
      },
    },
  },
});
```

## Deployment Options

### Option A: Deploy to Netlify

1. Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[plugins]]
  package = "@astrojs/netlify"
```

2. Deploy:

```bash
npm install --save-dev @astrojs/netlify
# Push to GitHub
# Connect repo in Netlify dashboard
```

### Option B: Deploy to Vercel

1. Install adapter:

```bash
npm install --save-dev @astrojs/vercel
```

2. Update config:

```js
// astro.config.mjs
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  output: "static",
  adapter: vercel(),
});
```

3. Deploy:

```bash
npm i -g vercel
vercel
```

### Option C: Deploy to Cloudflare Pages

```bash
npm run build
# Upload dist/ folder to Cloudflare Pages
```

## Performance Optimization Checklist

### Pre-Deployment

- [ ] All images use `<Image />` component
- [ ] Large images compressed (< 500KB each)
- [ ] ViewTransitions enabled
- [ ] Only necessary islands have `client:*`
- [ ] No unused dependencies
- [ ] CSS minified
- [ ] Build succeeds: `npm run build`

### Post-Deployment

- [ ] Run Lighthouse audit (aim for 95+)
- [ ] Check Core Web Vitals
- [ ] Verify all images load
- [ ] Test View Transitions
- [ ] Verify islands hydrate correctly
- [ ] Test on mobile devices

## Acceptance Criteria

**Deployment Checklist:**

- Complete portal with all pages
- View Transitions for smooth navigation
- Images optimized with Astro Image
- SEO meta tags on all pages
- Deployed to production hosting
- Custom 404 page
- Lighthouse score 95+
- Working navigation
- Islands hydrate correctly
- Fast load times (< 2s)

## Lighthouse Targets

| Metric         | Target | Why                          |
| -------------- | ------ | ---------------------------- |
| Performance    | 95-100 | Fast loads, optimized assets |
| Accessibility  | 95-100 | Proper HTML, ARIA labels     |
| Best Practices | 95-100 | HTTPS, no console errors     |
| SEO            | 95-100 | Meta tags, semantic HTML     |

## Hints

<details>
<summary>Hint 1: Custom 404 Page</summary>

```astro
---
// src/pages/404.astro
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Not Found">
  <div class="not-found">
    <h1>404 - Spell Not Found</h1>
    <p>This page has vanished into the void!</p>
    <a href="/">Return to Academy</a>
  </div>
</Layout>
```

</details>

<details>
<summary>Hint 2: Dynamic Sitemap</summary>

Install:

```bash
npm install @astrojs/sitemap
```

Configure:

```js
// astro.config.mjs
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://arcane-academy.com",
  integrations: [react(), sitemap()],
});
```

Generates sitemap.xml automatically!

</details>

<details>
<summary>Hint 3: RSS Feed</summary>

```js
// src/pages/rss.xml.js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const battles = await getCollection("battles");
  return rss({
    title: "Arcane Academy Battle Updates",
    description: "Latest battles from the Academy",
    site: context.site,
    items: battles.map((battle) => ({
      title: battle.data.title,
      pubDate: battle.data.date,
      link: `/battles/${battle.id}/`,
    })),
  });
}
```

</details>

## Performance Tips

1. **Minimize JS**: Only use islands when absolutely necessary
2. **Optimize Images**: Use WebP, compress, lazy load
3. **Inline Critical CSS**: Astro does this automatically
4. **Prefetch Links**: Use `<link rel="prefetch" />`
5. **CDN**: Use hosting with global CDN (Netlify/Vercel/Cloudflare)

## Bonus Challenges

- Add RSS feed for battle updates
- Implement automatic sitemap
- Add robots.txt
- Set up analytics (Vercel Analytics or similar)
- Add search functionality with Pagefind
- Implement internationalization (i18n)
- Add PWA support
- Set up staging environment
- Add E2E tests with Playwright
- Create custom OG images per page
- Add structured data (JSON-LD)

## Deployment Commands

```bash
# Build locally
npm run build

# Preview production build
npm run preview

# Deploy to Netlify
netlify deploy --prod

# Deploy to Vercel
vercel --prod

# Check bundle size
npm run build && ls -lh dist/
```

## Resources

- [Astro Deployment Docs](https://docs.astro.build/en/guides/deploy/)
- [View Transitions Guide](https://docs.astro.build/en/guides/view-transitions/)
- [Image Optimization](https://docs.astro.build/en/guides/images/)
- [Netlify Deployment](https://docs.netlify.com/frameworks/astro/)
- [Vercel Deployment](https://vercel.com/guides/deploying-astro-with-vercel)

---

**Congratulations!** You've completed the Astro path and deployed a lightning-fast website using Islands Architecture!

## Reflection Questions

1. How does the bundle size compare to a full React app?
2. When would you choose Astro vs Next.js?
3. What types of sites are perfect for Islands Architecture?
4. How did strategic hydration affect performance?

**Want to compare?** Review the [Next.js Path](../../nextjs-path/) and [Remix Path](../../remix-path/) to see different approaches.

**Course Complete!** Return to the [main README](../../../README.md) - you're now a Full-Stack React Wizard ready to build modern web applications!
