# Quest 1: House Badges with CSS Modules

## Story Context

Each house at the Academy needs distinctive badges for the upcoming Wizarding War. Your task is to create styled badge components using CSS Modules — ensuring each house's colors and styles are properly scoped and won't conflict.

## Objective

Build a `HouseBadge` component using CSS Modules that displays different styles for each of the four houses.

## Requirements

### Acceptance Criteria

- [ ] Create `HouseBadge.module.css` with scoped styles
- [ ] Import and use CSS Module classes in `HouseBadge.jsx`
- [ ] Support four house variants: Phoenix, Dragon, Griffin, Serpent
- [ ] Each house has unique colors (gradient background)
- [ ] Badges display house name and an icon/emoji
- [ ] Hover effect on badges (scale or glow)
- [ ] Active/selected state styling

### House Colors

- **Phoenix**: Orange/Red gradient (#f97316 → #dc2626)
- **Dragon**: Purple/Pink gradient (#a855f7 → #ec4899)
- **Griffin**: Yellow/Amber gradient (#eab308 → #f59e0b)
- **Serpent**: Green/Emerald gradient (#22c55e → #059669)

## Getting Started

```bash
cd starter
npm install
npm run dev
```

## Hints

1. CSS Module files must end in `.module.css`
2. Import creates an object: `import styles from './HouseBadge.module.css'`
3. Use template literals for multiple classes: `className={`${styles.badge} ${styles[house]}`}`
4. Class names in the CSS file become properties on the styles object

## Example Structure

```
starter/
├── src/
│   ├── HouseBadge.jsx       # Your component
│   ├── HouseBadge.module.css # Your styles
│   ├── App.jsx              # Demo app (provided)
│   └── ...
```

## Bonus Challenges

- Add a "selected" state that shows a checkmark or border
- Create a `BadgeGrid` component that displays all houses
- Add a subtle animation on mount
