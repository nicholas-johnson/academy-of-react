import { useState } from 'react'
import './App.css'

// Import all hook demos
import UseStateDemo from './hooks/01-useState'
import UseReducerDemo from './hooks/02-useReducer'
import UseContextDemo from './hooks/03-useContext'
import UseRefDemo from './hooks/04-useRef'
import UseImperativeHandleDemo from './hooks/05-useImperativeHandle'
import UseEffectDemo from './hooks/06-useEffect'
import UseLayoutEffectDemo from './hooks/07-useLayoutEffect'
import UseInsertionEffectDemo from './hooks/08-useInsertionEffect'
import UseMemoDemo from './hooks/09-useMemo'
import UseCallbackDemo from './hooks/10-useCallback'
import UseTransitionDemo from './hooks/11-useTransition'
import UseDeferredValueDemo from './hooks/12-useDeferredValue'
import UseIdDemo from './hooks/13-useId'
import UseSyncExternalStoreDemo from './hooks/14-useSyncExternalStore'
import UseDebugValueDemo from './hooks/15-useDebugValue'
import UseActionStateDemo from './hooks/16-useActionState'

interface HookInfo {
  id: number
  name: string
  category: string
  component: React.ComponentType
}

const hooks: HookInfo[] = [
  // State Hooks
  { id: 1, name: 'useState', category: 'State', component: UseStateDemo },
  { id: 2, name: 'useReducer', category: 'State', component: UseReducerDemo },
  
  // Context Hooks
  { id: 3, name: 'useContext', category: 'Context', component: UseContextDemo },
  
  // Ref Hooks
  { id: 4, name: 'useRef', category: 'Ref', component: UseRefDemo },
  { id: 5, name: 'useImperativeHandle', category: 'Ref', component: UseImperativeHandleDemo },
  
  // Effect Hooks
  { id: 6, name: 'useEffect', category: 'Effect', component: UseEffectDemo },
  { id: 7, name: 'useLayoutEffect', category: 'Effect', component: UseLayoutEffectDemo },
  { id: 8, name: 'useInsertionEffect', category: 'Effect', component: UseInsertionEffectDemo },
  
  // Performance Hooks
  { id: 9, name: 'useMemo', category: 'Performance', component: UseMemoDemo },
  { id: 10, name: 'useCallback', category: 'Performance', component: UseCallbackDemo },
  { id: 11, name: 'useTransition', category: 'Performance', component: UseTransitionDemo },
  { id: 12, name: 'useDeferredValue', category: 'Performance', component: UseDeferredValueDemo },
  
  // Other Hooks
  { id: 13, name: 'useId', category: 'Other', component: UseIdDemo },
  { id: 14, name: 'useSyncExternalStore', category: 'Other', component: UseSyncExternalStoreDemo },
  { id: 15, name: 'useDebugValue', category: 'Other', component: UseDebugValueDemo },
  { id: 16, name: 'useActionState', category: 'React 19', component: UseActionStateDemo },
]

const categories = ['State', 'Context', 'Ref', 'Effect', 'Performance', 'Other', 'React 19']

function App() {
  const [activeHook, setActiveHook] = useState(1)
  
  const currentHook = hooks.find(h => h.id === activeHook)!
  const CurrentComponent = currentHook.component
  
  const goToNext = () => {
    if (activeHook < hooks.length) {
      setActiveHook(activeHook + 1)
    }
  }
  
  const goToPrev = () => {
    if (activeHook > 1) {
      setActiveHook(activeHook - 1)
    }
  }

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>React Hooks</h1>
          <p>Complete Reference Guide</p>
        </div>
        
        {categories.map(category => {
          const categoryHooks = hooks.filter(h => h.category === category)
          if (categoryHooks.length === 0) return null
          
          return (
            <div key={category} className="nav-section">
              <div className="nav-section-title">{category}</div>
              {categoryHooks.map(hook => (
                <div
                  key={hook.id}
                  className={`nav-item ${activeHook === hook.id ? 'active' : ''}`}
                  onClick={() => setActiveHook(hook.id)}
                >
                  <span className="nav-number">{hook.id}</span>
                  <span className="nav-name">{hook.name}</span>
                </div>
              ))}
            </div>
          )
        })}
      </nav>
      
      {/* Main Content */}
      <main className="main-content">
        <div className="hook-demo fade-in" key={activeHook}>
          <CurrentComponent />
          
          {/* Navigation Arrows */}
          <div className="nav-arrows">
            <button 
              className={`nav-arrow ${activeHook === 1 ? 'disabled' : ''}`}
              onClick={goToPrev}
              disabled={activeHook === 1}
            >
              ← Previous: {activeHook > 1 ? hooks[activeHook - 2].name : ''}
            </button>
            <button 
              className={`nav-arrow ${activeHook === hooks.length ? 'disabled' : ''}`}
              onClick={goToNext}
              disabled={activeHook === hooks.length}
            >
              Next: {activeHook < hooks.length ? hooks[activeHook].name : ''} →
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
