import './App.css'

// 1. A simple reusable StatCard component
function StatCard({ label, value, color }) {
  const style = {
    background: color || 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  };
  
  return (
    <div className="stat-card" style={style}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

// 2. A Container component using children prop
function Container({ children }) {
  return <div className="container">{children}</div>;
}

function Header({ children }) {
  return <div className="header">{children}</div>;
}

function Content({ children }) {
  return <div className="content">{children}</div>;
}

// 3. Main student dashboard using composition
function StudentDashboard({ student }) {
  return (
    <Container>
      <Header>
        <h1>⚡ {student.name}</h1>
        <p>{student.house} House</p>
      </Header>
      
      <Content>
        <h2>Wizard Stats</h2>
        <div className="stat-grid">
          <StatCard 
            label="Magic Level" 
            value={student.magicLevel}
            color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
          <StatCard 
            label="Health" 
            value={student.health}
            color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
          <StatCard 
            label="Mana" 
            value={student.mana}
            color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </div>
        
        <div className="student-info">
          <h3>Additional Information</h3>
          <p><strong>House:</strong> {student.house}</p>
          <p><strong>Year:</strong> {student.year}</p>
          <p><strong>Total Power:</strong> {student.magicLevel + student.health + student.mana}</p>
        </div>
      </Content>
    </Container>
  );
}

// 4. App with sample data
function App() {
  const student = {
    name: "Aria Spellweaver",
    house: "Ravenclaw",
    year: 3,
    magicLevel: 45,
    health: 100,
    mana: 80
  };

  return <StudentDashboard student={student} />;
}

export default App;





