// TODO: Import useEffect and useState from React
// TODO: Import useParams and useNavigate from react-router-dom
// TODO: Import your MagicItemDetail type
// TODO: Import fetchJson from the api client

export function ItemDetail() {
  // TODO: Use useParams to get itemIndex from the URL
  // Hint: useParams<{ itemIndex: string }>()

  // TODO: Get the navigate function from useNavigate

  // TODO: Create state for item (MagicItemDetail | null), loading (boolean), and error (string | null)

  // TODO: Use useEffect to fetch the item detail when itemIndex changes
  // Endpoint path: `/api/2014/magic-items/${itemIndex}`
  // Guard against undefined itemIndex before fetching

  // TODO: Show a loading message while fetching

  // TODO: Show an "Artifact Not Found" message if there was an error
  // Include a button that navigates back to "/"

  // TODO: Render the item detail
  // - Back button using navigate(-1)
  // - Item name as h2
  // - Rarity badge (item.rarity.name) with className="rarity-badge"
  // - Category badge (item.equipment_category.name) with className="category-badge"
  // - Map over item.desc to render each paragraph

  return (
    <div className="page">
      <p>TODO: Implement the item detail page</p>
      <p>Use useParams() to get the item index from the URL</p>
      <p>Use fetchJson to load the item from the API</p>
    </div>
  );
}
