import { useState } from "react";
import Modal from "./components/Modal";
import "./App.css";

// TODO: Create a Card component that uses children
// - Accept a "variant" prop with default value "default"
// - Wrap children in a div with className `card card-${variant}`
function Card({ children, variant = "default" }) {
  return null;
}

// TODO: Create a Section component
// - Accept "title" and "children" props
// - Render the title in an h2, then render children
function Section({ title, children }) {
  return null;
}

// TODO: Create a Layout component with multiple slots
// - Accept props: header, sidebar, children
// - Render header in a <header> tag
// - Render sidebar in an <aside> tag
// - Render children in a <main> tag
function Layout({ header, sidebar, children }) {
  return null;
}

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* TODO: Use Layout with header, sidebar, and main content.

          Move the nav into the header slot:
            header={
              <div className="nav">
                <span className="logo">Wizard Academy</span>
                <button onClick={() => setShowModal(true)}>Cast Spell</button>
              </div>
            }

          Put a menu in the sidebar slot:
            sidebar={
              <nav className="sidebar-nav">
                <a href="#">Dashboard</a>
                <a href="#">Spells</a>
                <a href="#">Students</a>
              </nav>
            }
      */}

      <div className="nav">
        <span className="logo">Wizard Academy</span>
        <button onClick={() => setShowModal(true)}>Cast Spell</button>
      </div>

      {/* TODO: Inside the Layout, create Sections with Cards */}

      <p>Replace this with your layout components!</p>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Cast a Spell"
      >
        <p>Choose your spell:</p>
        <div className="spell-options">
          <button className="spell-btn">Fireball</button>
          <button className="spell-btn">Ice Shard</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
