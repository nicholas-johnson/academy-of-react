# Module 3: State with useState

Everything you've built so far is static. Props flow down from parent to child, but nothing ever *changes*. Click a button and... nothing happens. Type in an input and... the UI ignores you. That's not much of an application.

**State** is how React components remember things that change over time. A counter's current number, whether a menu is open, what the user typed in a search box — these are all state. When state changes, React automatically re-renders the component to reflect the new reality. This is the core of React's reactivity: you update data, and the UI follows.

## The useState Hook

To add state to a component, call `useState` with an initial value. It returns two things: the current value and a function to update it:

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add One</button>
    </div>
  )
}
```

When the user clicks the button, `setCount` is called with the new value. React then re-renders the component, and this time `count` holds `1` instead of `0`. The paragraph updates automatically.

The naming convention `[thing, setThing]` is just convention — you could name them anything. But the pattern is universal in React codebases, so stick with it.

## Events: Responding to Users

State changes in response to **events**. React uses camelCase event names as props:

```jsx
<button onClick={handleClick}>Click me</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>
```

You can pass an inline arrow function or reference a named function:

```jsx
function WizardCard() {
  const [level, setLevel] = useState(1)

  const levelUp = () => setLevel(level + 1)

  return (
    <div>
      <p>Level: {level}</p>
      <button onClick={levelUp}>Level Up</button>
      <button onClick={() => setLevel(1)}>Reset</button>
    </div>
  )
}
```

A quick note on semantics: use `<button>` for actions (clicking does something) and `<a>` for navigation (clicking goes somewhere). Never put `onClick` on a `<div>` — it's inaccessible to keyboard users and screen readers.

## Multiple State Variables

A component can call `useState` as many times as it needs. Each call is independent:

```jsx
function WizardProfile() {
  const [name, setName] = useState('')
  const [house, setHouse] = useState('Liondudes')
  const [level, setLevel] = useState(1)

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>{name} | {house} | Level {level}</p>
      <button onClick={() => setLevel(level + 1)}>Level Up</button>
    </div>
  )
}
```

Each piece of state updates independently. Changing `name` doesn't affect `level` or `house`.

## Controlled Inputs

That `<input>` above demonstrates a key React pattern: the **controlled component**. The input's displayed value comes from state (`value={name}`), and typing triggers `onChange` which updates state, which re-renders the input with the new value.

This round trip happens so fast it feels instantaneous, but it means React is always the "source of truth" for what the input contains. This enables validation, formatting, and synchronising the input value with other parts of your UI:

```jsx
function SearchFilter() {
  const [query, setQuery] = useState('')

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search spells..."
      />
      <p>Searching for: {query || 'everything'}</p>
    </div>
  )
}
```

The paragraph always shows what's in the input — they're kept in sync automatically by sharing the same state.

## Object State

Sometimes related values belong together. You can store an object in state, but you must replace the *entire* object when updating — never mutate it directly:

```jsx
function WizardStats() {
  const [stats, setStats] = useState({
    health: 100,
    mana: 80,
    level: 1
  })

  const takeDamage = () => {
    setStats({ ...stats, health: stats.health - 10 })
  }

  const castSpell = () => {
    setStats({ ...stats, mana: stats.mana - 15 })
  }

  return (
    <div>
      <p>Health: {stats.health} | Mana: {stats.mana} | Level: {stats.level}</p>
      <button onClick={takeDamage}>Take Damage</button>
      <button onClick={castSpell}>Cast Spell</button>
    </div>
  )
}
```

The spread operator `...stats` copies all existing properties, then you override the one that changed. This creates a new object, which tells React something changed and a re-render is needed.

**Why not mutate?** If you write `stats.health = 90`, you've changed the object but React doesn't know about it — the reference is the same, so no re-render happens. Always create a new object or array.

## Array State

Arrays follow the same immutability rule. Use `.map()`, `.filter()`, and spread to produce new arrays:

```jsx
function SpellList() {
  const [spells, setSpells] = useState(['Fireball', 'Ice Lance'])

  const addSpell = () => {
    setSpells([...spells, 'New Spell'])
  }

  const removeSpell = (index) => {
    setSpells(spells.filter((_, i) => i !== index))
  }

  return (
    <div>
      <ul>
        {spells.map((spell, i) => (
          <li key={i}>
            {spell} <button onClick={() => removeSpell(i)}>×</button>
          </li>
        ))}
      </ul>
      <button onClick={addSpell}>Add Spell</button>
    </div>
  )
}
```

`[...spells, 'New Spell']` creates a new array with the old items plus one more. `.filter()` creates a new array without the removed item. Neither mutates the original.

## Conditional Rendering

State drives what appears on screen. You can conditionally render elements based on state:

```jsx
function LoginPanel() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (loggedIn) {
    return (
      <div>
        <p>Welcome back, wizard!</p>
        <button onClick={() => setLoggedIn(false)}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <p>Please log in</p>
      <button onClick={() => setLoggedIn(true)}>Login</button>
    </div>
  )
}
```

You can also use the ternary operator inline or `&&` for shorter conditional expressions:

```jsx
<p>{isReady ? 'Ready for battle!' : 'Preparing...'}</p>
{showDetails && <SpellDetails />}
```

## Functional Updates

When your new state depends on the previous state, use the functional form of the setter. This ensures you're working with the latest value, even if multiple updates are batched:

```jsx
setCount(prev => prev + 1)
setSpells(prev => [...prev, newSpell])
setStats(prev => ({ ...prev, health: prev.health - 10 }))
```

This matters most inside event handlers that fire rapidly or when updating state multiple times in the same handler.

## Common Mistakes

**Mutating state directly.** `state.push(item)` or `state.count = 5` won't trigger a re-render. Always use the setter with a new value.

**Reading state right after setting it.** State updates are asynchronous — the new value isn't available until the next render:

```jsx
setCount(count + 1)
console.log(count)  // Still the OLD value!
```

**Forgetting to spread when updating objects.** `setStats({ health: 90 })` replaces the entire object — `mana` and `level` are gone. Always spread the previous values: `setStats({ ...stats, health: 90 })`.

**Using state for things that don't need re-renders.** Not every variable needs to be state. If something doesn't affect the rendered output (a timer ID, a flag you check once), consider `useRef` instead.

## Exercises

Two quests to practise state management:

**Quest 1: Multiple State** — Build an interface with several independent useState hooks that interact with each other.

[Start Quest 1 →](./quest-01-multiple-state/)

**Quest 2: Object State** — Create an interface that manages complex nested state with proper immutability patterns.

[Start Quest 2 →](./quest-02-object-state/)

## Running the Code

```bash
cd demo
npm install
npm run dev
```

Slides cover the react cycle, state vs props, and controlled components:

```bash
cd slides
npm install
npm run dev
```

---

[← Module 2: JSX and Components](../module-02-jsx-components/) | [Module 4: Forms and Events →](../module-04-forms-events/)
