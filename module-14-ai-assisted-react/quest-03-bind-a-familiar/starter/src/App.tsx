import { FormEvent, useState } from "react";

interface Binding {
  id: string;
  name: string;
  kind: string;
}

export default function App() {
  const [name, setName] = useState("");
  const [kind, setKind] = useState("owl");
  const [bindings, setBindings] = useState<Binding[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setBindings((current) => [
      ...current,
      { id: String(Date.now()), name: trimmed, kind },
    ]);
    setName("");
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">Familiar bindings</h1>
      <p className="mt-2 text-slate-600">
        Plain Tailwind. Replace this screen with primitives that live in{" "}
        <code className="rounded bg-slate-100 px-1">src/components/ui/</code>,
        then write <code className="rounded bg-slate-100 px-1">AGENTS.md</code>.
      </p>

      <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Familiar name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <select
          className="w-full rounded border px-3 py-2"
          value={kind}
          onChange={(event) => setKind(event.target.value)}
        >
          <option value="owl">owl</option>
          <option value="cat">cat</option>
          <option value="raven">raven</option>
          <option value="fox">fox</option>
        </select>
        <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">
          Bind
        </button>
      </form>

      <ul className="mt-6 list-disc pl-5 text-slate-800">
        {bindings.map((binding) => (
          <li key={binding.id}>
            {binding.name} ({binding.kind})
          </li>
        ))}
      </ul>
    </main>
  );
}
