import { useState, useEffect } from 'react'
import './App.css'

const slides = [
  {
    type: 'title',
    content: {
      title: 'State with useState',
      subtitle: 'Module 3: Making Components Come Alive',
      emoji: '⚡'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'The Problem',
      points: [
        'Our components are static',
        'Props flow down but never change',
        'How do we track health after damage?',
        'How do we update mana after casting?',
        'We need values that can CHANGE...'
      ],
      emoji: '🤔'
    }
  },
  {
    type: 'title',
    content: {
      title: 'Enter State!',
      subtitle: 'Values that change over time',
      emoji: '✨'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'What is State?',
      points: [
        'Data that belongs to a component',
        'Can change over time',
        'When state changes, component re-renders',
        'Each component instance has its own state',
        'The "memory" of your component'
      ],
      emoji: '🧠'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Events: Responding to Users',
      points: [
        'onClick — When user clicks a button',
        'onChange — When input value changes',
        'onSubmit — When form is submitted',
        'Events trigger functions that update state',
        'camelCase in React (onClick not onclick)'
      ],
      emoji: '👆'
    }
  },
  {
    type: 'rules',
    content: {
      title: 'Common Event Patterns',
      rules: [
        { rule: 'onClick', example: '<button onClick={handleClick}>', icon: '🖱️' },
        { rule: 'onChange', example: '<input onChange={handleChange}>', icon: '⌨️' },
        { rule: 'onSubmit', example: '<form onSubmit={handleSubmit}>', icon: '📤' },
        { rule: 'Arrow function', example: 'onClick={() => setCount(count + 1)}', icon: '➡️' }
      ]
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'Button vs Link',
      left: {
        label: '<button>',
        items: [
          'Performs an ACTION',
          'Updates state, submits forms',
          'onClick to handle',
          'Keyboard: Space or Enter'
        ]
      },
      right: {
        label: '<a> (link)',
        items: [
          'NAVIGATES to a URL',
          'Goes to another page',
          'href="/somewhere"',
          'Keyboard: Enter only'
        ]
      }
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Choose the Right Element',
      points: [
        'Does it GO somewhere? Use <a href="...">',
        'Does it DO something? Use <button>',
        'Never: <div onClick={...}> (not accessible!)',
        'Never: <a onClick={...}> without href',
        'Screen readers announce them differently'
      ],
      emoji: '♿'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Why Not <div onClick>?',
      points: [
        'No keyboard focus — Tab key skips it',
        'No Space/Enter key handling',
        'Screen readers don\'t announce as interactive',
        'Missing semantic meaning',
        'Just use <button> — free accessibility!'
      ],
      emoji: '🚫'
    }
  },
  {
    type: 'title',
    content: {
      title: 'This is Reactivity!',
      subtitle: "That's why it's called React",
      emoji: '⚛️'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'The React Cycle',
      points: [
        '1. User triggers an EVENT (click, type, submit)',
        '2. Event handler updates STATE',
        '3. React REACTS — automatically re-renders',
        '4. UI updates to show new state',
        'You describe WHAT to show, React handles WHEN to update'
      ],
      emoji: '🔄'
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'State vs Props',
      left: {
        label: 'Props',
        items: [
          'Passed from parent',
          'Read-only (immutable)',
          'Like function arguments',
          'For configuration'
        ]
      },
      right: {
        label: 'State',
        items: [
          'Owned by component',
          'Can be updated',
          'Like function variables',
          'For interactivity'
        ]
      }
    }
  },
  {
    type: 'code',
    content: {
      title: 'The useState Hook',
      code: `import { useState } from 'react';

function Counter() {
  // Declare state: [value, setValue]
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add One
      </button>
    </div>
  );
}`,
      highlights: [
        'useState(0) — Initial value is 0',
        'count — Current state value',
        'setCount — Function to update state',
        'Calling setCount triggers re-render!'
      ]
    }
  },
  {
    type: 'rules',
    content: {
      title: 'useState Rules',
      rules: [
        { rule: 'Call at top level', example: 'Not inside loops or conditions', icon: '1️⃣' },
        { rule: 'Use the setter function', example: 'setCount(5) not count = 5', icon: '2️⃣' },
        { rule: 'State updates are async', example: 'New value on next render', icon: '3️⃣' },
        { rule: "Don't mutate directly", example: 'Create new objects/arrays', icon: '4️⃣' }
      ]
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Controlled Components',
      points: [
        'Form inputs tied to state',
        'value={state} — display current state',
        'onChange — update state when user types',
        'React is the "source of truth"',
        'Enables validation, formatting, sync'
      ],
      emoji: '🎮'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Controlled Input Example',
      code: `function NameForm() {
  const [name, setName] = useState('');
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Hello, {name || 'stranger'}!</p>
    </div>
  );
}`,
      highlights: [
        'value={name} — Input shows state',
        'onChange — Updates state on every keystroke',
        'e.target.value — The new input value',
        'UI always reflects current state'
      ]
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Module 3 Goals',
      points: [
        'Use useState for interactive values',
        'Handle clicks and form inputs',
        'Build controlled components',
        'Work with object and array state',
        'Understand state vs props'
      ],
      emoji: '🎯'
    }
  },
  {
    type: 'title',
    content: {
      title: "Let's Code!",
      subtitle: 'Time to make things interactive',
      emoji: '🚀'
    }
  }
];

