# TypeScript with React

## Overview

TypeScript is a **typed superset of JavaScript** that compiles to plain JavaScript. It adds static type checking, which catches errors at compile time rather than runtime, making your code more reliable and easier to refactor.

This module covers TypeScript fundamentals and how to use TypeScript effectively with React.

## Why TypeScript?

**JavaScript:**

```js
function greet(name) {
  return `Hello, ${name.toUpperCase()}!`;
}

greet(42); // Runtime error: name.toUpperCase is not a function
```

**TypeScript:**

```ts
function greet(name: string): string {
  return `Hello, ${name.toUpperCase()}!`;
}

greet(42); // Compile error: Argument of type 'number' is not assignable to parameter of type 'string'
```

### Benefits

- **Catch errors early** — Before your code runs
- **Better IDE support** — Autocomplete, refactoring, go-to-definition
- **Self-documenting** — Types describe what code expects
- **Safer refactoring** — Rename a prop and see all usages
- **Better team collaboration** — Types serve as contracts

### Trade-offs

- **Learning curve** — New syntax and concepts
- **More verbose** — Extra type annotations
- **Build step required** — Must compile to JavaScript
- **Some type gymnastics** — Advanced types can get complex

## Setup with Vite + React

### New Project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

### Key Files

- `tsconfig.json` — TypeScript compiler configuration
- `*.tsx` — React components with TypeScript
- `*.ts` — Plain TypeScript files
- `vite-env.d.ts` — Vite type declarations

## TypeScript Fundamentals

### Basic Types

```ts
// Primitives
const name: string = "Merlin";
const age: number = 150;
const isWizard: boolean = true;

// Arrays
const spells: string[] = ["Fireball", "Ice Shard", "Lightning"];
const scores: number[] = [95, 87, 92];
const mixed: (string | number)[] = ["Merlin", 150];

// Alternative array syntax
const powers: Array<number> = [100, 200, 300];

// Tuple (fixed length, specific types at each position)
const wizard: [string, number] = ["Merlin", 150];

// null and undefined
const nothing: null = null;
const notDefined: undefined = undefined;
```

### Type Inference

TypeScript can often infer types automatically:

```ts
// TypeScript infers these types
const name = "Merlin"; // string
const age = 150; // number
const spells = ["Fireball"]; // string[]

// No need to annotate when it's obvious
let count = 0; // number
count = "five"; // Error: Type 'string' is not assignable to type 'number'
```

### Objects and Interfaces

```ts
// Inline object type
const wizard: { name: string; power: number } = {
  name: "Merlin",
  power: 100,
};

// Interface (preferred for objects)
interface Wizard {
  name: string;
  power: number;
  house: string;
}

const merlin: Wizard = {
  name: "Merlin",
  power: 100,
  house: "Gryffin",
};

// Optional properties
interface Spell {
  name: string;
  damage: number;
  description?: string; // Optional
}

const fireball: Spell = {
  name: "Fireball",
  damage: 50,
  // description is optional, so we can omit it
};

// Readonly properties
interface Config {
  readonly apiUrl: string;
  readonly maxRetries: number;
}
```

### Type Aliases

```ts
// Type alias for primitives or unions
type ID = string | number;
type House = "Gryffin" | "Serpent" | "Raven" | "Badger";

const odricId: ID = "wiz-001";
const house: House = "Gryffin";
const invalidHouse: House = "Hufflepuff"; // Error: not assignable

// Type alias for objects (similar to interface)
type Potion = {
  name: string;
  effect: string;
  duration: number;
};

// When to use type vs interface?
// - Interface: for objects, especially when extending
// - Type: for unions, primitives, tuples, or complex types
```

### Union Types

```ts
// A value can be one of several types
type StringOrNumber = string | number;

function printId(id: string | number) {
  console.log(`ID: ${id}`);
}

printId(101); // OK
printId("abc"); // OK
printId(true); // Error

// Literal unions (specific values)
type Direction = "north" | "south" | "east" | "west";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function move(direction: Direction) {
  console.log(`Moving ${direction}`);
}

move("north"); // OK
move("up"); // Error: not in union
```

### Functions

```ts
// Parameter and return types
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional parameters
function greet(name: string, title?: string): string {
  return title ? `Hello, ${title} ${name}` : `Hello, ${name}`;
}

greet("Merlin"); // "Hello, Merlin"
greet("Merlin", "Professor"); // "Hello, Professor Merlin"

// Default parameters
function createWizard(name: string, power: number = 100): Wizard {
  return { name, power, house: "Unknown" };
}

// Rest parameters
function sumAll(...numbers: number[]): number {
  return numbers.reduce((sum, n) => sum + n, 0);
}

// Function type
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
```

### Generics

Generics let you write reusable code that works with multiple types:

