import { observer } from "mobx-react-lite";
import { academyStore } from "../store";

export const StatsCards = observer(() => {
  return (
    <section className="stats">
      <div className="stat-card">
        <span className="stat-value">{academyStore.studentCount}</span>
        <span className="stat-label">Students</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{academyStore.totalPower}</span>
        <span className="stat-label">Total Power</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{academyStore.averagePower}</span>
        <span className="stat-label">Avg Power</span>
      </div>
    </section>
  );
});
