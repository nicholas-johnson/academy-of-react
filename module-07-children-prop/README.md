# Module 7: The Children Prop

You've been passing data to components through props — `name="Harry"`, `level={42}`, `spells={spellList}`. But what if you want to pass *other components* or arbitrary JSX into a component? What if you're building a Card that should wrap any content, or a Modal that can contain anything?

This is where the `children` prop comes in. It's React's mechanism for composition — building complex UIs by nesting components inside each other, just like you nest HTML elements.

## What Is children?

When you write JSX with opening and closing tags, everything between them becomes the `children` prop:

```jsx
<Card>
  <h2>Spell Info</h2>
  <p>Fireball: 40 damage</p>
</Card>
```

Inside the `Card` component, you receive this content as `children`:

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  )
}
```

The `<h2>` and `<p>` render wherever you place `{children}`. The Card doesn't know or care what's inside — it just provides the wrapper styling. This is fundamentally different from passing content as a named prop.

## Why Not Just Use Props?

Consider a Card component that takes its content as props:

```jsx
<Card title="Hello" body="Some text" />
```

What if you want a button inside? Or an image? Or a nested list? You'd need to keep adding props — `buttonText`, `imageUrl`, `listItems` — and the component becomes rigid and bloated.

With children, the Card is flexible from the start:

```jsx
<Card>
  <h2>Hello</h2>
  <p>Some text</p>
  <button>Click me</button>
  <img src="wizard.png" alt="A wizard" />
</Card>
```

Same Card component, completely different content. The Card handles structure and styling; the consumer decides what goes inside.

## Building Wrapper Components

The most common use of children is wrapper components that provide visual structure:

```jsx
function Section({ title, children }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="section-content">
        {children}
      </div>
    </section>
  )
}

// Usage
<Section title="Spell Inventory">
  <SpellList spells={mySpells} />
  <button onClick={addSpell}>Add New Spell</button>
</Section>
```

The Section component provides the heading and consistent spacing. The content is entirely up to the consumer.

## Combining children with Other Props

Children and named props work together naturally. A common pattern is a component that takes a few configuration props plus children for the main content:

```jsx
function Card({ variant = 'default', children }) {
  return (
    <div className={`card card-${variant}`}>
      {children}
    </div>
  )
}

<Card variant="outlined">
  <h3>Student Profile</h3>
  <p>House: Scarybird</p>
</Card>

<Card variant="elevated">
  <img src="spell.png" alt="" />
  <h3>Fireball</h3>
</Card>
```

## Layout Components with Multiple Slots

Sometimes a wrapper needs content in multiple specific places — a header, a sidebar, a footer. You can combine named props for specific slots with children for the main content:

```jsx
function PageLayout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <aside className="layout-sidebar">{sidebar}</aside>
      <main className="layout-main">{children}</main>
    </div>
  )
}

<PageLayout
  header={<NavBar />}
  sidebar={<Menu items={menuItems} />}
>
  <h1>Welcome to the Academy</h1>
  <p>Main content goes here...</p>
</PageLayout>
```

Named props (`header`, `sidebar`) handle specific slots. `children` handles the primary content area. This pattern lets you build sophisticated layouts without the parent component needing to know anything about the page structure.

## A Modal Example

Modals are a classic children use case — you want a reusable dialog that can contain anything:

```jsx
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="modal-body">
          {children}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

// Usage
<Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Confirm">
  <p>Are you sure you want to cast this spell?</p>
  <p>This action cannot be undone.</p>
  <button onClick={handleConfirm}>Yes, cast it!</button>
</Modal>
```

The Modal handles open/close behaviour, overlay, and positioning. The content is whatever the situation requires — a confirmation message, a form, or even a complex wizard flow.

## When to Use children vs Props

**Use children when:**
- The component wraps or decorates content
- You don't know what will be inside ahead of time
- Content is complex JSX (multiple elements, components, etc.)
- Maximum flexibility is needed

**Use named props when:**
- Content is simple (a string, a number)
- The component needs to transform or process the data
- The component controls *how* the content renders
- You have a fixed, predictable structure

Most wrapper and layout components use children. Most data-display components use props. Many components use both.

## Common Mistakes

**Forgetting to render children.** If you accept children but never put `{children}` in your JSX, nothing will appear. The content is passed but discarded.

**Putting children in self-closing tags.** `<Card />` has no children. You need `<Card>content here</Card>` with opening and closing tags.

**Overcomplicating with children when props would be simpler.** If a component always shows a title string and nothing else, just pass it as a `title` prop. Don't force consumers to write `<Card><h2>Title</h2></Card>` when `<Card title="Title" />` would do.

## Exercises

**Quest 1: Layout Components** — Build a set of reusable wrapper components: Card, Section, Modal, and a two-column Layout. Practice composition by assembling them into a complete page.

[Start Quest 1 →](./quest-01-layout-components/)

## Running the Code

```bash
cd demo
npm install
npm run dev
```

Slides cover the children concept with visual comparisons of props vs children:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 6: Side Effects with useEffect](../module-06-effects-useeffect/) | [Module 8: Built-in React Hooks →](../module-08-built-in-hooks/)
