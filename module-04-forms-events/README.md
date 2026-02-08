# Module 4: Forms and Event Handling

## Slides

Run the presentation slides from the `slides/` folder:

```bash
cd slides
npm install
npm run dev
```

Covers: Controlled components, form submission, e.preventDefault(), validation patterns, and managing form state.

---

## Story Context

**ANNOUNCEMENT**: The Wizarding War approaches! Headmaster Renderius makes the shocking proclamation during Morning Assembly. Rival academies will arrive in six months. The Academy must prepare.

The first task: build official registration systems. Students must sign up for battles, register their spell preferences, and complete the Sorting Ceremony. This requires mastering complex forms, validation, and multi-step processes.

Welcome to modern React development with **Vite** — a blazing-fast build tool that makes development a joy!

## Learning Objectives

By the end of this module, you will:

- Set up and use Vite for React development
- Master complex form patterns
- Implement form validation
- Handle form submission properly
- Build multi-step forms (wizards)
- Create search/filter interfaces
- Use controlled components at scale
- **NEW React 19**: Use Actions for simpler form handling
- **NEW React 19**: Leverage `useFormStatus()` for pending states

## React Concepts Covered

- Complex form handling
- Form validation patterns
- Multi-step form state
- Controlled inputs at scale
- Form submission events
- Preventing default behavior
- Computed validation states
- **React 19 Actions** - Modern form submission pattern
- **React 19 useFormStatus()** - Access form pending state
- **React 19 useActionState()** - Manage action state and errors

## JavaScript Concepts

- Object state management
- Form validation logic
- Regular expressions (optional)
- Array filtering
- Event.preventDefault()

## Setup Instructions

**First time using Vite!**

1. Navigate to the `demo/` folder
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Open the URL shown (usually http://localhost:5173)
5. Edit files in `src/` — changes appear instantly!
6. Press Ctrl+C to stop the server

## Demo Walkthrough

The demo shows a contact form with:

- Multiple controlled inputs
- Validation logic
- Error messages
- Form submission handling
- Success state

Study how validation is implemented and how errors are displayed.

## Vite Benefits

- ⚡ Lightning-fast hot module replacement (HMR)
- 📦 Modern ES modules
- 🎯 Optimized builds
- 🔧 Easy configuration
- 💪 Better developer experience

## Quests

### Quest 1: Form Validation

**Difficulty**: ⭐⭐ Intermediate

Create a registration form with field-level validation.

[Start Quest →](./quest-01-form-validation/)

### Quest 2: Controlled Inputs

**Difficulty**: ⭐⭐ Intermediate

Build a searchable directory with live filtering using controlled inputs.

[Start Quest →](./quest-02-controlled-inputs/)

### Quest 3: Form Submission

**Difficulty**: ⭐⭐⭐ Advanced

Create a multi-step form with proper submission handling.

[Start Quest →](./quest-03-form-submission/)

### Bonus Quest: Roster Manager (Array State)

**Difficulty**: ⭐⭐⭐ Advanced

Combine forms with array state management — add, edit, delete, and filter a dynamic list.

[Start Bonus Quest →](./quest-04-bonus-array-state/)

## Bonus Mastery Challenge

**The Complete Registration System**

Combine all three quests into one application:

- Tab 1: Battle Signup Form
- Tab 2: Spell Search
- Tab 3: Sorting Ceremony
- Save all data to a shared state
- Summary page showing all registrations

## React 19: Actions - The Modern Way

React 19 introduces **Actions** - a revolutionary pattern for handling form submissions and async operations with automatic pending states!

### What are Actions?

Actions are async functions that React tracks automatically. When passed to a `<form action={}>`, React handles:

- Pending states automatically
- Error boundaries integration
- Optimistic updates support
- No manual `preventDefault()` needed

### Traditional vs React 19 Approach

**Traditional Way (still valid for learning)**:

```jsx
function BattleSignup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitToServer(formData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**React 19 Way with Actions**:

```jsx
async function signupAction(formData) {
  "use server"; // If using Server Components

  const name = formData.get("name");
  const spellType = formData.get("spellType");

  // Validation
  if (!name) throw new Error("Name required");

  // Submit (async operation)
  await submitToServer({ name, spellType });

  // React automatically tracks this as "pending"!
}

function BattleSignup() {
  return (
    <form action={signupAction}>
      <input name="name" required />
      <select name="spellType">...</select>
      <SubmitButton /> {/* Uses useFormStatus() */}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus(); // React 19 hook!

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Registering..." : "Sign Up for Battle"}
    </button>
  );
}
```

### Key Benefits of Actions

1. **Automatic Pending States**: No manual loading state management
2. **Built-in Error Handling**: Errors bubble to Error Boundaries
3. **Progressive Enhancement**: Forms work without JavaScript
4. **Cleaner Code**: Less boilerplate, more declarative
5. **Server Actions**: Seamless server integration (Module 13!)

### Using useActionState()

For client-side actions with state:

```jsx
import { useActionState } from "react";

async function submitAction(prevState, formData) {
  const name = formData.get("name");

  try {
    await registerStudent(name);
    return { success: true, message: "Registered!" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function BattleForm() {
  const [state, formAction, isPending] = useActionState(submitAction, {});

  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>Submit</button>
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">{state.message}</p>}
    </form>
  );
}
```

### When to Use Actions

**Use Actions for**:

- Form submissions
- Data mutations
- Async operations with UI feedback
- Server-side operations (with Server Components)

**Stick with traditional handlers for**:

- Simple onClick handlers
- Immediate synchronous operations
- Complex multi-step validation
- When you need fine-grained control

### Quest Integration

In the quests, you'll see both approaches:

- **Primary approach**: Traditional (for learning fundamentals)
- **Bonus section**: React 19 Actions (modern pattern)

This teaches you **why** Actions are better by showing the evolution!

## Key Takeaways

- Vite makes React development fast and enjoyable
- Complex forms need careful state management
- Validation should provide clear feedback
- Multi-step forms track current step in state
- Search/filter is just state + array methods
- Always prevent default on form submit (traditional)
- Controlled components are the React way
- **React 19 Actions simplify form handling dramatically**
- **useFormStatus() gives free pending states**
- **Learn traditional first, then appreciate Actions**

---

**Previous Module**: [Module 3: State with useState](../module-03-state-usestate/)

**Next Module**: [Module 5: Side Effects with useEffect](../module-05-effects-useeffect/)
