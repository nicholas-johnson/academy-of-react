# Quest 4: The Artifact Vault - Solution Notes

## Key Concepts

### 1. Shared Type Definitions

All API types live in a single file (`types/api.ts`) and are imported by every module that touches API data. This keeps the contract in one place — if the API changes shape, you update one file.

```ts
export interface ResourceSummary {
  index: string;
  name: string;
  url: string;
}

export interface ApiListResponse {
  count: number;
  results: ResourceSummary[];
}
```

### 2. Generic Fetch Helper

`fetchJson<T>` is a small wrapper around `fetch` that handles JSON parsing and error checking. The generic parameter `T` lets callers specify the return type:

```ts
async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// Usage — TypeScript knows `data` is ApiListResponse
const data = await fetchJson<ApiListResponse>("/api/2014/magic-items");
```

### 3. Typing useParams

React Router's `useParams` returns `string | undefined` for every parameter. You can narrow the type with a generic:

```ts
const { itemIndex } = useParams<{ itemIndex: string }>();
```

The value is still `string | undefined` at runtime — you need to guard against `undefined` before using it.

### 4. State with Union Types

Each page manages loading / error / success states. TypeScript enforces you handle every case:

```ts
const [items, setItems] = useState<ResourceSummary[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

`error` is typed as `string | null` so `null` means "no error" and a string carries the message.

## Real-World Applications

- Typed API clients prevent runtime crashes from unexpected response shapes
- Shared types act as a contract between the API layer and UI components
- Generic fetch helpers reduce boilerplate across many endpoints
- The same pattern scales to REST clients with dozens of endpoints
