import { render } from './main.jsx';
import './App.css';

// Spell types data
const spellTypes = {
  fire: {
    name: 'Fire',
    icon: '🔥',
    color: '#dc2626',
    basePower: 30,
    manaCost: 15,
  },
  ice: {
    name: 'Ice',
    icon: '❄️',
    color: '#2563eb',
    basePower: 25,
    manaCost: 12,
  },
  lightning: {
    name: 'Lightning',
    icon: '⚡',
    color: '#eab308',
    basePower: 40,
    manaCost: 20,
  },
  healing: {
    name: 'Healing',
    icon: '💚',
    color: '#16a34a',
    basePower: 20,
    manaCost: 10,
  },
};

// State variables (module-level)
let selectedSpell = 'fire';
let wizardLevel = 1;
let intelligence = 50;

// TODO: Create a function to calculate damage
// Hint: damage = basePower + (wizardLevel * 2) + (intelligence / 10)

// TODO: Create the App component with:
// - Spell selection buttons
// - Sliders for wizardLevel and intelligence
// - Results display showing calculated damage
// - Remember to call render() when state changes!

const App = () => {
  return (
    <div className="calculator">
      <h1>⚡ Spell Calculator</h1>
      <p>Selected: {spellTypes[selectedSpell].icon} {spellTypes[selectedSpell].name}</p>
      <p>Level: {wizardLevel}</p>
      <p>Intelligence: {intelligence}</p>
      
      {/* TODO: Add spell selection buttons */}
      {/* TODO: Add sliders for level and intelligence */}
      {/* TODO: Add results panel */}
    </div>
  );
};

export default App;
