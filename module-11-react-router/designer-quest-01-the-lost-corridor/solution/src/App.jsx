import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Spells from "./pages/Spells";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Library from "./pages/Library";
import Potions from "./pages/Potions";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="nav-bar">
        <span className="nav-brand">Academy of Arcane Arts</span>

        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink>
          <NavLink to="/students" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Students</NavLink>
          <NavLink to="/spells" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Spells</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
          <NavLink to="/library" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Library</NavLink>
          <NavLink to="/potions" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Potions</NavLink>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/spells" element={<Spells />} />
          <Route path="/about" element={<About />} />
          <Route path="/library" element={<Library />} />
          <Route path="/potions" element={<Potions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
