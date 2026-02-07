import { useState, useEffect } from 'react'
import './App.css'

const slides = [
  {
    type: 'title',
    content: {
      title: 'React Fundamentals',
      subtitle: 'Building Modern User Interfaces',
      emoji: '⚛️'
    }
  },
  {
    type: 'welcome',
    content: {
      title: 'Welcome to the Academy!',
      points: [
        '👋 Welcome to React training',
        '🎯 By the end, you\'ll build real React applications',
        '🧙‍♂️ We\'ll learn through the Wizard Academy story',
        '💪 Hands-on quests at every step'
      ]
    }
  },
  {
    type: 'standard',
    content: {
      title: 'What is React?',
      points: [
        'A JavaScript library for building user interfaces',
        'Created by Facebook (Meta) in 2013',
        'Component-based architecture',
        'Declarative — describe WHAT you want, not HOW',
        'Used by: Facebook, Instagram, Netflix, Airbnb, and more'
      ],
      emoji: '🤔'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Why Learn React?',
      points: [
        '📈 Most popular frontend framework (by far)',
        '💼 High demand in job market',
        '🔄 Reusable components save time',
        '⚡ Virtual DOM = fast updates',
        '🌐 Huge ecosystem and community',
        '📱 React Native for mobile apps'
      ],
      emoji: '🚀'
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'Traditional vs React',
      left: {
        label: 'Traditional (Imperative)',
        code: `// Find the element
const btn = document.getElementById('btn');
const count = document.getElementById('count');

// Manually update DOM
btn.addEventListener('click', () => {
  const current = parseInt(count.textContent);
  count.textContent = current + 1;
});`
      },
      right: {
        label: 'React (Declarative)',
        code: `// Describe the UI
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`
      }
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Course Structure',
      points: [
        '📚 14 Modules covering React fundamentals to advanced',
        '🎯 Each module has demos and quests',
        '✨ Demos: Watch and learn',
        '⚔️ Quests: Hands-on practice',
        '🏆 Side Quests: Optional projects to build'
      ],
      emoji: '🗺️'
    }
  },
  {
    type: 'modules',
    content: {
      title: 'What We\'ll Cover',
      modules: [
        { num: '1-2', name: 'React Elements & JSX', icon: '🧱' },
        { num: '3-4', name: 'State & Props', icon: '⚡' },
        { num: '5-6', name: 'Forms & Lists', icon: '📝' },
        { num: '7-8', name: 'Effects & State Management', icon: '🔄' },
        { num: '9-10', name: 'Router & Refs', icon: '🧭' },
        { num: '11-14', name: 'Hooks, Performance & SSR', icon: '🚀' }
      ]
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Resources',
      points: [
        '📖 Course README — Start here!',
        '📁 Each module has its own folder',
        '💡 INSTRUCTOR_NOTES.md — Teaching guides',
        '🧪 demo/ folders — Live code examples',
        '⚔️ quest-XX/ folders — Your challenges',
        '📚 extras/ — Tailwind CSS & TypeScript guides'
      ],
      emoji: '📚'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'How to Succeed',
      points: [
        '👀 Watch the demos carefully',
        '⌨️ Type the code yourself (don\'t copy-paste)',
        '🐛 Embrace errors — they teach you!',
        '❓ Ask questions anytime',
        '🔄 Practice, practice, practice'
      ],
      emoji: '🎯'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Module 1: React Elements',
      points: [
        'Understanding React.createElement()',
        'How React builds the UI tree',
        'Why this matters (even though we\'ll use JSX later)',
        'Rendering to the DOM with ReactDOM',
        'Building without a build step!'
      ],
      emoji: '🧱'
    }
  },
  {
    type: 'title',
    content: {
      title: 'Let\'s Begin!',
      subtitle: 'Time for Demo 1: React.createElement()',
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

function WelcomeSlide({ content }) {
  return (
    <div className="slide welcome-slide">
      <h1>{content.title}</h1>
      <ul className="points-list welcome-list">
        {content.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
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

function ModulesSlide({ content }) {
  return (
    <div className="slide modules-slide">
      <h1>{content.title}</h1>
      <div className="modules-grid">
        {content.modules.map((mod, i) => (
          <div key={i} className="module-card">
            <span className="module-icon">{mod.icon}</span>
            <span className="module-num">Modules {mod.num}</span>
            <span className="module-name">{mod.name}</span>
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
      case 'welcome':
        return <WelcomeSlide content={slide.content} />;
      case 'comparison':
        return <ComparisonSlide content={slide.content} />;
      case 'modules':
        return <ModulesSlide content={slide.content} />;
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
