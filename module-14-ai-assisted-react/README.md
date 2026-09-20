# Module 14: AI-Assisted React

By now you can write React by hand: elements, state, effects, composition, routing, and server rendering. This module is about writing React with an AI coding agent - Cursor, Claude Code, GitHub Copilot, and the like - without losing the understanding you built in Modules 1-13.

An agent is a multiplier for someone who already knows what they want written. It is not a substitute for knowing React.

This is **not** a module about building AI products (chat UIs, streaming tokens, the Vercel AI SDK). That is a separate topic. Here, the AI writes your React; it is not a feature of the app.

The exercises keep the course's wizard theme - an agent is your "familiar," code is "runes." The lecture below drops the metaphor and says things plainly.

## The Core Idea

An agent will happily produce a dashboard that compiles. Compiling is not the same as being correct. The skill that matters is not typing faster; it is knowing exactly what program you want, then reading the agent's diff until the code matches that intent.

There are two ways to use an agent, and they are not interchangeable:

**Tutor mode** - "Explain this error." "What does this hook do?" You are asking the agent to teach. You have probably done this already.

**Generator mode** - "Write this feature." You are asking the agent to produce code you will own. This is only safe once you can describe the component tree and the data flow, and can spot the bug when the first attempt is wrong.

If you jump to generator mode without a mental model, you end up accepting whatever compiles. You then cannot steer the next prompt, because you cannot say what is wrong. That is how you get a 4,000-line `App.tsx` with three different fetch patterns.

You do not need to write every line by hand at production speed. You do need:

1. **A mental model** - render, state vs props, rules of hooks, effects, server vs client
2. **Taste** - you have seen CSS Modules, styled-components, Tailwind, Context, Zustand, and Redux, so you can reject the agent's first architecture
3. **A spec** - screens, data, empty/error/loading, and what "done" means
4. **Diff literacy** - the diff is what you actually review
5. **Debugging** - React DevTools, the console, the Network tab, recognizing a stale closure

"Vibe coding" - prompting until it looks right, without reading the code - is fine for a throwaway. It is a bad idea for anything you have to maintain. This course is about the maintain case.

## Why Popular Stacks Work Better with AI

Models are not better at some libraries because those libraries are better. They are better where there is more public code, documentation, and Stack Overflow to learn from. React is the most widely used UI library. Tailwind's class names are a fixed vocabulary that sits directly on the JSX. shadcn copies component source into your own repo, so the agent can read `button.tsx` and edit it.

Popularity is the reason. Keep that in mind when an agent suggests a clever alternative it has seen very little of.

## The Stack

This module's default stack is:

**React 18 + TypeScript + Vite + Tailwind CSS 3 + shadcn-style components**

| Piece          | Why it works well with AI                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React**      | The most common examples in training data, so it is the agent's default output.                                                                          |
| **TypeScript** | The feedback loop. The agent guesses, `tsc` and ESLint report the errors, and the agent fixes them. Generating plain JavaScript removes that safety net. |
| **Tailwind**   | Styles live on the element. No separate file, no class-name scheme to invent.                                                                            |
| **shadcn**     | Not a black box from `node_modules`. The components are source in your repo, built on Radix and Tailwind, both well documented.                          |

TypeScript is a core part of the stack here, not an optional extra. This module is TypeScript-only, because the type checker is how you catch a lot of what the agent gets wrong.

**Use Vite, not Next.js, by default in this module.** After Module 13 you know the Next.js App Router. Agents often start a new app in Next.js because it is so common in their training data. For a plain single-page app, Vite plus React Router is usually a cleaner target: less implicit server/client behavior and no stray `'use client'` directives. If you need server rendering, Next.js is a fine choice - but make it a choice, not something the agent picks by default.

Libraries an agent will reach for even if you do not ask. You already know the idea behind each:

- **TanStack Query** - the `useFetch` custom hook from Module 9, plus caching and request status
- **React Hook Form + Zod** - form handling with a schema that also acts as your spec
- **Zustand** - a small global store with no provider boilerplate (Module 12). An agent may still write a Redux slice because its training data skews old; push back if you do not need it.

**Pinned versions for this module** (do not let the agent upgrade everything):

- `react` / `react-dom` `^18.2.0`
- `vite` `^5.0.8`
- `tailwindcss` `^3.4.1`
- `typescript` `^5.3.3`
- Radix packages as listed in each project's `package.json`

Models mix up APIs from adjacent versions: React 18 vs 19 `use()`, Tailwind v3 vs v4, Next.js 14 vs 15. Pinning versions, and checking what the agent produced against them, is part of the skill.

Options that work less well with AI:

- **MUI / Chakra / Ant Design** - well represented, but customizing them means digging through theme tokens, and agents tend to produce piles of `sx={{}}` overrides.
- **CSS Modules** - a separate file plus class names you have to invent (Module 6, Quest 1). You know this tool; the agent is only so-so at it.
- **Styled Components** - nested template literals and runtime themes are harder to generate cleanly than utility classes on the element.
- **DaisyUI** - extra class names on top of Tailwind. Fine for a quick prototype, but weaker than real React components the agent can refactor.

One caveat: shadcn plus Tailwind apps all tend to look like the same dashboard unless you push on the design. The look is a starting point, not a finished product. That part is still your job.

## Patterns to Ask For

Favor code that is easy to name, type, and fit in one file.

```tsx
interface SpellCardProps {
  name: string;
  power: number;
  children?: React.ReactNode;
}

function SpellCard({ name, power, children }: SpellCardProps) {
  return (
    <article className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-slate-600">Power {power}</p>
      {children}
    </article>
  );
}
```

**Ask for:**

