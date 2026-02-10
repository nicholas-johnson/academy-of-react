# Quest 8: Custom Spell Input with useImperativeHandle

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"When building reusable components," Professor Hooksweasel explains, "useImperativeHandle lets you customize what the parent can access via refs."

## Objective

Build a custom spell input component that exposes specific methods to the parent using `useImperativeHandle`.

## Technical Concepts

- `useImperativeHandle` hook
- `forwardRef`
- Custom ref APIs
- Encapsulation

## Requirements

Create a custom input component:

1. **SpellInput Component** — Custom input with internal logic
2. **forwardRef** — Allow parent to pass ref
3. **useImperativeHandle** — Expose focus() and clear() methods
4. **Parent Controls** — Buttons to focus and clear from parent
5. **Encapsulation** — Hide internal implementation details

## Implementation Notes

- Wrap component in forwardRef
- Use useImperativeHandle(ref, () => ({...}))
- Expose only specific methods
- Parent calls methods via ref.current.methodName()

## Acceptance Criteria

- [ ] Component wrapped in forwardRef
- [ ] useImperativeHandle defines custom ref API
- [ ] Parent can call focus() method
- [ ] Parent can call clear() method
- [ ] Internal state remains encapsulated

## Solution

Check the `solution/` folder to see a complete implementation.
