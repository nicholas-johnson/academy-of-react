# Module 8: Built-in React Hooks

## Story Context

**Hook Mastery Begins!** Professor Hooksweasel provides a comprehensive tour of ALL 15 built-in React hooks. Each hook solves a specific problem, and understanding when to use which hook is the mark of a true React wizard.

"Master these hooks," she explains, "and you'll have the complete toolkit for building any React application."

## Learning Objectives

By the end of this module, you will:

- Understand ALL 15 built-in React hooks
- Know when to use each hook
- Choose the right hook for the job
- Combine hooks effectively

## Module Structure

This module contains **19 quests**:
- **Quests 1-15**: Simple, focused exercises covering each of the 15 built-in hooks
- **Quests 16-19**: Advanced exercises combining multiple hooks

## Quests 1-15: Individual Hook Focus

### Quest 01: useState
**Hook**: `useState`  
**Topic**: Spell counter with state management  
**Difficulty**: ⭐ Beginner

### Quest 02: useEffect
**Hook**: `useEffect`  
**Topic**: Mana regeneration with intervals and cleanup  
**Difficulty**: ⭐⭐ Intermediate

### Quest 03: useContext
**Hook**: `useContext`  
**Topic**: Theme switcher without prop drilling  
**Difficulty**: ⭐⭐ Intermediate

### Quest 04: useReducer
**Hook**: `useReducer`  
**Topic**: Simple spell list manager with actions  
**Difficulty**: ⭐⭐ Intermediate

### Quest 05: useCallback
**Hook**: `useCallback`  
**Topic**: Optimizing callbacks to prevent re-renders  
**Difficulty**: ⭐⭐⭐ Advanced

### Quest 06: useMemo
**Hook**: `useMemo`  
**Topic**: Expensive spell power calculations  
**Difficulty**: ⭐⭐⭐ Advanced

### Quest 07: useRef
**Hook**: `useRef`  
**Topic**: Focus management with DOM refs  
**Difficulty**: ⭐⭐ Intermediate

### Quest 08: useImperativeHandle
**Hook**: `useImperativeHandle`  
**Topic**: Custom component API with forwardRef  
**Difficulty**: ⭐⭐⭐ Advanced

### Quest 09: useLayoutEffect
**Hook**: `useLayoutEffect`  
**Topic**: Measuring element dimensions synchronously  
**Difficulty**: ⭐⭐⭐ Advanced

### Quest 10: useDebugValue
**Hook**: `useDebugValue`  
**Topic**: Custom hook debugging in DevTools  
**Difficulty**: ⭐⭐ Intermediate

### Quest 11: useId
**Hook**: `useId`  
**Topic**: Accessible form IDs for SSR  
**Difficulty**: ⭐⭐ Intermediate

### Quest 12: useTransition
**Hook**: `useTransition`  
**Topic**: Responsive search with non-urgent updates  
**Difficulty**: ⭐⭐⭐ Advanced

### Quest 13: useDeferredValue
**Hook**: `useDeferredValue`  
**Topic**: Smooth slider with deferred rendering  
**Difficulty**: ⭐⭐⭐ Advanced

### Quest 14: useSyncExternalStore
**Hook**: `useSyncExternalStore`  
**Topic**: Subscribing to external stores  
**Difficulty**: ⭐⭐⭐ Advanced

### Quest 15: useInsertionEffect
**Hook**: `useInsertionEffect`  
**Topic**: Dynamic style injection (CSS-in-JS)  
**Difficulty**: ⭐⭐⭐⭐ Expert

## Quests 16-19: Advanced Combinations

### Quest 16: useRef - DOM Access
**Hooks**: `useRef`  
**Topic**: Auto-focus input with DOM manipulation  
**Difficulty**: ⭐⭐ Intermediate

### Quest 17: useRef - Persistence
**Hooks**: `useRef`  
**Topic**: Tracking values without re-renders  
**Difficulty**: ⭐⭐ Intermediate

### Quest 18: useRef - Media Controls
**Hooks**: `useRef`  
**Topic**: Video playback controls with refs  
**Difficulty**: ⭐⭐⭐ Advanced

### Quest 19: useReducer - Advanced
**Hooks**: `useReducer`  
**Topic**: Complex spell inventory with multiple actions  
**Difficulty**: ⭐⭐⭐ Advanced

## Setup

All quests follow the same structure:

```bash
cd quest-XX-hookname/starter
npm install
npm run dev
```

## Slides

Introduction slides covering all built-in hooks:

```bash
cd slides
npm install
npm run dev
```

## Demo

The demo showcases multiple hooks working together:

```bash
cd demo
npm install
npm run dev
```

## Hook Reference

### State Hooks
| Hook | Quest | Purpose |
|------|-------|---------|
| `useState` | 01 | Local component state |
| `useReducer` | 04, 19 | Complex state with actions |

### Context Hooks
| Hook | Quest | Purpose |
|------|-------|---------|
| `useContext` | 03 | Access context values |

### Ref Hooks
| Hook | Quest | Purpose |
|------|-------|---------|
| `useRef` | 07, 16-18 | DOM access, mutable values |
| `useImperativeHandle` | 08 | Customize ref exposed to parent |

### Effect Hooks
| Hook | Quest | Purpose |
|------|-------|---------|
| `useEffect` | 02 | Side effects (timers, fetching) |
| `useLayoutEffect` | 09 | Synchronous effects (measurements) |
| `useInsertionEffect` | 15 | CSS-in-JS library use only |

### Performance Hooks
| Hook | Quest | Purpose |
|------|-------|---------|
| `useMemo` | 06 | Memoize expensive calculations |
| `useCallback` | 05 | Memoize functions |
| `useTransition` | 12 | Non-blocking UI updates |
| `useDeferredValue` | 13 | Defer non-urgent updates |

### Other Hooks
| Hook | Quest | Purpose |
|------|-------|---------|
| `useId` | 11 | Generate unique IDs (SSR-safe) |
| `useSyncExternalStore` | 14 | Subscribe to external stores |
| `useDebugValue` | 10 | Custom hook debugging |

## Key Takeaways

- React has 15 built-in hooks covering all use cases
- Most apps use 5-6 regularly: useState, useEffect, useRef, useContext, useMemo, useCallback
- Each hook has a specific purpose — use the right tool for the job
- Advanced hooks (useTransition, useDeferredValue) enable concurrent features
- Some hooks are rarely needed (useInsertionEffect, useImperativeHandle)

---

**Previous Module**: [Module 7: The Children Prop](../module-07-children-prop/)  
**Next Module**: [Module 9: Custom Hooks](../module-09-custom-hooks/)
