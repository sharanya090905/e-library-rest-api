import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Books />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        
        <Route 
          path="/profile"
          element={<Profile />}
          />
          
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/add-book"
          element={<AddBook />}
        />

        <Route
          path="/edit-book/:id"
          element={<EditBook />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;