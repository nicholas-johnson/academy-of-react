import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ApiListResponse, ResourceSummary } from "../types/api";
import { fetchJson } from "../api/client";

export function Home() {
  const [items, setItems] = useState<ResourceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<ApiListResponse>("/api/2014/magic-items")
      .then((data) => setItems(data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page">
        <p className="loading">Loading artifacts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page not-found">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Magic Items</h2>
      <p>
        Browse {items.length} artifacts from the vault. Click any item to
        inspect it.
      </p>

      <div className="item-grid">
        {items.map((item) => (
          <Link
            key={item.index}
            to={`/items/${item.index}`}
            className="item-card"
          >
            <h3>{item.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
