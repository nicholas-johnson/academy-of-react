# Quest 2: Spec First

The familiar is faster than you. It is not wiser than a blank page. Before anyone generates a spell catalog, you will write what “done” means.

You may use an agent after the spec is filled — Cursor, Claude Code, Copilot, whatever you have. If you have no agent, review the checked-in `familiar-output/` instead. **The grade is the spec and the review, not the prompt poetry.**

## Story Context

Archmage Optimius asked for a filtered spell catalog with a detail dialog. A familiar was pointed at the empty starter and told “make it good.” Read that output only after you can say what good is.

## Requirements

1. Fill in [`starter/SPEC.md`](./starter/SPEC.md). Do not leave the template headings empty.
2. Either:
   - Generate the feature into `starter/` with an agent, **following your spec**, or
   - Read [`starter/familiar-output/`](./starter/familiar-output/) as if it were the agent’s first attempt.
3. Write `starter/REVIEW.md` — what to keep, what to reject, what you verified in the browser (or could not, and why).

The catalog you are specifying:

- A list of academy spells
- A filter (by element is enough)
- A detail **dialog** (not a new page)
- Empty, loading, and error states, each visible
- TypeScript, no `any`

## Acceptance Criteria

- [ ] `SPEC.md` names screens, the component tree, the data shape, empty/error/loading, a11y, and done-when
- [ ] `REVIEW.md` cites at least three concrete mismatches against the spec (or three fixes you made if you generated)
- [ ] `REVIEW.md` includes a browser pass: filter, empty filter result, open/close dialog — or an honest note that you only reviewed source
- [ ] You did not treat “the chat said done” as verification

## Hints

- A spec is not a prompt. “Make a nice spell dashboard” belongs in neither file.
- `familiar-output/` was generated from a vague prompt on purpose. Look for `'use client'`, a fake store, a detail *page*, and missing states.
- If you generate: paste the spec, not a vibe. Then read the diff against the spec, not against your hopes.

[Next →](../quest-03-bind-a-familiar/)