```ts
// Generic function
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello"); // Returns string
identity<number>(42); // Returns number
identity("hello"); // Type inferred as string

// Generic interface
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

// Generic with constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello"); // OK, strings have length
logLength([1, 2, 3]); // OK, arrays have length
logLength(123); // Error: number doesn't have length

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result = pair("Merlin", 100); // [string, number]
```

### Narrowing

TypeScript narrows types based on control flow:

```ts
function printValue(value: string | number) {
  // TypeScript doesn't know if it's string or number here

  if (typeof value === "string") {
    // TypeScript knows it's a string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows it's a number here
    console.log(value.toFixed(2));
  }
}

// Narrowing with in operator
interface Wizard {
  castSpell: () => void;
}

interface Warrior {
  swing: () => void;
}

function attack(character: Wizard | Warrior) {
  if ("castSpell" in character) {
    character.castSpell();
  } else {
    character.swing();
  }
}

// Narrowing with instanceof
function processDate(date: Date | string) {
  if (date instanceof Date) {
    console.log(date.getFullYear());
  } else {
    console.log(new Date(date).getFullYear());
  }
}
```

### Utility Types

TypeScript provides built-in utility types:

```ts
interface Wizard {
  name: string;
  power: number;
  house: string;
  spells: string[];
}

// Partial - all properties optional
type PartialWizard = Partial<Wizard>;
const update: PartialWizard = { power: 150 };

// Required - all properties required
type RequiredWizard = Required<Wizard>;

// Pick - select specific properties
type WizardPreview = Pick<Wizard, "name" | "house">;
const preview: WizardPreview = { name: "Merlin", house: "Gryffin" };

// Omit - exclude specific properties
type WizardWithoutSpells = Omit<Wizard, "spells">;

// Record - object with specific key/value types
type HousePowers = Record<string, number>;
const powers: HousePowers = {
  Gryffin: 100,
  Serpent: 95,
};

// Readonly - all properties readonly
type FrozenWizard = Readonly<Wizard>;
```

## TypeScript with React

### Typing Props

```tsx
// Interface for props
interface WizardCardProps {
  name: string
  power: number
  house: string
  onSelect?: () => void  // Optional callback
}

function WizardCard({ name, power, house, onSelect }: WizardCardProps) {
  return (
    <div onClick={onSelect}>
      <h2>{name}</h2>
      <p>Power: {power}</p>
      <p>House: {house}</p>
    </div>
  )
}

// Usage
<WizardCard name="Merlin" power={100} house="Gryffin" />
<WizardCard name="Merlin" power={100} house="Gryffin" onSelect={() => console.log('selected')} />
```

### Props with Children

```tsx
// Method 1: Explicit children prop
interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Method 2: PropsWithChildren utility
import { PropsWithChildren } from "react";

interface CardProps {
  title: string;
}

function Card({ title, children }: PropsWithChildren<CardProps>) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### Typing useState

```tsx
import { useState } from "react";

// Type is inferred from initial value
const [count, setCount] = useState(0); // number
const [name, setName] = useState("Merlin"); // string
const [isActive, setIsActive] = useState(false); // boolean

// Explicit type when needed
const [wizard, setWizard] = useState<Wizard | null>(null);

// Array state
const [spells, setSpells] = useState<string[]>([]);

// Object state
interface FormData {
  name: string;
  email: string;
}
const [form, setForm] = useState<FormData>({ name: "", email: "" });
```

### Typing useReducer

```tsx
import { useReducer } from "react";

// State type
interface CounterState {
  count: number;
}

// Action types (discriminated union)
type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "set"; payload: number };

// Reducer function
function counterReducer(
  state: CounterState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "set":
      return { count: action.payload };
    default:
      return state;
  }
}

// Usage
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "set", payload: 100 })}>
        Set to 100
      </button>
    </div>
  );
}
```

### Typing useRef

```tsx
import { useRef, useEffect } from "react";

// DOM element ref
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}

