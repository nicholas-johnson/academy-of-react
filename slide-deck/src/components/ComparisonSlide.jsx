export function ComparisonSlide({ content }) {
  const renderPanel = (panel, color) => {
    // Support both code blocks and item lists
    if (panel.code) {
      return (
        <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <code className="font-mono text-sm text-gray-300 whitespace-pre">{panel.code}</code>
        </pre>
      );
    }
    return (
      <ul className="space-y-3">
        {panel.items.map((item, i) => (
          <li key={i} className="text-lg text-gray-400 py-2 border-b border-slate-700 last:border-b-0">
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center animate-fade-in p-8 w-full">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">{content.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700 border-t-4 border-t-amber-500">
            <h3 className="text-xl font-semibold text-gray-200 text-center mb-4">{content.left.label}</h3>
            {renderPanel(content.left)}
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-700 border-t-4 border-t-primary">
            <h3 className="text-xl font-semibold text-gray-200 text-center mb-4">{content.right.label}</h3>
            {renderPanel(content.right)}
          </div>
        </div>
      </div>
    </div>
  );
}
