export function ThreeWayComparison({ content }) {
  const { title, left, middle, right } = content;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-8 text-slate-100">{title}</h2>

      <div className="grid grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Left column */}
        <div className="flex flex-col">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-cyan-300">{left.label}</h3>
          </div>
          <div className="flex-1 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <pre className="text-sm text-slate-300 overflow-auto">
              <code>{left.code}</code>
            </pre>
          </div>
        </div>

        {/* Middle column */}
        <div className="flex flex-col">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-purple-300">{middle.label}</h3>
          </div>
          <div className="flex-1 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <pre className="text-sm text-slate-300 overflow-auto">
              <code>{middle.code}</code>
            </pre>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-green-300">{right.label}</h3>
          </div>
          <div className="flex-1 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <pre className="text-sm text-slate-300 overflow-auto">
              <code>{right.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
