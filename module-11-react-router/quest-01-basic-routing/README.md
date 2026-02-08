# Quest 1: Academy Navigation

Create a multi-page Academy portal with navigation between different sections. React Router gives you proper shareable URLs — users can bookmark pages, share links, and use browser back/forward buttons.

## Requirements

- Set up React Router with BrowserRouter
- Create routes for Home, Students, Spells, and About pages
- Add a navigation bar using NavLink with active styling
- Use a Layout component with Outlet for nested routes
- Handle 404 (not found) pages

## Acceptance Criteria

- [ ] BrowserRouter wraps the app in main.jsx
- [ ] Routes defined for all pages
- [ ] Navigation shows which page is active
- [ ] Clicking nav links changes the page without reload
- [ ] 404 page shows for unknown routes
- [ ] Each page has unique content

## Hints

- Wrap `<App />` with `<BrowserRouter>` in main.jsx
- Use `<NavLink>` with `className` callback for active styling
- The Layout component renders `<Outlet />` where child routes appear
- Use `path="*"` for the catch-all 404 route

[Next →](../quest-02-spell-directory/)
