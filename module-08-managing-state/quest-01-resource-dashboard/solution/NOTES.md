# Quest 1: Resource Dashboard - Solution Notes

## Overview
Manage multiple resources (gold, mana crystals, potion supplies) and student army. Actions update multiple states simultaneously. Demonstrates coordinating related state variables.

## Key Concepts

### Multiple State Variables
```javascript
const [gold, setGold] = useState(500)
const [manaCrystals, setManaCrystals] = useState(10)
const [potionSupplies, setPotionSupplies] = useState(20)
const [students, setStudents] = useState(5)
const [studentPower, setStudentPower] = useState(50)
```

Each piece of state is independent but coordinated through actions.

### Coordinated State Updates
```javascript
const trainStudent = () => {
  if (gold >= 100) {
    setGold(gold - 100)         // Spend gold
    setStudents(students + 1)    // Add student
    setStudentPower(studentPower + 15) // Increase power
  }
}
```

One action updates multiple pieces of state.

### Validation Before Actions
```javascript
<button onClick={trainStudent} disabled={gold < 100}>
```

Disable buttons when insufficient resources.

## When to Use Multiple States

✅ **Multiple states when:**
- Values are independent
- Different update patterns
- Clear separation of concerns

❌ **Single state object when:**
- Values always update together
- Tightly coupled data
- Complex related updates

## Testing
1. Click "Gather Resources" - all resources should increase
2. Click "Train Student" - gold decreases, students and power increase
3. Spend all gold - Train Student button should disable
4. Brew potions until supplies run out - button should disable

## What's Next
Quest 2 teaches lifting state up for tab navigation - essential pattern for component communication.
