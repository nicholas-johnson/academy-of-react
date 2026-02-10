import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get the page they tried to visit
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      // Send them back to the page they tried to visit
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="page">
      <div className="login-box">
        <h2>Commander Login</h2>
        {from !== "/" && (
          <p className="login-notice">You must log in to access that page.</p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
