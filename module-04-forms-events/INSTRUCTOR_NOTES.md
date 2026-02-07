# Module 4: Instructor Notes

## Overview

This module teaches **forms and event handling** — the essential skills for capturing and processing user input in React. Students learn controlled components, form validation, event handling patterns, and how to build complete form workflows.

**Key Goal**: Students should understand that React controls form inputs through state (controlled components), and that `e.preventDefault()` is essential to stop page refreshes during form submission.

---

## The Big Idea: Why Controlled Components?

Before diving into syntax, establish **why** controlled components matter:

1. **Single source of truth** — State holds the data, input displays it
2. **Validation becomes easy** — Check values before submission
3. **Formatting possible** — Transform input as user types
4. **Sync across components** — Multiple components can reflect same value
5. **Predictable behavior** — React always knows what the input contains

The key insight: "The input doesn't own its value — React state does. The input just displays what state tells it to."

---

## Demo Walkthrough

### Demo: Message Owl Service

**Location**: `demo/`

```bash
cd module-04-forms-events/demo
npm install
npm run dev
```

**What it demonstrates:**
- Form state as an object (`{ name, email, message }`)
- Single `handleChange` function for all inputs
- Validation on submit
- Error state tracking
- Success state after submission
- Form clearing

**Key teaching points:**

```jsx
// 1. Form state as object
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

// 2. Dynamic field update
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// 3. Validation function
const validate = () => {
  const errors = {};
  if (!formData.name.trim()) errors.name = 'Required';
  if (!formData.email.includes('@')) errors.email = 'Invalid email';
  return errors;
};

// 4. Submit handler
const handleSubmit = (e) => {
  e.preventDefault();  // CRITICAL!
  const errors = validate();
  if (Object.keys(errors).length === 0) {
    // Success path
  } else {
    setErrors(errors);
  }
};
```

**Walk through these patterns:**
1. How `name` attribute matches state keys
2. Why `[name]: value` uses computed property names
3. How errors clear when user starts typing
4. The `e.preventDefault()` moment — show what happens without it!

---

## Core Concepts

### 1. Controlled Components

The fundamental pattern:

```jsx
<input 
  value={state}                          // Display state
  onChange={(e) => setState(e.target.value)}  // Update on change
/>
```

**Why controlled?**
- React is the "source of truth"
- Input value always equals state
- Enables validation, formatting, etc.

**Different input types:**

```jsx
// Text input
<input type="text" value={name} onChange={e => setName(e.target.value)} />

// Number input
<input type="number" value={age} onChange={e => setAge(e.target.value)} />

// Checkbox (uses checked, not value!)
<input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />

// Select dropdown
<select value={house} onChange={e => setHouse(e.target.value)}>
  <option value="Gryffin">Gryffin</option>
  <option value="Ravenclaw">Ravenclaw</option>
</select>

// Radio buttons
<input type="radio" name="role" value="attacker" 
       checked={role === 'attacker'} 
       onChange={e => setRole(e.target.value)} />

// Textarea
<textarea value={message} onChange={e => setMessage(e.target.value)} />
```

---

### 2. Form Submission

**The Problem:**

```jsx
// ❌ WITHOUT e.preventDefault() — page refreshes, state lost!
<form onSubmit={handleSubmit}>
```

**The Solution:**

```jsx
const handleSubmit = (e) => {
  e.preventDefault();  // Stop the refresh!
  // Now process the form data
  console.log('Submitting:', formData);
};
```

**Demonstrate the problem:** Remove `e.preventDefault()` and submit. Watch the page refresh and all state disappear!

---

### 3. Validation Patterns

**On Submit (simplest):**

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!name) {
    setError('Name is required');
    return;  // Stop here
  }
  
  // Proceed with valid data
};
```

**Per-field errors:**

```jsx
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!name) newErrors.name = 'Name required';
  if (!email.includes('@')) newErrors.email = 'Invalid email';
  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validate();
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
  // All valid!
};
```

**Display errors:**

```jsx
<input value={name} onChange={...} className={errors.name ? 'error' : ''} />
{errors.name && <span className="error-msg">{errors.name}</span>}
```

---

### 4. Managing Multiple Inputs

**Separate state (simple forms):**

```jsx
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [house, setHouse] = useState('');
```

**Object state (scales better):**

```jsx
const [form, setForm] = useState({
  name: '',
  email: '',
  house: ''
});

// One handler for all inputs
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};

