import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get(
          `/books?search=${search}`
        );

        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [search]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await api.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Book Deleted Successfully");

      setBooks(
        books.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Book");
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">
        E-Library Books
      </h2>

      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br />
      <br />

      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        books.map((book) => (
          <div
            key={book._id}
            className="book-card"
          >
            <h3>{book.title}</h3>

            <p>
              <strong>Author:</strong>{" "}
              {book.author}
            </p>

            <p>
              <strong>Price:</strong> ₹
              {book.price}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {book.category}
            </p>

            <div className="book-actions">
              <Link
                to={`/edit-book/${book._id}`}
              >
                <button>Edit</button>
              </Link>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(book._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Books;