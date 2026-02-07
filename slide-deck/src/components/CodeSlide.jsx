export function CodeSlide({ content }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center animate-fade-in p-8 w-full overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6">
          {content.title}
        </h1>
        <div className="bg-slate-900 rounded-2xl p-6 border-2 border-slate-800 mb-6 overflow-x-auto">
          <pre className="text-sm md:text-base">
            <code className="font-mono text-gray-200 whitespace-pre">
              {content.code}
            </code>
          </pre>
        </div>
        <div className="space-y-2">
          {content.highlights.map((highlight, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-lg text-gray-400"
            >
              <span className="text-primary font-bold">→</span>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
