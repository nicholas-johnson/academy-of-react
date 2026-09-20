# Quest 1: Code-Review the Familiar

A familiar was asked to build an Academy spell roster. It *finished*. Headmaster Rundoolius is unimpressed. The project does not even start — and that is the kindest of its problems.

This quest is **offline**. No agent. You already know every bug in this tree; the familiar does not get to name them for you.

## Story Context

Professor Hooksweasel handed the familiar a one-line prompt: “make a spell roster.” It emitted TypeScript that looks confident. Your job is to make the roster *true*.

## Symptoms (not a diagnosis)

- `npm install && npm run dev` fails before the page loads
- Once it runs, the console complains when the list renders
- Reload twice, quickly — the roster sometimes shows the wrong generation of data
- Removing a spell does not update the “total power” figure
- Spell notes render as markup instead of text
- A context provider wraps the tree, but nothing in the UI actually needs it
- Types are... optimistic

## Requirements

- The app starts with `npm run dev`
- Spells load from the local delayed fetch in `src/data/api.ts`
- The list has stable `key`s
- A fast double-reload cannot apply a stale response
- Total power is derived from the current spells (not stored alongside them)
- Notes display as plain text
- No hallucinated packages, no `any`, no unused Context

## Acceptance Criteria

- [ ] Dev server starts without missing-module errors
- [ ] Spell list renders without key warnings
- [ ] Clicking Reload twice in quick succession ends on the latest request’s data
- [ ] Deleting a spell updates total power
- [ ] Notes such as `<b>cursed</b>` show the angle brackets, not bold text
- [ ] No imports from packages that are not in `package.json`
- [ ] No `any`
- [ ] No Context that exists only because the familiar likes providers

## Hints

- Read the error that stops the app. Hallucinated packages are a default, not a surprise.
- Module 5: a fetch in `useEffect` needs an ignore flag or `AbortController`.
- Module 3: if you can compute it, do not store it.
- Module 2: lists need `key`s. Module 10: Context is for shared state many consumers need — not decoration.
- `{note}` is text. `{dangerouslySetInnerHTML: ...}` is a footgun.

[Next →](../quest-02-spec-first/)
