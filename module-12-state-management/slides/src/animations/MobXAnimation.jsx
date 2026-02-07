import { useState, useEffect } from "react";

export function MobXAnimation() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 6);
    }, 1300);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Ripple effect positions
  const rippleActive = step === 2 || step === 3 || step === 4;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        👁️ The MobX Pattern
      </h2>

      <div className="relative w-full max-w-3xl h-80">
        {/* Observable State at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <div
            className={`relative w-56 p-4 rounded-xl border-2 transition-all duration-500 ${
              step === 1
                ? "border-cyan-400 bg-cyan-400/20 scale-110"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            {/* Ripple effect */}
            {rippleActive && (
              <>
                <div className="absolute inset-0 rounded-xl border-2 border-cyan-400 animate-ping opacity-30"></div>
                <div className="absolute inset-0 rounded-xl border-2 border-cyan-400 animate-pulse opacity-50"></div>
              </>
            )}
            <div className="text-center relative z-10">
              <div className="text-2xl mb-2">👁️</div>
              <div className="font-bold text-cyan-300">Observable State</div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                {step === 0 && "spells = []"}
                {step >= 1 && (
                  <span className="text-cyan-200">spells.push(🔥)</span>
                )}
              </div>
            </div>
          </div>

          {/* Mutation indicator */}
          {step === 1 && (
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-sm text-cyan-300 animate-pulse">
              Direct mutation! →
            </div>
          )}
        </div>

        {/* Automatic notification arrows */}
        <svg
          className="absolute left-1/2 top-24 -translate-x-1/2 w-48 h-16"
          viewBox="0 0 192 64"
        >
          {/* Left arrow */}
          <path
            d="M96 0 L48 48 L48 32"
            stroke={step >= 2 ? "#22d3ee" : "#475569"}
            strokeWidth="2"
            fill="none"
            strokeDasharray={step >= 2 ? "0" : "4"}
            className="transition-all duration-500"
          />
          {/* Right arrow */}
          <path
            d="M96 0 L144 48 L144 32"
            stroke={step >= 2 ? "#22d3ee" : "#475569"}
            strokeWidth="2"
            fill="none"
            strokeDasharray={step >= 2 ? "0" : "4"}
            className="transition-all duration-500"
          />
          {/* "auto" label */}
          {step >= 2 && (
            <text
              x="96"
              y="32"
              textAnchor="middle"
              fill="#22d3ee"
              fontSize="10"
              className="animate-pulse"
            >
              auto-notifies
            </text>
          )}
        </svg>

        {/* Computed Values */}
        <div className="absolute top-36 left-1/2 -translate-x-1/2 flex gap-12">
          <div
            className={`w-40 p-3 rounded-xl border-2 transition-all duration-500 ${
              step === 3
                ? "border-purple-400 bg-purple-400/20 scale-105"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            <div className="text-center">
              <div className="text-xl mb-1">🧮</div>
              <div className="font-semibold text-purple-300 text-sm">
                Computed
              </div>
              <div className="text-xs font-mono text-slate-400">
                get totalPower()
              </div>
              {step >= 3 && (
                <div className="text-xs text-purple-200 mt-1 animate-pulse">
                  recalculating...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Arrow to reactions */}
        <svg
          className="absolute left-1/2 top-56 -translate-x-1/2 w-8 h-10"
          viewBox="0 0 32 40"
        >
          <path
            d="M16 0 L16 28 M8 20 L16 32 L24 20"
            stroke={step >= 4 ? "#22d3ee" : "#475569"}
            strokeWidth="2"
            fill="none"
            className="transition-all duration-500"
          />
        </svg>

        {/* Reactions (observer components) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-8">
          <div
            className={`w-36 p-3 rounded-xl border-2 transition-all duration-500 ${
              step === 4 || step === 5
                ? "border-green-400 bg-green-400/20 scale-105"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            <div className="text-center">
              <div className="text-xl mb-1">⚛️</div>
              <div className="font-semibold text-green-300 text-sm">
                observer()
              </div>
              <div className="text-xs text-slate-400">SpellList</div>
              {step >= 4 && (
                <div className="text-xs text-green-200 mt-1 animate-bounce">
                  re-renders!
                </div>
              )}
            </div>
          </div>

          <div
            className={`w-36 p-3 rounded-xl border-2 transition-all duration-500 ${
              step === 5
                ? "border-green-400 bg-green-400/20 scale-105"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            <div className="text-center">
              <div className="text-xl mb-1">⚛️</div>
              <div className="font-semibold text-green-300 text-sm">
                observer()
              </div>
              <div className="text-xs text-slate-400">PowerMeter</div>
              {step >= 5 && (
                <div className="text-xs text-green-200 mt-1 animate-bounce">
                  re-renders!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Flow labels on side */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-16 text-xs text-slate-500">
          <span className={step === 1 ? "text-cyan-400" : ""}>1. Mutate</span>
          <span className={step === 2 || step === 3 ? "text-cyan-400" : ""}>
            2. Detect
          </span>
          <span className={step === 4 || step === 5 ? "text-cyan-400" : ""}>
            3. React
          </span>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 max-w-xl text-center">
        <div className="text-lg font-semibold text-cyan-300 mb-2">
          Automatic Reactivity
        </div>
        <div className="text-slate-400">
          MobX <span className="text-cyan-300">tracks</span> which observables
          each component uses, and{" "}
          <span className="text-green-300">automatically re-renders</span> only
          what's needed
        </div>
      </div>

      {/* Key points */}
      <div className="mt-4 grid grid-cols-4 gap-3 text-xs">
        <div
          className={`px-3 py-2 rounded-lg transition-all duration-300 ${step === 1 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          ✏️ <span className="text-slate-300">Mutate directly</span>
        </div>
        <div
          className={`px-3 py-2 rounded-lg transition-all duration-300 ${step === 2 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          👁️ <span className="text-slate-300">Changes detected</span>
        </div>
        <div
          className={`px-3 py-2 rounded-lg transition-all duration-300 ${step === 3 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          🧮 <span className="text-slate-300">Computed updates</span>
        </div>
        <div
          className={`px-3 py-2 rounded-lg transition-all duration-300 ${step >= 4 ? "bg-slate-700" : "bg-slate-800/50"}`}
        >
          ⚛️ <span className="text-slate-300">Components react</span>
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
