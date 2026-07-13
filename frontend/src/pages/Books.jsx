import { useEffect, useState } from "react";
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

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Books;