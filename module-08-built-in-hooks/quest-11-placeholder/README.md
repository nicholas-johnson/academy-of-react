# Quest 11: Accessible Spell Form with useId

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"Accessibility matters," Professor Hooksweasel emphasizes. "useId generates unique, stable IDs for form elements that work even with server-side rendering."

## Objective

Build an accessible spell registration form that uses `useId` to generate unique IDs for proper label-input associations.

## Technical Concepts

- `useId` hook
- Accessible forms
- Label-input associations
- SSR-safe IDs

## Requirements

Create an accessible form:

1. **Multiple Inputs** — Name, element, and power inputs
2. **useId** — Generate unique IDs for each field
3. **Label Association** — htmlFor and id attributes match
4. **Multiple Instances** — Form works when rendered multiple times
5. **Accessibility** — Screen reader friendly

## Implementation Notes

- Call useId() for each form field
- Use ID for both htmlFor and id attributes
- IDs are stable across renders
- Safe for server-side rendering

## Acceptance Criteria

- [ ] useId generates unique IDs
- [ ] Labels properly associated with inputs
- [ ] Multiple form instances have unique IDs
- [ ] Screen reader accessible
- [ ] SSR-safe (no hydration mismatches)

## Solution

Check the `solution/` folder to see a complete implementation.
