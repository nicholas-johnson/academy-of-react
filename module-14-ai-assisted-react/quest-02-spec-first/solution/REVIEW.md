# Review: familiar-output/

Reviewed against `SPEC.md`. Did not run this folder (it is not a package). Source review only, then verified the *solution* implementation in the browser.

## Keep

- `spells.ts` field names (`id`, `name`, `element`, `power`, `description`) match the spec’s data shape. Steal the data, not the architecture.

## Reject

1. **`'use client'`** in a Vite app. The spec forbids Next.js directives. This is inertia, not a choice.
2. **Detail is a page** (`SpellDetailPage`, `<a href="/spells">`). The spec asked for a dialog over the list. Filter state would die on navigation even if the link worked.
3. **Zustand store** (`store.ts`) for a filter one component needed. `package.json` does not even include Zustand. Global store for local UI is the familiar reaching for training data.
4. **`any`** on spells and list items. The `Spell` type already existed next door.
5. **Missing `key`s** on the list.
6. **Clickable `div`s** for filters. Spec: buttons.
7. **Fetch to `/api/spells`** that does not exist, then a silent fallback. No loading UI, no error UI, no empty UI.
8. **Fetch in `useEffect` with no ignore flag** — Quest 1’s race, again.
9. **`useSpellStore.getState().select` inside render/click** while also reading `selectedId` from the hook — mixed APIs, and selecting replaces the whole catalog with a page.

## Browser pass (solution app, not familiar-output)

- Loading: “Opening the archives…” showed, then the list.
- Fire filter: only Fireball. Arcane filter: empty dashed message.
- Open Fireball: dialog with name, element, description. Close and overlay click both return to the filtered list.
- Simulate error: alert “The archives are sealed.” Reload restores the list.
- Console: no key warnings.

## Verdict

Do not merge `familiar-output/`. Implement from the spec. The data file is the only reusable piece.
