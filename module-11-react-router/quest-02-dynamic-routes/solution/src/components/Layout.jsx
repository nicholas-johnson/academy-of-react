import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="app">
      <header className="header">
        <h1>Spell Directory</h1>
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
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
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
