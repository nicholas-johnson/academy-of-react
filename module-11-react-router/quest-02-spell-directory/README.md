# Quest 2: Spell Directory

Build a spell directory with dynamic routes. View spell lists and individual spell details using URL parameters.

## Requirements
- Create a spell list page at `/spells`
- Each spell links to its detail page `/spells/:id`
- Use `useParams` to read the spell ID from the URL
- Use `useNavigate` for programmatic navigation (back button)
- Handle invalid spell IDs gracefully

## Acceptance Criteria
- [ ] Spell list shows all spells as clickable cards
- [ ] Clicking a spell navigates to `/spells/1`, `/spells/2`, etc.
- [ ] Detail page reads ID from URL with useParams
- [ ] Detail page shows spell information
- [ ] Back button uses useNavigate to go back
- [ ] Invalid IDs show "Spell not found" message

## Hints
- Use `Link` to navigate from list to detail: `<Link to={`/spells/${spell.id}`}>`
- `useParams()` returns an object with URL parameters
- `useNavigate()` returns a function: `navigate(-1)` goes back
- Convert the ID string to number when finding the spell

[Next →](../quest-03-war-room/)
