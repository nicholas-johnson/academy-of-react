import { useState } from "react";
import "./App.css";

function App() {
  // TODO: Add state for selected ingredients (array)
  // const [ingredients, setIngredients] = useState([]);

  // TODO: Add state for brewing status
  // const [isbrewing, setIsBrewing] = useState(false);

  // TODO: Add state for completed potion

  // Available ingredients
  const availableIngredients = [
    { id: 1, name: "Dragon Scale", effect: "strength" },
    { id: 2, name: "Moonflower", effect: "wisdom" },
    { id: 3, name: "Phoenix Feather", effect: "vitality" },
    { id: 4, name: "Shadow Essence", effect: "stealth" },
  ];

  // TODO: Create function to add ingredient
  // function addIngredient(ingredient) { }

  // TODO: Create function to remove ingredient

  // TODO: Create function to brew potion
  // This should combine the selected ingredients

  return (
    <div>
      <h1>Quest 2: Potion Brewing</h1>
      <p>Select ingredients and brew magical potions!</p>

      <div className="brewing-container">
        <div className="ingredients-panel">
          <h2>Available Ingredients</h2>
          {/* TODO: Display available ingredients with "Add" buttons */}
        </div>

        <div className="cauldron">
          <h2>Cauldron</h2>
          {/* TODO: Display selected ingredients */}
          {/* TODO: Add "Brew" button */}
        </div>

        <div className="result">{/* TODO: Display the completed potion */}</div>
      </div>
    </div>
  );
}

export default App;
