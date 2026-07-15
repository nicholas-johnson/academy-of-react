export function LibraryComparison() {
  return (
    <div className="comparison">
      <div className="compare-item">
        <h4>Zustand</h4>
        <ul>
          <li>~1KB bundle</li>
          <li>No provider needed</li>
          <li>Minimal boilerplate</li>
        </ul>
      </div>
      <div className="compare-item">
        <h4>Redux Toolkit</h4>
        <ul>
          <li>~11KB bundle</li>
          <li>Excellent DevTools</li>
          <li>Industry standard</li>
        </ul>
      </div>
      <div className="compare-item">
        <h4>MobX</h4>
        <ul>
          <li>~16KB bundle</li>
          <li>Auto-tracking</li>
          <li>Computed values</li>
        </ul>
      </div>
    </div>
  );
}
