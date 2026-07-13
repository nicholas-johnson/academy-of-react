import useCartStore from "./store/useCartStore";
import spells from "./data/spells";
import SpellCard from "./components/SpellCard";
import "./App.css";

function App() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <div className="app">
      {/* ── Top Bar ── */}
      <header className="top-bar">
        <h1 className="shop-title">🧙 Spell Shop</h1>
        <div className="cart-icon-area">
          {/* 🎨 TASK 2 — Design the cart badge */}
          {/* Right now it's just plain text. Make it a proper notification badge! */}
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">{totalItems}</span>
        </div>
      </header>

      <div className="main-layout">
        {/* ── Spell Grid ── */}
        <main className="spell-grid">
          {spells.map((spell) => (
            <SpellCard key={spell.id} spell={spell} />
          ))}
        </main>

        {/* ── Cart Sidebar ── */}
        <aside className="cart-sidebar">
          <h2 className="cart-title">Your Cart</h2>

          {items.length === 0 ? (
            /* 🎨 TASK 1 — Design the empty cart state */
            /* Right now it's just a plain paragraph. Make it inviting! */
            <div className="empty-cart">
              <p>Cart is empty</p>
            </div>
          ) : (
            <>
              <ul className="cart-list">
                {items.map((item) => (
                  <li key={item.id} className="cart-item">
                    <span className="cart-item-icon">{item.icon}</span>
                    <div className="cart-item-details">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-meta">
                        {item.price} gold × {item.quantity}
                      </span>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-footer">
                <div className="cart-total">
                  Total:{" "}
                  {items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0,
                  )}{" "}
                  gold
                </div>
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
