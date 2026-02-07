# Quest 4: Events and State Preview

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Academy's Battle Training simulator needs your help! Wizards must practice calculating spell damage before real combat. Create an interactive spell calculator where users can adjust parameters and see results update in real-time. This introduces **events** and **manual re-rendering** — essential patterns before you learn the `useState` hook in Module 3.

## Objective

Build an interactive spell calculator with JSX that responds to user input (clicks, sliders) and updates the display.

## Technical Concepts

- Event handlers in JSX (`onClick`, `onInput`)
- Handling user input events
- Manual re-rendering pattern
- Calculations based on user input
- Conditional styling

## Requirements

Create a Vite React project with:

1. A spell calculator that includes:
   - Spell type selection (fire, ice, lightning, etc.)
   - Sliders for wizard level and intelligence
   - Results panel showing calculated damage
2. Event handlers that respond to user interactions
3. A render function that updates the UI when values change
4. Clear visual feedback when values update

## Key Pattern: Manual Re-rendering

Before `useState` (Module 3), we manage state manually:

```jsx
// 1. Store data in module-level variables
let count = 0;

// 2. Create a render function
const render = () => {
  root.render(<App />);
};

// 3. Update state and call render() in event handlers
const handleClick = () => {
  count = count + 1;
  render();  // Re-render to show new value!
};
```

## Acceptance Criteria

- [ ] Spell type buttons work (clicking changes selected spell)
- [ ] Sliders update values in real-time
- [ ] Results display calculated values
- [ ] UI updates immediately when inputs change
- [ ] No console errors
- [ ] Clean JSX syntax (not createElement)

## Hints

<details>
<summary>Click for hints</summary>

**Hint 1**: Store state outside the component:
```jsx
let selectedSpell = 'fire';
let wizardLevel = 1;

const App = () => {
  return (
    <div>
      <p>Level: {wizardLevel}</p>
    </div>
  );
};
```

**Hint 2**: Create a render function:
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));

const render = () => {
  root.render(<App />);
};

render(); // Initial render
```

**Hint 3**: Handle click events:
```jsx
<button 
  onClick={() => {
    selectedSpell = 'ice';
    render();
  }}
>
  Ice
</button>
```

**Hint 4**: Handle slider input:
```jsx
<input
  type="range"
  min={1}
  max={50}
  defaultValue={wizardLevel}
  onInput={(e) => {
    wizardLevel = parseInt(e.target.value);
    render();
  }}
/>
```

**Hint 5**: Calculate derived values:
```jsx
const calculateDamage = () => {
  const spell = spellTypes[selectedSpell];
  return spell.basePower + (wizardLevel * 2);
};

// In your JSX:
<p>Damage: {calculateDamage()}</p>
```

</details>

## Bonus Challenge

Enhance your calculator:

1. **Combo Multiplier**: Add buttons for different combo levels (1x, 1.5x, 2x, 3x)

2. **Spell Comparison Table**: Show all spells with their stats in a table, highlighting the selected one

3. **Success Rate**: Calculate and display spell success rate based on wizard level

4. **Visual Feedback**: Add colors that change based on damage values (green for high, red for low)

---

**Congratulations!** You've completed Module 2!

**Next Module**: [Module 3: State with useState](../../module-03-state-usestate/) — Learn proper state management with the useState hook!
