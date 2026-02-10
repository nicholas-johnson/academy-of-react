export function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search spells by name, type, or description..."
      className="search-input"
    />
  );
}
