import { useNavigate } from "react-router-dom";

export function About() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h2>About the Academy</h2>
      <p>The Battle Academy teaches the ancient arts of React development.</p>

      <div className="about-content">
        <h3>What You'll Learn</h3>
        <ul>
          <li>
            <code>BrowserRouter</code> — Wrap your app for routing
          </li>
          <li>
            <code>Routes</code> & <code>Route</code> — Define paths
          </li>
          <li>
            <code>Link</code> & <code>NavLink</code> — Navigation
          </li>
          <li>
            <code>useParams</code> — Read URL parameters
          </li>
          <li>
            <code>useNavigate</code> — Programmatic navigation
          </li>
          <li>
            <code>Outlet</code> — Nested route rendering
          </li>
        </ul>
      </div>

      <button onClick={() => navigate("/")} className="btn">
        Return Home
      </button>
    </div>
  );
}
