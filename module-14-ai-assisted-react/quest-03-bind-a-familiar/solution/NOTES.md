# Quest 3: Bind a Familiar — Solution Notes

## Why the primitives are copied, not wrapped

shadcn is not an npm component library you import from the dark. The files in `src/components/ui/` are **yours**. The `arcane` variant on `Button` is the required proof: a gold, fully rounded Bind button that does not exist in the stock file.

Wrapping `Button` in `AcademyButton` and never opening `button.tsx` is the old “don’t touch the original” habit. Familiars cannot restyle what they cannot see.

## What we added on top of the starter

- Vite `@` alias, CSS variables, `cn()`, Radix Dialog/Label — same pins as the module demo
- Form (name + kind) → table row
- Unbind opens a dialog; confirm removes the row; empty state when the ledger is vacant
- `AGENTS.md` so the next familiar does not invent Next.js or Redux

## `AGENTS.md` is the durable skill

Cursor rules, `CLAUDE.md`, and `AGENTS.md` are the same idea with different filenames. The file in this solution is short on purpose. Long novels get ignored; conventions that name the stack and the vetoes get followed.

## CLI vs copy-from-demo

`npx shadcn@latest` may scaffold Tailwind v4. This course pins Tailwind `^3.4.1` and React `^18.2.0`. Copying from `module-14-ai-assisted-react/demo/` is not cheating. It is version pinning.
