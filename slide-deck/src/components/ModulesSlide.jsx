export function ModulesSlide({ content }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center animate-fade-in p-8 w-full">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">{content.title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.modules.map((mod, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-slate-700 flex flex-col items-center gap-2 text-center">
              <span className="text-4xl">{mod.icon}</span>
              <span className="text-sm text-gray-400">Modules {mod.num}</span>
              <span className="text-lg font-semibold text-gray-200">{mod.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
