import { useState, useEffect } from 'react'
import './App.css'

const slides = [
  {
    type: 'title',
    content: {
      title: 'Forms and Events',
      subtitle: 'Module 4: Capturing User Input',
      emoji: '📝'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'The Challenge',
      points: [
        'Users need to enter data',
        'Registration forms, search boxes, filters',
        'We need to capture what they type',
        'Validate before submitting',
        'Handle the submission properly'
      ],
      emoji: '🤔'
    }
  },
  {
    type: 'title',
    content: {
      title: 'Controlled Components',
      subtitle: 'React controls the input',
      emoji: '🎮'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'What is a Controlled Component?',
      points: [
        'Input value is stored in React state',
        'value={state} — displays current state',
        'onChange — updates state when user types',
        'React is the "single source of truth"',
        'Every keystroke flows through React'
      ],
      emoji: '🔄'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Basic Controlled Input',
      code: `function NameInput() {
  const [name, setName] = useState('');
  
  return (
    <input 
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
    />
  );
}`,
      highlights: [
        'value={name} — Input displays state',
        'onChange fires on every keystroke',
        'e.target.value — What the user typed',
        'setName updates state → input re-renders'
      ]
    }
  },
  {
    type: 'rules',
    content: {
      title: 'Input Types',
      rules: [
        { rule: 'Text Input', example: '<input type="text" value={text} onChange={...} />', icon: '📝' },
        { rule: 'Number Input', example: '<input type="number" value={num} onChange={...} />', icon: '🔢' },
        { rule: 'Checkbox', example: '<input type="checkbox" checked={bool} onChange={...} />', icon: '☑️' },
        { rule: 'Select', example: '<select value={choice} onChange={...}>...</select>', icon: '📋' }
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Checkboxes & Radio Buttons',
      code: `// CHECKBOX — uses checked + e.target.checked
const [agreed, setAgreed] = useState(false);

<input 
  type="checkbox"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>

// RADIO BUTTONS — same name, check against value
const [role, setRole] = useState('attacker');

<input type="radio" name="role" value="attacker"
       checked={role === 'attacker'}
       onChange={(e) => setRole(e.target.value)} />
       
<input type="radio" name="role" value="defender"
       checked={role === 'defender'}
       onChange={(e) => setRole(e.target.value)} />`,
      highlights: [
        'Checkbox: checked={bool}, e.target.checked',
        'Radio: same name groups them together',
        'Radio: checked={state === "thisValue"}',
        'Radio: still uses e.target.value (not checked)'
      ]
    }
  },
  {
    type: 'rules',
    content: {
      title: 'HTML5 Input Types',
      rules: [
        { rule: 'email', example: 'Shows @ keyboard on mobile, validates format', icon: '📧' },
        { rule: 'tel', example: 'Shows phone keypad on mobile', icon: '📱' },
        { rule: 'password', example: 'Masks input with dots/asterisks', icon: '🔐' },
        { rule: 'date', example: 'Native date picker (no library needed!)', icon: '📅' }
      ]
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Why Use Specific Types?',
      points: [
        'Mobile keyboards adapt (number pad, @ key, etc.)',
        'Built-in browser validation for free',
        'Better accessibility for screen readers',
        'Native UI controls (date pickers, color pickers)',
        'All still work as controlled components!'
      ],
      emoji: '📱'
    }
  },
  {
    type: 'title',
    content: {
      title: 'Form Submission',
      subtitle: 'Handling the submit event',
      emoji: '📤'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'The Default Problem',
      points: [
        'HTML forms refresh the page on submit',
        'This loses all your React state!',
        'We need to prevent the default behavior',
        'e.preventDefault() stops the refresh',
        'Then we handle submission ourselves'
      ],
      emoji: '⚠️'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Form Submission Pattern',
      code: `function SignupForm() {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();  // CRITICAL!
    
    // Now handle the data
    console.log('Submitting:', email);
    // Send to server, validate, etc.
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}`,
      highlights: [
        'onSubmit on the <form> element',
        'e.preventDefault() — Stops page refresh!',
        'Access state values in handler',
        'button type="submit" triggers form'
      ]
    }
  },
  {
    type: 'title',
    content: {
      title: 'Form Validation',
      subtitle: 'Checking input before submission',
      emoji: '✅'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Validation Strategies',
      points: [
        'On submit — check all fields at once',
        'On blur — check when user leaves field',
        'On change — check every keystroke',
        'Track errors in state',
        'Display helpful error messages'
      ],
      emoji: '🔍'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Simple Validation',
      code: `function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!email.includes('@')) {
      setError('Please enter valid email');
      return;  // Stop here!
    }
    
    setError('');  // Clear error
    console.log('Valid submission:', email);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={...} />
      {error && <p className="error">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`,
      highlights: [
        'Track error message in state',
        'Validate before processing',
        'return early if invalid',
        'Conditionally render error message'
      ]
    }
  },
  {
    type: 'rules',
    content: {
      title: 'Common Validations',
      rules: [
        { rule: 'Required', example: 'if (!value) setError("Required")', icon: '❗' },
        { rule: 'Email', example: 'if (!value.includes("@")) ...', icon: '📧' },
        { rule: 'Min Length', example: 'if (value.length < 8) ...', icon: '📏' },
        { rule: 'Match', example: 'if (password !== confirm) ...', icon: '🔐' }
      ]
    }
  },
  {
    type: 'title',
    content: {
      title: 'Multiple Inputs',
      subtitle: 'Managing form state efficiently',
      emoji: '📋'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Form State as Object',
      code: `function RegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    house: 'Gryffin'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,        // Keep other fields
      [name]: value   // Update this field
    });
  };
  
  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <select name="house" value={form.house} onChange={handleChange}>
        ...
      </select>
    </form>
  );
}`,
      highlights: [
        'Store all fields in one state object',
        'name attribute matches state key',
        '[name]: value — Dynamic key update',
        'One handler for all inputs!'
      ]
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'Separate vs Object State',
      left: {
        label: 'Separate useState',
        items: [
          'Simple for 1-2 inputs',
          'Each field has own setter',
          'More verbose with many fields',
          'Easier to understand'
        ]
      },
      right: {
        label: 'Object State',
        items: [
          'Scales better',
          'One handler for all',
          'Easy to reset entire form',
          'Matches form data structure'
        ]
      }
    }
  },
  {
    type: 'title',
    content: {
      title: 'Accessibility',
      subtitle: 'Forms for everyone',
      emoji: '♿'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Accessible Forms Matter',
      points: [
        'Screen readers need labels to announce inputs',
        'Keyboard users need proper focus management',
        'Error messages must be announced',
        'Good accessibility = good UX for everyone',
        'It\'s also the law in many places!'
      ],
      emoji: '🌍'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Accessible Form Pattern',
      code: `<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="email">Email Address</label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      aria-describedby="email-error"
      aria-invalid={!!error}
    />
    {error && (
      <span id="email-error" role="alert">
        {error}
      </span>
    )}
  </div>
  <button type="submit">Submit</button>
</form>`,
      highlights: [
        'htmlFor connects label to input (not "for"!)',
        'id on input matches htmlFor',
        'aria-describedby links input to error',
        'role="alert" announces errors to screen readers'
      ]
    }
  },
  {
    type: 'rules',
    content: {
      title: 'Accessibility Checklist',
      rules: [
        { rule: 'Labels', example: '<label htmlFor="id">...</label>', icon: '🏷️' },
        { rule: 'Error Alerts', example: 'role="alert" on error messages', icon: '🚨' },
        { rule: 'Required Fields', example: 'aria-required="true"', icon: '❗' },
        { rule: 'Focus Visible', example: 'Never hide focus outlines', icon: '🎯' }
      ]
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Module 4 Goals',
      points: [
        'Build controlled form inputs',
        'Handle form submission properly',
        'Implement field validation',
        'Manage multiple inputs efficiently',
        'Make forms accessible to everyone'
      ],
      emoji: '🎯'
    }
  },
  {
    type: 'title',
    content: {
      title: "Let's Build Forms!",
      subtitle: 'Time to capture user input',
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
