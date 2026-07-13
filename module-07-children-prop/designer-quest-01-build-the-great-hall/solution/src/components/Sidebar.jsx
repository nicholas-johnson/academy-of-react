/* ⚙️ ENGINE CODE — you don't need to read this */
import "./components.css";

function Sidebar({ children, sidebar }) {
  return (
    <div className="sidebar-layout">
      <aside className="sidebar-layout__aside">{sidebar}</aside>
      <main className="sidebar-layout__main">{children}</main>
    </div>
  );
}

export default Sidebar;
