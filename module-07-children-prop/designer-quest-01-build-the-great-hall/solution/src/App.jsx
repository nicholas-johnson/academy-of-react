import React from "react";
import Card from "./components/Card";
import Section from "./components/Section";
import Stack from "./components/Stack";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import Badge from "./components/Badge";
import { students, announcements, stats } from "./data";
import "./App.css";

function App() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="app">
      {/* TASK 1 — Sidebar layout with navigation */}
      <Sidebar
        sidebar={
          <nav>
            <p className="nav-title">Academy</p>
            <span className="nav-item">Dashboard</span>
            <span className="nav-item">Students</span>
            <span className="nav-item">Spells</span>
            <span className="nav-item">Battles</span>
          </nav>
        }
      >
        <Section title="Welcome to the Great Hall">
          <p>Your Academy dashboard — everything at a glance.</p>
        </Section>

        {/* TASK 2 — Stats in a horizontal Stack */}
        <Section title="Stats Overview">
          <Stack direction="horizontal" gap="1rem">
            <Card>
              <Badge>NEW</Badge>
              <p className="stat-number">{stats.totalStudents}</p>
              <p className="stat-label">Total Students</p>
            </Card>
            <Card>
              <p className="stat-number">{stats.activeSpells}</p>
              <p className="stat-label">Active Spells</p>
            </Card>
            <Card>
              <p className="stat-number">{stats.upcomingBattles}</p>
              <p className="stat-label">Upcoming Battles</p>
            </Card>
          </Stack>
        </Section>

        {/* TASK 3 — Announcements */}
        <Section title="Announcements">
          <Stack direction="vertical" gap="1rem">
            {announcements.map((a) => (
              <Card key={a.title} variant={a.urgent ? "highlighted" : "default"}>
                {a.urgent && <Badge>URGENT</Badge>}
                <h3>{a.title}</h3>
                <p>{a.message}</p>
              </Card>
            ))}
          </Stack>
        </Section>

        {/* TASK 4 — Top Students */}
        <Section title="Top Students">
          <Card>
            <ul className="student-list">
              {students.map((s) => (
                <li key={s.name}>
                  <span>{s.name}</span>
                  <span className="student-house">{s.house}</span>
                  <span className="student-level">Lvl {s.level}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Section>

        {/* BONUS — Modal */}
        <Section title="Academy Info">
          <button className="modal-trigger" onClick={() => setShowModal(true)}>
            View Academy Rules
          </button>
        </Section>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Academy Rules"
        >
          <p>1. No magic in the corridors</p>
          <p>2. Respect all magical creatures</p>
          <p>3. Submit homework on time</p>
          <p>4. House Cup points are final</p>
          <p>5. The Great Hall closes at midnight</p>
        </Modal>
      </Sidebar>
    </div>
  );
}

export default App;
