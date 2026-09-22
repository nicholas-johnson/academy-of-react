import { useState } from "react";
import Modal from "./Modal";
import "./App.css";

function App() {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="app">
      <h1>Academy Notice Board</h1>
      <p>
        The Headmaster posted new rules. Open the enchanted scroll to read
        them.
      </p>
      <button className="open-button" onClick={() => setShowRules(true)}>
        View Academy Rules
      </button>

      <Modal
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        title="Academy Rules"
      >
        <p>1. No magic in the corridors</p>
        <p>2. Respect all magical creatures</p>
        <p>3. Submit homework on time</p>
      </Modal>
    </div>
  );
}

export default App;
