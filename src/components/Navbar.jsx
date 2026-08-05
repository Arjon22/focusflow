import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="sidebar">

        <div className="sidebar-logo">
          🌿 <span>FocusFlow</span>
        </div>

        <NavLink to="/">
          🏠
          <span>Home</span>
        </NavLink>

        <NavLink to="/dashboard">
          📊
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/tasks">
          ✅
          <span>Tasks</span>
        </NavLink>

        <NavLink to="/calendar">
          📅
          <span>Calendar</span>
        </NavLink>

        <NavLink to="/settings">
          ⚙️
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="mobile-navbar">

        <NavLink to="/">🏠</NavLink>

        <NavLink to="/dashboard">📊</NavLink>

        <NavLink to="/tasks">✅</NavLink>

        <NavLink to="/calendar">📅</NavLink>

        <NavLink to="/settings">⚙️</NavLink>

      </nav>
    </>
  );
}

export default Navbar;