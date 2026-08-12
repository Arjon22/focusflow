import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

function Navbar() {

    const {
        user,
        logout,
    } = useAuth();

    const navigate = useNavigate();

    const [showAccountMenu, setShowAccountMenu] =
        useState(false);


    // ========================
    // Logout
    // ========================

    const handleLogout = () => {

        logout();

        setShowAccountMenu(false);

        navigate("/");
    };


    return (
        <>

            {/* ========================
                Desktop Sidebar
            ======================== */}

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


                {/* ========================
                    Account
                ======================== */}

                <div className="sidebar-account">

                    {user ? (

                        <>

                            <div className="user-section">

                                <div className="user-photo">
                                    👤
                                </div>


                                <div className="user-info">

                                    <strong>
                                        {user.email}
                                    </strong>

                                    <small>
                                        Local Account
                                    </small>

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

                        <div className="sidebar-auth-buttons">

                            <button
                                className="login-btn"
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                🔐 Sign In
                            </button>


                            <button
                                className="register-btn"
                                onClick={() =>
                                    navigate("/register")
                                }
                            >
                                ✨ Register
                            </button>

                        </div>

                    )}

                </div>

            </nav>


            {/* ========================
                Mobile Bottom Navbar
            ======================== */}

            <nav className="mobile-navbar">

                <NavLink to="/">
                    🏠
                </NavLink>

                <NavLink to="/dashboard">
                    📊
                </NavLink>

                <NavLink to="/tasks">
                    ✅
                </NavLink>

                <NavLink to="/calendar">
                    📅
                </NavLink>

                <NavLink to="/settings">
                    ⚙️
                </NavLink>

            </nav>


            {/* ========================
                Mobile Account
            ======================== */}

            <div className="mobile-account">

                <button
                    className="account-float-btn"
                    onClick={() =>
                        setShowAccountMenu(
                            !showAccountMenu
                        )
                    }
                >
                    👤
                </button>


                {showAccountMenu && (

                    <div className="account-popup">

                        {user ? (

                            <>

                                <div className="popup-user">

                                    <strong>
                                        {user.email}
                                    </strong>

                                    <small>
                                        Local Account
                                    </small>

                                </div>


                                <button
                                    onClick={
                                        handleLogout
                                    }
                                >
                                    🚪 Logout
                                </button>

                            </>

                        ) : (

                            <>

                                <button
                                    onClick={() => {

                                        setShowAccountMenu(
                                            false
                                        );

                                        navigate(
                                            "/login"
                                        );

                                    }}
                                >
                                    🔐 Sign In
                                </button>


                                <button
                                    onClick={() => {

                                        setShowAccountMenu(
                                            false
                                        );

                                        navigate(
                                            "/register"
                                        );

                                    }}
                                >
                                    ✨ Register
                                </button>

                            </>

                        )}

                    </div>

                )}

            </div>

        </>
    );
}

export default Navbar;