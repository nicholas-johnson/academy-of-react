export function Tab({ value, activeTab, onTabChange, children }) {
  const active = value === activeTab;
  
  return (
    <button
      className={`
        px-4 py-2 rounded-md text-sm font-medium
        transition-all duration-200
        ${
          active
            ? "bg-indigo-500 text-white hover:bg-indigo-600"
            : "text-slate-400 hover:bg-slate-700 hover:text-slate-300"
        }
      `}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  );
}
