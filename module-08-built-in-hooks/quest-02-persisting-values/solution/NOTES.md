# Quest 2: Animation Trigger - Solution Notes

## Overview

Trigger CSS animations imperatively using refs. Store array of refs for multiple elements. TypeScript ensures type safety.

## Key Concepts

### Array of Refs

```typescript
const spellRefs = useRef<(HTMLDivElement | null)[]>([]);
```

Store multiple element references in array.

### Callback Ref Pattern

```typescript
ref={(el) => (spellRefs.current[index] = el)}
```

Assigns element to array position when rendered.

### Imperative Animation Control

```typescript
element.classList.add(animationClass);
setTimeout(() => {
  element.classList.remove(animationClass);
}, 600);
```

Add class to start animation, remove after duration to reset.

### CSS Animations

```css
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}
.shake {
  animation: shake 0.5s ease;
}
```

Define animations in CSS, trigger via class.

## Why Refs Over State?

State change would re-render entire component. Refs allow surgical DOM updates without re-rendering.

## Testing

1. Click each spell card
2. Animation should play
3. Can click again after animation completes
4. No console errors

## What's Next

Quest 3 combines refs with media controls for video-like replay system.
