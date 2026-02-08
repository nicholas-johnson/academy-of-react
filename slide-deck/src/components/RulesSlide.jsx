export function RulesSlide({ content }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center animate-fade-in p-8 w-full">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
          {content.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.rules.map((item, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-2xl p-6 border-2 border-slate-700 flex flex-col gap-2"
            >
              <span className="text-4xl">{item.icon}</span>
              <span className="text-xl font-semibold text-gray-200">
                {item.rule}
              </span>
              <span className="text-base text-gray-400 italic">
                {item.example}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
