# Quest 3: Creature Gallery - Solution Notes

## Overview
Select up to 5 creatures from gallery of 20+. Multiple filters (type, power, mana). Calculate team totals. Demonstrates complex state coordination with selection, filtering, and derived calculations.

## Key Concepts

### Array State for Selection
```javascript
const [selectedIds, setSelectedIds] = useState([])
```

Storing IDs instead of full objects is more efficient.

### Toggle Selection Logic
```javascript
const toggleCreature = (id) => {
  if (selectedIds.includes(id)) {
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
  } else if (selectedIds.length < 5) {
    setSelectedIds([...selectedIds, id])
  }
}
```

Add if not selected (and under limit), remove if already selected.

### Derived Calculations
```javascript
const selectedCreatures = CREATURES.filter(c => selectedIds.includes(c.id))
const totalPower = selectedCreatures.reduce((sum, c) => sum + c.power, 0)
```

Don't store totals in state - calculate from selection.

### Multiple Filter Combination
```javascript
const filtered = CREATURES.filter(creature => {
  return matchesType && matchesPower && matchesMana
})
```

All filters must pass (AND logic).

### Conditional Styling
```javascript
className={`creature-card ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
```

## Testing
1. Click creatures - should select/deselect
2. Select 5 creatures - others should disable
3. Filter by type - only matching creatures show
4. Adjust power slider - high-power creatures filter out
5. Check team totals calculate correctly

## What's Next
Module 9 introduces TypeScript and useRef for DOM interactions.
