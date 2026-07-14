function TextInputTailwind() {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-semibold text-slate-400 tracking-wide"
        htmlFor="wizard-name-tw"
      >
        Wizard Name
      </label>
      <input
        className="bg-slate-900 border-2 border-slate-700 rounded-xl px-4 py-3.5 text-base text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 hover:border-slate-500 focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/25"
        type="text"
        id="wizard-name-tw"
        placeholder="Enter your name..."
      />
    </div>
  );
}

export default TextInputTailwind;
