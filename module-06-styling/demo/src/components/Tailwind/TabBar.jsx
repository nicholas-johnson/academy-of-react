export function TabBar({ children }) {
  return (
    <div className="rounded-xl bg-slate-800/50 p-2">
      <div className="rounded-lg bg-slate-800 p-1">
        <div className="flex gap-1">{children}</div>
      </div>
    </div>
  );
}
