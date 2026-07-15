import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="page not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </div>
  );
}
