import { useState } from 'react'
import './App.css'

// Card component - wraps any content
function Card({ children, variant = "default" }) {
  return (
    <div className={`card card-${variant}`}>
      {children}
    </div>
  );
}

// Section component - adds a title to content
function Section({ title, children }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

// Modal component - dialog that wraps content
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

// Layout component - page structure with slots
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

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout
      header={
        <div className="nav">
          <span className="logo">⚡ Wizard Academy</span>
          <button onClick={() => setShowModal(true)}>Cast Spell</button>
        </div>
      }
      sidebar={
        <nav className="sidebar-nav">
          <a href="#">Dashboard</a>
          <a href="#">Spells</a>
          <a href="#">Students</a>
        </nav>
      }
    >
      <Section title="Welcome Back!">
        <p>Your magical journey continues today.</p>
      </Section>

      <Section title="Your Stats">
        <div className="card-grid">
          <Card variant="primary">
            <h3>🔮 Magic Level</h3>
            <p className="stat-value">45</p>
          </Card>

          <Card variant="secondary">
            <h3>❤️ Health</h3>
            <p className="stat-value">100</p>
          </Card>

          <Card>
            <h3>💙 Mana</h3>
            <p className="stat-value">80</p>
          </Card>
        </div>
      </Section>

      <Section title="Nested Composition">
        <Card>
          <p>Cards can contain anything!</p>
          <Card variant="primary">
            <p>Even other cards.</p>
          </Card>
        </Card>
      </Section>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        title="Cast a Spell"
      >
        <p>Choose your spell:</p>
        <div className="spell-options">
          <button className="spell-btn">🔥 Fireball</button>
          <button className="spell-btn">❄️ Ice Shard</button>
        </div>
      </Modal>
    </Layout>
  );
}

export default App;
