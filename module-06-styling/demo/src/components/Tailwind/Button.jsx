export function Button({ variant = "primary", children, onClick }) {
  const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5";
  
  const variantClasses = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-600",
    secondary: "bg-transparent text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-500/10",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
