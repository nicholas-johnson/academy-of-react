import { useEffect, useMemo, useState } from "react";
import { SpellDialog } from "./components/SpellDialog";
import { SpellList } from "./components/SpellList";
import {
  ELEMENTS,
  fetchSpells,
  type Spell,
  type SpellElement,
} from "./data/spells";

type Status = "loading" | "error" | "success";
type Filter = "all" | SpellElement;

export default function App() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const [failNext, setFailNext] = useState(false);

  useEffect(() => {
    let ignore = false;
    setStatus("loading");
    setErrorMessage("");

    fetchSpells(failNext)
      .then((data) => {
        if (ignore) return;
        setSpells(data);
        setStatus("success");
      })
      .catch((error: unknown) => {
        if (ignore) return;
        setErrorMessage(
          error instanceof Error ? error.message : "Unknown error",
        );
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [reloadToken, failNext]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? spells
        : spells.filter((spell) => spell.element === filter),
    [filter, spells],
  );

  const selected = spells.find((spell) => spell.id === selectedId) ?? null;

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold text-slate-900">Spell catalog</h1>
      <p className="mt-2 text-slate-600">
        Filter by element. Open a spell in a dialog — not a new page.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className={filterButtonClass(filter === "all")}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        {ELEMENTS.map((element) => (
          <button
            key={element}
            type="button"
            className={filterButtonClass(filter === element)}
            onClick={() => setFilter(element)}
          >
            {element}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2 text-sm">
        <button
          type="button"
          className="text-slate-500 underline"
          onClick={() => {
            setFailNext(false);
            setReloadToken((token) => token + 1);
          }}
        >
          Reload
        </button>
        <button
          type="button"
          className="text-slate-500 underline"
          onClick={() => {
            setFailNext(true);
            setReloadToken((token) => token + 1);
          }}
        >
          Simulate error
        </button>
      </div>

      <div className="mt-6">
        {status === "loading" && (
          <p className="text-slate-500" role="status">
            Opening the archives…
          </p>
        )}
        {status === "error" && (
          <p className="text-red-700" role="alert">
            {errorMessage}
          </p>
        )}
        {status === "success" && (
          <SpellList spells={visible} onSelect={setSelectedId} />
        )}
      </div>

      {selected && (
        <SpellDialog spell={selected} onClose={() => setSelectedId(null)} />
      )}
    </main>
  );
}

function filterButtonClass(active: boolean) {
  return `rounded-md px-3 py-1.5 text-sm capitalize ${
    active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
  }`;
}
