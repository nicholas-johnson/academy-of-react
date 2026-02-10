import { useState, useEffect } from "react";
import { Package, Code } from "lucide-react";

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
      <h2 className="text-4xl font-bold mb-8 text-slate-100 flex items-center justify-center gap-3">
        <Package className="w-10 h-10" />
        The Zustand Pattern
      </h2>

      <div className="relative w-full max-w-3xl h-96">
        {/* create() at the top */}
        <div
          className={`absolute left-1/2 top-0 -translate-x-1/2 w-64 p-4 rounded-xl border-2 transition-all duration-500 ${
            step === 0
              ? "border-yellow-400 bg-yellow-400/20 scale-110"
              : "border-slate-500 bg-slate-800"
          }`}
        >
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Package className="w-8 h-8 text-yellow-300" />
            </div>
            <div className="font-mono text-sm text-yellow-300">
              create((set) =&gt; ...)
            </div>
            <div className="text-xs text-slate-400 mt-1">Creates a hook</div>
          </div>
        </div>

        {/* useStore hook */}
        <div
          className={`absolute left-1/2 top-36 -translate-x-1/2 px-6 py-3 rounded-lg border-2 transition-all duration-500 ${
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
        <div className="absolute top-56 left-0 right-0 flex justify-center gap-8">
          {/* Component A */}
          <div className="flex flex-col items-center">
            {/* Arrow from useStore to Component A */}
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
                <div className="flex justify-center mb-1">
                  <Code className="w-6 h-6 text-blue-300" />
                </div>
                <div className="font-semibold text-blue-300">Component A</div>
                <div className="font-mono text-xs text-slate-400 mt-1">
                  useStore()
                </div>
              </div>
            </div>
          </div>

          {/* Component B */}
          <div className="flex flex-col items-center">
            {/* Arrow from useStore to Component B */}
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
                <div className="flex justify-center mb-1">
                  <Code className="w-6 h-6 text-purple-300" />
                </div>
                <div className="font-semibold text-purple-300">Component B</div>
                <div className="font-mono text-xs text-slate-400 mt-1">
                  useStore()
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
