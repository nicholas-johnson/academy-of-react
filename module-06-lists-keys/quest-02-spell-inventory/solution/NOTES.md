# Quest 2: Spell Inventory - Solution Notes

## Overview
Multi-criteria filtering with type select and range sliders for power and mana cost. Demonstrates combining multiple filter conditions on a large dataset (30 spells).

## Key Concepts

### Multiple Filter Criteria
```javascript
const filtered = spells.filter(spell => {
  const matchesType = typeFilter === 'all' || spell.type === typeFilter
  const matchesPower = spell.power >= powerRange[0] && spell.power <= powerRange[1]
  const matchesMana = spell.manaCost >= manaRange[0] && spell.manaCost <= manaRange[1]
  return matchesType && matchesPower && matchesMana // ALL must be true
})
```

### Range State Management
```javascript
const [powerRange, setPowerRange] = useState([0, 100]) // [min, max]
```

### Range Input Control
```javascript
<input
  type="range"
  value={powerRange[0]}
  onChange={(e) => setPowerRange([+e.target.value, powerRange[1]])}
/>
```

Note the `+` operator converts string to number.

## Testing
1. Filter by type - should show only selected type
2. Adjust power slider - should filter by power range
3. Combine multiple filters - should require ALL criteria
4. Clear filters - should reset to show all

##What's Next
Quest 3 teaches pagination - essential for displaying large datasets efficiently.
