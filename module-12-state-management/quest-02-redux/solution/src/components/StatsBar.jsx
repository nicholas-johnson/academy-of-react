import { useSelector } from "react-redux";
import { selectBattleStats } from "../battleSlice";

export function StatsBar() {
  const stats = useSelector(selectBattleStats);

  return (
    <section className="stats-bar">
      <div className="stat-item">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-item pending">
        <span className="stat-value">{stats.pending}</span>
        <span className="stat-label">Pending</span>
      </div>
      <div className="stat-item active">
        <span className="stat-value">{stats.active}</span>
        <span className="stat-label">Active</span>
      </div>
      <div className="stat-item victory">
        <span className="stat-value">{stats.victories}</span>
        <span className="stat-label">Victories</span>
      </div>
      <div className="stat-item defeat">
        <span className="stat-value">{stats.defeats}</span>
        <span className="stat-label">Defeats</span>
      </div>
    </section>
  );
}
