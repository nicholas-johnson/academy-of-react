# Quest 2: Props Basics - Solution Notes

## Overview

This solution demonstrates creating **reusable components** with props. Two child components (`WizardCard` and `Header`) receive data via props and render it.

## Key Concepts

### 1. Props Destructuring

```jsx
// Without destructuring:
function WizardCard(props) {
  return <div>{props.name}</div>;
}

// With destructuring (cleaner):
function WizardCard({ name, house, level }) {
  return <div>{name}</div>;
}
```

### 2. Passing Props

```jsx
<WizardCard name="Elara" house="Wisdom" level={42} />
```

- Strings use quotes: `name="Elara"`
- Numbers use curly braces: `level={42}`

### 3. Rendering Arrays with map()

```jsx
{
  wizards.map((wizard) => (
    <WizardCard
      key={wizard.id}
      name={wizard.name}
      house={wizard.house}
      level={wizard.level}
    />
  ));
}
```

### 4. The key Prop

When rendering lists, each item needs a unique `key`:

```jsx
<WizardCard key={wizard.id} ... />
```

React uses keys to efficiently update the DOM when the list changes.

## Component Structure

```
App
├── Header (title, subtitle)
└── wizard-list
    ├── WizardCard (wizard 1)
    ├── WizardCard (wizard 2)
    └── WizardCard (wizard 3)
```

## Common Mistakes

### Forgetting curly braces for numbers

```jsx
//  Wrong - level becomes the string "42"
<WizardCard level="42" />

//  Correct - level is the number 42
<WizardCard level={42} />
```

### Missing key prop

```jsx
//  Warning in console
{
  wizards.map((w) => <WizardCard name={w.name} />);
}

//  No warning
{
  wizards.map((w) => <WizardCard key={w.id} name={w.name} />);
}
```

## What's Next?

**Quest 3**: Component Lists - More complex list rendering patterns
**Module 3**: State with useState - Making components interactive
