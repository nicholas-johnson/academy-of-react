import { useEffect, useState } from "react";
import { RosterThemeContext } from "./context/RosterContext";
import { fetchSpells } from "./data/api";
import { useSpellPower } from "./hooks/useSpellPower";

export default function App() {
  const [spells, setSpells] = useState<any[]>([]);
  const [totalPower, setTotalPower] = useState(0);
  const [status, setStatus] = useState("idle");

  const familiarBonus = useSpellPower(spells);

  function load() {
    setStatus("loading…");
    fetchSpells().then((data) => {
      setSpells(data);
      setTotalPower(
        data.reduce((sum: number, spell: any) => sum + spell.power, 0),
      );
      setStatus("ready");
    });
  }

  useEffect(() => {
    load();
  }, []);

  function removeSpell(id: string) {
    setSpells(spells.filter((spell: any) => spell.id !== id));
  }

  return (
    <RosterThemeContext.Provider value={{ theme: "academy-dusk" }}>
      <h1>Academy Spell Roster</h1>
      <p className="meta">Drafted by a familiar. Review before you trust it.</p>
      <p className="status">{status}</p>
      <p>
        Total power: <strong>{totalPower}</strong>
        <span className="meta"> (familiar bonus {familiarBonus})</span>
      </p>
      <p>
        <button type="button" onClick={load}>
          Reload
        </button>
      </p>
      <div>
        {spells.map((spell: any) => (
          <div className="row">
            <div>
              <strong>{spell.name}</strong>
              <div
                className="note"
                dangerouslySetInnerHTML={{ __html: spell.notes }}
              />
            </div>
            <div>
              <span className="meta">{spell.power} pwr</span>{" "}
              <button
                type="button"
                className="danger"
                onClick={() => removeSpell(spell.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </RosterThemeContext.Provider>
  );
}
