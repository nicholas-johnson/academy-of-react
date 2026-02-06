# Quest 3: Potion Cards - Solution Notes

## Key Concepts

### Component Composition

Multiple components working together:

```jsx
function PotionCard({ ingredients }) {
  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <Ingredient key={index} name={ingredient} />
      ))}
    </div>
  );
}

function Ingredient({ name }) {
  return <div>{name}</div>;
}
```

### Nested Mapping

Mapping over an array of objects, each containing an array:

```jsx
potions.map(potion => (
  <PotionCard key={potion.id}>
    {potion.ingredients.map((ingredient, index) => (
      <Ingredient key={index} name={ingredient} />
    ))}
  </PotionCard>
))
```

**Best Practice**: Use unique IDs for keys when available, fall back to index only for static lists.

## Module 2 Complete!

You now understand:
- ✅ JSX syntax vs createElement
- ✅ Reusable components
- ✅ Component composition
- ✅ Props and destructuring
- ✅ Mapping over arrays

**Next**: Module 3 explores props patterns in depth!






