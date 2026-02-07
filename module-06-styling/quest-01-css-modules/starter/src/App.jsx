import { useState } from "react";
import HouseBadge from "./HouseBadge";

const houses = ["Phoenix", "Dragon", "Griffin", "Serpent"];

function App() {
  const [selectedHouse, setSelectedHouse] = useState(null);

  return (
    <div>
      <h1>🏰 Choose Your House</h1>

      <div className="badge-grid">
        {houses.map((house) => (
          <HouseBadge
            key={house}
            house={house}
            selected={selectedHouse === house}
            onClick={() => setSelectedHouse(house)}
          />
        ))}
      </div>

      {selectedHouse && (
        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "1.25rem",
          }}
        >
          You chose: <strong>{selectedHouse}</strong> 🎉
        </p>
      )}
    </div>
  );
}

export default App;
