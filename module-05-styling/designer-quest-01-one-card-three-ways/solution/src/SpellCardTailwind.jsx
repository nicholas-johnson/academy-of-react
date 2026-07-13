function SpellCardTailwind({ spell }) {
  return (
    <div className="bg-slate-800 text-slate-200 w-[280px] p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-200 hover:shadow-indigo-500/20 hover:shadow-xl font-sans">
      <h3 className="text-2xl font-bold text-indigo-300 mb-3">
        {spell.name}
      </h3>
      <span className="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
        {spell.element}
      </span>
      <div className="bg-slate-700 rounded-full h-3 overflow-hidden mb-4">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-400"
          style={{ width: `${spell.power}%` }}
        />
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        {spell.description}
      </p>
    </div>
  );
}

export default SpellCardTailwind;
