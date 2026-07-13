import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Books</Link>

      <Link to="/add-book">Add Book</Link>

      <Link to="/login">Login</Link>

      <Link to="/register">Register</Link>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;