function TitleSlide({ content }) {
  return (
    <div className="slide title-slide">
      <div className="title-emoji">{content.emoji}</div>
      <h1>{content.title}</h1>
      <p className="subtitle">{content.subtitle}</p>
    </div>
  );
}

function StandardSlide({ content }) {
  return (
    <div className="slide standard-slide">
      <div className="slide-header">
        <span className="slide-emoji">{content.emoji}</span>
        <h1>{content.title}</h1>
      </div>
      <ul className="points-list">
        {content.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function ComparisonSlide({ content }) {
  return (
    <div className="slide comparison-slide">
      <h1>{content.title}</h1>
      <div className="comparison-grid">
        <div className="comparison-panel left">
          <h3>{content.left.label}</h3>
          <ul className="comparison-list">
            {content.left.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="comparison-panel right">
          <h3>{content.right.label}</h3>
          <ul className="comparison-list">
            {content.right.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CodeSlide({ content }) {
  return (
    <div className="slide code-slide">
      <h1>{content.title}</h1>
      <div className="code-container">
        <pre><code>{content.code}</code></pre>
      </div>
      <div className="code-highlights">
        {content.highlights.map((highlight, i) => (
          <div key={i} className="highlight-item">
            <span className="highlight-arrow">→</span>
            {highlight}
          </div>
        ))}
      </div>
    </div>
  );
}

function RulesSlide({ content }) {
  return (
    <div className="slide rules-slide">
      <h1>{content.title}</h1>
      <div className="rules-grid">
        {content.rules.map((item, i) => (
          <div key={i} className="rule-card">
            <span className="rule-icon">{item.icon}</span>
            <span className="rule-text">{item.rule}</span>
            <span className="rule-example">{item.example}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = slides[currentSlide];

  const renderSlide = () => {
    switch (slide.type) {
      case 'title':
        return <TitleSlide content={slide.content} />;
      case 'comparison':
        return <ComparisonSlide content={slide.content} />;
      case 'code':
        return <CodeSlide content={slide.content} />;
      case 'rules':
        return <RulesSlide content={slide.content} />;
      default:
        return <StandardSlide content={slide.content} />;
    }
  };

  return (
    <div className="slideshow">
      {renderSlide()}
      
      <div className="controls">
        <button 
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          disabled={currentSlide === 0}
        >
          ← Prev
        </button>
        <span className="slide-counter">
          {currentSlide + 1} / {slides.length}
        </span>
        <button 
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
          disabled={currentSlide === slides.length - 1}
        >
          Next →
        </button>
      </div>
      
      <div className="instructions">
        Use ← → arrow keys or click buttons to navigate
      </div>
    </div>
  );
}

export default App;
