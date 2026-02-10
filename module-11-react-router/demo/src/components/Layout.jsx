import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="app">
      <header className="header">
        <h1>Battle Academy</h1>
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/spells"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Spells
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
