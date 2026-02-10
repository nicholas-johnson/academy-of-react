export function SearchStats({ searchTerm, debouncedSearch, searchCount }) {
  return (
    <div className="search-stats">
      <span>
        Typing: <strong>{searchTerm || "(empty)"}</strong>
      </span>
      <span>
        Searching for:{" "}
        <strong className="highlight">{debouncedSearch || "(empty)"}</strong>
      </span>
      <span>
        API Calls: <strong>{searchCount}</strong>
      </span>
    </div>
  );
}
