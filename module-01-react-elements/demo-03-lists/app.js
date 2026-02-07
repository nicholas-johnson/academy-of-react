// Shorthand for createElement
const h = React.createElement;

// ============================================
// Example 1: Simple array of strings
// ============================================
const spellNames = ['Fireball', 'Ice Shard', 'Lightning Bolt', 'Healing Light'];

// Map transforms each string into a React element
const simpleList = h('ul', null,
  spellNames.map((spell, index) => 
    h('li', { key: index }, spell)
  )
);

// ============================================
// Example 2: Array of objects
// ============================================
const spells = [
  { id: 1, name: 'Fireball', damage: 50, element: '🔥' },
  { id: 2, name: 'Ice Shard', damage: 35, element: '❄️' },
  { id: 3, name: 'Lightning Bolt', damage: 65, element: '⚡' },
  { id: 4, name: 'Healing Light', damage: 0, element: '✨' },
];

// Use the object's id as the key (better than index!)
const spellList = h('div', null,
  spells.map(spell => 
    h('div', { key: spell.id, className: 'spell-card' },
      h('h3', null, `${spell.element} ${spell.name}`),
      h('p', null, spell.damage > 0 ? `Damage: ${spell.damage}` : 'Healing spell')
    )
  )
);

// ============================================
// Example 3: Numbered list with index
// ============================================
const wizards = ['Merlin', 'Gandalf', 'Dumbledore', 'Morgana'];

const numberedList = h('ol', null,
  wizards.map((wizard, index) => 
    h('li', { key: wizard }, `${wizard} (Rank #${index + 1})`)
  )
);

// ============================================
// Key Warning Message
// ============================================
const keyWarning = h('div', { className: 'key-warning' },
  h('strong', null, '⚠️ Always use keys! '),
  'React uses keys to track which items changed. Use unique IDs when available, ',
  'or index as a last resort. Keys help React update the DOM efficiently.'
);

// ============================================
// Main App
// ============================================
const app = h('div', null,
  h('h1', null, '📜 Demo 3: Rendering Lists'),
  
  h('h2', null, '1. Simple String Array'),
  h('p', null, 'Transform an array of strings into list items:'),
  h('div', { className: 'example' }, simpleList),
  h('code', null, 'spellNames.map((spell, index) => h("li", { key: index }, spell))'),
  
  h('h2', null, '2. Array of Objects'),
  h('p', null, 'Render complex data with multiple properties:'),
  h('div', { className: 'example' }, spellList),
  h('code', null, 'spells.map(spell => h("div", { key: spell.id }, ...))'),
  
  h('h2', null, '3. Using Index for Numbering'),
  h('p', null, 'The second argument to map() is the index:'),
  h('div', { className: 'example' }, numberedList),
  h('code', null, 'wizards.map((wizard, index) => h("li", { key: wizard }, ...))'),
  
  keyWarning
);

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
