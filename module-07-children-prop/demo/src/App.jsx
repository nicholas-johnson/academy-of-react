import { useState } from 'react'
import './App.css'

// 1. Simple Card - wraps any content
function Card({ children, variant = "default" }) {
  return (
    <div className={`card card-${variant}`}>
      {children}
    </div>
  );
}

// 2. Section - adds a title to any content
function Section({ title, children }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

// 3. Modal - wraps content in a dialog
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

// 4. Layout - multiple slots for page structure
function Layout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <div className="layout-body">
        <aside className="layout-sidebar">{sidebar}</aside>
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
}

// Demo App showing all patterns
function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Layout
      header={
        <div className="nav">
          <span className="logo">⚡ Wizard Academy</span>
          <button onClick={() => setModalOpen(true)}>Cast Spell</button>
        </div>
      }
      sidebar={
        <nav className="sidebar-nav">
          <a href="#">Dashboard</a>
          <a href="#">Spells</a>
          <a href="#">Potions</a>
          <a href="#">Students</a>
        </nav>
      }
    >
      {/* Main content area uses children */}
      <Section title="Welcome Back, Wizard!">
        <p>Your magical journey continues. Check your stats below.</p>
      </Section>

      <Section title="Your Cards">
        <div className="card-grid">
          {/* Same Card component, different content */}
          <Card variant="primary">
            <h3>🔮 Magic Level</h3>
            <p className="stat-value">45</p>
            <p>Intermediate Caster</p>
          </Card>

          <Card variant="secondary">
            <h3>❤️ Health</h3>
            <p className="stat-value">100</p>
            <p>Fully Restored</p>
          </Card>

          <Card>
            <h3>💙 Mana</h3>
            <p className="stat-value">80</p>
            <div className="mana-bar">
              <div className="mana-fill" style={{ width: '80%' }}></div>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Recent Activity">
        <Card>
          <ul className="activity-list">
            <li>✨ Learned Fireball spell</li>
            <li>🧪 Brewed healing potion</li>
            <li>📚 Completed Chapter 5</li>
          </ul>
        </Card>
      </Section>

      {/* Modal demonstrates children in dialogs */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title="Cast a Spell"
      >
        <p>Choose your spell wisely!</p>
        <div className="spell-options">
          <button className="spell-btn">🔥 Fireball</button>
          <button className="spell-btn">❄️ Ice Shard</button>
          <button className="spell-btn">⚡ Lightning</button>
        </div>
        <p className="spell-hint">Each spell costs 10 mana</p>
      </Modal>
    </Layout>
  );
}

export default App;
