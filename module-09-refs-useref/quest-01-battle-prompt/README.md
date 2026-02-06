# Quest 1: Battle Prompt

## Story

The Battle Command System needs instant input focus. When wizards enter combat, the spell input should auto-focus so they can react immediately!

## Your Mission

Build a battle command interface that:
- Auto-focuses the spell input when mounted
- Has a "Clear & Focus" button that clears input and refocuses
- Displays command history
- Uses refs for direct DOM manipulation

## Requirements

1. Input should auto-focus on component mount
2. "Clear & Focus" button clears text and refocuses
3. Submit spell names to command history (Enter key or button)
4. Display list of submitted spells below

## Learning Objectives

- Use `useRef` with TypeScript types
- Access DOM elements directly
- Call `.focus()` imperatively
- Understand when refs are better than state

## Starter Code

The starter includes basic structure. Add:
- Ref for input element
- useEffect to auto-focus on mount
- Clear & focus logic
- Command history state

## Hints

- Ref type: `useRef<HTMLInputElement>(null)`
- Access element: `inputRef.current?.focus()`
- Remember to check if ref is not null before using

---
[Solution](./solution/) | [Back to Module](../../)
