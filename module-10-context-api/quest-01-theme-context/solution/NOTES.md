# Quest 1: Theme Context - Solution Notes

## Overview

Theme context that manages light/dark mode across the entire app. Demonstrates the core Context API pattern with localStorage persistence.

## File Structure

```
src/
├── context/
│   └── ThemeContext.jsx       # Context, Provider, and useTheme hook
├── components/
│   ├── Header.jsx             # Theme toggle button
│   ├── Content.jsx            # Main content with stats
│   └── Footer.jsx             # Footer with theme info
└── App.jsx                    # Wraps app in ThemeProvider
```

## Key Concepts

### The 3-Part Context Pattern

```javascript
// 1. Create context
const ThemeContext = createContext(undefined);

// 2. Create provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  // ... state logic
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create custom hook for consuming context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
```

### Persistence with localStorage

```javascript
// Initialize from localStorage
const [theme, setTheme] = useState(() => {
  const saved = localStorage.getItem("theme");
  return saved || "light";
});

// Sync to localStorage
useEffect(() => {
  localStorage.setItem("theme", theme);
  document.body.className = theme;
}, [theme]);
```

### Why Custom Hook?

1. **Better errors** - Catch missing provider immediately
2. **Cleaner API** - `useTheme()` vs `useContext(ThemeContext)`
3. **Encapsulation** - Hide context implementation details
4. **Type safety** - In TypeScript, guarantees non-null return

### Component Usage

```javascript
// Import the custom hook
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
```

Any component can access theme without prop drilling.

## Testing

1. Toggle theme - should switch light/dark
2. Refresh page - theme should persist
3. Check body class changes
4. All components update without props
