# Side Quest: Data Lists & Tables

**A data management dashboard** — Build sortable tables, filterable lists, and paginated views for complex datasets.

## What You'll Build

A comprehensive data dashboard where you can:
- Display large datasets in sortable tables
- Filter data by multiple criteria
- Implement client-side pagination
- Handle dynamic sorting (ascending/descending)
- Build responsive data grids

## Story Context

House competitions at the Academy generate massive amounts of data — battle rankings, spell inventories, quest logs. Your mission is to build tools that help wizards make sense of it all.

## API Setup

This project uses **local JSON data** — no external API required! The data files are included in each quest's starter folder.

---

## Module Progression

### After Module 2: Basic Display
- Render a list of items using `.map()`
- Display student/spell data in a simple list
- Use the `key` prop correctly

### After Module 3: State
- Track sort direction in state
- Store filter values
- Implement basic toggle sorting

### After Module 4: Forms
- Build filter forms with controlled inputs
- Search box with live filtering
- Category dropdown filters

### After Module 5: Effects (useEffect)
- Load data on component mount
- Debounce search input
- Persist filter preferences to localStorage

### After Module 6: Styling
- Style tables with CSS Modules or Tailwind
- Add hover states and visual feedback
- Responsive table layouts

### After Module 7: The Children Prop
- Create reusable `Table`, `TableRow`, `Pagination` components
- Compose filter controls
- Build a generic `DataGrid` component

### After Module 9: React Router
- URL-based pagination (`/rankings?page=2`)
- Filter state in URL params
- Deep linking to specific views

### After Module 9: Refs
- Focus search input on page load
- Scroll to top on page change
- Table header sticky positioning

### After Module 10: Context
- Global filter preferences
- Sort settings context
- Theme-aware table styles

### After Module 11: Custom Hooks
- `useSortedData(data, sortKey)` — sorting logic
- `useFilteredData(data, filters)` — filtering logic
- `usePagination(data, pageSize)` — pagination state

### After Module 12: Performance
- Memoize sorted/filtered results
- Virtualized lists for 1000+ items
- Lazy load table sections

### After Module 13: Server Rendering
- Server-side sorting and pagination
- SEO-friendly data pages
- Export to PDF/CSV on server

---

## Included Quests

This side quest includes three standalone challenges:

### Quest 1: Battle Rankings (Sortable Table)
Build a sortable table of 20 students with columns for name, house, wins, losses, and points. Click column headers to sort ascending/descending.

### Quest 2: Spell Inventory (Filterable List)
Create a filterable spell collection. Filter by: element (fire, water, etc.), difficulty level, and search by name.

### Quest 3: Quest Pagination (Paginated List)
Display 50 quests with pagination. Show 10 per page with Previous/Next buttons and page numbers.

---

## Key Concepts

### The Key Prop
```jsx
// GOOD: Stable, unique identifier
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}

// BAD: Array index (causes bugs with reordering)
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}
```

### Derived State (Don't Store What You Can Calculate)
```jsx
// GOOD: Derive sorted data from state
const [sortKey, setSortKey] = useState('name');
const sortedData = [...data].sort((a, b) => 
  a[sortKey].localeCompare(b[sortKey])
);

// BAD: Storing sorted data separately
const [sortedData, setSortedData] = useState([]);
```

### Pagination Math
```jsx
const pageSize = 10;
const [page, setPage] = useState(1);

const totalPages = Math.ceil(data.length / pageSize);
const startIndex = (page - 1) * pageSize;
const pageData = data.slice(startIndex, startIndex + pageSize);
```

---

## Data Models

```typescript
interface Student {
  id: string;
  name: string;
  house: 'Phoenix' | 'Dragon' | 'Griffin' | 'Serpent';
  wins: number;
  losses: number;
  points: number;
}

interface Spell {
  id: string;
  name: string;
  element: 'fire' | 'water' | 'earth' | 'air' | 'arcane';
  difficulty: 1 | 2 | 3 | 4 | 5;
  manaCost: number;
  description: string;
}

interface Quest {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  reward: number;
  completed: boolean;
}
```

## Resources

- [React Lists and Keys](https://react.dev/learn/rendering-lists)
- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
