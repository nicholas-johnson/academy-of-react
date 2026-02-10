import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="page not-found">
      <h2>404</h2>
      <p>Oops! This page doesn't exist.</p>
      <Link to="/" className="btn">
        Return Home
      </Link>
    </div>
  );
}
