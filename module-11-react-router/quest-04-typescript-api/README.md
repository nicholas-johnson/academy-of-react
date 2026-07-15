# Quest 4: The Artifact Vault

Build a TypeScript app that fetches magic items from a real API and displays them with routing. The home page lists all items; clicking one navigates to a detail page.

> This quest uses the free [D&D 5e SRD API](https://www.dnd5eapi.co). You need an internet connection to run it.

## Requirements

- Define shared TypeScript interfaces for the API responses in `types/api.ts`
- Use the provided generic `fetchJson<T>` helper in `api/client.ts` to call the API
- Build a Home page that fetches and displays the magic item list
- Build an ItemDetail page that reads the item index from the URL and fetches its detail
- Handle loading, error, and not-found states on both pages
- Use `useNavigate` for a back button on the detail page

## API Endpoints

**List all magic items:**

```
GET https://www.dnd5eapi.co/api/2014/magic-items
→ { count: number, results: [{ index: string, name: string, url: string }] }
```

**Get one magic item:**

```
GET https://www.dnd5eapi.co/api/2014/magic-items/{index}
→ { index, name, desc: string[], rarity: { name }, equipment_category: { index, name }, image? }
```

## Acceptance Criteria

- [ ] `ResourceSummary`, `ApiListResponse`, and `MagicItemDetail` interfaces defined in `types/api.ts`
- [ ] Home page fetches the list on mount and shows item cards
- [ ] Each card is a `Link` to `/items/{index}`
- [ ] Detail page reads `itemIndex` from the URL with `useParams`
- [ ] Detail page fetches and displays the item name, rarity, category, and description
- [ ] Loading state shown while requests are in flight
- [ ] Errors and invalid indexes display a clear message
- [ ] Back button uses `useNavigate(-1)` to return to the list

## Hints

- `useParams` always returns strings (or `undefined`). Narrow the type with `useParams<{ itemIndex: string }>()`
- The detail endpoint returns `desc` as an **array of strings** — map over it to render paragraphs
- `fetchJson<T>` uses a generic so TypeScript knows the return type — pass your interface as the type argument: `fetchJson<ApiListResponse>(...)`
- Remember to handle the case where `itemIndex` is `undefined` before fetching
- The fetch helper is already provided in the starter — focus on the types and the pages

[← Previous](../quest-03-protected-routes/)
