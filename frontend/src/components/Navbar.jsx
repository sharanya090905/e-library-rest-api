import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");

    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/">Books</Link>

          {token && (
            <Link to="/add-book">
              Add Book
            </Link>
          )}

          {token && (
            <Link to="/favorites">
              Favorites
            </Link>
          )}

          {!token && (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {token && (
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
            

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;