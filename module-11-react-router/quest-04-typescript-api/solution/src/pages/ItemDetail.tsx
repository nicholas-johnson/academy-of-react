import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { MagicItemDetail } from "../types/api";
import { fetchJson } from "../api/client";

export function ItemDetail() {
  const { itemIndex } = useParams<{ itemIndex: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<MagicItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemIndex) return;

    fetchJson<MagicItemDetail>(`/api/2014/magic-items/${itemIndex}`)
      .then((data) => setItem(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [itemIndex]);

  if (loading) {
    return (
      <div className="page">
        <p className="loading">Loading artifact...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="page not-found">
        <h2>Artifact Not Found</h2>
        <p>No artifact exists with the index "{itemIndex}".</p>
        <button onClick={() => navigate("/")} className="btn">
          Back to Vault
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} className="back-btn">
        &larr; Back
      </button>

      <div className="item-detail">
        <h2>{item.name}</h2>
        <span className="rarity-badge">{item.rarity.name}</span>
        <span className="category-badge">{item.equipment_category.name}</span>

        <div className="item-description">
          {item.desc.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
