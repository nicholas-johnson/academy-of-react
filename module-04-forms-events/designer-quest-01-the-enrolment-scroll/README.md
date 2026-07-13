# Designer Quest: The Enrolment Scroll

> **Quick Start:** A starter template is in the `starter/` folder with Vite already configured. Just run `npm install` and `npm run dev` to begin!

## Story

The Academy's enrolment form is *functional* — students can fill it in, hit submit, and get enrolled. But there are problems. The success message is generic ("Welcome to the Academy…"), the error messages are ugly red text with no styling, and a brand-new house just opened — **House Unicorn** — but nobody's added it to the dropdown yet.

Professor Hooksweasel has asked you to fix these three things and make the error/success states look polished. You'll be editing inside a **function** for the first time — but don't worry. You're not writing one from scratch. You're just changing what's already there.

---

## What's a Function?

> A **function** is a recipe — a set of steps that runs when triggered. In this form, `handleSubmit` is a function that runs when someone clicks "Enrol." It checks the form for errors and, if everything is valid, sets a success message. You're changing what one of its steps *does* (the message text), not writing the recipe from scratch.

---

## Getting Started

```bash
cd starter
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`). You should see a dark-themed enrolment form with fields for name, email, house, and level. It looks polished — the form itself is styled — but try submitting with a short name or missing @ in the email. The error messages are ugly red text. And when you do enrol successfully, the success message is a boring paragraph with no style.

---

## Task 1 — Add a New House

**Open:** `src/App.jsx`

The house dropdown currently has 4 options: Phoenix, Dragon, Griffin, and Serpent. You're adding a 5th — House Unicorn (or any house name you like).

**Find** the `<select>` section. Look at how the existing options are written:

```jsx
<option value="Phoenix">Phoenix</option>
<option value="Dragon">Dragon</option>
<option value="Griffin">Griffin</option>
<option value="Serpent">Serpent</option>
{/* 🎨 TASK 1 — Add a new house option below this line. */}
```

**Copy** one of those lines, paste it below the comment, and change the house name:

```jsx
<option value="Unicorn">Unicorn</option>
```

This is just like adding an `<option>` in regular HTML. The `value` is what the code uses internally; the text between the tags is what the user sees.

**You're done when:** the dropdown shows 5 houses instead of 4.

---

## Task 2 — Change the Success Message

**Open:** `src/App.jsx`

This is where you edit inside a function for the first time. Don't panic — you're changing one line inside a function that already exists and already works.

**Find** the line that looks like this (it has a 🎨 TASK 2 comment above it):

```jsx
setSuccessMessage(`Welcome to the Academy, ${name}! You've been sorted into House ${house}.`);
```

**Change** the text between the backticks (`` ` ` ``) to your own welcome message. You can use these special placeholders — they get replaced with what the student typed:

- `${name}` — the student's name
- `${house}` — the house they chose
- `${level}` — their starting level

For example:

```jsx
setSuccessMessage(`Congratulations, ${name}! House ${house} welcomes you to the Academy. Your magical journey begins at Level ${level}! 🎉`);
```

> **You're not writing a function.** You're changing one string inside one that already exists. The function handles the rest — preventing the page from refreshing, checking for errors, and showing your message at the right time.

**You're done when:** submitting a valid form shows your custom message instead of the generic one.

---

> ### Try It
>
> Fill in the form with a valid name (3+ characters), an email with an @, and click **Enrol**. You should see your new message appear above the form. Then try submitting with a name that's only 1-2 characters to see the validation kick in.

---

## Task 3 — Change the Minimum Name Length

**Open:** `src/App.jsx`

Still inside the `handleSubmit` function, there's a validation section. Find this line (it has a 🎨 TASK 3 comment above it):

```jsx
if (name.length < 3) {
```

The number `3` means "names must be at least 3 characters long." Change it to a different number:

- `2` makes it less strict (allows "Jo")
- `5` makes it more strict (rejects "Amy")

Pick a number and try submitting with names of different lengths to see it work.

**You're done when:** the validation accepts or rejects names based on your new minimum.

---

> ### Try It
>
> After changing the number, try submitting with names of different lengths. If you set it to `5`, "Max" should fail but "Maxine" should pass. The error message will still say the old number — bonus challenge: update the text in the quotes on the next line too!

---

## Task 4 — Style the Error and Success States

This is the design task. The form looks good, but errors and success messages are ugly. You'll fix both the JSX (to use class names) and the CSS (to style those classes).

### Part A — Error Messages

**Open:** `src/App.jsx`

Find the three error `<span>` elements. They currently look like this:

```jsx
{errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
```

**Change each one** to use a class name instead of inline style:

```jsx
{errors.name && <span className="error-message">{errors.name}</span>}
```

Do this for all three: `errors.name`, `errors.email`, and `errors.level`.

### Part B — Success Banner

Still in `src/App.jsx`, find the success message (near the top of the return):

```jsx
{submitted && (
  <p>{successMessage}</p>
)}
```

**Change it** to a styled div:

```jsx
{submitted && (
  <div className="success-banner">🎉 {successMessage}</div>
)}
```

### Part C — Write the CSS

**Open:** `src/App.css`

Find the empty `.error-message` and `.success-banner` classes at the bottom. Fill them in:

```css
.error-message {
  font-size: 0.8rem;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  padding: 0.4rem 0.75rem;
  margin-top: 0.25rem;
}

.success-banner {
  background: #065f46;
  color: white;
  padding: 1.25rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  text-align: center;
  border: 1px solid #059669;
}
```

Feel free to change the colours, sizes, and effects. Make it yours.

**You're done when:** errors appear as tinted, rounded messages below each field, and the success state shows a celebratory green banner above the form.

---

## What the JavaScript Was Doing

You didn't write any functions in this quest — you edited inside one. Here's what was happening behind the scenes:

**`handleSubmit`** is a function that runs when the form is submitted. It:
1. Prevents the page from refreshing (that's what `e.preventDefault()` does)
2. Checks each field against its rules (validation)
3. If anything's wrong, stores error messages in `errors` state
4. If everything's valid, stores your success message and sets `submitted` to true

**`handleChange`** is a function that runs every time you type in a field. It figures out *which* field changed and updates the right piece of state.

**`useState`** creates a piece of data that React watches. When it changes, React re-renders the form to show the new value (like showing/hiding an error, or displaying the success banner).

You changed values inside these functions — a message string, a number — but the functions' *structure* (when they run, what they check, how they update the screen) stayed the same. That's the power of well-organised code: different people can work on different parts.

---

**Next:** In the next module, you'll see how components can fetch data from an API and display it — bringing in information from outside the app.
