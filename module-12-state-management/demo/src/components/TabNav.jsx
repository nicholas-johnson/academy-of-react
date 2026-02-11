import { NavLink } from "react-router-dom";

export function TabNav() {
  return (
    <nav className="tabs">
      <NavLink
        to="/zustand"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        Zustand
      </NavLink>
      <NavLink
        to="/redux"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        Redux Toolkit
      </NavLink>
      <NavLink
        to="/mobx"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        MobX
      </NavLink>
    </nav>
  );
}
