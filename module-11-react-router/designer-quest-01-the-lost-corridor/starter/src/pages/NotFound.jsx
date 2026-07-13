import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      {/* -------------------------------------------------------
          🎨 TASK 1 — Design the 404 page

          Replace the bare <h1> and <p> below with a fun,
          atmospheric "lost in the corridors" design.

          Ideas:
          - A dramatic heading ("Lost in the Corridors...")
          - Decorative elements (emoji mist, magical symbols)
          - A message ("You've wandered into uncharted territory")
          - A styled link home using the <Link> component:
              <Link to="/" className="home-link">Return to the Great Hall</Link>

          Then open App.css and add styles to the .not-found section.
          ------------------------------------------------------- */}
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}

export default NotFound;
