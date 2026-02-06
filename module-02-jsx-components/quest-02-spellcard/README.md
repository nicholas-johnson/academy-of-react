# Quest 2: SpellCard Component

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Academy's Spell Library is in chaos! Hundreds of spells are documented in old scrolls, but there's no consistent way to display them. The Librarian has requested a reusable `SpellCard` component that can display any spell's information in a beautiful, consistent format. This component will be used throughout the Academy's spell directory system.

## Objective

Create a reusable `SpellCard` component that receives spell information via props and displays it attractively.

## Technical Concepts

- Function components
- Props (properties)
- Accessing props in JSX
- Component reusability
- JSX styling with className

## Requirements

Create a Vite React project with:

1. Proper Vite project structure (`src/`, `package.json`, `vite.config.js`)
2. A `SpellCard` function component that accepts props:
   - `name` - The spell's name
   - `type` - fire, ice, lightning, or healing
   - `manaCost` - How much mana it costs to cast
   - `power` - The spell's power level
2. The component displays all four properties attractively
3. Create at least 3 different spells as data objects
4. Render 3+ `<SpellCard />` components with different props
5. Add CSS to make it visually appealing

## Example Data

```javascript
const spells = [
  {
    name: "Fireball",
    type: "fire",
    manaCost: 20,
    power: 35
  },
  {
    name: "Ice Shard",
    type: "ice",
    manaCost: 15,
    power: 28
  },
  {
    name: "Lightning Bolt",
    type: "lightning",
    manaCost: 25,
    power: 42
  }
];
```

## Acceptance Criteria

- [ ] SpellCard component defined as a function
- [ ] Component accepts all 4 required props
- [ ] All props are displayed in the component
- [ ] At least 3 SpellCard components rendered
- [ ] Each card shows different spell data
- [ ] CSS styling makes cards visually distinct
- [ ] No console errors

## Hints

<details>
<summary>Click for hints</summary>

**Hint 1**: Define a function component:
```jsx
function SpellCard(props) {
  return (
    <div className="spell-card">
      {/* Your JSX here */}
    </div>
  );
}
```

**Hint 2**: Access props with `props.propertyName`:
```jsx
<h3>{props.name}</h3>
<p>Type: {props.type}</p>
```

**Hint 3**: Use the component multiple times:
```jsx
<SpellCard name="Fireball" type="fire" manaCost={20} power={35} />
<SpellCard name="Ice Shard" type="ice" manaCost={15} power={28} />
```

**Hint 4**: Numbers in JSX need curly braces:
```jsx
<SpellCard manaCost={20} />  // ✅ Correct
<SpellCard manaCost="20" />  // ❌ This makes it a string
```

**Hint 5**: You can destructure props for cleaner code:
```jsx
function SpellCard({ name, type, manaCost, power }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{type}</p>
    </div>
  );
}
```

**Hint 6**: Add type-specific colors in CSS:
```css
.spell-card.fire { border-color: #ff4500; }
.spell-card.ice { border-color: #00bfff; }
.spell-card.lightning { border-color: #ffd700; }
```

Then use it:
```jsx
<div className={`spell-card ${props.type}`}>
```

</details>

## Bonus Challenge

Enhance your SpellCard:

1. **Type Icons**: Add emoji or text icons for each spell type
   - 🔥 Fire
   - ❄️ Ice
   - ⚡ Lightning
   - ✨ Healing

2. **Dynamic Colors**: Give each spell type a different background color using inline styles or className

3. **Power Bar**: Create a visual power indicator (bar or stars)

4. **Efficiency Rating**: Calculate and display mana efficiency:
   ```javascript
   const efficiency = (power / manaCost).toFixed(1);
   ```

5. **Array Rendering**: Store all spells in an array and use `.map()` to render them:
   ```jsx
   {spells.map((spell, index) => (
     <SpellCard 
       key={index}
       name={spell.name}
       type={spell.type}
       manaCost={spell.manaCost}
       power={spell.power}
     />
   ))}
   ```

---

**Next Quest**: [Quest 3: Potion Cards](../quest-03-potion-cards/)

