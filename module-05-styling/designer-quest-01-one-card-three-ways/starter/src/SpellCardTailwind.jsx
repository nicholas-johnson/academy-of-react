/* 🎨 TASK 3 — edit below */
/* Replace the ugly className strings with proper Tailwind       */
/* utility classes. Use dark backgrounds, rounded corners,       */
/* gradients, hover effects, and good spacing.                   */

function SpellCardTailwind({ spell }) {
  return (
    <div className="bg-white text-black border border-black w-[280px] font-serif">
      <h3 className="text-base m-1">{spell.name}</h3>
      <span className="border border-black text-xs inline-block m-1">
        {spell.element}
      </span>
      <div className="border border-black h-2 m-1">
        <div
          className="bg-gray-400 h-full"
          style={{ width: `${spell.power}%` }}
        />
      </div>
      <p className="text-sm text-black m-1">{spell.description}</p>
    </div>
  );
}

export default SpellCardTailwind;
