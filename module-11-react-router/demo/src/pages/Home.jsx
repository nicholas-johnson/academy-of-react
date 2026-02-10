import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="page">
      <h2>Welcome to the Academy</h2>
      <p>Learn the ancient arts of React Router navigation!</p>

      <div className="info-cards">
        <div className="info-card">
          <h3>Navigation</h3>
          <p>
            Use <code>Link</code> and <code>NavLink</code> to move between pages
          </p>
        </div>
        <div className="info-card">
          <h3>URL Parameters</h3>
          <p>
            Dynamic routes with <code>useParams</code>
          </p>
        </div>
        <div className="info-card">
          <h3>Nested Routes</h3>
          <p>
            Layouts with <code>Outlet</code>
          </p>
        </div>
      </div>

      <div className="cta">
        <Link to="/spells" className="btn">
          Explore Spells →
        </Link>
      </div>
    </div>
  );
}
