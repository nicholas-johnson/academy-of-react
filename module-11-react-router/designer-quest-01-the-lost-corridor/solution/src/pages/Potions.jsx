function Potions() {
  return (
    <div className="page">
      <h1 className="page-title">Potions Laboratory</h1>
      <p className="page-text">
        Welcome to the Potions wing. Brews are organised by difficulty.
      </p>

      <div className="card-grid">
        <div className="card">
          <h3 className="card-name">Beginner Brews</h3>
          <ul className="spell-list">
            <li className="spell-list-item">Healing Tonic</li>
            <li className="spell-list-item">Glow Elixir</li>
            <li className="spell-list-item">Stamina Draught</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="card-name">Advanced Concoctions</h3>
          <ul className="spell-list">
            <li className="spell-list-item">Invisibility Serum</li>
            <li className="spell-list-item">Phoenix Tears</li>
            <li className="spell-list-item">Liquid Luck</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Potions;
