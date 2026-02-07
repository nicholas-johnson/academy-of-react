import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import './App.css'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return (saved as Theme) || 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

function Header() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <header className="header">
      <h1>⚡ Battle Academy</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  )
}

function Content() {
  const { theme } = useTheme()
  
  return (
    <div className="content">
      <h2>Welcome, Wizard!</h2>
      <p>Current theme: <strong>{theme}</strong></p>
      <p>This component accesses theme without prop drilling!</p>
      
      <div className="stats">
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <div>
            <div className="stat-value">250</div>
            <div className="stat-label">Spells Cast</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div>
            <div className="stat-value">1,420</div>
            <div className="stat-label">Experience</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <div>
            <div className="stat-value">15</div>
            <div className="stat-label">Victories</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  const { theme } = useTheme()
  
  return (
    <footer className="footer">
      <p>Theme persists across sessions thanks to localStorage</p>
      <p className="hint">Current: {theme} mode</p>
    </footer>
  )
}

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <Content />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
