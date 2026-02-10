import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStatus,
  addCombatant,
  removeBattle,
  selectFilteredBattles,
} from "../battleSlice";
import { STATUSES, STATUS_COLORS } from "../data/statuses";

export function BattleList() {
  const [combatantName, setCombatantName] = useState("");
  const [selectedBattle, setSelectedBattle] = useState(null);

  const battles = useSelector(selectFilteredBattles);
  const dispatch = useDispatch();

  const handleStatusChange = (battleId, newStatus) => {
    dispatch(updateStatus({ id: battleId, status: newStatus }));
  };

  const handleAddCombatant = (battleId) => {
    if (!combatantName.trim()) return;
    dispatch(addCombatant({ battleId, combatant: combatantName }));
    setCombatantName("");
    setSelectedBattle(null);
  };

  const getStatusColor = (status) => {
    return STATUS_COLORS[status] || "#6b7280";
  };

  return (
    <div className="battle-list">
      {battles.length === 0 ? (
        <p className="empty">No battles recorded</p>
      ) : (
        battles.map((battle) => (
          <div key={battle.id} className="battle-card">
            <div className="battle-header">
              <h3>{battle.name}</h3>
              <div className="battle-actions">
                <select
                  value={battle.status}
                  onChange={(e) =>
                    handleStatusChange(battle.id, e.target.value)
                  }
                  style={{ borderColor: getStatusColor(battle.status) }}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeBattle(battle.id))}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="combatants">
              <span className="label">Combatants:</span>
              {battle.combatants.length === 0 ? (
                <span className="none">None yet</span>
              ) : (
                battle.combatants.map((c, i) => (
                  <span key={i} className="combatant">
                    {c}
                  </span>
                ))
              )}
              <button
                className="add-combatant-btn"
                onClick={() => setSelectedBattle(battle.id)}
              >
                +
              </button>
            </div>

            {selectedBattle === battle.id && (
              <div className="add-combatant-form">
                <input
                  type="text"
                  value={combatantName}
                  onChange={(e) => setCombatantName(e.target.value)}
                  placeholder="Combatant name"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddCombatant(battle.id);
                    if (e.key === "Escape") setSelectedBattle(null);
                  }}
                />
                <button onClick={() => handleAddCombatant(battle.id)}>
                  Add
                </button>
                <button onClick={() => setSelectedBattle(null)}>Cancel</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
