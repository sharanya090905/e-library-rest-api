import { useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(
      localStorage.getItem("favorites")
    ) || []
  );

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter(
      (book) => book._id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <div className="content">
      <div className="container">
        <h2 className="page-title">
          Favorite Books
        </h2>

        {favorites.length === 0 ? (
          <p>No favorite books yet.</p>
        ) : (
          favorites.map((book) => (
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

                <p>
                  <strong>Category:</strong>{" "}
                  {book.category}
                </p>

                

                <button
                  className="delete-btn"
                  onClick={() =>
                    removeFromFavorites(book._id)
                  }
                >
                  Remove
                </button>
              </div>

               
               
            
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;