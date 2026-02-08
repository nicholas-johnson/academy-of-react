# Quest 3: Potion Cards

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Academy's Potionmaster needs help! There are dozens of potions in the stores, each with different ingredients, effects, and brewing times. Create a `PotionCard` component to display potion information, then render a complete list of the Academy's potion inventory. This will help students quickly find the potions they need for their studies.

## Objective

Build a `PotionCard` component that displays potion information including multiple ingredients (an array), then render a list of at least 6 different potions.

## Technical Concepts

- Function components with multiple props
- Arrays as props
- Rendering arrays in JSX with .map()
- Key prop for list items
- Props destructuring

## Requirements

Create a Vite React project with:

1. Proper Vite project structure (`src/`, `package.json`, `vite.config.js`)
2. A `PotionCard` component that accepts props:
   - `name` - Potion name
   - `effect` - What the potion does
   - `ingredients` - Array of ingredient names
   - `brewTime` - Hours needed to brew
3. Display all information including the list of ingredients
4. Create an array of at least 6 different potions
5. Use `.map()` to render all PotionCards from the array
6. Each rendered item should have a `key` prop

## Example Data

```javascript
const potions = [
  {
    name: "Healing Elixir",
    effect: "Restores 50 health points",
    ingredients: ["Moonflower", "Crystal Water", "Phoenix Tear"],
    brewTime: 2,
  },
  {
    name: "Mana Potion",
    effect: "Restores 30 mana points",
    ingredients: ["Starlight Essence", "Blue Sage", "Spring Water"],
    brewTime: 1,
  },
  {
    name: "Strength Tonic",
    effect: "Increases magic power by 20% for 1 hour",
    ingredients: ["Dragon Scale", "Iron Root", "Fire Blossom", "Honey"],
    brewTime: 4,
  },
  {
    name: "Invisibility Brew",
    effect: "Makes drinker invisible for 10 minutes",
    ingredients: ["Shadow Herb", "Moonstone Dust", "Ghost Mushroom"],
    brewTime: 3,
  },
  {
    name: "Antidote",
    effect: "Cures poison and disease",
    ingredients: ["Healing Herb", "Silver Leaf", "Clean Water"],
    brewTime: 1,
  },
  {
    name: "Wisdom Draft",
    effect: "Enhances mental clarity for studying",
    ingredients: ["Sage", "Ginkgo Leaf", "Honey", "Lavender"],
    brewTime: 2,
  },
];
```

## Acceptance Criteria

- [ ] PotionCard component created with all 4 props
- [ ] Ingredients array is displayed (all items shown)
- [ ] Array of 6+ potions defined
- [ ] .map() used to render potion cards
- [ ] Each rendered card has a unique `key` prop
- [ ] All potion information displays correctly
- [ ] Styled with CSS
- [ ] No console errors or warnings

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: Destructure props for cleaner code:

```jsx
function PotionCard({ name, effect, ingredients, brewTime }) {
  return (
    <div className="potion-card">
      <h3>{name}</h3>
      <p>{effect}</p>
      {/* Display ingredients and brewTime */}
    </div>
  );
}
```

**Hint 2**: Render an array of strings (ingredients):

```jsx
<ul>
  {ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ))}
</ul>
```

**Hint 3**: Render the potions array:

```jsx
{
  potions.map((potion, index) => (
    <PotionCard
      key={index}
      name={potion.name}
      effect={potion.effect}
      ingredients={potion.ingredients}
      brewTime={potion.brewTime}
    />
  ));
}
```

**Hint 4**: You can also spread the object properties:

```jsx
{
  potions.map((potion, index) => <PotionCard key={index} {...potion} />);
}
```

**Hint 5**: Style ingredient lists:

```css
.ingredients {
  list-style: none;
  padding: 0;
}
.ingredients li {
  display: inline-block;
  background: #e8f4f8;
  padding: 4px 8px;
  margin: 4px;
  border-radius: 12px;
  font-size: 12px;
}
```

</details>

## Bonus Challenge

Enhance your potion inventory:

1. **Brew Time Indicator**: Show visual indicators (⏱️) based on brew time
   - 1 hour: ⏱️
   - 2-3 hours: ⏱️⏱️
   - 4+ hours: ⏱️⏱️⏱️

2. **Ingredient Count**: Display "X ingredients" above the list

3. **Filtering**: Add buttons to filter by brew time:
   - Quick (1 hour)
   - Medium (2-3 hours)
   - Long (4+ hours)

   Hint: Use a state variable and filter the array before mapping

4. **Color-Coded Effects**: Give different color backgrounds based on effect type:
   - Healing/Health: Green
   - Mana: Blue
   - Buff/Enhancement: Gold
   - Other: Purple

5. **Search Function**: Add a text input that filters potions by name

6. **Sort Options**: Add buttons to sort by:
   - Name (alphabetical)
   - Brew time (shortest first)
   - Ingredient count

---

**Congratulations!** You've completed Module 2!

**Next Module**: [Module 3: State with useState](../../module-03-state-usestate/) — Learn how to make your components interactive with state!
