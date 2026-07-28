import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [expandedBook, setExpandedBook] = useState(null);
  const [search, setSearch] = useState("");
  
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [showFilter, setShowFilter] =
  useState(false);


  const [favorites, setFavorites] = useState(
    JSON.parse(
      localStorage.getItem("favorites")
    ) || []
  );

  

  const [cartItems, setCartItems] = useState(
    JSON.parse(
      localStorage.getItem("cart")
    ) || []
  );

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
    const exists = favorites.find(
      (fav) => fav._id === book._id
    );

    if (exists) {
      const updatedFavorites = favorites.filter(
        (fav) => fav._id !== book._id
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setFavorites(updatedFavorites);
      alert("Removed from favorites");
      return;
    }

    const updatedFavorites = [...favorites, book];

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
    alert("Added to favorites");
  };

  const isFavorite = (bookId) => {
    return favorites.some(
      (fav) => fav._id === bookId
    );
  };

  const isInCart = (bookId) => {
    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    return cart.find(
      (item) => item._id === bookId
    );
  };

  const addToCart = (book) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) => item._id === book._id
    );

    if (exists) {
      return;
    }

    const cartBook = {
      ...book,
      quantity: 1,
    };

    const updatedCart = [
      ...cartItems,
      cartBook,
    ];

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };
  
  const toggleDetails = (id) => {
    setExpandedBook(
      expandedBook === id ? null : id
    );
  };

  const increaseQuantity = (bookId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === bookId
        ? {
          ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const decreaseQuantity = (bookId) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === bookId
          ? {
              ...item,
              quantity: Math.max(
                (item.quantity || 1) - 1,
                0
              ),
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const filteredBooks = books.filter((book) => {
    if (!selectedCategory) {
      return true;
    }

    return (
     book.category?.trim().toLowerCase() ===
     selectedCategory.trim().toLowerCase()
    );
  });


  return (
    <div className="content">
    <div className="container">
      <h2 className="page-title">
        E-Library Books
      </h2>

      <div className="search-row">
        <span
           className="filter-icon"
           onClick={() =>
             setShowFilter(!showFilter)
           }
        >
          ☰
        </span>

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

      {showFilter && (
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className="category-filter"
       >
          <option value="">
            All Categories
          </option>

          <option value="Programming">
            Programming
          </option>

          <option value="Backend Basics">
            Backend Basics
          </option>

          <option value="Frontend Basics">
            Frontend Basics
          </option>

          <option value="JavaScript Advanced">
            JavaScript Advanced
          </option>

          <option value="Self Help">
            Self Help
          </option>
        </select>
      )}

      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              className="book-card"
              onClick={() => toggleDetails(book._id)}
            >
            {book.coverImage && (
              <div className="book-image-wrapper">
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!token) {
                      navigate("/login");
                      return;
                    }

                    addToFavorites(book);
                  }}
                    className="favorite-btn"
                >
                   {isFavorite(book._id) ? "❤️" : "🤍"}
                </button>


                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="book-image"
                />

                
                  {isInCart(book._id) ? (
                    <div className="quantity-controls">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          if (!token) {
                            navigate("/login");
                            return;
                          }

                          decreaseQuantity(book._id);
                        }}
                      >
                        -
                      </button>

                      <span>
                        {cartItems.find(
                          (item) => item._id === book._id
                        )?.quantity || 1}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          if (!token) {
                            navigate("/login");
                            return;
                          }

                          increaseQuantity(book._id);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();

                        if (!token) {
                          navigate("/login");
                          return;
                        }

                        addToCart(book);
                      }}
                    >
                      Add to Cart
                    </button>
                  )}

              </div>
            )}

            <div className="book-details">
              

              <h2>{book.title}</h2>

              <p className="book-description">
                 {book.description}
              </p>

              <p>
                <strong>Author:</strong>{" "}
                {book.author}
              </p>

              <div className="price-section">
                <span className="mrp">
                  ₹{book.mrp}
                </span>

                <span className="selling-price">
                  ₹{book.price}
                </span>
              </div>
              

              


              {expandedBook === book._id && (
                <>
                  <p><strong>Publisher:</strong> {book.publisher}</p>

                  <p><strong>Language:</strong> {book.language}</p>

                  <p><strong>Pages:</strong> {book.pages}</p>

                  <p><strong>Year:</strong> {book.yearOfPublish}</p>

                  <p><strong>Category:</strong> {book.category}</p>

                  <p><strong>Sub Category:</strong> {book.subCategory}</p>

                  <p><strong>Description:</strong> {book.description}</p>
                </>
              )}


              

              

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

          </div>
        ))}
        </div>
      )}
      </div>
      </div>
  );
}

export default Books;