import useCartStore from "../store/useCartStore";

function SpellCard({ spell }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const justAdded = useCartStore((state) => state.justAdded);
  const isJustAdded = justAdded === spell.id;

  return (
    <div className="spell-card">
      <div className="spell-icon">{spell.icon}</div>
      <h3 className="spell-name">{spell.name}</h3>
      <span className="spell-element">{spell.element}</span>
      <p className="spell-description">{spell.description}</p>
      <div className="spell-stats">
        <span className="spell-power">⚔️ {spell.power}</span>
        <span className="spell-price">{spell.price} gold</span>
      </div>
      <button className="add-to-cart-btn" onClick={() => addToCart(spell)}>
        Add to Cart
      </button>

      {/* 🎨 TASK 3 — Design the "Added!" feedback */}
      {/* Right now it just shows a plain "✓" — make it a proper animated notification */}
      {isJustAdded && <div className="added-feedback">✓</div>}
    </div>
  );
}

export default SpellCard;
