import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <header className="header">
        <h1>Battle Command</h1>
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
            to="/war-room"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            War Room
          </NavLink>
          {user ? (
            <button onClick={logout} className="nav-btn">
              Logout ({user.name})
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
