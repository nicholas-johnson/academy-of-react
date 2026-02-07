# Module 2: JSX and Components

## Story Context

You've survived the arduous `createElement()` training, but Professor Hooksweasel has good news: "There's a better way!" The Academy has adopted JSX — a modern runic language that looks like HTML but is actually JavaScript. It's much easier to read and write, and it's what professional React wizards use in the real world.

## Learning Objectives

By the end of this module, you will:

- Set up and use Vite for React development
- Understand what JSX is and how it differs from createElement()
- Write JSX syntax to create React elements
- Create function components
- Pass and use props in components
- Transform createElement() code to JSX
- Work with a professional React development environment

## React Concepts Covered

- JSX syntax
- Function components
- Props (properties)
- Component composition
- Modern build tools (Vite)
- ES modules and imports

## JavaScript Concepts

- Template literals
- Destructuring assignment
- Arrow functions
- Function parameters

## Welcome to Vite! ⚡

Starting in Module 2, we're switching from CDN + Babel to **Vite**, a modern build tool that makes React development fast and enjoyable.

### Why the Switch?

In Module 1, you learned React basics using CDN links and directly opening HTML files. That's perfect for learning `createElement()`, but now that you're ready for JSX and real development, it's time to upgrade!

**Problems with CDN + Babel Standalone:**
- 🐌 Slow transformation (Babel Standalone isn't optimized)
- ❌ CORS errors when opening `file://` URLs
- 🚫 Not how professional React developers work
- 📦 Can't use npm packages or modern imports
- 🐛 Harder to debug

**Benefits of Vite:**
- ⚡ Lightning-fast Hot Module Replacement (HMR) - see changes in milliseconds!
- 🎯 Modern ES modules - proper imports and exports
- 📦 Access to the entire npm ecosystem
- 🔧 Optimized production builds
- 💪 Better error messages and debugging
- 🌐 No more CORS issues
- ✨ This is how React pros work!

### What is Vite?

Vite (French for "fast") is a modern build tool created by Evan You (creator of Vue.js). It's become the go-to choice for React development because:

1. **Dev Server**: Runs a local server (no more `file://` URLs!)
2. **Instant Updates**: HMR updates your browser as you type
3. **Fast Builds**: Uses esbuild for lightning-fast bundling
4. **Simple Config**: Just works out of the box

### Setup Instructions

**First time using Vite? Follow these steps:**

1. **Navigate to the demo folder:**
   ```bash
   cd module-02-jsx-components/demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This downloads React and Vite (only needed once per project)

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Vite will show a URL (usually `http://localhost:5173`)
   - Click it or copy/paste into your browser
   - You should see the demo running!

5. **Make changes:**
   - Edit files in the `src/` folder
   - Save your changes
   - Watch the browser update instantly! ✨

6. **Stop the server:**
   - Press `Ctrl+C` in the terminal when you're done

### Vite Project Structure

```
demo/
├── package.json       # Dependencies and npm scripts
├── vite.config.js     # Vite configuration (React plugin)
├── index.html         # Entry HTML (notice: in root, not src!)
└── src/
    ├── main.jsx       # Entry point - renders your App
    ├── App.jsx        # Your main component
    ├── App.css        # Component-specific styles
    └── index.css      # Global styles
```

**Key differences from CDN setup:**
- ✅ `index.html` is in the project root (not inside `src/`)
- ✅ No CDN script tags - React comes from npm
- ✅ `<script type="module">` tag points to `src/main.jsx`
- ✅ Use `import/export` statements instead of global variables
- ✅ Styles are imported in JavaScript files

### How Vite Works

1. **You edit** `src/App.jsx` and save
2. **Vite detects** the change instantly
3. **HMR updates** only that module in the browser
4. **You see** the result in milliseconds! ⚡

No page refresh, no losing state - just instant updates!

### Common Vite Commands

```bash
npm install          # Install dependencies (first time only)
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Troubleshooting

**Port already in use?**
- Another dev server might be running
- Check terminals or use `Ctrl+C` to stop other servers
- Vite will auto-assign a different port if 5173 is busy

**Module not found?**
- Run `npm install` to install dependencies
- Check your import paths are correct

**Changes not showing?**
- Check the terminal for errors
- Try stopping (`Ctrl+C`) and restarting (`npm run dev`)
- Clear browser cache or hard refresh (`Cmd+Shift+R` / `Ctrl+Shift+R`)

**Node.js not installed?**
- Download from [nodejs.org](https://nodejs.org)
- Restart your terminal after installing
- Verify with `node --version`

## Demo Walkthrough

The demo shows:

1. **Vite Project Setup** — Modern React development environment
2. **JSX Syntax** — Writing elements that look like HTML
3. **Function Components** — Creating reusable StudentCard component
4. **Props** — Passing data to components
5. **ES Module Imports** — Using modern JavaScript imports

Key differences from Module 1:

**React Code:**
```javascript
// Old way (createElement):
React.createElement('h1', null, 'Hello')

// New way (JSX):
<h1>Hello</h1>
```

**Project Setup:**
```javascript
// Module 1 (CDN):
<script crossorigin src="https://unpkg.com/react@18/..."></script>

// Module 2 (Vite):
import React from 'react'  // From npm packages!
```

Much easier to read and work with! JSX gets transformed to `createElement()` calls by Vite's build process.

## Important JSX Rules

1. **Single Parent**: JSX must have one parent element

   ```jsx
   // ❌ Wrong:
   <h1>Title</h1>
   <p>Text</p>

   // ✅ Correct:
   <div>
     <h1>Title</h1>
     <p>Text</p>
   </div>
   ```

2. **JavaScript Expressions**: Use curly braces `{}` for JavaScript

   ```jsx
   <h1>{student.name}</h1>
   <p>Power: {magicLevel * 2}</p>
   ```

3. **className not class**: Use `className` for CSS classes

   ```jsx
   <div className="student-card">
   ```

4. **Self-Closing Tags**: Tags without children must self-close
   ```jsx
   <img src="photo.jpg" />
   <br />
   ```

## Quests

### Quest 1: JSX Conversion

**Difficulty**: ⭐ Beginner

Convert your Module 1 createElement() code to JSX syntax.

[Start Quest →](./quest-01-jsx-conversion/)

### Quest 2: Props Basics

**Difficulty**: ⭐⭐ Beginner-Intermediate

Create a reusable SpellCard component that receives data via props.

[Start Quest →](./quest-02-props-basics/)

### Quest 3: Component Lists

**Difficulty**: ⭐⭐ Intermediate

Build a PotionCard component and render a list using `.map()` with keys.

[Start Quest →](./quest-03-component-lists/)

### Quest 4: Events and State Preview

**Difficulty**: ⭐⭐ Intermediate

Build an interactive spell calculator with event handlers and manual re-rendering.

[Start Quest →](./quest-04-events-state/)

## Bonus Mastery Challenge

**The Spell Comparison Tool**

Create a component called `SpellComparison` that:

- Takes two spells as props
- Displays them side-by-side
- Highlights which spell is more powerful
- Shows the mana cost difference
- Has a "Winner" indicator

This combines component creation, props, conditional rendering, and calculations!

## Key Takeaways

- **Vite** is the modern way to develop React apps (fast, professional, no CORS issues!)
- **JSX** looks like HTML but is actually JavaScript
- JSX is transformed to `createElement()` calls by the build process
- **Function components** return JSX
- **Props** let us pass data to components
- Use `{}` to embed JavaScript expressions in JSX
- JSX makes React code much more readable
- **Components** should start with a capital letter
- **npm** manages React and other dependencies
- **HMR** provides instant feedback as you code

---

**Previous Module**: [Module 1: React Elements](../module-01-react-elements/)

**Next Module**: [Module 3: State with useState](../module-03-state-usestate/)
