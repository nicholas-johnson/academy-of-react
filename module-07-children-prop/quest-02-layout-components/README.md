# Quest 2: Layout Components

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Academy's building is organized into distinct areas: the Grand Hall (header), the Library Corridor (sidebar), and the Main Chambers (content area). The Headmaster wants a consistent layout for all Academy applications. Your task: create reusable layout components using the `children` prop. This demonstrates the power of composition!

A finished **Modal** from Quest 1 is already provided in `src/components/Modal.jsx` and wired into the page. Click **Cast Spell** to see it. You do not need to rebuild it — reuse it while you assemble the rest of the dashboard.

## Objective

Build a set of reusable components that use the `children` prop:

- **Card** — wraps any content with styling
- **Section** — groups content with a title
- **Layout** — page structure with multiple slots

## Technical Concepts

- The `children` prop
- Component composition
- Wrapper/container components
- Slot patterns (named children)

## Requirements

Create a Vite React project with:

1. **Card Component** — Wraps content with card styling

   ```jsx
   <Card>
     <h3>Title</h3>
     <p>Any content!</p>
   </Card>
   ```

2. **Section Component** — Adds a title above content

   ```jsx
   <Section title="Student Info">
     <p>Content here...</p>
   </Section>
   ```

3. **Layout Component** — Page structure with header, sidebar, and main content
   ```jsx
   <Layout header={<NavBar />} sidebar={<Menu />}>
     <MainContent />
   </Layout>
   ```

Move the existing nav (logo + Cast Spell button) into the Layout `header` slot. Put a short menu in `sidebar`. Put Sections and Cards in the main `children` area. Leave the provided `<Modal>` in the tree — it already opens from the Cast Spell button.

## Acceptance Criteria

- [ ] Card component wraps any content
- [ ] Section component displays title + children
- [ ] Layout component has header, sidebar, main areas
- [ ] All three components use the `children` prop
- [ ] The provided Modal still opens from the Cast Spell button
- [ ] CSS creates clear visual structure
- [ ] No console errors

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1**: Card component structure:

```jsx
function Card({ children, variant = "default" }) {
  return <div className={`card card-${variant}`}>{children}</div>;
}
```

**Hint 2**: Section component:

```jsx
function Section({ title, children }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

**Hint 3**: Layout with named slots plus children:

```jsx
function Layout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <div className="layout-body">
        <aside className="layout-sidebar">{sidebar}</aside>
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
}
```

**Hint 4**: Layout with CSS Grid (optional — flex styles are already in `App.css`):

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}
```

</details>

## Bonus Challenge

1. **Card Variants**: Add `variant` prop (primary, secondary, outlined)

2. **Responsive Layout**: Collapse sidebar on mobile

   ```css
   @media (max-width: 768px) {
     .layout {
       grid-template-columns: 1fr;
     }
   }
   ```

3. **Nested Composition**: Put Cards inside Sections inside Layout

4. **Modal Animation**: The provided Modal already fades in. Tweak the animation in `App.css` if you want a different feel.

---

**Back to Module**: [Module 7: The Children Prop](../)