// Mutable value ref (doesn't trigger re-render)
function Timer() {
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    intervalRef.current = window.setInterval(() => {
      console.log("tick");
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

// Common ref types
// HTMLInputElement, HTMLButtonElement, HTMLDivElement
// HTMLFormElement, HTMLTextAreaElement, HTMLSelectElement
```

### Typing useContext

```tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Define context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // API call...
    setUser({ id: "1", name: "Merlin", email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook with type safety
function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Usage
function Profile() {
  const { user, logout } = useAuth();

  if (!user) return <p>Not logged in</p>;

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Typing Events

```tsx
import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";

function Form() {
  const [value, setValue] = useState("");

  // Input change event
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Form submit event
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted:", value);
  };

  // Button click event
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("Clicked at:", e.clientX, e.clientY);
  };

  // Select change event
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected:", e.target.value);
  };

  // Textarea change event
  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Text:", e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit" onClick={handleClick}>
        Submit
      </button>
    </form>
  );
}

// Event types summary:
// ChangeEvent<HTMLInputElement>   - input, checkbox, radio
// ChangeEvent<HTMLSelectElement>  - select dropdown
// ChangeEvent<HTMLTextAreaElement> - textarea
// FormEvent<HTMLFormElement>      - form submit
// MouseEvent<HTMLButtonElement>   - click, mouseenter, etc.
// KeyboardEvent<HTMLInputElement> - keydown, keyup, keypress
// FocusEvent<HTMLInputElement>    - focus, blur
```

### Typing Custom Hooks

```tsx
import { useState, useEffect } from "react";

// Hook with generic type
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

// Usage
const [name, setName] = useLocalStorage<string>("name", "Merlin");
const [settings, setSettings] = useLocalStorage<Settings>(
  "settings",
  defaultSettings,
);

// Hook returning an object
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Usage
const { data, loading, error } = useFetch<Wizard[]>("/api/wizards");
```

### Extending HTML Element Props

```tsx
import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

// Extend button props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

function Button({
  variant = "primary",
  loading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button disabled={loading} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
}

// All native button props work
<Button type="submit" onClick={() => {}} variant="primary">
  Submit
</Button>;

// Extend input props
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function TextInput({ label, error, ...props }: TextInputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

## Common Patterns

### Discriminated Unions for State

```tsx
// Loading states
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function WizardList() {
  const [state, setState] = useState<AsyncState<Wizard[]>>({ status: "idle" });

  // TypeScript narrows based on status
  if (state.status === "loading") {
    return <p>Loading...</p>;
  }

  if (state.status === "error") {
    return <p>Error: {state.error.message}</p>;
  }

  if (state.status === "success") {
    return (
      <ul>
        {state.data.map((w) => (
          <li key={w.name}>{w.name}</li>
        ))}
      </ul>
    );
  }

  return <button onClick={fetchWizards}>Load Wizards</button>;
}
```

### Type-Safe API Responses

```tsx
// Define API response types
interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}

interface Wizard {
  id: string;
  name: string;
  power: number;
}

// Type-safe fetch function
async function fetchWizards(): Promise<ApiResponse<Wizard[]>> {
  const response = await fetch("/api/wizards");
  return response.json();
}

// Usage
const { data: wizards, meta } = await fetchWizards();
// wizards is typed as Wizard[]
// meta is typed as { total, page, perPage }
```

### as const for Literal Types

```tsx
// Without as const
const houses = ["Gryffin", "Serpent", "Raven", "Badger"];
// Type: string[]

// With as const
const houses = ["Gryffin", "Serpent", "Raven", "Badger"] as const;
// Type: readonly ['Gryffin', 'Serpent', 'Raven', 'Badger']

type House = (typeof houses)[number];
// Type: 'Gryffin' | 'Serpent' | 'Raven' | 'Badger'

// Great for config objects
const config = {
  apiUrl: "https://api.academy.com",
  maxRetries: 3,
} as const;
// All properties are readonly and literal types
```

## VS Code Setup

Install these extensions for the best TypeScript experience:

1. **TypeScript and JavaScript Language Features** (built-in)
2. **ESLint** — Catch common issues
3. **Prettier** — Format code consistently

### Useful Settings

```json
// settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

## Common Mistakes

### 1. Using `any` Too Often

```tsx
// Bad
const data: any = fetchData();

// Good
interface Data {
  id: string;
  value: number;
}
const data: Data = fetchData();

// If truly unknown, use unknown
const data: unknown = fetchData();
if (isData(data)) {
  // Now it's typed
}
```

### 2. Not Handling null/undefined

```tsx
// Bad - might crash
function getName(user: User | null) {
  return user.name; // Error if user is null
}

// Good - handle the case
function getName(user: User | null) {
  return user?.name ?? "Anonymous";
}
```

### 3. Over-Typing

```tsx
// Unnecessary - TypeScript infers this
const count: number = 0;
const name: string = "Merlin";

// Better - let TypeScript infer
const count = 0;
const name = "Merlin";

// Type when inference isn't enough
const [user, setUser] = useState<User | null>(null);
```

## Exercises

### Exercise 1: Type a Wizard Battle System

Create types for:

- `Wizard` (name, health, mana, spells)
- `Spell` (name, damage, manaCost, element)
- `BattleState` (wizards, currentTurn, log)
- `BattleAction` (attack, defend, cast spell)

### Exercise 2: Type-Safe Form

Build a registration form with:

- Typed form state
- Typed validation errors
- Typed submit handler
- Proper event types

### Exercise 3: Generic Data Fetching Hook

Create `useFetch<T>` hook with:

- Generic response type
- Loading/error/success states
- Abort controller support
- Typed error handling

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Total TypeScript](https://www.totaltypescript.com/) — Free tutorials
- [TypeScript Playground](https://www.typescriptlang.org/play) — Try TypeScript online

---

**This is an extras module** — not part of the main course flow. TypeScript is introduced in Module 8 (Built-in Hooks), but this reference covers fundamentals more deeply. Use it as a reference or primer before Phase 3.
