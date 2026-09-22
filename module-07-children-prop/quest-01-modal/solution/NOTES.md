# Quest 1 Solution: The Enchanted Scroll

## Key Concepts Demonstrated

### 1. The children Prop

`children` is whatever sits between a component's opening and closing tags:

```jsx
<Modal title="Academy Rules">
  <p>1. No magic in the corridors</p> {/* this becomes children */}
  <p>2. Respect all magical creatures</p>
</Modal>
```

The Modal does not know or care what that content is. It just renders `{children}` in `.modal-body`.

### 2. Named Props vs children

| Prop | Role |
| ---- | ---- |
| `children` | The main content — arbitrary JSX |
| `title` | A simple string the Modal controls how to display |
| `isOpen` | Configuration — whether to render at all |
| `onClose` | A callback the Modal calls; the parent owns the state |

Use `children` for content you wrap. Use named props for data and behaviour the component needs to interpret.

### 3. Conditional Rendering

```jsx
if (!isOpen) return null;
```

When closed, the Modal renders nothing. The parent still has `<Modal>` in the tree; it just produces no DOM.

### 4. Why stopPropagation?

The overlay listens for clicks to close. Clicks on the inner box bubble up to the overlay unless you stop them:

```jsx
<div className="modal-overlay" onClick={onClose}>
  <div className="modal" onClick={(e) => e.stopPropagation()}>
```

Without `stopPropagation`, clicking a paragraph inside the modal would close it.

## Common Mistakes

1. **Forgetting `{children}`** — the rules text is passed in but never shown
2. **Self-closing `<Modal />`** — that has no children. You need opening and closing tags
3. **Skipping the overlay wrapper** — without `.modal-overlay`, the box sits in the page flow instead of covering the screen
