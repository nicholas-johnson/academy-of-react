# Instructor Notes: CSS Modules

## Key Teaching Points

### 1. How CSS Modules Work

- Files must end in `.module.css`
- Vite/Webpack transforms class names to unique hashes
- Import gives you an object mapping original names to hashed names

```jsx
import styles from "./Button.module.css";
// styles = { badge: "HouseBadge_badge_x7k2j", phoenix: "HouseBadge_phoenix_a3b4c", ... }
```

### 2. Combining Classes

Show multiple approaches:

```jsx
// Template literal (most common)
className={`${styles.badge} ${styles.phoenix}`}

// Array join
className={[styles.badge, styles.phoenix].join(' ')}

// Conditional
className={`${styles.badge} ${selected ? styles.selected : ''}`}

// With clsx/classnames library (optional)
className={clsx(styles.badge, styles.phoenix, { [styles.selected]: selected })}
```

### 3. Dynamic Class Selection

The house name needs to be converted to match CSS class names:

```jsx
// If CSS has .phoenix, .dragon, etc.
const houseClass = house.toLowerCase()
className={styles[houseClass]}
```

### 4. Global vs Local

By default, all classes are local. To use global:

```css
:global(.some-global-class) {
  /* This won't be hashed */
}
```

## Common Student Mistakes

1. **Forgetting .module.css extension** — Regular .css files won't scope
2. **Using string class names** — `className="styles.badge"` won't work
3. **Hyphenated class names** — Use `styles['my-class']` or camelCase

## Why This Approach?

- **Zero runtime** — Styles compiled at build time
- **Familiar CSS** — No new syntax to learn
- **Co-location** — Styles next to components
- **IDE support** — Full CSS autocomplete

## Demo Inspection

Have students inspect the DOM to see hashed class names:

- Open DevTools → Elements
- Note class names like `HouseBadge_badge_x7k2j`
- Explain this prevents collisions between components
