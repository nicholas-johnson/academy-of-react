export const slides = [
  {
    type: 'title',
    content: {
      title: 'The Children Prop',
      subtitle: 'Module 7: Building Wrapper Components',
      emoji: '📦'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'The Problem',
      points: [
        'We want reusable Card, Modal, Layout components',
        'But we don\'t know what content goes inside',
        'Prop-based approach is too rigid',
        'We need a way to "wrap" any content',
        'Enter: the children prop!'
      ],
      emoji: '🤔'
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'Props vs Children',
      left: {
        label: 'Props (Rigid)',
        code: `// Limited to specific props
<Card 
  title="Hello"
  body="Some text"
/>

// What if you want a button?
// Or an image? Or a list?
// Need to add more props...`
      },
      right: {
        label: 'Children (Flexible)',
        code: `// Put anything inside!
<Card>
  <h2>Hello</h2>
  <p>Some text</p>
  <button>Click</button>
  <img src="..." />
</Card>`
      }
    }
  },
  {
    type: 'code',
    content: {
      title: 'What is children?',
      code: `// When you use a component like this:
<Card>
  <h2>Title</h2>
  <p>Content here</p>
</Card>

// Everything between the tags becomes "children"
function Card({ children }) {
  return (
    <div className="card">
      {children}  {/* <h2> and <p> render here */}
    </div>
  );
}`,
      highlights: [
        'children = whatever is between the tags',
        'Destructure it like any other prop',
        'Render it with {children}',
        'Card doesn\'t need to know what\'s inside!'
      ]
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Common Use Cases',
      points: [
        '📦 Card — Wraps any content with styling',
        '🪟 Modal — Dialog that contains anything',
        '📐 Layout — Page structure with slots',
        '📋 Section — Groups content with a title',
        '🔘 Button — Wraps text, icons, or both'
      ],
      emoji: '🛠️'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Building a Card Component',
      code: `function Card({ children, variant = "default" }) {
  return (
    <div className={\`card card-\${variant}\`}>
      {children}
    </div>
  );
}

// Usage — same Card, different content!
<Card variant="outlined">
  <h3>Spell Info</h3>
  <p>Fireball: 40 damage</p>
</Card>

<Card variant="elevated">
  <img src="wizard.png" />
  <h3>Elara Moonwhisper</h3>
</Card>`,
      highlights: [
        'Card provides structure and styling',
        'Content is completely flexible',
        'Combine with other props (variant)',
        'Same component, endless possibilities'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Layout with Multiple Slots',
      code: `function PageLayout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

// Usage
<PageLayout
  header={<NavBar />}
  sidebar={<Menu items={menuItems} />}
>
  <h1>Welcome!</h1>
  <p>Main content goes here...</p>
</PageLayout>`,
      highlights: [
        'Named props for specific slots (header, sidebar)',
        'children for the main/default content',
        'Flexible page layouts without repetition',
        'Each slot can contain any JSX'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Modal Example',
      code: `function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="modal-body">
          {children}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// Usage — any content in the modal!
<Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm">
  <p>Are you sure you want to cast this spell?</p>
  <button onClick={handleConfirm}>Yes, cast it!</button>
</Modal>`,
      highlights: [
        'Modal handles open/close logic',
        'title prop for the header',
        'children for the body content',
        'Reusable for any confirmation/dialog'
      ]
    }
  },
  {
    type: 'rules',
    content: {
      title: 'When to Use children',
      rules: [
        { rule: 'Wrapper components', example: 'Card, Modal, Section', icon: '📦' },
        { rule: 'Layout components', example: 'PageLayout, Container', icon: '📐' },
        { rule: 'Unknown content', example: 'User provides the content', icon: '❓' },
        { rule: 'Flexible composition', example: 'Mix any elements inside', icon: '🧩' }
      ]
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'Props vs Children',
      left: {
        label: 'Use Props When',
        items: [
          'Content is simple (string, number)',
          'You need to transform the data',
          'Component controls the rendering',
          'Specific structure required'
        ]
      },
      right: {
        label: 'Use Children When',
        items: [
          'Content is complex (JSX)',
          'User decides what to render',
          'Component just wraps/decorates',
          'Maximum flexibility needed'
        ]
      }
    }
  },
  {
    type: 'standard',
    content: {
      title: 'This is Composition!',
      points: [
        'Small components combine into larger ones',
        'Each component has one job',
        'Card doesn\'t care what\'s inside',
        'Layout doesn\'t care what\'s in each slot',
        'Flexible, reusable, maintainable!'
      ],
      emoji: '🧩'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Module 7 Goals',
      points: [
        'Understand the children prop',
        'Build wrapper components (Card, Section)',
        'Create layout components with slots',
        'Know when to use children vs props',
        'Compose complex UIs from simple pieces'
      ],
      emoji: '🎯'
    }
  },
  {
    type: 'title',
    content: {
      title: 'Let\'s Compose!',
      subtitle: 'Time to build reusable components',
      emoji: '🚀'
    }
  }
];
