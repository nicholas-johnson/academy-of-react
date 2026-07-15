// TODO: Import useEffect and useState from React
// TODO: Import Link from react-router-dom
// TODO: Import your ApiListResponse and ResourceSummary types
// TODO: Import fetchJson from the api client

export function Home() {
  // TODO: Create state for items (ResourceSummary[]), loading (boolean), and error (string | null)

  // TODO: Use useEffect to fetch the magic items list on mount
  // Endpoint path: "/api/2014/magic-items"
  // Use fetchJson<ApiListResponse> and set the results into state
  // Handle errors by setting the error state
  // Set loading to false when done (in a finally block)

  // TODO: Show a loading message while fetching

  // TODO: Show an error message if the fetch failed

  // TODO: Render the item list
  // - Show the total count of items
  // - Map over items and render each as a Link to /items/{item.index}
  // - Use className="item-card" on each Link
  // - Use className="item-grid" on the container div

  return (
    <div className="page">
      <h2>Magic Items</h2>
      <p>TODO: Fetch and display magic items from the D&D 5e API</p>
    </div>
  );
}
