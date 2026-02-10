import { useSearchParams } from "react-router-dom";
import { battles } from "../data/battles";

export function WarRoom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";

  const filteredBattles =
    statusFilter === "all"
      ? battles
      : battles.filter((b) => b.status === statusFilter);

  const handleFilterChange = (status) => {
    if (status === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ status });
    }
  };

  // Calculate stats
  const stats = {
    total: battles.length,
    victories: battles.filter((b) => b.status === "victory").length,
    defeats: battles.filter((b) => b.status === "defeat").length,
    ongoing: battles.filter((b) => b.status === "ongoing").length,
  };

  return (
    <div className="page">
      <h2>War Room</h2>
      <p>Classified battle information. Commanders only.</p>

      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Battles</span>
        </div>
        <div className="stat-box victory">
          <span className="stat-value">{stats.victories}</span>
          <span className="stat-label">Victories</span>
        </div>
        <div className="stat-box defeat">
          <span className="stat-value">{stats.defeats}</span>
          <span className="stat-label">Defeats</span>
        </div>
        <div className="stat-box ongoing">
          <span className="stat-value">{stats.ongoing}</span>
          <span className="stat-label">Ongoing</span>
        </div>
      </div>

      <div className="filters">
        <span>Filter by status:</span>
        <button
          onClick={() => handleFilterChange("all")}
          className={
            statusFilter === "all" ? "filter-btn active" : "filter-btn"
          }
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("victory")}
          className={
            statusFilter === "victory" ? "filter-btn active" : "filter-btn"
          }
        >
          Victory
        </button>
        <button
          onClick={() => handleFilterChange("defeat")}
          className={
            statusFilter === "defeat" ? "filter-btn active" : "filter-btn"
          }
        >
          Defeat
        </button>
        <button
          onClick={() => handleFilterChange("ongoing")}
          className={
            statusFilter === "ongoing" ? "filter-btn active" : "filter-btn"
          }
        >
          Ongoing
        </button>
      </div>

      <p className="results-count">
        Showing {filteredBattles.length} of {battles.length} battles
      </p>

      <div className="battle-list">
        {filteredBattles.map((battle) => (
          <div key={battle.id} className={`battle-card ${battle.status}`}>
            <div className="battle-header">
              <h3>{battle.name}</h3>
              <span className={`status-badge ${battle.status}`}>
                {battle.status}
              </span>
            </div>
            <div className="battle-info">
              <span>Date: {battle.date}</span>
              <span>Casualties: {battle.casualties}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
