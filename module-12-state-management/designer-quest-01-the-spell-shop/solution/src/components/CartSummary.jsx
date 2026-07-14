import useCartStore from "../store/useCartStore";
import "./CartSummary.css";

function CartSummary() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalGold = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (totalItems === 0) return null;

  return (
    <div className="cart-summary">
      <span className="cart-summary-icon">🛒</span>
      <span className="cart-summary-text">
        {totalItems} {totalItems === 1 ? "item" : "items"} — {totalGold} gold
      </span>
    </div>
  );
}

export default CartSummary;
