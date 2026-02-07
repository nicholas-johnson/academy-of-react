export const slides = [
  {
    type: "title",
    content: {
      title: "Side Effects with useEffect",
      subtitle: "Module 5: Connecting to the Outside World",
      emoji: "🌐",
    },
  },
  {
    type: "standard",
    content: {
      title: "What Are Side Effects?",
      points: [
        "Anything that reaches outside React",
        "Fetching data from APIs",
        "Setting up timers or intervals",
        "Subscribing to events",
        "Directly modifying the DOM",
        "Saving to localStorage",
      ],
      emoji: "🔌",
    },
  },
  {
    type: "standard",
    content: {
      title: "The Problem",
      points: [
        "React components are pure functions",
        "They should just render based on props/state",
        "But we NEED to fetch data, set timers, etc.",
        "Where do we put this code?",
        "Enter: useEffect!",
      ],
      emoji: "🤔",
    },
  },
  {
    type: "title",
    content: {
      title: "useEffect",
      subtitle: "The escape hatch for side effects",
      emoji: "🪝",
    },
  },
  {
    type: "code",
    content: {
      title: "Basic useEffect Syntax",
      code: `import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Side effect code goes here
    console.log('Effect ran!');
  });
  
  return <div>Hello</div>;
}`,
      highlights: [
        "Import useEffect from React",
        "Call inside your component",
        "Pass a function as first argument",
        "Effect runs after component renders",
      ],
    },
  },
  {
    type: "title",
    content: {
      title: "The Dependency Array",
      subtitle: "Controlling when effects run",
      emoji: "📦",
    },
  },
  {
    type: "rules",
    content: {
      title: "Three Dependency Options",
      rules: [
        { rule: "No array", example: "Runs after EVERY render", icon: "🔄" },
        { rule: "Empty array []", example: "Runs ONCE on mount", icon: "1️⃣" },
        {
          rule: "With deps [a, b]",
          example: "Runs when a or b changes",
          icon: "👀",
        },
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Empty Array — Run Once",
      code: `function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Fetch user data on mount
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);  // <-- Empty array!
  
  return <div>{user?.name}</div>;
}`,
      highlights: [
        "Empty array [] = run once when component mounts",
        "Perfect for initial data fetching",
        "Like componentDidMount in class components",
        "Most common pattern!",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "With Dependencies — Run on Change",
      code: `function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    // Re-fetch when query changes
    fetch(\`/api/search?q=\${query}\`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]);  // <-- Re-run when query changes
  
  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}`,
      highlights: [
        "[query] = run when query prop changes",
        "Effect re-runs after each change",
        "List ALL values used inside the effect",
        "React will warn if you miss one!",
      ],
    },
  },
  {
    type: "comparison",
    content: {
      title: "When Does the Effect Run?",
      left: {
        label: "useEffect(() => {...})",
        items: [
          "No dependency array",
          "Runs after EVERY render",
          "Rarely what you want",
          "Can cause infinite loops!",
        ],
      },
      right: {
        label: "useEffect(() => {...}, [])",
        items: [
          "Empty dependency array",
          "Runs ONCE on mount",
          "Most common pattern",
          "Good for initial fetch",
        ],
      },
    },
  },
  {
    type: "title",
    content: {
      title: "Data Fetching",
      subtitle: "The most common use case",
      emoji: "📡",
    },
  },
  {
    type: "code",
    content: {
      title: "Async in useEffect",
      code: `useEffect(() => {
  // Define async function INSIDE the effect
  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    }
  };
  
  fetchData();  // Call it
}, []);`,
      highlights: [
        "Can't make useEffect callback async directly",
        "Define async function inside, then call it",
        "Always handle errors with try/catch",
        "Set loading/error states for good UX",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Three-State Pattern",
      code: `function DataLoader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <DataView data={data} />;
}`,
      highlights: [
        "Track three states: data, loading, error",
        "Start with loading: true",
        ".finally() always sets loading: false",
        "Render different UI for each state",
      ],
    },
  },
  {
    type: "title",
    content: {
      title: "Cleanup Functions",
      subtitle: "Preventing memory leaks",
      emoji: "🧹",
    },
  },
  {
    type: "standard",
    content: {
      title: "Why Cleanup?",
      points: [
        "Timers keep running if not cleared",
        "Subscriptions keep listening",
        "Fetch might complete after unmount",
        "Memory leaks slow your app",
        'React warns: "Can\'t update unmounted component"',
      ],
      emoji: "⚠️",
    },
  },
  {
    type: "code",
    content: {
      title: "Cleanup Function",
      code: `useEffect(() => {
  // Setup
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
  
  // Cleanup function (returned)
  return () => {
    clearInterval(timer);
  };
}, []);`,
      highlights: [
        "Return a function from useEffect",
        "React calls it before re-running effect",
        "Also called when component unmounts",
        "Clean up timers, subscriptions, listeners",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "Timer Example",
      code: `function Countdown({ seconds }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(r => r - 1);
    }, 1000);

    return () => clearInterval(timer);  // Cleanup!
  }, []);  // Run once on mount

  return <div>{remaining} seconds left</div>;
}`,
      highlights: [
        "setInterval creates a timer",
        "clearInterval stops it",
        "Cleanup prevents memory leak",
        "Timer stops when component unmounts",
      ],
    },
  },
  {
    type: "rules",
    content: {
      title: "When to Clean Up",
      rules: [
        {
          rule: "Timers",
          example: "clearInterval() / clearTimeout()",
          icon: "⏱️",
        },
        {
          rule: "Event Listeners",
          example: "removeEventListener()",
          icon: "👂",
        },
        {
          rule: "Subscriptions",
          example: "unsubscribe() / disconnect()",
          icon: "🔔",
        },
        {
          rule: "Fetch (optional)",
          example: "AbortController.abort()",
          icon: "🛑",
        },
      ],
    },
  },
  {
    type: "title",
    content: {
      title: "Common Patterns",
      subtitle: "useEffect in practice",
      emoji: "📚",
    },
  },
  {
    type: "code",
    content: {
      title: "Event Listener",
      code: `useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`,
      highlights: [
        "Add listener on mount",
        "Remove on unmount",
        "Always clean up global listeners",
        "window, document, etc.",
      ],
    },
  },
  {
    type: "code",
    content: {
      title: "LocalStorage Sync",
      code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);  // Save whenever value changes

  return [value, setValue];
}`,
      highlights: [
        "Read from localStorage on init",
        "Save to localStorage on change",
        "Dependencies: [key, value]",
        "This is a custom hook pattern!",
      ],
    },
  },
  {
    type: "title",
    content: {
      title: "Common Pitfalls",
      subtitle: "Mistakes to avoid",
      emoji: "🚨",
    },
  },
  {
    type: "comparison",
    content: {
      title: "Infinite Loop!",
      left: {
        label: "❌ Wrong",
        items: [
          "useEffect(() => {",
          "  setCount(count + 1);",
          "});",
          "No array = runs forever!",
        ],
      },
      right: {
        label: "✅ Right",
        items: [
          "useEffect(() => {",
          "  setCount(count + 1);",
          "}, []);",
          "Empty array = once",
        ],
      },
    },
  },
  {
    type: "comparison",
    content: {
      title: "Missing Dependencies",
      left: {
        label: "❌ Wrong",
        items: [
          "useEffect(() => {",
          "  fetch(`/api/${id}`)",
          "}, []);  // Missing id!",
          "Won't refetch when id changes",
        ],
      },
      right: {
        label: "✅ Right",
        items: [
          "useEffect(() => {",
          "  fetch(`/api/${id}`)",
          "}, [id]);  // Include id",
          "Refetches when id changes",
        ],
      },
    },
  },
  {
    type: "standard",
    content: {
      title: "The ESLint Rule",
      points: [
        "eslint-plugin-react-hooks warns about missing deps",
        "Don't ignore the warning!",
        "It catches real bugs",
        "List ALL values used inside the effect",
        "If something shouldn't trigger re-run, rethink your approach",
      ],
      emoji: "🔍",
    },
  },
  {
    type: "standard",
    content: {
      title: "Module 5 Goals",
      points: [
        "Understand what side effects are",
        "Master the useEffect hook",
        "Control timing with dependency arrays",
        "Fetch data from APIs properly",
        "Write cleanup functions to prevent leaks",
      ],
      emoji: "🎯",
    },
  },
  {
    type: "title",
    content: {
      title: "Let's Fetch Some Data!",
      subtitle: "Time to connect to APIs",
      emoji: "🚀",
    },
  },
];
