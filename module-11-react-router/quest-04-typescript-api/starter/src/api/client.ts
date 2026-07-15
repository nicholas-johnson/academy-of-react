const BASE_URL = "https://www.dnd5eapi.co";

// TODO: Create a generic fetchJson<T> function
// It should:
//   1. Accept a path string (e.g. "/api/2014/magic-items")
//   2. Fetch from BASE_URL + path
//   3. Throw an Error if the response is not ok
//   4. Return the parsed JSON typed as T
//
// Example usage:
//   const data = await fetchJson<ApiListResponse>("/api/2014/magic-items")

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
