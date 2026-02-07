# Quest 2: Spell Cards with Styled Components

## Story Context
The Academy's spell library needs beautiful, interactive spell cards. Each spell belongs to an element (fire, water, earth, air, arcane) and the cards should dynamically change their appearance based on element and power level. Styled Components' prop-based styling is perfect for this!

## Objective
Build a `SpellCard` component using Styled Components that changes its appearance based on props.

## Requirements

### Acceptance Criteria
- [ ] Install and use `styled-components` library
- [ ] Create styled components with tagged template literals
- [ ] Dynamic colors based on `element` prop
- [ ] Power level indicator with dynamic width
- [ ] Hover effects with animations
- [ ] Theme support (optional bonus)

### Element Colors
- **fire**: #f97316 (orange)
- **water**: #3b82f6 (blue)
- **earth**: #84cc16 (lime)
- **air**: #a78bfa (violet)
- **arcane**: #ec4899 (pink)

## Getting Started
```bash
cd starter
npm install
npm run dev
```

## Hints
1. Create styled components: `const Card = styled.div`...``
2. Access props in styles: `${props => props.$element}`
3. Use `$` prefix for transient props (not passed to DOM)
4. Nest selectors like Sass: `&:hover { ... }`

## Example
```jsx
const Card = styled.div`
  background: ${props => props.$color || 'gray'};
  
  &:hover {
    transform: scale(1.05);
  }
`

<Card $color="blue">Content</Card>
```

## Bonus Challenges
- Add a `ThemeProvider` for light/dark modes
- Create a flip animation to reveal spell details
- Build a `SpellGrid` with staggered entrance animations
