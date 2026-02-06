import { createContext, useContext, useState, ReactNode } from 'react'
import './App.css'

// 1. Define context shape with TypeScript
interface CounterContextType {
  count: number
  increment: () => void
  decrement: () => void
}

// 2. Create context with default value
const CounterContext = createContext<CounterContextType | undefined>(undefined)

// 3. Create provider component
function CounterProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  )
}

// 4. Create custom hook for consuming context
function useCounter() {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within CounterProvider')
  }
  return context
}

// Child components can access context without prop drilling
function CounterDisplay() {
  const { count } = useCounter()
  return <div className="counter-display">{count}</div>
}

function CounterButtons() {
  const { increment, decrement } = useCounter()
  return (
    <div className="button-group">
      <button onClick={decrement} className="btn">-</button>
      <button onClick={increment} className="btn">+</button>
    </div>
  )
}

function App() {
  return (
    <CounterProvider>
      <div className="app">
        <h1>🌐 Context API Demo</h1>
        <p>Global state without prop drilling</p>

        <div className="demo-section">
          <h3>Counter (Shared State)</h3>
          <CounterDisplay />
          <CounterButtons />
        </div>

        <div className="info-box">
          <h3>🔑 Context API Pattern</h3>
          <ol>
            <li><strong>Define</strong>: Create context with TypeScript type</li>
            <li><strong>Provide</strong>: Wrap components in Provider</li>
            <li><strong>Consume</strong>: Use useContext hook in children</li>
            <li><strong>Custom Hook</strong>: Wrap useContext for safety</li>
          </ol>
        </div>

        <div className="info-box">
          <h3>✨ Benefits</h3>
          <ul>
            <li>No prop drilling through intermediate components</li>
            <li>Global state accessible anywhere in tree</li>
            <li>Type-safe with TypeScript</li>
            <li>Easy to test with separate provider</li>
          </ul>
        </div>
      </div>
    </CounterProvider>
  )
}

export default App
