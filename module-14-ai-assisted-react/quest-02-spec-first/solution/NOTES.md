# Quest 2: Spec First — Solution Notes

The deliverable is not a clever prompt. It is a spec an agent could follow, a review of what it did, and an implementation that matches the spec.

## Why the spec is the artifact

`familiar-output/App.tsx` is a plausible reaction to “make a nice spell dashboard.” It has filters. It has details. It does not have a dialog, loading, error, empty, keys, or types. Vague prompts produce vague apps. The spec’s **Out of scope** and **Done when** sections are what make the review possible.

## Component tree vs what the familiar built

| Spec | Familiar |
| --- | --- |
| `App` state: filter, selected id, fetch status | Zustand store + `any` |
| `SpellList` of buttons | `div` / `li` without keys |
| `SpellDialog` | `SpellDetailPage` and an `<a href>` |
| Vite | `'use client'` |

## Implementation notes

- `fetchSpells` delays so loading is visible. `failNext` exists so error is clickable, not theoretical.
- `arcane` is an element with zero spells so empty is a filter click away.
- Dialog is a labelled modal over the same screen. Filter state survives close.
- Ignore flag on the effect — same race as Quest 1.

## Grading yourself

If your `SPEC.md` still says “make it nice,” rewrite it. If your `REVIEW.md` says “looks good,” cite files. If you generated into `starter/`, the review should list diffs against *your* spec, not against `familiar-output/`.
