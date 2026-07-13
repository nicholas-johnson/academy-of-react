# Quest 3: Battle Dashboard with Tailwind CSS

## Story Context

The Wizarding War command center needs a responsive battle dashboard. Commanders need to see team stats, battle status, and resource levels at a glance. Tailwind's utility-first approach makes it easy to build responsive, consistent UIs quickly.

## Objective

Build a responsive `BattleDashboard` component using Tailwind CSS utility classes.

## Requirements

### Acceptance Criteria

- [ ] Configure Tailwind CSS in a Vite project
- [ ] Use utility classes for all styling (no custom CSS)
- [ ] Responsive layout (stacked on mobile, grid on desktop)
- [ ] Team stat cards with colored accents
- [ ] Progress bars for health/mana
- [ ] Hover and focus states
- [ ] Dark theme using Tailwind colors

### Layout

- Mobile: Single column stack
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

## Getting Started

```bash
cd starter
npm install
npm run dev
```

## Hints

1. Tailwind is already configured in the starter
2. Use responsive prefixes: `md:grid-cols-2 lg:grid-cols-3`
3. Common utilities:
   - Spacing: `p-4`, `m-2`, `gap-4`
   - Colors: `bg-blue-500`, `text-gray-100`
   - Flexbox: `flex`, `items-center`, `justify-between`
   - Grid: `grid`, `grid-cols-3`
   - Effects: `hover:bg-blue-600`, `transition-all`

## Example

```jsx
<div className="bg-slate-800 rounded-lg p-4 hover:bg-slate-700 transition-colors">
  <h2 className="text-xl font-bold text-white">Team Phoenix</h2>
  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
    <div
      className="bg-green-500 h-2 rounded-full"
      style={{ width: "75%" }}
    ></div>
  </div>
</div>
```

## Bonus Challenges

- Add animations with `animate-pulse` or `animate-bounce`
- Use `group` and `group-hover:` for parent-child hover effects
- Implement a dark/light mode toggle
