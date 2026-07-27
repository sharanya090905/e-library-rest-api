import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const currentUserId =
    localStorage.getItem("userId");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");

        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

    const myBooks = books.filter(
      (book) => book.createdBy === currentUserId
    );

    const handleDelete = async (id) => {
      try {
        const token =
          localStorage.getItem("token");

      await api.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedBooks = books.filter(
        (book) => book._id !== id
      );

      setBooks(updatedBooks);

      alert("Book deleted successfully");
    } catch (error) {
      console.log(error);

      alert("Failed to delete book");
    }
  };

  return (
  <div className="content">
    <h2 className="page-title">
      My Books
    </h2>

    {myBooks.length === 0 ? (
      <p>
        You haven't added any books yet.
      </p>
    ) : (
      <div className="books-grid">
        {myBooks.map((book) => (
          <div
            key={book._id}
            className="book-card"
          >
            <div className="book-details">
              <h3>{book.title}</h3>

              <p>
                <strong>Author:</strong>{" "}
                {book.author}
              </p>

              <p>
                <strong>Price:</strong> ₹
                {book.price}
              </p>

              <div className="book-actions">
                <Link
                  to={`/edit-book/${book._id}`}
                  className="edit-btn"
                >
                  Edit
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </div>

            </div>

            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="book-image"
              />
            )}

          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default MyBooks;