import './App.css'

// Card component with children
function Card({ children, variant = "default" }) {
  return (
    <div className={`card card-${variant}`}>
      {children}
    </div>
  );
}

// Header component
function Header({ children, level = 2 }) {
  const Tag = `h${level}`;
  return <Tag className="header">{children}</Tag>;
}

// Container component
function Container({ children, maxWidth = "1200px" }) {
  return (
    <div className="container" style={{ maxWidth }}>
      {children}
    </div>
  );
}

// Section component
function Section({ children, title }) {
  return (
    <section className="section">
      {title && <h3 className="section-title">{title}</h3>}
      {children}
    </section>
  );
}

// Example spell card using layout components
function SpellInfo() {
  return (
    <Card variant="outlined">
      <Header level={3}>🔥 Fireball</Header>
      <p>A powerful ball of flame that explodes on impact.</p>
      <div className="stats">
        <span>⚔️ Power: 85</span>
        <span>💧 Mana: 40</span>
      </div>
    </Card>
  );
}

function App() {
  return (
    <Container maxWidth="1000px">
      <div className="quest-header">
        <h1>⚡ Quest 2: Layout Components</h1>
        <p>The `children` prop for composition</p>
      </div>
      
      <Section title="Card Variants">
        <div className="demo-grid">
          <Card variant="default">
            <Header level={4}>Default Card</Header>
            <p>Standard card styling</p>
          </Card>
          
          <Card variant="outlined">
            <Header level={4}>Outlined Card</Header>
            <p>Card with border</p>
          </Card>
          
          <Card variant="elevated">
            <Header level={4}>Elevated Card</Header>
            <p>Card with shadow</p>
          </Card>
        </div>
      </Section>
      
      <Section title="Nested Composition">
        <Card variant="elevated">
          <Header level={3}>🏛️ Academy Information</Header>
          <Section title="Mission">
            <p>To train the finest wizards in all the realms.</p>
          </Section>
          <Section title="Values">
            <ul>
              <li>Wisdom 🦅</li>
              <li>Courage 🦁</li>
              <li>Harmony 🐺</li>
              <li>Ambition 🐍</li>
            </ul>
          </Section>
        </Card>
      </Section>
      
      <Section title="Real-World Example">
        <div className="demo-grid">
          <SpellInfo />
          <SpellInfo />
          <SpellInfo />
        </div>
      </Section>
    </Container>
  );
}

export default App;

