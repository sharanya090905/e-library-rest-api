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
    <div>
      <h2>Books</h2>

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
          <div key={book._id}>
            <h3>{book.title}</h3>

            <p>Author: {book.author}</p>

            <p>Price: ₹{book.price}</p>

            <p>Category: {book.category}</p>

            <button
              onClick={() =>
                handleDelete(book._id)
              }
            >
              Delete
            </button>
            <Link to={`/edit-book/${book._id}`}>
  <button>Edit</button>
</Link>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Books;