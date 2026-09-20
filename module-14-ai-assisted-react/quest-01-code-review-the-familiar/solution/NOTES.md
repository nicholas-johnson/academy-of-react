# Quest 1: Code-Review the Familiar — Solution Notes

Each bug is a lesson you already passed. The familiar does not get extra credit for compiling.

## 1. Hallucinated package — `react-magic-core`

`src/hooks/useSpellPower.ts` imported a library that is not in `package.json` and does not exist. That is why `npm run dev` never started.

**Taught by:** this module (how familiars lie). Delete the hook. Sum power yourself.

## 2. Missing `key`s

```tsx
{spells.map((spell) => (
  <div className="row">
```

became

```tsx
{spells.map((spell) => (
  <div className="row" key={spell.id}>
```

**Taught by:** Module 2 (rendering lists). The console warning is the familiar confessing.

## 3. Fetch race in `useEffect`

The starter called `fetchSpells()` from `load()` with no ignore flag. Reload twice and a slow first response could overwrite a fast second one. The `name: ... · gen N` suffix makes the race visible.

```tsx
useEffect(() => {
  let ignore = false
  fetchSpells().then((data) => {
    if (ignore) return
    setSpells(data)
  })
  return () => {
    ignore = true
  }
}, [reloadToken])
```

**Taught by:** Module 5 (effects, cleanup, stale responses).

## 4. Derived state stored beside the source

`totalPower` was written on fetch and never updated on remove. If you can compute it during render, do not store it.

```tsx
const totalPower = spells.reduce((sum, spell) => sum + spell.power, 0)
```

**Taught by:** Module 3 (state). Storing what you can derive is how totals go stale.

## 5. `dangerouslySetInnerHTML` on student notes

Notes contain `<b>` and `<em>`. Rendering them as HTML is an XSS footgun. `{spell.notes}` is text.

**Taught by:** this module’s lie-list, and basic DOM hygiene. Untrusted strings are text.

## 6. `any`

`useState<any[]>` and `(spell: any)` turned the type oracle off. `Spell` already existed in `api.ts`.

**Taught by:** Phase 3 TypeScript. `any` is how a familiar hides.

## 7. Context as decoration

`RosterThemeContext` wrapped the tree. Nothing called `useContext`. Module 10: reach for Context when many consumers share state. A provider with no readers is ceremony.

## What we did not change

`src/data/api.ts` still delays and stamps a generation number. That is the test fixture for the race, not a bug.
