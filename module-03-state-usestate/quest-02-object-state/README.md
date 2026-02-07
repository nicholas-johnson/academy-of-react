# Quest 2: Potion Brewing

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Potionmaster needs a brewing interface! Students must select ingredients for their potions, see the calculated brewing time, and start the brewing process. This quest teaches you about **form inputs**, **controlled components**, and tracking multiple pieces of related state.

## Objective

Build a potion brewing interface where users can select ingredients using checkboxes, see the total brew time calculated, and toggle brewing status.

## Technical Concepts

- Controlled checkbox inputs
- Form state management
- Calculated/derived values
- onChange event handlers
- Conditional rendering based on state
- Working with arrays in state

## Requirements

Create a Vite React project with:

1. Proper Vite project structure (`src/`, `package.json`, `vite.config.js`)
2. Components that:

1. A list of 5+ ingredients, each with:
   - Name
   - Brew time contribution (in hours)
2. Checkboxes to select ingredients
3. Display selected ingredients
4. Calculate and display total brew time
5. A "Start Brewing" button
6. Show "Brewing..." message when active

## Example Ingredients

```javascript
const ingredients = [
  { name: "Moonflower", brewTime: 1 },
  { name: "Dragon Scale", brewTime: 3 },
  { name: "Phoenix Tear", brewTime: 2 },
  { name: "Starlight Essence", brewTime: 1 },
  { name: "Shadow Herb", brewTime: 2 }
];
```

## Acceptance Criteria

- [ ] 5+ ingredients available for selection
- [ ] Checkboxes control which ingredients are selected
- [ ] Selected ingredients tracked in state
- [ ] Total brew time calculated from selected ingredients
- [ ] Display list of currently selected ingredients
- [ ] "Start Brewing" button toggles brewing state
- [ ] Conditional message shows when brewing
- [ ] No console errors

## Hints

<details>
<summary>Click for hints</summary>

**Hint 1**: Track selected ingredients in state:
```jsx
const [selectedIngredients, setSelectedIngredients] = useState([]);
const [isBrewing, setIsBrewing] = useState(false);
```

**Hint 2**: Handle checkbox changes:
```jsx
const handleIngredientToggle = (ingredient) => {
  if (selectedIngredients.includes(ingredient.name)) {
    // Remove it
    setSelectedIngredients(
      selectedIngredients.filter(name => name !== ingredient.name)
    );
  } else {
    // Add it
    setSelectedIngredients([...selectedIngredients, ingredient.name]);
  }
};
```

**Hint 3**: Render checkboxes:
```jsx
{ingredients.map((ingredient, index) => (
  <div key={index}>
    <label>
      <input
        type="checkbox"
        checked={selectedIngredients.includes(ingredient.name)}
        onChange={() => handleIngredientToggle(ingredient)}
      />
      {ingredient.name} ({ingredient.brewTime}h)
    </label>
  </div>
))}
```

**Hint 4**: Calculate total brew time:
```jsx
const totalBrewTime = ingredients
  .filter(ing => selectedIngredients.includes(ing.name))
  .reduce((total, ing) => total + ing.brewTime, 0);
```

**Hint 5**: Conditional rendering for brewing:
```jsx
{isBrewing && (
  <div className="brewing-message">
    🧪 Brewing potion with {selectedIngredients.length} ingredients...
    <p>Time remaining: {totalBrewTime} hours</p>
  </div>
)}
```

</details>

## Bonus Challenge

Enhance your potion brewer:

1. **Ingredient Counter**: Show "X ingredients selected"

2. **Clear Selection**: Add a "Clear All" button

3. **Potion Effects**: Give each ingredient an effect, show combined effects:
   ```javascript
   const ingredients = [
     { name: "Moonflower", brewTime: 1, effect: "Healing" },
     { name: "Dragon Scale", brewTime: 3, effect: "Strength" },
     // ...
   ];
   ```

4. **Minimum Requirements**: Require at least 2 ingredients before brewing

5. **Brew Timer**: When brewing starts, count down from total brew time to 0 (requires setInterval/setTimeout - advanced!)

6. **Potion Quality**: Calculate quality based on ingredients:
   - 1-2 ingredients: Common
   - 3-4 ingredients: Rare
   - 5+ ingredients: Legendary

7. **Recipe Presets**: Add buttons for preset recipes:
   ```jsx
   const recipes = {
     "Healing Potion": ["Moonflower", "Phoenix Tear"],
     "Strength Tonic": ["Dragon Scale", "Shadow Herb"],
     // ...
   };
   ```

---

**Next Quest**: [Quest 3: Array State](../quest-03-array-state/)

