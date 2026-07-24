import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    document.body.classList.toggle(
      "no-sidebar",
      !token
    );
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

    navigate("/");
  };

  return (
    <>
      {token && (
        <header className="top-header">
          <div className="header-title-wrapper">
            <img
              src="/EBookLogo.png"
              alt="E-Library logo"
              className="header-logo"
            />
            <div className="header-title">
              E-Library
            </div>
          </div>

          <div className="user-section">
            <Link
              to="/notifications"
              className="notification-link"
            >
              🔔
            </Link>

            <Link
              to="/profile"
              className="profile-link"
            >
              👨🏻‍💼
            </Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        </header>
      )}

      <nav
        className={`navbar ${
          token ? "sidebar" : "top-navbar"
        }`}
      >
        {token ? (
          <div className="nav-left">
            <Link to="/">Books</Link>

            <Link to="/favorites">
              Favorites
            </Link>

            <Link to="/cart">
              Cart
            </Link>
          </div>
        ) : (
          <>
            <div className="topbar-brand">
              <img
                src="/EBookLogo.png"
                alt="E-Library logo"
                className="header-logo"
              />
              <span>E-Library</span>
            </div>

            <div className="nav-right">
              <Link
                to="/login"
                className="login-top-btn"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;