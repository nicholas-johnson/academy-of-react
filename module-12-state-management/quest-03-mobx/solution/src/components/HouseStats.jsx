import { observer } from "mobx-react-lite";
import { academyStore } from "../store";
import { HOUSES, HOUSE_COLORS } from "../data/houses";

export const HouseStats = observer(() => {
  return (
    <section className="house-stats">
      {HOUSES.map((h) => {
        const stats = academyStore.houseStats[h] || { count: 0, power: 0 };
        return (
          <div
            key={h}
            className="house-stat"
            style={{ borderColor: HOUSE_COLORS[h] }}
          >
            <span className="house-name" style={{ color: HOUSE_COLORS[h] }}>
              {h}
            </span>
            <span className="house-count">{stats.count} students</span>
            <span className="house-power">{stats.power} power</span>
          </div>
        );
      })}
    </section>
  );
});
