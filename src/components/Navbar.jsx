import { NavLink } from "react-router-dom";

function Navbar() {

  return (
    <nav className="navbar">

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
  );
}


export default Navbar;