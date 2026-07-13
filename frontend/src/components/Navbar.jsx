import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Books</Link>

      {" | "}

      <Link to="/login">Login</Link>

      {" | "}

      <Link to="/register">Register</Link>

      {" | "}

      <Link to="/add-book">Add Book</Link>

      <hr />
    </nav>
  );
}

export default Navbar;