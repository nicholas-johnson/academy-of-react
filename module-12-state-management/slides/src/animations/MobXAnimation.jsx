import { useState, useEffect } from "react";
import { Eye, Calculator, Code } from "lucide-react";

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
      <h2 className="text-4xl font-bold mb-6 text-slate-100 flex items-center justify-center gap-3">
        <Eye className="w-10 h-10" />
        The MobX Pattern
      </h2>

      <div className="relative w-full max-w-3xl h-[520px]">
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
              <div className="flex justify-center mb-2">
                <Eye className="w-8 h-8 text-cyan-300" />
              </div>
              <div className="font-bold text-cyan-300">Observable State</div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                {step === 0 && "spells = []"}
                {step >= 1 && (
                  <span className="text-cyan-200">spells.push(...)</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Arrow from Observable State to Computed */}
        <svg
          className="absolute left-1/2 top-[120px] -translate-x-1/2 w-8 h-20"
          viewBox="0 0 32 80"
        >
          <path
            d="M16 0 L16 68 M8 60 L16 72 L24 60"
            stroke={step >= 2 ? "#22d3ee" : "#475569"}
            strokeWidth="2"
            fill="none"
            className="transition-all duration-500"
          />
        </svg>

        {/* Computed Values */}
        <div className="absolute top-[200px] left-1/2 -translate-x-1/2 flex gap-12">
          <div
            className={`w-40 p-3 rounded-xl border-2 transition-all duration-500 ${
              step === 3
                ? "border-purple-400 bg-purple-400/20 scale-105"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Calculator className="w-6 h-6 text-purple-300" />
              </div>
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

        {/* Arrows from Computed to observer components */}
        <svg
          className="absolute left-1/2 top-[320px] -translate-x-1/2 w-80 h-20"
          viewBox="0 0 320 80"
        >
          {/* Left arrow to SpellList */}
          <path
            d="M88 0 L88 64 M80 56 L88 64 L96 56"
            stroke={step >= 4 ? "#22d3ee" : "#475569"}
            strokeWidth="2"
            fill="none"
            className="transition-all duration-500"
          />
          {/* Right arrow to PowerMeter */}
          <path
            d="M232 0 L232 64 M224 56 L232 64 L240 56"
            stroke={step >= 4 ? "#22d3ee" : "#475569"}
            strokeWidth="2"
            fill="none"
            className="transition-all duration-500"
          />
        </svg>

        {/* Reactions (observer components) */}
        <div className="absolute top-[408px] left-1/2 -translate-x-1/2 flex gap-8">
          <div
            className={`w-36 h-28 p-3 rounded-xl border-2 transition-all duration-500 ${
              step === 4 || step === 5
                ? "border-green-400 bg-green-400/20 scale-105"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Code className="w-6 h-6 text-green-300" />
              </div>
              <div className="font-semibold text-green-300 text-sm">
                observer()
              </div>
              <div className="text-xs text-slate-400">SpellList</div>
              <div className="h-5 mt-1">
                {step >= 4 && (
                  <div className="text-xs text-green-200 animate-bounce">
                    re-renders!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`w-36 h-28 p-3 rounded-xl border-2 transition-all duration-500 ${
              step === 5
                ? "border-green-400 bg-green-400/20 scale-105"
                : "border-slate-600 bg-slate-800"
            }`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Code className="w-6 h-6 text-green-300" />
              </div>
              <div className="font-semibold text-green-300 text-sm">
                observer()
              </div>
              <div className="text-xs text-slate-400">PowerMeter</div>
              <div className="h-5 mt-1">
                {step >= 5 && (
                  <div className="text-xs text-green-200 animate-bounce">
                    re-renders!
                  </div>
                )}
              </div>
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
    </div>
  );
}
