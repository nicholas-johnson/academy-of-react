import { useState, useEffect } from "react";

export function ZustandAnimation() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        🐻 The Zustand Pattern
      </h2>

      <div className="relative w-full max-w-3xl h-80">
        {/* Store in the middle */}
        <div
          className={`absolute left-1/2 top-8 -translate-x-1/2 w-64 p-4 rounded-xl border-2 transition-all duration-500 ${
            step === 0
              ? "border-yellow-400 bg-yellow-400/20 scale-110"
              : "border-slate-500 bg-slate-800"
          }`}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">📦</div>
            <div className="font-mono text-sm text-yellow-300">
              create((set) =&gt; ...)
            </div>
            <div className="text-xs text-slate-400 mt-1">Creates a hook</div>
          </div>
        </div>

        {/* Arrow down to useStore */}
        <svg
          className="absolute left-1/2 top-28 -translate-x-1/2 w-8 h-12"
          viewBox="0 0 32 48"
        >
          <path
            d="M16 0 L16 36 M8 28 L16 40 L24 28"
            stroke={step === 1 ? "#facc15" : "#64748b"}
            strokeWidth="3"
            fill="none"
            className="transition-all duration-500"
          />
        </svg>

        {/* useStore hook */}
        <div
          className={`absolute left-1/2 top-40 -translate-x-1/2 px-6 py-3 rounded-lg border-2 transition-all duration-500 ${
            step === 1
              ? "border-green-400 bg-green-400/20 scale-110"
              : "border-slate-500 bg-slate-800"
          }`}
        >
          <span className="font-mono text-green-300">
            const useStore = create(...)
          </span>
        </div>

        {/* Components using the hook */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-16">
          {/* Component A */}
          <div className="flex flex-col items-center">
            <svg className="w-8 h-12 mb-2" viewBox="0 0 32 48">
              <path
                d="M16 0 L16 36 M8 28 L16 40 L24 28"
                stroke={step === 2 ? "#facc15" : "#64748b"}
                strokeWidth="3"
                fill="none"
                className="transition-all duration-500"
              />
            </svg>
            <div
              className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                step === 2 || step === 4
                  ? "border-blue-400 bg-blue-400/20 scale-105"
                  : "border-slate-500 bg-slate-800"
              }`}
            >
              <div className="text-center">
                <div className="text-xl mb-1">⚛️</div>
                <div className="font-semibold text-blue-300">Component A</div>
                <div className="font-mono text-xs text-slate-400 mt-1">
                  useStore()
                </div>
              </div>
            </div>
          </div>

          {/* Shared state indicator */}
          <div
            className={`self-end mb-4 transition-all duration-500 ${
              step === 3 || step === 4
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
              <span className="text-sm text-purple-300 whitespace-nowrap">
                same state
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"></div>
            </div>
          </div>

          {/* Component B */}
          <div className="flex flex-col items-center">
            <svg className="w-8 h-12 mb-2" viewBox="0 0 32 48">
              <path
                d="M16 0 L16 36 M8 28 L16 40 L24 28"
                stroke={step === 3 ? "#facc15" : "#64748b"}
                strokeWidth="3"
                fill="none"
                className="transition-all duration-500"
              />
            </svg>
            <div
              className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                step === 3 || step === 4
                  ? "border-purple-400 bg-purple-400/20 scale-105"
                  : "border-slate-500 bg-slate-800"
              }`}
            >
              <div className="text-center">
                <div className="text-xl mb-1">⚛️</div>
                <div className="font-semibold text-purple-300">Component B</div>
                <div className="font-mono text-xs text-slate-400 mt-1">
                  useStore()
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key points */}
      <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
        <div
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${step === 0 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          ✨ <span className="text-slate-300">create() returns a hook</span>
        </div>
        <div
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${step === 1 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          🚫 <span className="text-slate-300">No Provider needed</span>
        </div>
        <div
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${step === 2 || step === 3 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          🔗 <span className="text-slate-300">Components share state</span>
        </div>
        <div
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${step === 4 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          💡{" "}
          <span className="text-slate-300">
            Feels like useState, but global
          </span>
        </div>
      </div>

      {/* Play/Pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="mt-4 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm"
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
    </div>
  );
}
