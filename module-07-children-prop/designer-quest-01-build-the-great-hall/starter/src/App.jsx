import Card from "./components/Card";
import Section from "./components/Section";
import Stack from "./components/Stack";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import { students, announcements, stats } from "./data";
import "./App.css";

/*
 ┌─────────────────────────────────────────────────────────┐
 │  🧱 YOUR BUILDING BLOCKS — Component Reference Card     │
 ├─────────────────────────────────────────────────────────┤
 │                                                         │
 │  <Card variant="default|highlighted|outlined">          │
 │    ...content...                                        │
 │  </Card>                                                │
 │                                                         │
 │  <Section title="Section Heading">                      │
 │    ...content...                                        │
 │  </Section>                                             │
 │                                                         │
 │  <Stack direction="horizontal|vertical" gap="1rem">     │
 │    ...items...                                          │
 │  </Stack>                                               │
 │                                                         │
 │  <Sidebar sidebar={<nav>...links...</nav>}>             │
 │    ...main content...                                   │
 │  </Sidebar>                                             │
 │                                                         │
 │  <Modal isOpen={bool} onClose={fn} title="Heading">    │
 │    ...modal content...                                  │
 │  </Modal>                                               │
 │                                                         │
 │  DATA available: students, announcements, stats         │
 │  (already imported above — just use them!)              │
 │                                                         │
 └─────────────────────────────────────────────────────────┘
*/

function App() {
  return (
    <div className="app">
      {/* ════════════════════════════════════════════════════════
          🎨 TASK 1 — Wrap everything in a <Sidebar>
          
          Put navigation links in the sidebar prop:
            <Sidebar sidebar={<nav>...</nav>}>
          
          Nav items: Dashboard, Students, Spells, Battles
          Main content: a Section titled "Welcome to the Great Hall"
          ════════════════════════════════════════════════════════ */}

      <Section title="Getting Started">
        <p>Start building your Great Hall here!</p>
        <p style={{ color: "#64748b", marginTop: "1rem" }}>
          Open App.jsx and follow the TASK comments to compose your dashboard.
        </p>
      </Section>

      {/* ════════════════════════════════════════════════════════
          🎨 TASK 2 — Stats Dashboard
          
          Create a horizontal Stack of 3 Cards showing:
          - stats.totalStudents
          - stats.activeSpells
          - stats.upcomingBattles
          
          Tip: Inside each Card, use:
            <p className="stat-number">{stats.totalStudents}</p>
            <p className="stat-label">Total Students</p>
          ════════════════════════════════════════════════════════ */}

      {/* ════════════════════════════════════════════════════════
          🎨 TASK 3 — Announcements
          
          Add a Section titled "Announcements" with a vertical
          Stack of Cards — one per announcement.
          
          Use variant="highlighted" for urgent ones:
            <Card variant={a.urgent ? "highlighted" : "default"}>
              <h3>{a.title}</h3>
              <p>{a.message}</p>
            </Card>
          ════════════════════════════════════════════════════════ */}

      {/* ════════════════════════════════════════════════════════
          🎨 TASK 4 — Top Students
          
          Add a Section titled "Top Students" containing a Card
          with a list of students.
          
          Tip: Use a <ul className="student-list"> and map over
          the students array:
            {students.map(s => (
              <li key={s.name}>
                <span>{s.name}</span>
                <span className="student-house">{s.house}</span>
                <span className="student-level">Lvl {s.level}</span>
              </li>
            ))}
          ════════════════════════════════════════════════════════ */}
    </div>
  );
}

export default App;
