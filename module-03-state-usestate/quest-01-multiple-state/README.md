# Quest 1: Training System

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

Your wizard must train to grow stronger! Create a training interface where wizards can perform different activities that affect their stats. Training increases magic level but decreases energy. Resting restores energy. Casting spells costs mana but grants experience. All of this requires **state** to track the changing values!

## Objective

Create an interactive wizard training system with multiple stats tracked in state and buttons that update those stats.

## Technical Concepts

- Multiple useState calls
- Event handlers (onClick)
- State updates based on calculations
- Displaying state in UI
- Button interactions

## Requirements

Create a Vite React project with:

1. Proper Vite project structure (`src/`, `package.json`, `vite.config.js`)
2. Components that:

3. A wizard with at least 3 stats in state:
   - `magicLevel` (starts around 20-50)
   - `energy` (starts at 100)
   - `mana` (starts at 80-100)
4. Three buttons:
   - **Train**: Increases magicLevel by 5, decreases energy by 20
   - **Rest**: Increases energy by 30 (max 100)
   - **Cast Spell**: Decreases mana by 15, increases magicLevel by 2
5. Display all three stats clearly
6. Stats should update when buttons are clicked
7. Optional: Prevent actions if stat would go negative

## Example Starting State

```jsx
const [magicLevel, setMagicLevel] = useState(25);
const [energy, setEnergy] = useState(100);
const [mana, setMana] = useState(80);
```

## Acceptance Criteria

- [ ] Three state variables created with useState
- [ ] All stats displayed on the page
- [ ] Three buttons that trigger state updates
- [ ] Train button: +5 magic, -20 energy
- [ ] Rest button: +30 energy
- [ ] Cast Spell button: -15 mana, +2 magic
- [ ] UI updates when buttons clicked
- [ ] No console errors

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: Declare multiple state variables:

```jsx
const { useState } = React;

function WizardTraining() {
  const [magicLevel, setMagicLevel] = useState(25);
  const [energy, setEnergy] = useState(100);
  const [mana, setMana] = useState(80);

  // Your component JSX here
}
```

**Hint 2**: Create handler functions:

```jsx
const handleTrain = () => {
  setMagicLevel(magicLevel + 5);
  setEnergy(energy - 20);
};

const handleRest = () => {
  setEnergy(energy + 30);
};

const handleCastSpell = () => {
  setMana(mana - 15);
  setMagicLevel(magicLevel + 2);
};
```

**Hint 3**: Connect handlers to buttons:

```jsx
<button onClick={handleTrain}>Train</button>
<button onClick={handleRest}>Rest</button>
<button onClick={handleCastSpell}>Cast Spell</button>
```

**Hint 4**: Display stats:

```jsx
<div>
  <p>Magic Level: {magicLevel}</p>
  <p>Energy: {energy}</p>
  <p>Mana: {mana}</p>
</div>
```

**Hint 5**: Prevent negative values:

```jsx
const handleTrain = () => {
  if (energy >= 20) {
    setMagicLevel(magicLevel + 5);
    setEnergy(energy - 20);
  }
};
```

Or cap maximum values:

```jsx
const handleRest = () => {
  setEnergy(Math.min(energy + 30, 100));
};
```

</details>

## Bonus Challenge

Enhance the training system:

1. **Visual Feedback**: Add colored progress bars for each stat

2. **Disable Buttons**: Disable buttons when stat requirements aren't met

   ```jsx
   <button onClick={handleTrain} disabled={energy < 20}>
     Train
   </button>
   ```

3. **Experience Points**: Add an XP stat that tracks total training

4. **Level Up System**: When magicLevel reaches certain thresholds (50, 75, 100), show a "Level Up!" message

5. **Cooldowns**: Add a timer that prevents spamming buttons (advanced - requires intervals)

6. **Multiple Spells**: Add buttons for different spells with different costs/benefits:
   - Fireball: -25 mana, +3 magic
   - Heal: -20 mana, +40 energy
   - Meditate: -0 mana, +10 mana

---

**Next Quest**: [Quest 2: Object State](../quest-02-object-state/)
