# Quest 10: Custom useSpellPower Hook with useDebugValue

> **Quick Start:** A starter template is available in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story Introduction

"When creating custom hooks," Professor Hooksweasel says, "useDebugValue helps other wizards understand what your hook is doing in React DevTools."

## Objective

Create a custom `useSpellPower` hook that uses `useDebugValue` to display debug information in React DevTools.

## Technical Concepts

- `useDebugValue` hook
- Custom hooks
- React DevTools integration
- Debug labels

## Requirements

Create a custom hook with debugging:

1. **useSpellPower** — Custom hook to manage spell power
2. **Internal Logic** — Calculate power based on level
3. **useDebugValue** — Show current power in DevTools
4. **Format Function** — Optional formatter for debug value
5. **Component Usage** — Use the custom hook in a component

## Implementation Notes

- Create custom hook: function useSpellPower(level)
- Add useDebugValue inside the hook
- Optional: useDebugValue(value, formatter)
- Only visible in React DevTools, not production

## Acceptance Criteria

- [ ] Custom useSpellPower hook created
- [ ] useDebugValue added inside hook
- [ ] Debug value shows in React DevTools
- [ ] Formatter function (optional) provided
- [ ] Hook works correctly in component

## Solution

Check the `solution/` folder to see a complete implementation.

Note: You'll need React DevTools browser extension to see the debug value!
