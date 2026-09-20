import { useEffect, useState } from "react";
import { fetchSpells, type Spell } from "./data/api";

type Status = "idle" | "loading" | "ready" | "error";

export default function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let ignore = false;
    setStatus("loading");

    fetchSpells()
      .then((data) => {
        if (ignore) return;
        setSpells(data);
        setStatus("ready");
      })
      .catch(() => {
        if (ignore) return;
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [reloadToken]);

  const totalPower = spells.reduce((sum, spell) => sum + spell.power, 0);

  function removeSpell(id: string) {
    setSpells((current) => current.filter((spell) => spell.id !== id));
  }

  return (
    <>
      <h1>Academy Spell Roster</h1>
      <p className="meta">Reviewed by a wizard. The familiar drafted; we kept what was true.</p>
      <p className="status">{status}</p>
      <p>
        Total power: <strong>{totalPower}</strong>
      </p>
      <p>
        <button type="button" onClick={() => setReloadToken((token) => token + 1)}>
          Reload
        </button>
      </p>
      <div>
        {spells.map((spell) => (
          <div className="row" key={spell.id}>
            <div>
              <strong>{spell.name}</strong>
              <div className="note">{spell.notes}</div>
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
    </>
  );
}
