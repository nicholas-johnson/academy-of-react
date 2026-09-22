# Quest 1: The Enchanted Scroll

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

The Headmaster needs a reusable enchanted scroll — a **Modal** that can show Academy Rules today, and any other message tomorrow. Your job is to build one wrapper component that can hold *anything*.

The notice board page is already wired: a button, some state, and a `<Modal>` waiting for you to bring it to life. You only edit `src/Modal.jsx`. CSS is provided.

## Objective

Build a `Modal` component that uses the `children` prop to wrap arbitrary content, plus a few named props for open/close behaviour.

## Technical Concepts

- The `children` prop
- Combining `children` with named props (`title`, `isOpen`, `onClose`)
- Conditional rendering
- Click events on an overlay (`stopPropagation`)

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). You'll see the notice board. The button does nothing useful until your Modal renders.

---

## Tasks

You only need to edit `src/Modal.jsx`. The page in `App.jsx` already passes `isOpen`, `onClose`, `title`, and children into `<Modal>`.

### Task 1: Render children

Make the Modal wrap whatever is placed between its tags. Put `{children}` inside a box using the classes `modal` and `modal-body`.

```jsx
function Modal({ children }) {
  return (
    <div className="modal">
      <div className="modal-body">{children}</div>
    </div>
  );
}
```

**You're done when:** The three Academy Rules appear on the page (the overlay comes later — for now the box can sit in the page flow).

---

### Task 2: Title and close button

The Modal also receives `title` and `onClose`. Add a header above the body:

```jsx
<div className="modal-header">
  <h3>{title}</h3>
  <button className="modal-close" onClick={onClose}>
    ×
  </button>
</div>
```

**You're done when:** You see "Academy Rules" in the header, and a × button is visible. The button will not hide the modal yet — that is Task 3.

---

### Task 3: Open, close, and overlay

Gate the whole thing on `isOpen`. Wrap the modal box in an overlay that closes when clicked. Stop the click from bubbling so clicking *inside* the box does not close it.

```jsx
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* header + body from Tasks 1 and 2 */}
      </div>
    </div>
  );
}
```

**You're done when:** The page starts with no modal. Clicking **View Academy Rules** opens the overlay. Clicking × or the dark overlay closes it. Clicking the rules text does not close it.

---

## Acceptance Criteria

- [ ] Modal renders `{children}` inside `.modal-body`
- [ ] Modal displays the `title` prop
- [ ] Close button calls `onClose`
- [ ] Modal returns `null` when `isOpen` is false
- [ ] Overlay click closes the modal
- [ ] Clicking inside the modal does not close it
- [ ] No console errors

## Hints

<details>
<summary>Click to reveal hints</summary>

**Hint 1:** `children` is whatever sits between `<Modal>` and `</Modal>` in `App.jsx`. You do not pass it as `children={...}` — React does that for you.

**Hint 2:** Named props (`title`, `isOpen`, `onClose`) and `children` work together. Destructure all of them: `function Modal({ isOpen, onClose, title, children })`.

**Hint 3:** `e.stopPropagation()` on the inner box prevents the overlay's `onClick={onClose}` from firing when you click the modal itself.

**Hint 4:** All class names (`modal-overlay`, `modal`, `modal-header`, `modal-close`, `modal-body`) already have styles in `App.css`. Match those names and the look is free.

</details>

## Bonus Challenge

Prove the wrapper is reusable: add a second button and a second `<Modal>` in `App.jsx` with completely different children — for example a spell confirmation with a paragraph and a **Cast it!** button. Same Modal component, different content.

---

**Back to Module**: [Module 7: The Children Prop](../)
