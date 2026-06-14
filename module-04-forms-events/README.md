# Module 4: Forms and Events

Forms are how users talk back to your application. Registration pages, search boxes, login screens, multi-step wizards — they all rely on capturing, validating, and submitting user input. React handles forms differently from plain HTML, and understanding the pattern is essential for building any real application.

This module covers **controlled components** (React's approach to form inputs), form submission, validation, and managing forms with multiple fields.

## Controlled Components

In plain HTML, an `<input>` manages its own value internally — you type, and it updates itself. React flips this: *you* control the input's value through state, and the input becomes a reflection of that state.

The pattern has two parts: `value` ties the input to state, and `onChange` updates state when the user types:

```jsx
function NameInput() {
  const [name, setName] = useState('')

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your wizard name"
    />
  )
}
```

Every keystroke flows through React: the user types → `onChange` fires → `setName` updates state → the component re-renders → the input shows the new value. It sounds like a lot, but it happens instantly and gives you complete control over the input at all times.

This "controlled" approach lets you validate on every keystroke, transform input (uppercase, formatting), or synchronize the value with other parts of your UI.

## Different Input Types

The same controlled pattern works for all input types, with slight variations:

```jsx
// Text and email
<input type="text" value={name} onChange={e => setName(e.target.value)} />
<input type="email" value={email} onChange={e => setEmail(e.target.value)} />

// Number
<input type="number" value={level} onChange={e => setLevel(Number(e.target.value))} />

// Checkbox (uses checked instead of value)
<input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />

// Select
<select value={house} onChange={e => setHouse(e.target.value)}>
  <option value="Liondudes">Liondudes</option>
  <option value="Scarybird">Scarybird</option>
</select>

// Radio buttons (same name groups them)
<input type="radio" name="role" value="attacker"
  checked={role === 'attacker'} onChange={e => setRole(e.target.value)} />
<input type="radio" name="role" value="defender"
  checked={role === 'defender'} onChange={e => setRole(e.target.value)} />
```

Use specific `type` attributes — `email`, `tel`, `number`, `date` — even in React. They give mobile users appropriate keyboards and provide free browser validation.

## Form Submission

In HTML, submitting a form refreshes the page. That destroys your React state and is never what you want in a React app. Use `e.preventDefault()` to stop the refresh, then handle the data yourself:

```jsx
function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting:', { email, password })
    // Send to server, navigate, etc.
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}
```

Put `onSubmit` on the `<form>` element, not `onClick` on the button. This ensures the form is also submitted when the user presses Enter in an input field — proper form behaviour.

## Validation

Most forms need validation before submission. The simplest approach is checking values in your submit handler:

```jsx
function ValidatedForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      setError('Email is required')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setError('')
    console.log('Valid submission:', email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  )
}
```

Check the values, set an error message if something's wrong, and `return` early to prevent submission. The error message renders conditionally when there's something to show.

For more complex validation (multiple fields, different rules per field), you can track errors as an object:

```jsx
const [errors, setErrors] = useState({})

const validate = () => {
  const newErrors = {}
  if (!form.name) newErrors.name = 'Name is required'
  if (!form.email.includes('@')) newErrors.email = 'Invalid email'
  if (form.password.length < 8) newErrors.password = 'Min 8 characters'
  return newErrors
}
```

## Managing Multiple Inputs

With many fields, creating a separate `useState` for each gets tedious. A common pattern stores the entire form as an object and uses a single handler:

```jsx
function RegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    house: 'Liondudes',
    level: 1
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data:', form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <select name="house" value={form.house} onChange={handleChange}>
        <option value="Liondudes">Liondudes</option>
        <option value="Scarybird">Scarybird</option>
        <option value="Huftybadger">Huftybadger</option>
        <option value="Snakeyguys">Snakeyguys</option>
      </select>
      <button type="submit">Register</button>
    </form>
  )
}
```

The key insight: each input's `name` attribute matches its key in the form object. The handler uses `[name]: value` (computed property name) to update whichever field just changed, while spreading the rest unchanged.

## Accessibility

Forms need to be usable by everyone — including people using screen readers and keyboard navigation. A few essential patterns:

```jsx
<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="email">Email Address</label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      aria-describedby={error ? 'email-error' : undefined}
      aria-invalid={!!error}
    />
    {error && (
      <span id="email-error" role="alert">{error}</span>
    )}
  </div>
  <button type="submit">Submit</button>
</form>
```

Key points: `htmlFor` on labels (not `for` — that's a reserved word in JS), `aria-describedby` linking inputs to their error messages, and `role="alert"` so screen readers announce errors immediately.

## Common Mistakes

**Forgetting `e.preventDefault()`.** Without it, the page refreshes on submit and you lose all state. This is the most common beginner mistake with React forms.

**Using `onClick` on the submit button instead of `onSubmit` on the form.** The form's submit event handles both button clicks *and* Enter key presses. Putting the handler on the button misses the keyboard case.

**Not giving inputs a `name` attribute.** When using the object-state pattern with a single handler, every input needs a `name` that matches its key in state.

**Forgetting `value` on the input.** An input with `onChange` but no `value` is "uncontrolled" — React doesn't manage it. Always pair them for a controlled component.

## Exercises

**Quest 1: Form Validation** — Build a registration form with field-level validation. Show errors on submit and clear them when the user corrects their input.

[Start Quest 1 →](./quest-01-form-validation/)

**Quest 2: Controlled Inputs** — Create a searchable spell directory with live filtering using controlled inputs.

[Start Quest 2 →](./quest-02-controlled-inputs/)

**Quest 3: Form Submission** — Build a multi-step form with proper submission handling and progress indication.

[Start Quest 3 →](./quest-03-form-submission/)

**Bonus Quest: Roster Manager** — Combine forms with array state to build a dynamic list where you can add, edit, and delete entries.

[Start Bonus Quest →](./quest-04-bonus-array-state/)

## Running the Code

```bash
cd demo
npm install
npm run dev
```

Slides cover controlled components, submission, validation, and accessibility:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 3: State with useState](../module-03-state-usestate/) | [Module 5: Side Effects with useEffect →](../module-05-effects-useeffect/)
