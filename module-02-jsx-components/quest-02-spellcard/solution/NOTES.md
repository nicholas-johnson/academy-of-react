# Quest 2: SpellCard Component - Solution Notes

## Overview

This solution demonstrates creating **reusable components** with JSX. The SpellCard component is used 8 times with different props, showing the power of component composition.

## Key Concepts

### 1. Reusable Components

```jsx
function SpellCard({ name, type, icon, power, manaCost, rarity, description }) {
  return (
    <div className="spell-card">
      <h3>{name}</h3>
      <p>{description}</p>
      {/* ... */}
    </div>
  );
}

// Use many times:
<SpellCard name="Fireball" type="fire" power={85} ... />
<SpellCard name="Ice Shield" type="ice" power={60} ... />
```

### 2. Props Destructuring

```jsx
// Without destructuring:
function SpellCard(props) {
  return <div>{props.name}</div>;
}

// With destructuring (cleaner):
function SpellCard({ name, type, power }) {
  return <div>{name}</div>;
}
```

### 3. Spread Operator for Props

```jsx
const spell = { name: "Fireball", type: "fire", power: 85 };

// Instead of:
<SpellCard name={spell.name} type={spell.type} power={spell.power} />

// Use spread:
<SpellCard {...spell} />
```

### 4. Array.from() for Rendering

```jsx
// Create 5 mana orbs:
Array.from({ length: 5 }).map((_, i) => (
  <span key={i} className="mana-orb">💠</span>
))
```

## Bonus Features

1. **Rarity System**: Common → Uncommon → Rare → Epic → Legendary
2. **Type Filtering**: Filter spells by elemental type
3. **Animated Hover**: Shine effect on hover
4. **Power Bar**: Visual representation of spell power
5. **Mana Orbs**: Visual mana cost indicator

## Common Patterns

### Mapping Over Data

```jsx
{spells.map(spell => (
  <SpellCard key={spell.id} {...spell} />
))}
```

**Always provide `key` prop** when mapping!

### Conditional Styling

```jsx
style={{
  ...(condition && {
    backgroundColor: color,
    color: 'white'
  })
}}
```

## What's Next?

**Module 3** will explore props in depth, including:
- Default props
- Props validation
- Children prop
- Component composition patterns






