import { useState, useEffect } from 'react'
import './App.css'

const slides = [
  {
    type: 'title',
    content: {
      title: 'JSX & Components',
      subtitle: 'Module 2: The Modern Way',
      emoji: '✨'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Remember This?',
      points: [
        'React.createElement("div", { className: "card" }, ...)',
        'Nested calls everywhere',
        'Hard to read',
        'Hard to write',
        'There must be a better way...'
      ],
      emoji: '😩'
    }
  },
  {
    type: 'title',
    content: {
      title: 'Enter JSX!',
      subtitle: 'JavaScript + XML = ❤️',
      emoji: '🎉'
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'The Transformation',
      left: {
        label: 'createElement (Module 1)',
        code: `React.createElement(
  "div",
  { className: "card" },
  React.createElement("h1", null, "Hello"),
  React.createElement("p", null, "World")
)`
      },
      right: {
        label: 'JSX (Module 2)',
        code: `<div className="card">
  <h1>Hello</h1>
  <p>World</p>
</div>`
      }
    }
  },
  {
    type: 'standard',
    content: {
      title: 'What is JSX?',
      points: [
        'Looks like HTML, but it\'s JavaScript!',
        'A syntax extension for JavaScript',
        'Compiles to createElement() calls',
        'Makes React code readable and writable',
        'NOT a template language — it\'s just JS'
      ],
      emoji: '🤔'
    }
  },
  {
    type: 'rules',
    content: {
      title: 'JSX Rules',
      rules: [
        { rule: 'className not class', example: '<div className="card">', icon: '1️⃣' },
        { rule: 'Curly braces for JS', example: '<p>{user.name}</p>', icon: '2️⃣' },
        { rule: 'One parent element', example: '<div>...</div> or <>...</>', icon: '3️⃣' },
        { rule: 'Close all tags', example: '<img /> <br />', icon: '4️⃣' }
      ]
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Expressions in JSX',
      points: [
        '{variable} — Insert a value',
        '{2 + 2} — Do math',
        '{user.name} — Access properties',
        '{isLoggedIn ? "Hi!" : "Login"} — Conditionals',
        '{items.map(i => <li>{i}</li>)} — Loops'
      ],
      emoji: '{ }'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Welcome to Vite!',
      points: [
        '⚡ Lightning-fast dev server',
        '🔄 Hot Module Replacement (instant updates)',
        '📦 Proper npm package management',
        '🛠️ No more CDN scripts!',
        '✨ How professionals build React apps'
      ],
      emoji: '⚡'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Vite Commands',
      points: [
        'npm install — Install dependencies',
        'npm run dev — Start dev server',
        'Open http://localhost:5173',
        'Edit code → See instant updates!',
        'Ctrl+C — Stop the server'
      ],
      emoji: '💻'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Module 2 Goals',
      points: [
        'Convert createElement to JSX',
        'Create function components',
        'Pass data with props',
        'Render lists with .map()',
        'Build reusable UI pieces'
      ],
      emoji: '🎯'
    }
  },
  {
    type: 'title',
    content: {
      title: 'Let\'s Code!',
      subtitle: 'Time to see JSX in action',
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
          <pre><code>{content.left.code}</code></pre>
        </div>
        <div className="comparison-panel right">
          <h3>{content.right.label}</h3>
          <pre><code>{content.right.code}</code></pre>
        </div>
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
            <code className="rule-example">{item.example}</code>
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
