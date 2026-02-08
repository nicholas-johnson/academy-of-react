# Quest 2: Props Basics

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Academy needs a way to display wizard profiles! Create reusable components that accept data via props. This is how React components become truly reusable — the same component can display different data.

## Objective

Create child components that receive data via props and render it.

## Technical Concepts

- Function components
- Props (properties)
- Destructuring props
- Component reusability
- Rendering arrays with `.map()`

## Requirements

1. Create a `WizardCard` component that accepts props: `name`, `house`, `level`
2. Create a `Header` component that accepts props: `title`, `subtitle`
3. Use `.map()` to render a `WizardCard` for each wizard in the array
4. Pass the correct props to each component

## Starter Data

The starter includes this wizard array:

```javascript
const wizards = [
  { id: 1, name: "Elara Moonwhisper", house: "Wisdom", level: 42 },
  { id: 2, name: "Thorin Flameheart", house: "Valor", level: 38 },
  { id: 3, name: "Luna Shadowmere", house: "Mystery", level: 45 },
];
```

## Acceptance Criteria

- [ ] `WizardCard` component accepts and displays `name`, `house`, `level`
- [ ] `Header` component accepts and displays `title`, `subtitle`
- [ ] All 3 wizards are rendered using `.map()`
- [ ] Each `WizardCard` has a unique `key` prop
- [ ] No console errors

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: Destructure props in the function parameter:

```jsx
function WizardCard({ name, house, level }) {
  return (
    <div className="wizard-card">
      <h2>{name}</h2>
      <p>House: {house}</p>
      <p>Level: {level}</p>
    </div>
  );
}
```

**Hint 2**: Use the component with props:

```jsx
<WizardCard name="Elara" house="Wisdom" level={42} />
```

**Hint 3**: Map over the array:

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

**Hint 4**: Numbers need curly braces, strings can use quotes:

```jsx
<WizardCard name="Elara" level={42} />
```

</details>

## Bonus Challenge

1. Add a `specialty` field to the wizard data and display it
2. Create a `WizardList` component that contains the mapping logic
3. Add conditional styling based on the house name

---

**Next Quest**: [Quest 3: Component Lists](../quest-03-component-lists/)