// Inputs use name attribute
<input name="name" value={form.name} onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />
```

**When to use which:**
- 1-2 inputs → separate state is fine
- 3+ inputs → object state is cleaner
- Need to reset all at once → object state (`setForm(initialState)`)

---

## Quests Overview

### Quest 1: Battle Signup (Form Validation)
**Difficulty**: ⭐⭐ Intermediate  
**Time estimate**: 25-30 minutes

Students create a battle registration form with text input, select dropdown, and radio buttons.

**What they practice:**
- Multiple controlled input types
- Form submission with `e.preventDefault()`
- Per-field validation
- Error message display
- Success state handling

**Common struggles:**
- Forgetting `e.preventDefault()` (page refreshes!)
- Radio button `checked` vs `value` confusion
- Not clearing errors when user fixes input

**Key teaching moment:**
```jsx
// Radio buttons need both checked AND onChange
<input 
  type="radio" 
  name="role" 
  value="attacker"
  checked={role === 'attacker'}  // Is this one selected?
  onChange={(e) => setRole(e.target.value)}  // Update on click
/>
```

---

### Quest 2: Spell Search (Controlled Inputs + Filtering)
**Difficulty**: ⭐⭐ Intermediate  
**Time estimate**: 25-30 minutes

Students build a searchable spell directory with live filtering.

**What they practice:**
- Controlled text input
- Filtering arrays based on state
- Displaying filtered results
- Clearing/resetting state

**Common struggles:**
- Case-sensitive search (need `.toLowerCase()`)
- Filter logic (use `.includes()` or `.startsWith()`)
- Updating results on every keystroke

**Key teaching moment:**
```jsx
// Filter is derived from state, NOT stored in state
const filteredSpells = spells.filter(spell =>
  spell.name.toLowerCase().includes(search.toLowerCase())
);

// NOT: setFilteredSpells(...)
// Just calculate it from current state!
```

---

### Quest 3: Sorting Ceremony (Multi-Step Form)
**Difficulty**: ⭐⭐⭐ Advanced  
**Time estimate**: 35-40 minutes

Students build a 3-step wizard form with navigation.

**What they practice:**
- Step state tracking
- Conditional rendering (which step to show)
- Next/Back navigation logic
- Accumulating data across steps
- Final summary display

**Common struggles:**
- Tracking current step (`useState(1)`)
- Preventing empty step submissions
- Keeping data from previous steps

**Key teaching moment:**
```jsx
const [step, setStep] = useState(1);
const [data, setData] = useState({
  name: '', house: '',    // Step 1
  familiar: '',           // Step 2
  wand: ''                // Step 3
});

// Render based on step
{step === 1 && <StepOne />}
{step === 2 && <StepTwo />}
{step === 3 && <StepThree />}
{step === 4 && <Summary data={data} />}

// Navigation
const nextStep = () => setStep(s => s + 1);
const prevStep = () => setStep(s => s - 1);
```

---

### Bonus Quest: Roster Manager (Array State)
**Difficulty**: ⭐⭐⭐ Advanced  
**Time estimate**: 35-40 minutes

Students combine forms with array CRUD operations.

**What they practice:**
- Form submission to add items to array
- Deleting items from array (filter)
- Editing items (map + conditional update)
- Derived calculations (count, average)

**Common struggles:**
- Generating unique IDs (`Date.now()` or counter)
- Immutable array updates
- Clearing form after submission

**Key teaching moment:**
```jsx
// Add to array
const handleAdd = (e) => {
  e.preventDefault();
  setStudents([
    ...students,
    { id: Date.now(), name, house, level }
  ]);
  setName('');  // Clear form
};

