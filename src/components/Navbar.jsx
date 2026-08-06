import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginWithGoogle, logout } from "../firebase/auth";
import { syncLocalTasks } from "../firebase/syncTasks";

function Navbar() {
  const { user } = useAuth();
  const handleLogin = async () => {
  try {

    const result = await loginWithGoogle();

    const user = result.user;

    await syncLocalTasks(user.uid);

    alert("Tasks synced successfully ☁️");

  } catch (error) {

    console.error(error);

  }
};

 const handleLogout = async () => {
  try {
    await logout();

    window.location.reload();

  } catch (error) {
    console.error(error);
  }
};

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

        {/* Account Section */}
        <div className="sidebar-account">
          {user ? (
            <>
              <div className="user-section">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="user-photo"
                />

                <div className="user-info">
                  <strong>{user.displayName}</strong>
                  <small>{user.email}</small>
                </div>
              </div>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                🚪 Sign Out
              </button>
            </>
          ) : (
            <button
  className="login-btn"
  onClick={handleLogin}
>
  🔐 Sign In with Google
</button>
          )}
        </div>
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