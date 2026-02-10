import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function LoginForm() {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("Liondudes");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name, house);
    }
  };

  return (
    <div className="login-container">
      <h2>Join the Academy</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Wizard Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            required
          />
        </div>
        <div className="form-group">
          <label>Choose House</label>
          <select value={house} onChange={(e) => setHouse(e.target.value)}>
            <option value="Liondudes">Liondudes</option>
            <option value="Scarybird">Scarybird</option>
            <option value="Huftybadger">Huftybadger</option>
            <option value="Snakeyguys">Snakeyguys</option>
          </select>
        </div>
        <button type="submit" className="btn btn-login">
          Enter Academy ✨
        </button>
      </form>
    </div>
  );
}
