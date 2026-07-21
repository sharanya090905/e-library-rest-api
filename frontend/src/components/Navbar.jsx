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

    navigate("/login");
  };

  return (
    <>
      {token && (
        <header className="top-header">
          <div className="header-title">
            E-Library
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
              👤
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

            <Link to="/add-book">
              Add Book
            </Link>

            <Link to="/favorites">
              Favorites
            </Link>
          </div>
        ) : (
          <>
            <div className="topbar-brand">
              E-Library
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