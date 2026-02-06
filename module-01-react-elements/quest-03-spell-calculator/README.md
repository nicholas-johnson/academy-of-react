# Quest 3: Spell Calculator

> **Quick Start:** A starter template is available in the `starter/` folder with all the setup ready. You can start coding right away, or build from scratch following the instructions below.

## Story Introduction

As wizards train, they need to know their chances of successfully casting spells. Spell success depends on the wizard's magic level — higher power means better success rates. Your task is to create a spell success calculator that takes a wizard's stats and determines their probability of casting spells of various difficulties.

This quest introduces **interactivity** — you'll add a button that, when clicked, calculates and displays the result.

## Objective

Create a function that calculates spell success rate based on a wizard's magicLevel, and display it with a button that triggers the calculation.

## Technical Concepts

- JavaScript functions
- Function parameters and return values
- Calculations and Math operations
- Event listeners (onclick)
- DOM manipulation (updating content)

## Requirements

Create an HTML file that:

1. Has a student object with name and magicLevel
2. Has a function `calculateSpellSuccess(magicLevel)` that:
   - Takes magicLevel as a parameter (0-100)
   - Returns a success percentage (you decide the formula!)
3. Initially displays the student's name and magic level
4. Has a button labeled "Calculate Spell Success"
5. When button is clicked, displays the success rate on the page

## Example Formula

Here are some ideas for calculating success rate:

**Simple**: Success rate = magicLevel (so 45 magic level = 45% success)

**Advanced**: Success rate = magicLevel + random bonus
```javascript
const successRate = magicLevel + Math.floor(Math.random() * 20);
```

**Realistic**: Different calculation based on magic level ranges
```javascript
function calculateSpellSuccess(magicLevel) {
  if (magicLevel < 20) return magicLevel * 0.5; // Beginners: reduced rate
  if (magicLevel < 50) return magicLevel * 0.8;
  if (magicLevel < 80) return magicLevel * 1.1;
  return Math.min(magicLevel * 1.2, 99); // Cap at 99%
}
```

## Acceptance Criteria

- [ ] Student object with magicLevel property exists
- [ ] Function calculateSpellSuccess() is defined
- [ ] Function takes magicLevel as parameter
- [ ] Function returns a calculated success rate
- [ ] Button exists with appropriate label
- [ ] Clicking button displays the calculated success rate
- [ ] Result is clearly visible on the page
- [ ] No console errors

## Hints

<details>
<summary>Click for hints</summary>

**Hint 1**: Define your function before creating elements:
```javascript
function calculateSpellSuccess(magicLevel) {
  // Your calculation here
  return magicLevel; // Replace with your formula
}
```

**Hint 2**: Create a button element with createElement:
```javascript
React.createElement(
  'button',
  { onclick: handleClick },
  'Calculate Spell Success'
)
```

**Hint 3**: The onclick handler needs to be a function. You can define it before:
```javascript
function handleClick() {
  const result = calculateSpellSuccess(student.magicLevel);
  console.log('Success rate:', result + '%');
  // TODO: Display on page instead of console
}
```

**Hint 4**: To update the page, you'll need to re-render. One approach:
```javascript
let resultText = ''; // Start empty

function handleClick() {
  const result = calculateSpellSuccess(student.magicLevel);
  resultText = `Spell Success Rate: ${result}%`;
  renderApp(); // Re-render everything
}

function renderApp() {
  const app = React.createElement(
    'div',
    null,
    // ... your elements ...
    React.createElement('button', { onclick: handleClick }, 'Calculate'),
    React.createElement('p', null, resultText) // Show result
  );
  root.render(app);
}

renderApp(); // Initial render
```

**Hint 5**: Make sure your formula returns a number, and consider:
- What happens if magicLevel is 0?
- Should success rate ever be over 100%?
- Should it ever be negative?

</details>

## Bonus Challenge

Enhance your calculator:

1. **Multiple Difficulties**: Show success rates for Easy, Medium, and Hard spells
   - Easy: Base calculation
   - Medium: Reduced by 20%
   - Hard: Reduced by 40%

2. **Visual Feedback**: Add colored styling based on success rate:
   - Green if > 70%
   - Yellow if 40-70%
   - Red if < 40%

3. **Compare Students**: Have 2 different students and show both their success rates

4. **Critical Success**: Add a small chance (5%?) of "Critical Success" (100% + bonus)

Example multi-difficulty calculation:
```javascript
function calculateAllRates(magicLevel) {
  const base = magicLevel * 0.8;
  return {
    easy: Math.min(base, 95),
    medium: Math.min(base * 0.8, 90),
    hard: Math.min(base * 0.6, 85)
  };
}
```

---

**Congratulations!** You've completed Module 1! 

**Next Module**: [Module 2: JSX and Components](../../module-02-jsx-components/) — Learn the modern JSX syntax that makes React much more readable!

