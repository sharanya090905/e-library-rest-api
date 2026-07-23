import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../services/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const currentUserId =
  localStorage.getItem("userId");
  
  const location = useLocation();
  const updatedAt = location.state?.updatedAt;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get(`/books?search=${search}`);

        console.log("Books fetched:",response.data.data);

        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, [search, location.key, updatedAt]);

  const handleDelete = async (id) => {
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

  const addToFavorites = (book) => {
  const favorites =
    JSON.parse(
      localStorage.getItem("favorites")
    ) || [];

  const exists = favorites.find(
    (fav) => fav._id === book._id
  );

  if (exists) {
    const updatedFavorites =
      favorites.filter(
        (fav) => fav._id !== book._id
      );

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    alert("Removed from favorites");
    return;
  }

  favorites.push(book);

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  alert("Added to favorites");
};

  return (
    <div className="content">
    <div className="container">
      <h2 className="page-title">
        E-Library Books
      </h2>

      <div className="search-row">
        <input
          type="text"
          className="search-input"
          placeholder="Search books..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {token && (
          <Link
            to="/add-book"
            className="add-book-btn"
          >
            Add Book
          </Link>
        )}
      </div>

      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        books.map((book) => (
            
          <div
            key={book._id}
            className="book-card"
          >

            <div className="book-details">
              

              <h3>{book.title}</h3>

              <p className="book-description">
                 {book.description}
              </p>

              <p>
                <strong>Author:</strong>{" "}
                {book.author}
              </p>

              <p>
                <strong>Publisher:</strong>{" "}
                {book.publisher}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {book.yearOfPublish}
              </p>


              <p className="mrp">
                ₹{book.mrp}
                
              </p>

              <p className="selling-price">
                ₹{book.price}

              </p>

              <p>
                <strong>Pages:</strong>{" "}
                {book.pages}
              </p>

              <p>
                <strong>Language:</strong>{" "}
                {book.language}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {book.category}
              </p>

              <p>
                <strong>Sub Category:</strong>{" "}
                {book.subCategory}
              </p>

              {token &&
                book.createdBy === currentUserId && (
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
                )}

            </div>

            {book.coverImage && (
              <div className="book-image-wrapper">
                {token && (
                  <button
                    className="favorite-btn"
                    onClick={() => addToFavorites(book)}
                  >
                    ❤️
                  </button>
                )}

                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-image"
                />
              </div>
            )}
          </div>
        ))
        )}
      </div>
      </div>
  );
}

export default Books;