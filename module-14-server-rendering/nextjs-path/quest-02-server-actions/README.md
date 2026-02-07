# Quest 2: Battle Records (Server Actions)

## Story Context

⚔️ The Academy needs a permanent record of all battles fought during the Wizarding War! Build a battle history system where professors can add, update, and delete battle records. Use Server Actions to handle all mutations on the server.

## Objective

Build a Battle Records system with:
- Display battles (Server Component)
- Add new battles (Server Action)
- Update battle results (Server Action)
- Optimistic updates with `useOptimistic()`

## Technical Concepts

- Server Actions
- `'use server'` directive
- Form actions
- `revalidatePath()` / `revalidateTag()`
- `useOptimistic()` hook
- Error handling

## Requirements

### 1. Display Battles (Server Component)

Create `app/battles/page.tsx`:
- Fetch all battles
- Display as list/cards
- Show winner, date, participants

### 2. Add Battle Form (Server Action)

Create `app/battles/actions.ts`:
```tsx
'use server';

export async function createBattle(formData: FormData) {
  // Validate, create, revalidate
}
```

### 3. Delete Battle (Server Action)

Add delete functionality:
- Server Action for deletion
- Confirmation UI
- Revalidate after delete

### 4. Optimistic Updates

Use `useOptimistic()` for instant UI feedback:
```tsx
const [optimisticBattles, addOptimisticBattle] = useOptimistic(
  battles,
  (state, newBattle) => [...state, newBattle]
);
```

## Acceptance Criteria

✅ Battles page displays all battles (Server Component)  
✅ Form uses Server Action (no API route needed)  
✅ Creating battle shows optimistic update  
✅ `revalidatePath()` called after mutations  
✅ Delete functionality works with confirmation  
✅ Form validation and error messages  
✅ TypeScript types for Battle interface  

## TypeScript Interface

```tsx
interface Battle {
  id: string;
  winner: string;
  loser: string;
  date: Date;
  spellsUsed: number;
  duration: number; // minutes
}
```

## Hints

<details>
<summary>Hint 1: Server Action Structure</summary>

```tsx
// app/battles/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createBattle(formData: FormData) {
  const winner = formData.get('winner') as string;
  
  // Validate
  if (!winner) {
    return { error: 'Winner required' };
  }
  
  // Create in database
  await db.battles.create({ data: { winner } });
  
  // Revalidate to show new data
  revalidatePath('/battles');
  
  return { success: true };
}
```
</details>

<details>
<summary>Hint 2: Using Server Action in Form</summary>

```tsx
// app/battles/page.tsx
import { createBattle } from './actions';

<form action={createBattle}>
  <input name="winner" required />
  <button type="submit">Record Battle</button>
</form>
```
</details>

<details>
<summary>Hint 3: Optimistic Updates</summary>

```tsx
'use client';

import { useOptimistic } from 'react';

function BattleList({ battles }) {
  const [optimisticBattles, addOptimistic] = useOptimistic(
    battles,
    (state, newBattle) => [newBattle, ...state]
  );
  
  async function handleAdd(formData) {
    const newBattle = { /* ... */ };
    addOptimistic(newBattle); // Instant UI update
    await createBattle(formData); // Actual mutation
  }
  
  return (
    <form action={handleAdd}>
      {/* Form fields */}
    </form>
  );
}
```
</details>

## Bonus Challenges

- Add edit functionality with inline forms
- Implement pagination for battles
- Add filtering by winner/date
- Show battle statistics
- Add image uploads for battle scenes

---

**Previous Quest**: [Quest 1: Academy Portal ←](../quest-01-academy-portal/)  
**Next Quest**: [Quest 3: Deployment →](../quest-03-deployment/)






