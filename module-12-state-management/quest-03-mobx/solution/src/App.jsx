import { StatsCards } from "./components/StatsCards";
import { HouseStats } from "./components/HouseStats";
import { AddStudentForm } from "./components/AddStudentForm";
import { StudentRoster } from "./components/StudentRoster";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>👁️ MobX Academy Dashboard</h1>
        <p>Observable state with automatic tracking</p>
      </header>

      <main className="main">
        <StatsCards />
        <HouseStats />
        <AddStudentForm />
        <StudentRoster />
      </main>
    </div>
  );
}

export default App;
