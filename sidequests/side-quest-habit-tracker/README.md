# Side Quest: Habit Tracker

**A daily habit tracker** — Build good habits with streaks, check-ins, and progress visualization.

## What You'll Build

A satisfying habit tracking app where you can:
- Create habits with custom schedules (daily, weekdays, specific days)
- Check off completed habits each day
- Track streaks and see your best runs
- View completion statistics and trends
- Celebrate milestones with animations

## API Setup

This project uses **localStorage** for persistence — no external API required!

For notifications, you can optionally use the browser's Notification API.

---

## Module Progression

### After Module 2: Basic Display
- Create a `HabitCard` component using JSX
- Display habit name, streak count, and check button
- Show today's completion status

### After Module 3: State
- Toggle habit completion for today
- Track current streak
- Add simple habit creation

### After Module 4: Props & Composition
- Create `HabitList`, `HabitCard`, `StreakBadge` components
- Pass habit data via props
- Compose daily view with header and list

### After Module 5: Forms
- Full habit creation form
- Name, icon/emoji, color, frequency
- Edit and delete habits

### After Module 6: Lists & Keys
- Render habits with proper keys
- Sort by: streak, name, completion status
- Filter by: completed today, category, frequency

### After Module 7: Effects
- Persist habits and history to localStorage
- Calculate streaks on date change
- Auto-reset daily completions at midnight
- Optional: Browser notifications for reminders
- Multiple views: Today / All Habits / Statistics

### After Module 8: React Router
- Route-based views for calendar and statistics
- URL parameters for specific dates

### After Module 9: Refs
- Confetti animation on milestone streaks
- Haptic-style feedback animations
- Scroll to current day in calendar

### After Module 10: Context
- Theme context (dark/light mode)
- First day of week preference (Sun/Mon)
- Notification settings

### After Module 11: Custom Hooks
- `useHabits()` — CRUD operations for habits
- `useStreak(habitId)` — calculate current and best streak
- `useCompletionRate(habitId, range)` — completion percentage

### After Module 12: Performance
- Memoize streak calculations
- Lazy load statistics/calendar views
- Optimize re-renders on check-in

### After Module 13: Server Rendering
- Public accountability page
- Shareable streak achievements
- Printable habit reports

---

## Handling CORS with Vite Proxy

If you add a backend for syncing across devices, use Vite's proxy.

### Vite Proxy Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

### Why Proxy?

During development:
- Your React app runs on `localhost:5173`
- Your API might run on `localhost:3001`
- Browsers block cross-origin requests by default (CORS)
- The proxy makes API calls appear same-origin

```typescript
// This request:
fetch('/api/habits')

// Gets proxied to:
// http://localhost:3001/api/habits

// Browser sees it as same-origin, no CORS error!
```

---

## Data Model

```typescript
interface Habit {
  id: string
  name: string
  icon: string        // Emoji or icon name
  color: string       // Hex color
  frequency: Frequency
  createdAt: string   // ISO date
  archivedAt?: string
}

type Frequency = 
  | { type: 'daily' }
  | { type: 'weekdays' }  // Mon-Fri
  | { type: 'weekly'; days: number[] }  // 0=Sun, 1=Mon, etc.

interface Completion {
  habitId: string
  date: string  // YYYY-MM-DD
  completedAt: string  // ISO timestamp
}

// Derived (calculated, not stored)
interface HabitStats {
  currentStreak: number
  bestStreak: number
  totalCompletions: number
  completionRate: number  // 0-1
}
```

## Streak Calculation Logic

```typescript
function calculateStreak(completions: string[], frequency: Frequency): number {
  // Sort dates descending
  const sorted = [...completions].sort().reverse()
  
  let streak = 0
  let checkDate = new Date()
  
  for (const date of sorted) {
    // Check if this date should count based on frequency
    if (!shouldTrackDate(checkDate, frequency)) {
      checkDate = subtractDay(checkDate)
      continue
    }
    
    if (formatDate(checkDate) === date) {
      streak++
      checkDate = subtractDay(checkDate)
    } else {
      break // Streak broken
    }
  }
  
  return streak
}
```

## Routes (Module 13+)

```
/                → Today's habits
/habits          → All habits (manage)
/habits/new      → Create habit
/habits/:id      → Habit detail/history
/calendar        → Calendar view
/stats           → Statistics dashboard
/settings        → Preferences
```

## Fun Features to Add

- 🎉 Confetti on 7-day, 30-day, 100-day streaks
- 🔥 Streak freeze (skip a day without losing streak)
- 🏆 Achievement badges
- 📊 Heatmap calendar (like GitHub contributions)
- 🔔 Daily reminder notifications

## Resources

- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for celebrations
- [date-fns](https://date-fns.org/) for date manipulation
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) for reminders
