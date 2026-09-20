export const slides = [
  {
    type: "title",
    content: {
      title: "AI-Assisted React",
      subtitle: "Module 14: Binding a Familiar",
      icon: "sparkles",
    },
  },
  {
    type: "standard",
    content: {
      title: "The War Is Over",
      points: [
        "You can already write React by hand",
        "Rundoolius now binds each graduate a familiar",
        "A familiar writes runes faster than a human hand",
        "Power without mastery is how academies lose",
        "This module is why Modules 1–13 still matter",
      ],
      icon: "award",
    },
  },
  {
    type: "standard",
    content: {
      title: "What This Module Is Not",
      points: [
        "Not chat UIs, streaming tokens, or the Vercel AI SDK",
        "That is building AI products — a different craft",
        "This module is writing React WITH an agent",
        "Specify, generate, read the diff, verify in the browser",
      ],
      icon: "ban",
    },
  },
  {
    type: "comparison",
    content: {
      title: "Vibe Coding vs Maintenance",
      left: {
        label: "Vibe coding",
        items: [
          "Prompt until it looks right",
          "Great for throwaways",
          "Accepts whatever compiles",
          "Cannot name the next bug",
        ],
      },
      right: {
        label: "AI-assisted craft",
        items: [
          "You want a specific program",
          "The diff is the artifact",
          "Types and tests are the oracle",
          "You click through the result",
        ],
      },
    },
  },
  {
    type: "comparison",
    content: {
      title: "Two Modes, Same Tool",
      left: {
        label: "Tutor mode",
        items: [
          "Explain this error",
          "What does this hook do?",
          "Allowed even earlier in the course",
          "The familiar is a professor",
        ],
      },
      right: {
        label: "Generator mode",
        items: [
          "Write the feature",
          "Earned after you have a mental model",
          "You can reject the first architecture",
          "You can name the bug in the diff",
        ],
      },
    },
  },
  {
    type: "rules",
    content: {
      title: "What You Must Bring",
      rules: [
        {
          rule: "Mental model",
          example: "Render, state, effects, server vs client",
          icon: "brain",
        },
        {
          rule: "Taste",
          example: "You have seen Tailwind, Context, Zustand, Redux",
          icon: "gem",
        },
        {
          rule: "A spec",
          example: "Screens, data, empty/error/loading, done-when",
          icon: "file-text",
        },
        {
          rule: "Diff literacy",
          example: "If you cannot explain the change, you do not own it",
          icon: "git-compare",
        },
        {
          rule: "Debugging",
          example: "DevTools, console, Network, stale closures",
          icon: "bug",
        },
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Why Popular Stacks Generate Better",
      points: [
        "Models follow public code, docs, and Stack Overflow",
        "Popularity is the mechanism — not moral superiority",
        "React is the most-represented UI library",
        "Tailwind is a closed vocabulary of class names on the JSX",
        "shadcn copies source into YOUR repo, so the agent can edit it",
      ],
      icon: "database",
    },
  },
  {
    type: "rules",
    content: {
      title: "The Stack",
      rules: [
        {
          rule: "React 18",
          example: "Default output. Pin it. Do not silently take 19.",
          icon: "atom",
        },
        {
          rule: "TypeScript",
          example: "tsc is the oracle. JS-only generation flies blind.",
          icon: "shield",
        },
        {
          rule: "Tailwind 3",
          example: "Utilities live on the element. No invented class names.",
          icon: "palette",
        },
        {
          rule: "shadcn primitives",
          example: "Button.tsx is yours. Read it. Change it.",
          icon: "boxes",
        },
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "Vite vs Next — You Choose",
      left: {
        label: "Vite (this module)",
        items: [
          "SPA with less implicit magic",
          "No invented 'use client'",
          "Cleaner agent target for a dashboard",
          "Default for the Familiar's Codex",
        ],
      },
      right: {
        label: "Next.js App Router",
        items: [
          "What agents often start with",
          "Valid after Module 13 — if you mean it",
          "Needs a real server/client boundary",
          "Inertia is not a reason",
        ],
      },
    },
  },
  {
    type: "standard",
    content: {
      title: "What the Familiar Will Reach For",
      points: [
        "TanStack Query — your useFetch quest, with caching",
        "React Hook Form + Zod — schema as spec",
        "Zustand — tiny store, no provider (Module 12)",
        "It may still emit Redux or MUI because the training data is old",
        "Taste is how you push back",
      ],
      icon: "wand",
    },
  },
  {
    type: "standard",
    content: {
      title: "Patterns to Ask For",
      points: [
        "Colocation — the file is the unit of work",
        "Typed props as a contract",
        "Composition and children (Module 7)",
        "Custom hooks as the extract button",
        "Feature folders, not a soup of utils/",
        "Loading / error / empty / success as data",
      ],
      icon: "check-circle",
    },
  },
  {
    type: "code",
    content: {
      title: "Boring on Purpose",
      code: `interface SpellCardProps {
  name: string
  power: number
  children?: React.ReactNode
}

function SpellCard({ name, power, children }: SpellCardProps) {
  return (
    <article className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-slate-600">Power {power}</p>
      {children}
    </article>
  )
}`,
      highlights: [
        "Explicit typed props — the familiar can see the contract",
        "Utilities on the element — no second CSS file to invent",
        "children for composition — HTML-shaped API",
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Patterns to Reject",
      points: [
        "Barrel files that hide implementations",
        "Context for everything",
        "CSS far from the markup",
        "MUI sx={{}} archaeology",
        "Mixing React 18/19 or Tailwind v3/v4 in one pass",
        "Clever HOCs the prompt did not ask for",
      ],
      icon: "x-circle",
    },
  },
  {
    type: "rules",
    content: {
      title: "Tooling as Jobs",
      rules: [
        {
          rule: "Editor agent",
          example: "Cursor, Copilot Chat — diffs in open files",
          icon: "monitor",
        },
        {
          rule: "CLI agent",
          example: "Claude Code, Codex CLI — whole-repo loops",
          icon: "terminal",
        },
        {
          rule: "UI generator",
          example: "v0 — a starting component, then you own it",
          icon: "layout",
        },
        {
          rule: "App builders",
          example: "Lovable, Bolt — a spike, not a shortcut past the Academy",
          icon: "alert-triangle",
        },
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Durable Ideas (Not Logos)",
      points: [
        "AGENTS.md / Cursor rules / CLAUDE.md beat clever prompts",
        "Context is a budget — name files, keep components small",
        "The diff is the artifact",
        "Secrets never belong in the client or the prompt",
        "Do not rank this week's model. Rank the workflow.",
      ],
      icon: "scroll",
    },
  },
  {
    type: "rules",
    content: {
      title: "Cursor Modes",
      rules: [
        {
          rule: "Ask",
          example: "Read-only. Explain, explore, do not edit.",
          icon: "search",
        },
        {
          rule: "Plan",
          example: "Research, write a plan, you approve, then build.",
          icon: "file-text",
        },
        {
          rule: "Debug",
          example: "Hypothesize, log, reproduce, fix from evidence.",
          icon: "bug",
        },
        {
          rule: "Agent",
          example: "The default: search, edit, run commands.",
          icon: "bot",
        },
      ],
    },
  },
  {
    type: "standard",
    content: {
      title: "Pick the Mode for the Job",
      points: [
        "Ask = tutor mode, enforced — cannot touch files",
        "Plan = spec first — Quest 2 in the editor",
        "Debug = races and 'it used to work' — you still reproduce it",
        "Agent = generator mode — only when you can describe the change",
        "Shift+Tab cycles modes. Living in Agent for everything is the mistake.",
        "Other tools use different names. The habit is the same.",
      ],
      icon: "toggle-left",
    },
  },
  {
    type: "standard",
    content: {
      title: "The Loop",
      points: [
        "Specify — screens, data, empty/error/loading, done-when",
        "Generate — editor agent, CLI agent, or v0",
        "Read the diff — if you cannot explain it, reject it",
        "tsc / lint — types are the oracle, chat is not",
        "Click through in the browser — submit, reload, follow the 404",
        "Iterate",
      ],
      icon: "refresh-cw",
    },
  },
  {
    type: "standard",
    content: {
      title: "Instructor Live Beat",
      points: [
        "Open the Familiar's Codex demo",
        "Bad prompt: “make a filter” — watch the architecture wander",
        "Better spec: field, empty state, what done looks like",
        "Read the diff. Run it. Click it.",
        "A green screenshot is not verification",
      ],
      icon: "presentation",
    },
  },
  {
    type: "standard",
    content: {
      title: "How Familiars Lie",
      points: [
        "Hallucinated packages and hooks that never shipped",
        "React 19 APIs in a React 18 app",
        "Tailwind v4 classes in a v3 config",
        "Fake a11y — a clickable div labelled accessible",
        "Missing keys, fetch races, dangerouslySetInnerHTML",
        "'use client' inside a Vite project",
      ],
      icon: "ghost",
    },
  },
  {
    type: "standard",
    content: {
      title: "Version Pinning Is a Lesson",
      points: [
        "react ^18.2.0 — match the rest of the Academy",
        "vite ^5.0.8, tailwindcss ^3.4.1",
        "Do not let the familiar upgrade the universe",
        "Pin what the demo's package.json already chose",
      ],
      icon: "pin",
    },
  },
  {
    type: "standard",
    content: {
      title: "Quest 1: Code-Review the Familiar",
      points: [
        "Offline — no agent required",
        "A roster that does not even start",
        "Course-shaped bugs: keys, effects, any, XSS, fake imports",
        "Fix it by hand. Name the module that taught each bug.",
      ],
      icon: "search",
    },
  },
  {
    type: "standard",
    content: {
      title: "Quest 2: Spec First",
      points: [
        "Write SPEC.md before any generation",
        "Filtered spell catalog + detail dialog",
        "Empty / error / loading called out",
        "Review familiar-output/ (or generate your own)",
        "Grade the spec and the review, not prompt poetry",
      ],
      icon: "file-pen",
    },
  },
  {
    type: "standard",
    content: {
      title: "Quest 3: Bind a Familiar",
      points: [
        "Add shadcn to Vite + TypeScript + Tailwind",
        "Compose one screen: form + table + dialog",
        "Write AGENTS.md with Academy conventions",
        "Change a primitive in src/components/ui/",
        "That last step is why shadcn is in the stack",
      ],
      icon: "link",
    },
  },
  {
    type: "welcome",
    content: {
      title: "A Familiar Multiplies a Wizard",
      points: [
        "It does not replace the Academy",
        "Want a specific program",
        "Read the diff",
        "Click through the result",
        "May your familiars be honest, and your reviews kind but firm",
      ],
    },
  },
];
