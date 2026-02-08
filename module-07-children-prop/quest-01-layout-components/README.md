# Quest 1: Layout Components

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Academy's building is organized into distinct areas: the Grand Hall (header), the Library Corridor (sidebar), and the Main Chambers (content area). The Headmaster wants a consistent layout for all Academy applications. Your task: create reusable layout components using the `children` prop. This demonstrates the power of composition!

## Objective

Build a set of reusable components that use the `children` prop:

- **Card** — wraps any content with styling
- **Section** — groups content with a title
- **Modal** — displays content in a dialog
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

3. **Modal Component** — Dialog that wraps any content

   ```jsx
   <Modal isOpen={showModal} onClose={closeModal} title="Confirm">
     <p>Are you sure?</p>
   </Modal>
   ```

4. **Layout Component** — Page structure with header, sidebar, and main content
   ```jsx
   <Layout header={<NavBar />} sidebar={<Menu />}>
     <MainContent />
   </Layout>
   ```

## Acceptance Criteria

- [ ] Card component wraps any content
- [ ] Section component displays title + children
- [ ] Modal component shows/hides with children content
- [ ] Layout component has header, sidebar, main areas
- [ ] All components use the `children` prop
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

**Hint 3**: Modal component:

```jsx
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```

**Hint 4**: Layout with CSS Grid:

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

4. **Modal Animation**: Add fade-in/slide-in effect

---

**Back to Module**: [Module 7: The Children Prop](../)
