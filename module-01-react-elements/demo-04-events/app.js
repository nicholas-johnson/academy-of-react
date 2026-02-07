// Shorthand for createElement
const h = React.createElement;
const root = ReactDOM.createRoot(document.getElementById('root'));

// ============================================
// STATE - Variables that change over time
// (In Module 4, you'll learn useState for this!)
// ============================================
let count = 0;
let wizardName = 'Merlin';
let powerLevel = 50;

// ============================================
// THE KEY PATTERN: Update state, then re-render
// ============================================

const render = () => {
  const app = h('div', null,
    h('h1', null, '🎮 Demo 4: Events & Reactivity'),
    
    // ============================================
    // EXAMPLE 1: Click Events
    // ============================================
    h('h2', null, '1. Click Events'),
    h('p', null, 'React uses camelCase: ', h('code', null, 'onClick'), ', not ', h('code', null, 'onclick')),
    
    h('div', { className: 'example' },
      h('div', { className: 'counter-display' }, count),
      h('div', { style: { textAlign: 'center' } },
        h('button', {
          onClick: () => {
            count = count - 1;  // Update state
            render();            // Re-render!
          }
        }, '➖ Decrease'),
        h('button', {
          onClick: () => {
            count = count + 1;  // Update state
            render();            // Re-render!
          }
        }, '➕ Increase'),
        h('button', {
          onClick: () => {
            count = 0;          // Update state
            render();            // Re-render!
          }
        }, '🔄 Reset')
      )
    ),
    
    // ============================================
    // EXAMPLE 2: Input Events (onChange)
    // ============================================
    h('h2', null, '2. Input Events'),
    h('p', null, 'Use ', h('code', null, 'onChange'), ' for text inputs:'),
    
    h('div', { className: 'example' },
      h('input', {
        type: 'text',
        placeholder: 'Enter wizard name...',
        defaultValue: wizardName,
        onChange: (event) => {
          wizardName = event.target.value;  // Get value from event
          render();
        }
      }),
      h('div', { className: 'greeting' },
        wizardName ? `✨ Welcome, ${wizardName}!` : '👆 Type a name above'
      )
    ),
    
    // ============================================
    // EXAMPLE 3: Range Slider (onInput)
    // ============================================
    h('h2', null, '3. Range Slider'),
    h('p', null, 'Use ', h('code', null, 'onInput'), ' for instant updates, or ', 
      h('code', null, 'onChange'), ' for when released:'),
    
    h('div', { className: 'example' },
      h('input', {
        type: 'range',
        min: 0,
        max: 100,
        defaultValue: powerLevel,
        onInput: (event) => {
          powerLevel = parseInt(event.target.value);
          render();
        }
      }),
      h('div', { className: 'slider-value' }, `⚡ Power: ${powerLevel}`),
      h('div', { className: 'power-bar' },
        h('div', { 
          className: 'power-fill',
          style: { width: `${powerLevel}%` }
        })
      )
    ),
    
    // ============================================
    // KEY CONCEPT BOX
    // ============================================
    h('div', { className: 'key-concept' },
      h('strong', null, '🔑 The Reactivity Pattern:'),
      h('ol', null,
        h('li', null, 'User interacts (click, type, drag)'),
        h('li', null, 'Event handler updates the state variable'),
        h('li', null, 'Call render() to update the UI'),
        h('li', null, 'React efficiently updates only what changed')
      ),
      h('p', null, 
        'In Module 4, you\'ll learn ', h('code', null, 'useState'), 
        ' which handles steps 2 and 3 automatically!'
      )
    ),
    
    // ============================================
    // EXAMPLE 4: Combining Multiple Events
    // ============================================
    h('h2', null, '4. Putting It Together'),
    h('p', null, 'A wizard card that updates in real-time:'),
    
    h('div', { className: 'example' },
      h('div', { 
        style: { 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center'
        }
      },
        h('h3', { style: { margin: '0 0 10px 0' } }, 
          `🧙 ${wizardName || 'Unknown Wizard'}`
        ),
        h('p', { style: { margin: '5px 0', opacity: 0.9 } }, 
          `Power Level: ${powerLevel}`
        ),
        h('p', { style: { margin: '5px 0', opacity: 0.9 } }, 
          `Battles Won: ${count >= 0 ? count : 0}`
        ),
        h('p', { style: { margin: '10px 0 0 0', fontSize: '12px', opacity: 0.7 } }, 
          '👆 Change the values above to update this card!'
        )
      )
    )
  );
  
  root.render(app);
};

// Initial render
render();
