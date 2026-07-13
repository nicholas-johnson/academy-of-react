import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Spells from "./pages/Spells";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
// ⬆ 🎨 TASK 3 — Add a new import here by copying one of the lines above.
//   Change the name to Library and the path to "./pages/Library"
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* ⚙️ Navigation bar — NavLinks work like <a> tags but swap pages
          without reloading the browser. The className callback checks
          isActive so you can style the current page's link differently. */}
      <nav className="nav-bar">
        <span className="nav-brand">Academy of Arcane Arts</span>

        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink>
          <NavLink to="/students" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Students</NavLink>
          <NavLink to="/spells" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Spells</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
          {/* --------------------------------------------------------
              🎨 TASK 3 — Add a new NavLink here

              Copy one of the NavLink lines above. Change the to="/..."
              to "/library" and change the text to "Library".
              -------------------------------------------------------- */}
        </div>
      </nav>

      {/* ⚙️ Routes — each Route maps a URL path to a page component.
          The path="*" catch-all at the bottom shows the 404 page for
          any URL that doesn't match the routes above it. */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/spells" element={<Spells />} />
          <Route path="/about" element={<About />} />
          {/* ------------------------------------------------------
              🎨 TASK 3 — Add a new Route here

              Copy one of the Route lines above. Change the path to
              "/library" and the element to {<Library />}.
              ------------------------------------------------------ */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
