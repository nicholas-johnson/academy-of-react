# Quest 2: Battle Notifications - Solution Notes

## Overview
Toast notification system using Context API. Any component can trigger notifications. Notifications auto-dismiss after 5 seconds.

## Key Concepts

### Notification State in Context
```typescript
interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}
```

Store array of notifications with unique IDs.

### Adding Notifications
```typescript
const addNotification = (message: string, type: Notification['type']) => {
  const id = nextId
  setNextId(nextId + 1)
  setNotifications([...notifications, { id, message, type }])
  
  setTimeout(() => {
    removeNotification(id)
  }, 5000)
}
```

Generate unique ID, add to array, auto-remove after timeout.

### Fixed Position UI
```css
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
}
```

Notifications appear in top-right corner, stacking vertically.

### Union Types
```typescript
type: 'success' | 'error' | 'info'
```

TypeScript ensures only valid notification types.

## Real-World Use
This pattern is used by popular libraries like react-toastify, react-hot-toast. Context makes it accessible globally without passing callbacks through props.

## Testing
1. Click different action buttons
2. Multiple notifications should stack
3. Close button removes notification
4. Auto-dismiss after 5 seconds
5. Notifications slide in from right

## What's Next
Quest 3 implements authentication context with protected routes pattern.