// Remove from array
const handleDelete = (id) => {
  setStudents(students.filter(s => s.id !== id));
};
```

---

## Teaching Sequence

### Suggested Flow

1. **Slides: Forms Introduction** (10-12 min)
   - Run from `slides/` folder: `npm install && npm run dev`
   - Cover: Controlled components, form submission, validation
   - Use arrow keys to navigate

2. **Demo: Message Owl Service** (15 min)
   - Walk through the complete form
   - Show what happens WITHOUT `e.preventDefault()` (page refresh!)
   - Show the validation flow
   - Highlight the dynamic `handleChange` pattern

3. **Quest 1: Battle Signup** (25-30 min)
   - Students build registration form
   - Circulate to help with radio buttons
   - Common issue: forgetting `e.preventDefault()`

4. **Mini-lecture: Filtering Patterns** (5 min)
   - Show how filter is derived, not stored
   - Explain case-insensitive search
   - Preview Quest 2

5. **Quest 2: Spell Search** (25-30 min)
   - Students build searchable directory
   - Help with filter logic
   - Common issue: storing filtered results in state (don't!)

6. **Mini-lecture: Multi-Step Forms** (5 min)
   - Show step state pattern
   - Explain conditional rendering by step
   - Preview Quest 3

7. **Quest 3: Sorting Ceremony** (35-40 min)
   - Students build wizard form
   - Help with step navigation logic
   - Common issue: losing data between steps

8. **Wrap-up** (5 min)
   - Recap: Controlled components, preventDefault, validation
   - Preview: Module 5 covers useEffect and data fetching
   - Mention: Bonus quest available for array state practice

---

## Common Questions

**Q: Why does my form refresh the page?**
A: Missing `e.preventDefault()` in your submit handler. By default, HTML forms refresh the page when submitted. React needs you to prevent that behavior.

**Q: What's the difference between `value` and `checked` on inputs?**
A:
- Text, number, select, textarea → use `value`
- Checkbox, radio → use `checked` (and still use `onChange`)

**Q: Why use object state instead of separate useState calls?**
A: 
- Easier to reset the whole form: `setForm(initialState)`
- One handler for all inputs (using `name` attribute)
- Scales better with more fields
- Matches how form data is typically sent to servers

**Q: My input won't let me type anything!**
A: You have `value={...}` but no `onChange` handler. Without `onChange`, React prevents changes. Add: `onChange={(e) => setState(e.target.value)}`

**Q: How do I validate as the user types?**
A: Run validation in your `onChange` handler:
```jsx
const handleChange = (e) => {
  const value = e.target.value;
  setName(value);
  
  // Validate immediately
  if (value.length < 3) {
    setError('Name must be at least 3 characters');
  } else {
    setError('');
  }
};
```

**Q: Should I validate on blur instead of change?**
A: Both are valid approaches:
- On change: Immediate feedback, but can be annoying
- On blur: Waits until user leaves field, less intrusive
- On submit: Simplest, validates all at once

---

## Troubleshooting

### "Page refreshes when I submit"
- Missing `e.preventDefault()` in submit handler
- Make sure handler is attached to form's `onSubmit`, not button's `onClick`

### "Input shows [object Object]"
- You're setting state to an event object instead of its value
- Use `e.target.value`, not just `e`

### "Checkbox doesn't toggle"
- Using `value` instead of `checked`
- Use: `checked={isChecked}` and `onChange={e => setIsChecked(e.target.checked)}`

### "Radio buttons all select at once"
- Same `name` but wrong `checked` logic
- Each radio needs: `checked={state === 'thisValue'}`

### "Select dropdown doesn't show initial value"
- Default `<option>` needs same value as initial state
- Or add: `<option value="">Select...</option>`

### "Filter shows no results"
- Case sensitivity: use `.toLowerCase()` on both sides
- Typo in property name (check `spell.name` exists)
- Filter function returns false for everything

### "Multi-step form loses data"
- Each step overwrites state instead of merging
- Use spread: `setData({ ...data, newField: value })`

---

## Event Handler Patterns

### The `e.target` Object

When an input changes, `e.target` contains:
- `value` — Current input value (text, number, select)
- `checked` — Boolean for checkbox/radio
- `name` — The name attribute (useful for object state)
- `type` — Input type (text, checkbox, etc.)

```jsx
const handleChange = (e) => {
  console.log(e.target.value);   // "hello"
  console.log(e.target.name);    // "username"
  console.log(e.target.type);    // "text"
};
```

### Common Handler Patterns

```jsx
// Inline handler (simple cases)
<input onChange={(e) => setName(e.target.value)} />

// Named handler (more complex)
const handleNameChange = (e) => {
  const value = e.target.value;
  // validation, formatting, etc.
  setName(value);
};
<input onChange={handleNameChange} />

// Generic handler (object state)
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};
<input name="email" onChange={handleChange} />
```

---

## Files Reference

```
module-04-forms-events/
├── README.md                    # Student-facing overview
├── INSTRUCTOR_NOTES.md          # This file
├── slides/                      # Slide deck for forms intro
│   ├── package.json
│   └── src/App.jsx
├── demo/                        # Message Owl Service form
│   └── src/App.jsx
├── quest-01-form-validation/    # Battle Signup (validation)
│   ├── README.md
│   ├── starter/
│   └── solution/
├── quest-02-controlled-inputs/  # Spell Search (filtering)
│   ├── README.md
│   ├── starter/
│   └── solution/
├── quest-03-form-submission/    # Sorting Ceremony (multi-step)
│   ├── README.md
│   ├── starter/
│   └── solution/
└── quest-04-bonus-array-state/  # Roster Manager (CRUD)
    ├── README.md
    ├── starter/
    └── solution/
```

---

## Preparation Checklist

- [ ] Test `npm install` and `npm run dev` in all demo/quest folders
- [ ] Review quest solutions
- [ ] Prepare to demonstrate `e.preventDefault()` removal (page refresh)
- [ ] Know the difference between `value` and `checked` props
- [ ] Understand the dynamic `[name]: value` pattern
- [ ] Be ready to explain computed property names in ES6
- [ ] Have examples of validation patterns ready
- [ ] Test the slides: `cd slides && npm install && npm run dev`
- [ ] Prepare to show case-insensitive filtering

---

## React 19 Note

The README mentions React 19 Actions (`useFormStatus`, `useActionState`). These are covered in the README's "React 19" section as an advanced/optional topic. For the main teaching flow, focus on traditional controlled component patterns first — they build the foundation for understanding why Actions are useful.

If students ask about Actions:
- They're a newer pattern for form submission
- Automatically track pending states
- Integrate with Server Components
- We cover them properly in Module 13 (Server Rendering)