- **Colocation** - component, styles, and local data in one file or a tight folder. The file is the unit of work.
- **Typed props** - an explicit `interface` for the contract, rather than implicit shapes.
- **Composition with `children`** - component APIs that read like HTML (Module 7).
- **Custom hooks** - `useSpells()` is a named, testable boundary the agent can produce reliably.
- **Feature folders** - `spells/list`, `spells/detail` instead of one big pile of `components/`, `hooks/`, `utils/`.
- **Copy-in components** - the shadcn approach, rather than wrapping a large third-party library.
- **Loading / error / empty / success as explicit states** - types then force you to handle each one.

Server Components with a small client island are fine once you understand the boundary. Agents still add `'use client'` far too widely, so that is something to catch in review, not a reason to avoid Server Components.

## Patterns to Reject

- Clever higher-order components, render-prop pyramids, and barrel files that hide where things live
- Context used for everything
- Premature abstraction (agents both over-DRY and copy-paste; watch for both)
- Styling that lives far away from the markup it applies to
- "Don't touch the original, wrap it" design-system habits
- Mixing major versions of React, Tailwind, or Next.js in one change

Good AI-assisted React tends to look a little boring. That is a feature.

## Tools, by Job

Cursor and Claude Code are the two you will use most in this module, but they are examples, not requirements. Quest 1 is fully offline. Quests 2 and 3 work with any agent, or with the sample output checked into the repo if you do not have one.

| Type             | Examples                       | What it is for                                                            |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------- |
| **Editor agent** | Cursor, Copilot Chat, Windsurf | Inline edits, repo context, rules files, diffs in the files you have open |
| **CLI agent**    | Claude Code, Codex CLI, Aider  | Whole-repo tasks, `CLAUDE.md` / `AGENTS.md`, running tests                |
| **UI generator** | v0                             | A starting component in this stack that you then own                      |
| **App builder**  | Lovable, Bolt                  | Quick spikes, not a way to skip Modules 1-13                              |

**Cover in depth:** Cursor, Claude Code.

**Worth knowing:** GitHub Copilot (you may already have it), v0 (targets this exact stack), Codex CLI.

**Also out there:** Windsurf, Cline/Continue (run in stock VS Code), Aider (each change is a git commit).

Do not try to rank the models. Rank the workflows instead. Any sentence naming this month's best model is out of date almost immediately.

The ideas that outlast the specific tools:

- **Instructions files** (`AGENTS.md`, `.cursor/rules`, `CLAUDE.md`) matter more than clever prompts. Same idea, different filenames.
- **Context is a budget.** Good file names, small components, and not pasting `node_modules` into the prompt are engineering decisions.
- **The diff is what you review.** Reading it is the core skill.
- **Keep secrets out of the client.** An agent will cheerfully put an API key straight into `App.tsx`.

There is a sample `AGENTS.md` in the [demo](./demo/AGENTS.md). Quest 3 asks you to write your own.

## The Workflow

```text
specify → generate → read the diff → run tsc / lint → click through in the browser → repeat
```

The chat is not a source of truth. The type checker and your tests are. A screenshot of a green button is not proof it works - submit the form, follow the 404, reload the page twice. An agent can report success while a data fetch is quietly racing.

If you take one habit from this module, take this: **never merge code from an agent that you have not run and clicked through yourself.**

## How Agents Get It Wrong

These are common, not rare. Assume they will happen and look for them:

- **Made-up APIs** - packages that do not exist, hooks that were never released
- **Mixed versions** - React 19 APIs in a React 18 app, Tailwind v4 classes in a v3 config
- **Fake accessibility** - a `div` with an `onClick` described as "accessible"
- **Missing `key`s** - you covered this in Module 2, and agents still forget
- **Fetching in `useEffect` with no cleanup** - the request races covered in Module 5
- **`dangerouslySetInnerHTML`** on text that is not trusted
- **`'use client'`**, or a whole Next.js setup, dropped into a Vite project

The real risk is not "cheating." It is accepting whatever compiles without checking it.

## Common Mistakes

**Prompting instead of specifying.** "Make a spell dashboard" is not a spec. Screens, data, empty/error/loading states, and a definition of done are a spec.

**Skipping the diff.** If you cannot explain a change, you cannot own it.

**Letting the agent pick the framework.** Next.js is a valid choice; it is not the only one. Choose it deliberately, the way you did in Module 13.

**Trusting the chat's "done."** Open the app and use it.

**Pasting secrets into the prompt or shipping them in the client bundle.**

## Exercises

The exercises use the wizard theme: your agent is a "familiar," and binding one means setting up an AI-friendly project.

**Quest 1: Code-Review the Familiar** - An agent "finished" an Academy roster app. It does not even start, and that is the least of its problems. Fix it by hand. No agent required.

[Start Quest 1 →](./quest-01-code-review-the-familiar/)

**Quest 2: Spec First** - Write a spec for a filtered spell catalog with a detail dialog. Then review an agent's attempt (or generate your own) against that spec. You are graded on the spec and the review, not on the prompt.

[Start Quest 2 →](./quest-02-spec-first/)

**Quest 3: Bind a Familiar** - Add shadcn to a Vite + TypeScript + Tailwind app, build one screen with it, write an `AGENTS.md`, and edit a component that now lives in your own repo.

[Start Quest 3 →](./quest-03-bind-a-familiar/)

## Running the Code

```bash
cd demo
npm install
npm run dev
```

The demo, "Familiar's Codex," is a small registry built on the stack described above. Open `src/components/ui/` and read it like any other source file - that is the point of shadcn.

The slides cover the core idea, the stack, the tool types, and the workflow:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 13: Server Rendering](../module-13-server-rendering/)
