# Quest 2: Battle Records (Actions)

## Story Context

⚔️ Build the Academy's battle record system with Remix! Professors need to add, update, and delete battles. The best part? It'll work even without JavaScript thanks to progressive enhancement!

## Objective

Build a Battle Records system with:
- Display battles with loader
- Add/edit/delete with actions
- Progressive enhancement (works without JS!)
- Pending states with `useNavigation()`

## Technical Concepts

- Route `action()` functions
- `<Form>` component
- `useActionData()` hook
- `useNavigation()` for pending states
- `useFetcher()` for non-navigation mutations
- Form validation
- Progressive enhancement

## Requirements

### 1. Display Battles (Loader)

Create `app/routes/battles._index.tsx`:
```tsx
export async function loader() {
  const battles = await db.battles.findMany();
  return json({ battles });
}

export default function BattlesIndex() {
  const { battles } = useLoaderData<typeof loader>();
  
  return (
    <div>
      <h1>Battle Records</h1>
      {battles.map(battle => (
        <BattleCard key={battle.id} battle={battle} />
      ))}
    </div>
  );
}
```

### 2. Add Battle (Action)

Create `app/routes/battles.new.tsx`:
```tsx
import { json, redirect } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';

export async function action({ request }) {
  const formData = await request.formData();
  const winner = formData.get('winner');
  
  // Validation
  if (!winner) {
    return json({ error: 'Winner required' }, { status: 400 });
  }
  
  // Create battle
  await db.battles.create({
    data: {
      winner: String(winner),
      loser: String(formData.get('loser')),
      date: new Date()
    }
  });
  
  // Redirect to list
  return redirect('/battles');
}

export default function NewBattle() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  
  return (
    <Form method="post">
      <div>
        <label>Winner</label>
        <input name="winner" required />
        {actionData?.error && <span>{actionData.error}</span>}
      </div>
      
      <div>
        <label>Loser</label>
        <input name="loser" required />
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Recording...' : 'Record Battle'}
      </button>
    </Form>
  );
}
```

### 3. Delete Battle (useFetcher)

Add delete button with `useFetcher`:
```tsx
import { useFetcher } from '@remix-run/react';

function BattleCard({ battle }) {
  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== 'idle';
  
  return (
    <div>
      <h3>{battle.winner} vs {battle.loser}</h3>
      
      <fetcher.Form method="post" action={`/battles/${battle.id}/delete`}>
        <button type="submit" disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </fetcher.Form>
    </div>
  );
}
```

### 4. Delete Action Route

Create `app/routes/battles.$id.delete.tsx`:
```tsx
export async function action({ params }) {
  await db.battles.delete({
    where: { id: params.id }
  });
  return redirect('/battles');
}
```

## Progressive Enhancement

The magic of Remix: **Forms work without JavaScript!**

```tsx
// This form works even if JS fails to load!
<Form method="post">
  <input name="winner" />
  <button>Submit</button>
</Form>

// vs standard form (requires JS)
<form onSubmit={handleSubmit}>
  <input value={winner} onChange={e => setWinner(e.target.value)} />
  <button>Submit</button>
</form>
```

## Acceptance Criteria

✅ Battles displayed using loader  
✅ New battle form uses action  
✅ Form validation with error messages  
✅ Pending states shown during submission  
✅ Delete functionality with useFetcher  
✅ Works without JavaScript enabled!  
✅ TypeScript types for Battle interface  
✅ Redirects after successful mutations  

## TypeScript Interface

```tsx
interface Battle {
  id: string;
  winner: string;
  loser: string;
  date: Date;
  spellsUsed?: number;
  duration?: number;
}
```

## Hints

<details>
<summary>Hint 1: Action with Multiple Operations</summary>

```tsx
export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  
  switch (intent) {
    case 'create':
      // Create logic
      break;
    case 'update':
      // Update logic
      break;
    default:
      throw new Response('Bad Request', { status: 400 });
  }
}
```
</details>

<details>
<summary>Hint 2: Form Validation Pattern</summary>

```tsx
export async function action({ request }) {
  const formData = await request.formData();
  const errors: Record<string, string> = {};
  
  const winner = formData.get('winner');
  if (!winner) errors.winner = 'Winner required';
  
  const loser = formData.get('loser');
  if (!loser) errors.loser = 'Loser required';
  
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }
  
  // Process valid data...
}
```
</details>

<details>
<summary>Hint 3: useFetcher for Background Mutations</summary>

```tsx
function Component() {
  const fetcher = useFetcher();
  
  return (
    <fetcher.Form method="post" action="/api/like">
      <input type="hidden" name="battleId" value={id} />
      <button type="submit">
        {fetcher.state === 'submitting' ? 'Liking...' : 'Like'}
      </button>
    </fetcher.Form>
  );
}
```
</details>

## Bonus Challenges

- Add edit functionality (inline or separate route)
- Implement optimistic UI with fetcher
- Add multiple actions to same route
- Create reusable form validation helper
- Add confirmation modal for deletes
- Implement undo functionality

---

**Previous Quest**: [Quest 1: Academy Portal ←](../quest-01-academy-portal/)  
**Next Quest**: [Quest 3: Production Deployment →](../quest-03-full-deployment/)






