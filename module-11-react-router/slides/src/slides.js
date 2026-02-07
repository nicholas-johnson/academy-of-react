export const slides = [
  {
    type: 'title',
    content: {
      title: 'React Router',
      subtitle: 'Module 11: Client-Side Navigation',
      emoji: '🧭'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'The Problem',
      points: [
        'Traditional websites reload the entire page on navigation',
        'Lose all JavaScript state on each page change',
        'Slow user experience with full page loads',
        'No way to deep-link into app state',
        'We need navigation without page reloads!'
      ],
      emoji: '😤'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'What is React Router?',
      points: [
        'Library for client-side routing in React',
        'URL changes update components, not reload page',
        'Keeps browser history working (back/forward)',
        'Enables bookmarkable URLs in SPAs',
        'The standard routing solution for React'
      ],
      emoji: '🧭'
    }
  },
  {
    type: 'code',
    content: {
      title: 'Basic Setup',
      code: `// main.jsx - Wrap your app with BrowserRouter
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// App.jsx - Define routes
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/spells" element={<SpellList />} />
    </Routes>
  )
}`,
      highlights: [
        'BrowserRouter is a context provider',
        'It enables all router hooks to work',
        'Routes is the container',
        'Route maps path to component'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Navigation with Link',
      code: `import { Link, NavLink } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      {/* Link - basic navigation */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      
      {/* NavLink - with active styling */}
      <NavLink 
        to="/spells"
        className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        Spells
      </NavLink>
    </nav>
  )
}`,
      highlights: [
        'Link navigates without page reload',
        'NavLink knows if it\'s the current route',
        'className callback gets isActive boolean',
        'Never use <a> for internal links!'
      ]
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'Link vs Anchor Tag',
      left: {
        label: '<a> Tag (Bad)',
        code: `// Full page reload!
<a href="/about">About</a>

// Loses all state
// Slow navigation
// Breaks SPA experience`
      },
      right: {
        label: '<Link> Component (Good)',
        code: `// Client-side navigation
<Link to="/about">About</Link>

// No page reload
// Preserves state
// Fast transitions
// Updates URL + history`
      }
    }
  },
  {
    type: 'code',
    content: {
      title: 'URL Parameters',
      code: `// Route with parameter
<Route path="/spells/:id" element={<SpellDetail />} />

// Component reads the parameter
import { useParams } from 'react-router-dom'

function SpellDetail() {
  const { id } = useParams()  // { id: "42" }
  
  // Note: params are always strings!
  const spell = spells.find(s => s.id === parseInt(id))
  
  return <h1>{spell.name}</h1>
}

// Links to dynamic routes
<Link to="/spells/1">Fireball</Link>
<Link to={\`/spells/\${spell.id}\`}>{spell.name}</Link>`,
      highlights: [
        ':id creates a URL parameter',
        'useParams() reads all params',
        'Params are always strings',
        'Use template literals for dynamic links'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Programmatic Navigation',
      code: `import { useNavigate } from 'react-router-dom'

function SpellDetail() {
  const navigate = useNavigate()
  
  // Navigate to a path
  const goHome = () => navigate('/')
  
  // Go back (like browser back button)
  const goBack = () => navigate(-1)
  
  // Go forward
  const goForward = () => navigate(1)
  
  // Replace current history entry
  const replaceWithHome = () => navigate('/', { replace: true })
  
  return (
    <div>
      <button onClick={goBack}>← Back</button>
      <button onClick={goHome}>Home</button>
    </div>
  )
}`,
      highlights: [
        'useNavigate returns a function',
        'navigate(-1) goes back',
        'navigate(1) goes forward',
        'replace: true skips history entry'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Nested Routes & Outlet',
      code: `// Parent route with nested children
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="spells" element={<SpellList />} />
    <Route path="about" element={<About />} />
  </Route>
</Routes>

// Layout renders Outlet where children appear
function Layout() {
  return (
    <div>
      <header>
        <nav>...</nav>
      </header>
      
      <main>
        <Outlet />  {/* Child routes render here */}
      </main>
    </div>
  )
}`,
      highlights: [
        'Nest Route components for layouts',
        'index is the default child route',
        'Outlet marks where children render',
        'Layout persists across route changes'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: '404 Handling',
      code: `<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="spells" element={<SpellList />} />
    <Route path="spells/:id" element={<SpellDetail />} />
    
    {/* Catch-all for unknown routes */}
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  )
}`,
      highlights: [
        'path="*" matches anything',
        'Put it last to catch unmatched routes',
        'Show friendly 404 page',
        'Provide navigation back to app'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Protected Routes',
      code: `import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  
  if (!user) {
    // Redirect to login, remember where they wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}

// Usage in routes
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />`,
      highlights: [
        'Navigate component redirects',
        'state passes data to next route',
        'location.state.from for redirect back',
        'Wrap protected components'
      ]
    }
  },
  {
    type: 'code',
    content: {
      title: 'Search Parameters',
      code: `import { useSearchParams } from 'react-router-dom'

function SpellList() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // Read from URL: /spells?element=fire
  const element = searchParams.get('element') || 'all'
  
  // Update URL
  const setFilter = (value) => {
    if (value === 'all') {
      setSearchParams({})  // Remove param
    } else {
      setSearchParams({ element: value })
    }
  }
  
  // Filter uses URL state
  const filtered = element === 'all' 
    ? spells 
    : spells.filter(s => s.element === element)
}`,
      highlights: [
        'Works like useState for query params',
        'searchParams.get() reads values',
        'setSearchParams() updates URL',
        'State survives refresh, is shareable'
      ]
    }
  },
  {
    type: 'rules',
    content: {
      title: 'React Router Best Practices',
      rules: [
        { rule: 'Always use Link, not <a>', example: 'Prevents page reloads', icon: '🔗' },
        { rule: 'Use NavLink for navigation menus', example: 'Automatic active styling', icon: '✨' },
        { rule: 'Put catch-all route last', example: 'path="*" for 404s', icon: '🛑' },
        { rule: 'Use Outlet for shared layouts', example: 'Header/footer persist', icon: '📐' }
      ]
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Router Hooks Summary',
      points: [
        '🔗 useParams — Read URL parameters (/spell/:id)',
        '🧭 useNavigate — Programmatic navigation',
        '📍 useLocation — Current URL info + state',
        '🔍 useSearchParams — Query string state (?filter=x)',
        '🔀 useMatch — Check if path matches'
      ],
      emoji: '🪝'
    }
  },
  {
    type: 'comparison',
    content: {
      title: 'URL State vs Component State',
      left: {
        label: 'Component State (useState)',
        code: `const [filter, setFilter] = useState('all')

// State is local
// Lost on refresh
// Can't share via URL
// Can't bookmark`
      },
      right: {
        label: 'URL State (useSearchParams)',
        code: `const [params, setParams] = useSearchParams()
const filter = params.get('filter')

// State is in URL
// Survives refresh
// Shareable links
// Bookmarkable`
      }
    }
  },
  {
    type: 'standard',
    content: {
      title: 'When to Use URL State',
      points: [
        '✅ Filters and search queries',
        '✅ Pagination (page number)',
        '✅ Sort order',
        '✅ Tab selection',
        '✅ Anything user might want to bookmark/share',
        '❌ Form inputs (too noisy)',
        '❌ UI state like open/closed modals'
      ],
      emoji: '🤔'
    }
  },
  {
    type: 'standard',
    content: {
      title: 'Module 11 Quests',
      points: [
        '🏰 Quest 1: Academy Navigation — Basic routing with NavLink',
        '📜 Quest 2: Spell Directory — URL params with useParams',
        '⚔️ Quest 3: War Room — Protected routes & search params'
      ],
      emoji: '📋'
    }
  },
  {
    type: 'title',
    content: {
      title: "Let's Navigate!",
      subtitle: 'Time to build multi-page React apps',
      emoji: '🚀'
    }
  }
];
