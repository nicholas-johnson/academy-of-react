# Quest 3: Quest Pagination - Solution Notes

## Overview
Display 50 quests with 8 per page, implementing pagination controls with Previous/Next buttons and direct page number navigation.

## Key Concepts

### Pagination Math
```javascript
const totalPages = Math.ceil(totalItems / itemsPerPage)
const startIndex = (currentPage - 1) * itemsPerPage  
const endIndex = startIndex + itemsPerPage
const currentPageItems = allItems.slice(startIndex, endIndex)
```

### Boundary Checking
```javascript
const nextPage = () => setCurrentPage(Math.min(currentPage + 1, totalPages))
const prevPage = () => setCurrentPage(Math.max(currentPage - 1, 1))
```

### Page Number Buttons
```javascript
const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
pageNumbers.map(page => <button onClick={() => goToPage(page)}>{page}</button>)
```

## Testing
1. Navigate through all pages with Next/Previous
2. Click specific page numbers
3. Verify disabled states at first/last pages
4. Check page info displays correctly

## What's Next
Module 7 teaches useEffect for side effects like data fetching and timers.
