import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-mist">~ ~ ~ ~ ~</div>
      <h1 className="not-found-title">Lost in the Corridors...</h1>
      <p className="not-found-code">404</p>
      <p className="not-found-message">
        You've wandered into uncharted territory. The torches have gone out and
        the maps don't reach this far. Even the portraits on the walls look
        confused.
      </p>
      <Link to="/" className="home-link">Return to the Great Hall</Link>
      <div className="not-found-mist">~ ~ ~ ~ ~</div>
    </div>
  );
}

export default NotFound;
