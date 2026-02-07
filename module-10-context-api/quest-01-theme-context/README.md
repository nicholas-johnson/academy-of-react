# Quest 1: Theme Switcher

Create a ThemeContext for managing light/dark mode across the application. Theme should persist to localStorage.

## Requirements

- ThemeContext with current theme state
- ThemeProvider wraps the app
- useTheme custom hook for consuming context
- Toggle between light and dark themes
- Persist theme to localStorage
- Apply theme class to document body

## Acceptance Criteria

- [ ] Context stores current theme ('light' or 'dark')
- [ ] Toggle button switches themes
- [ ] Theme persists after page refresh
- [ ] Body class updates with theme
- [ ] Multiple components access theme without props
- [ ] Custom hook throws error if used outside provider

## Hints

- Initialize state with `useState(() => localStorage.getItem('theme') || 'light')`
- Use `useEffect` to sync theme to localStorage and body class
- Provide `{ theme, toggleTheme }` as context value

[Next →](../quest-02-multi-provider/)
