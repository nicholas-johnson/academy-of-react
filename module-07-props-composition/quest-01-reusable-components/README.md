# Quest 1: Stat Display

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

Every wizard needs a personal stats dashboard! The Academy's Health Monitor requests a standardized way to display student stats. You must create individual `StatCard` components that can display any stat (health, mana, magic level, energy, etc.) with appropriate styling. These cards will be composed together to create complete student profiles.

## Objective

Create reusable `StatCard` components that receive stat information via props and display them. Show a complete wizard's stats using multiple StatCard components.

## Technical Concepts

- Creating focused, single-purpose components
- Passing specific props to components
- Using props for styling (colors)
- Component composition (multiple cards together)
- Inline styles or className based on props

## Requirements

Create a Vite React project with:

1. Proper Vite project structure (`src/`, `package.json`, `vite.config.js`)

1. A `StatCard` component that accepts props:
   - `label` - The stat name ("Health", "Mana", etc.)
   - `value` - The stat's current value
   - `color` - Optional color for the card (or use className)
2. A student object with at least these stats:
   - health
   - mana
   - magicLevel
3. Render 3 `StatCard` components showing all three stats
4. Style each card with different colors
5. Display the student's name above the stats

## Example Structure

```jsx
const student = {
  name: "Aria Spellweaver",
  health: 100,
  mana: 80,
  magicLevel: 45
};
```

## Acceptance Criteria

- [ ] StatCard component created
- [ ] Component accepts label, value, and color props
- [ ] Student object defined with 3+ stats
- [ ] Three StatCard components rendered
- [ ] Each card displays different stat
- [ ] Cards have different colors/styling
- [ ] Student name displayed prominently
- [ ] No console errors

## Hints

<details>
<summary>Click for hints</summary>

**Hint 1**: Basic StatCard component:
```jsx
function StatCard({ label, value, color }) {
  return (
    <div className="stat-card" style={{ backgroundColor: color }}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
```

**Hint 2**: Use the component multiple times:
```jsx
<StatCard label="Health" value={student.health} color="#ff6b6b" />
<StatCard label="Mana" value={student.mana} color="#4ecdc4" />
<StatCard label="Magic Level" value={student.magicLevel} color="#95e1d3" />
```

**Hint 3**: CSS Grid for layout:
```css
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
```

**Hint 4**: Style the cards nicely:
```css
.stat-card {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: white;
}
.stat-label {
  font-size: 12px;
  text-transform: uppercase;
}
.stat-value {
  font-size: 32px;
  font-weight: bold;
  margin-top: 10px;
}
```

**Hint 5**: You can use inline styles or CSS gradients:
```jsx
style={{ 
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
}}
```

</details>

## Bonus Challenge

Enhance your stat display:

1. **Max Values**: Add a `max` prop and show "50/100" format
   ```jsx
   <StatCard label="Health" value={80} max={100} />
   // Displays: 80/100
   ```

2. **Progress Bars**: Add a visual bar showing percentage
   ```jsx
   <div className="progress-bar">
     <div className="progress-fill" style={{ width: `${(value/max)*100}%` }} />
   </div>
   ```

3. **Icons**: Add emoji icons for each stat type
   - ❤️ Health
   - 💙 Mana
   - ⚡ Magic Level
   - 🔋 Energy

4. **Status Indicators**: Change color based on value
   - Green if > 70%
   - Yellow if 40-70%
   - Red if < 40%

5. **Tooltip/Description**: Add a small description of what each stat does

---

**Next Quest**: [Quest 2: Children Composition](../quest-02-children-composition/)

