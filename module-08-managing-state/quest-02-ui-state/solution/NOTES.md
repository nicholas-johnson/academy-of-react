# Quest 2: House Tabs - Solution Notes

## Overview
Tabbed interface showing 4 houses with students, points, and achievements. Parent component manages active tab state. Demonstrates lifting state up pattern.

## Key Concepts

### Tab State Management
```javascript
const [activeTab, setActiveTab] = useState('gryffin')
```

Parent component owns which tab is active.

### Dynamic Tab Rendering
```javascript
{Object.keys(HOUSES).map(houseKey => (
  <button
    onClick={() => setActiveHouse(houseKey)}
    className={activeHouse === houseKey ? 'active' : ''}
  >
    {HOUSES[houseKey].name}
  </button>
))}
```

### Conditional Content Display
```javascript
const house = HOUSES[activeHouse]
return <div>{house.name}</div>
```

Show different content based on active tab.

### Lifting State Up
State lives in parent (App), passed down to determine which content shows. This pattern is fundamental for component communication.

## Testing
1. Click each house tab - content should change
2. Active tab should have visual indicator
3. Points badge should show correct value for each house
4. Students and achievements should differ per house

## What's Next
Quest 3 combines multiple state management concepts - filters, selection, and derived calculations.
