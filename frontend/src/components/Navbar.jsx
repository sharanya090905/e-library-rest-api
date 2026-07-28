import { useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const cartCount = (
    JSON.parse(localStorage.getItem("cart")) || []
  ).length;

  return (
    <>
      {token && (
        <header className="top-header">
          <Link to="/" className="topbar-brand">
            <img
              src="/EBookLogo.png"
              alt="E-Library logo"
              className="header-logo"
            />
            <div className="header-title">
              E-Library
            </div>
          </Link>

          <div className="user-section">

            <Link
              to="/cart"
              className="cart-link"
            >
              🛒

             {cartCount > 0 && (
               <span className="cart-badge">
                 {cartCount}
               </span>
             )}
            </Link>

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

            

            <Link to="/my-books">
              My Books
            </Link>

          </div>
        ) : (
          <>
            <Link to="/" className="topbar-brand">
              <img
                src="/EBookLogo.png"
                alt="E-Library logo"
                className="header-logo"
              />
            </Link>
             

            <div className="nav-right">
              {location.pathname !== "/login" && (
                <Link
                  to="/login"
                  className="login-top-btn"
                >
                  Login
                </Link>
              )}
            </div>
          </>
        )}
      </nav>
    </>
  );
}

export default Navbar;