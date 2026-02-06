import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import './App.css'

interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (message: string, type: Notification['type']) => void
  removeNotification: (id: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [nextId, setNextId] = useState(1)

  const addNotification = (message: string, type: Notification['type']) => {
    const id = nextId
    setNextId(nextId + 1)
    setNotifications([...notifications, { id, message, type }])
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}

function NotificationList() {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' && '✅'}
            {notification.type === 'error' && '❌'}
            {notification.type === 'info' && 'ℹ️'}
          </span>
          <span className="notification-message">{notification.message}</span>
          <button 
            onClick={() => removeNotification(notification.id)}
            className="notification-close"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

function BattleActions() {
  const { addNotification } = useNotifications()

  return (
    <div className="battle-actions">
      <h2>Battle Simulator</h2>
      <p>Actions trigger global notifications</p>
      
      <div className="button-grid">
        <button 
          onClick={() => addNotification('Fireball cast successfully!', 'success')}
          className="btn btn-success"
        >
          🔥 Cast Fireball
        </button>
        <button 
          onClick={() => addNotification('Not enough mana!', 'error')}
          className="btn btn-error"
        >
          ⚡ Lightning Strike
        </button>
        <button 
          onClick={() => addNotification('Enemy is charging an attack', 'info')}
          className="btn btn-info"
        >
          👁️ Scout Enemy
        </button>
        <button 
          onClick={() => addNotification('Shield activated (+50 defense)', 'success')}
          className="btn btn-success"
        >
          🛡️ Activate Shield
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <NotificationProvider>
      <div className="app">
        <h1>📬 Battle Notifications</h1>
        <p>Global toast notification system using Context</p>
        
        <BattleActions />
        <NotificationList />

        <div className="info-box">
          <h3>🔑 Pattern Highlights</h3>
          <ul>
            <li>Context stores notification array and methods</li>
            <li>Any component can trigger notifications</li>
            <li>NotificationList automatically displays all toasts</li>
            <li>Auto-dismiss after 5 seconds</li>
            <li>No props passed between components!</li>
          </ul>
        </div>
      </div>
    </NotificationProvider>
  )
}

export default App
