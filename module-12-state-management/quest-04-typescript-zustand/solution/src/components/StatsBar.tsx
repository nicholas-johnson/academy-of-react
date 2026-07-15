import { usePotionStore } from "../store/potionStore.ts";

interface StatsBarProps {
  filteredCount: number;
}

export function StatsBar({ filteredCount }: StatsBarProps) {
  const totalValue = usePotionStore((state) => state.getTotalValue());

  return (
    <div className="stats">
      <div className="stat">
        <span className="stat-value">{filteredCount}</span>
        <span className="stat-label">Potions</span>
      </div>
      <div className="stat">
        <span className="stat-value">{totalValue}</span>
        <span className="stat-label">Total Value</span>
      </div>
    </div>
  );
}
