import { useState, useEffect } from "react";

export function ReduxAnimation() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 6);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const actionData = step >= 1 ? '{ type: "ADD", payload: "🔥" }' : "";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        🔮 The Redux Pattern
      </h2>

      <div className="relative w-full max-w-4xl h-72">
        {/* Main flow - horizontal */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center gap-4">
          {/* Action */}
          <div
            className={`w-40 p-4 rounded-xl border-2 transition-all duration-500 ${
              step === 1
                ? "border-yellow-400 bg-yellow-400/20 scale-110 shadow-lg shadow-yellow-400/20"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">📤</div>
              <div className="font-bold text-yellow-300">Action</div>
              <div className="text-xs text-slate-400 mt-1 font-mono h-8">
                {step >= 1 && (
                  <span className="text-yellow-200">ADD_SPELL</span>
                )}
              </div>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="relative">
            <svg className="w-16 h-8" viewBox="0 0 64 32">
              <defs>
                <linearGradient
                  id="arrowGrad1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor={step === 2 ? "#facc15" : "#475569"}
                  />
                  <stop
                    offset="100%"
                    stopColor={step === 2 ? "#a855f7" : "#475569"}
                  />
                </linearGradient>
              </defs>
              <path
                d="M0 16 L48 16 M40 8 L52 16 L40 24"
                stroke="url(#arrowGrad1)"
                strokeWidth="3"
                fill="none"
                className="transition-all duration-500"
              />
            </svg>
            {/* Moving data packet */}
            {step === 2 && (
              <div className="absolute top-1/2 left-0 -translate-y-1/2 animate-pulse">
                <span className="text-xl">🔥</span>
              </div>
            )}
          </div>

          {/* Reducer */}
          <div
            className={`w-48 p-4 rounded-xl border-2 transition-all duration-500 ${
              step === 2 || step === 3
                ? "border-purple-400 bg-purple-400/20 scale-110 shadow-lg shadow-purple-400/20"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-bold text-purple-300">Reducer</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">
                (state, action) =&gt; newState
              </div>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="relative">
            <svg className="w-16 h-8" viewBox="0 0 64 32">
              <defs>
                <linearGradient
                  id="arrowGrad2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor={step === 4 ? "#a855f7" : "#475569"}
                  />
                  <stop
                    offset="100%"
                    stopColor={step === 4 ? "#22c55e" : "#475569"}
                  />
                </linearGradient>
              </defs>
              <path
                d="M0 16 L48 16 M40 8 L52 16 L40 24"
                stroke="url(#arrowGrad2)"
                strokeWidth="3"
                fill="none"
                className="transition-all duration-500"
              />
            </svg>
          </div>

          {/* New State */}
          <div
            className={`w-44 p-4 rounded-xl border-2 transition-all duration-500 ${
              step === 4 || step === 5
                ? "border-green-400 bg-green-400/20 scale-110 shadow-lg shadow-green-400/20"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">✨</div>
              <div className="font-bold text-green-300">New State</div>
              <div className="text-xs text-slate-400 mt-1 font-mono h-8">
                {step >= 4 && (
                  <span className="text-green-200">spells: [🔥]</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Old State feeding into Reducer */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-8 w-36 p-3 rounded-xl border-2 transition-all duration-500 ${
            step === 3
              ? "border-blue-400 bg-blue-400/20"
              : "border-slate-600 bg-slate-800"
          }`}
        >
          <div className="text-center">
            <div className="font-semibold text-blue-300 text-sm">Old State</div>
            <div className="text-xs text-slate-400 font-mono">spells: []</div>
          </div>
        </div>

        {/* Arrow from old state up to reducer */}
        <svg
          className="absolute bottom-20 left-1/2 -translate-x-4 w-8 h-12"
          viewBox="0 0 32 48"
        >
          <path
            d="M16 48 L16 12 M8 20 L16 8 L24 20"
            stroke={step === 3 ? "#60a5fa" : "#475569"}
            strokeWidth="3"
            fill="none"
            className="transition-all duration-500"
          />
        </svg>

        {/* UI Updates indicator */}
        {step === 5 && (
          <div className="absolute top-4 right-8 flex items-center gap-2 animate-bounce">
            <span className="text-2xl">⚛️</span>
            <span className="text-green-300 font-semibold">UI Updates!</span>
          </div>
        )}
      </div>

      {/* Key insight */}
      <div className="mt-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 max-w-xl text-center">
        <div className="text-lg font-semibold text-purple-300 mb-2">
          Pure Function Transform
        </div>
        <div className="text-slate-400">
          The entire state passes through a{" "}
          <span className="text-yellow-300 font-mono">reducer</span> function,
          producing a{" "}
          <span className="text-green-300">new immutable state</span>
        </div>
      </div>

      {/* Key points */}
      <div className="mt-4 grid grid-cols-4 gap-3 text-xs">
        <div
          className={`px-3 py-2 rounded-lg transition-all duration-300 ${step === 1 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          📤 <span className="text-slate-300">Dispatch action</span>
        </div>
        <div
          className={`px-3 py-2 rounded-lg transition-all duration-300 ${step === 2 || step === 3 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          ⚙️ <span className="text-slate-300">Reducer transforms</span>
        </div>
        <div
          className={`px-3 py-2 rounded-lg transition-all duration-300 ${step === 4 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          ✨ <span className="text-slate-300">New state created</span>
        </div>
        <div
          className={`px-3 py-2 rounded-lg transition-all duration-300 ${step === 5 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          🔄 <span className="text-slate-300">Time-travel enabled</span>
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
