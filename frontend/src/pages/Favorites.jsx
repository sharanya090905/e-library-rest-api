import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [favorites] = useState(
    JSON.parse(
      localStorage.getItem("favorites")
    ) || []
  );

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
                <strong>Publisher:</strong>{" "}
                {book.publisher}
              </p>

              <p>
                <strong>Year:</strong>{" "}
                {book.yearOfPublish}
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
                  <strong>Price:</strong> ₹
                  {book.price}
                </p>

                

                

              </div>

               {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="book-image"
              />
            )}
               
            
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;