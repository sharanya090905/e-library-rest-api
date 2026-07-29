import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [book, setBook] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  


  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);

      setBook(response.data.data);
      setAverageRating(response.data.averageRating);

      const suggestionResponse =
        await api.get(`/books/${id}/suggestions`);

      setSuggestedBooks(
        suggestionResponse.data.data
      );

      const allBooksResponse =
        await api.get("/books");
      
      setAllBooks(
        allBooksResponse.data.data.filter(
            (item) => item._id !== id
        )
      );

    } catch (error) {
       console.log(error);
    }
  };

useEffect(() => {
  fetchBook();
}, [id]);

  if (!book) {
    return <h2>Loading...</h2>;
  }

  const handleRating = async (rating) => {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      `/books/${id}/rate`,
      { rating },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUserRating(rating);

    alert("Rating submitted successfully");
  } catch (error) {
  console.log(error);
  console.log(error.response?.data);

  alert("Failed to submit rating");
}
};

  const handleReviewSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    const userName =
      localStorage.getItem("userName");

    await api.post(
      `/books/${id}/review`,
      {
        userName,
        comment,
        rating: reviewRating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Review added successfully");

    setComment("");

    await fetchBook();
  } catch (error) {
  console.log(error);
  console.log(error.response?.data);

  alert("Failed to add review");
}
};

  return (
  <div className="content">
    <div className="container">
      <div className="book-details-page">

        <div className="book-details-image-wrapper">
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="book-details-image"
             />
            )}
            <div className="book-price-section">
                 <span className="book-mrp">
                   ₹{book.mrp}
                 </span>

                 <span className="book-price">
                   ₹{book.price}
                 </span>
            </div>

            <div className="review-form-section">
              <h2>Write a Review</h2>

  <form onSubmit={handleReviewSubmit}>
    <select
      value={reviewRating}
      onChange={(e) =>
        setReviewRating(Number(e.target.value))
      }
    >
      <option value={5}>5 Stars</option>
      <option value={4}>4 Stars</option>
      <option value={3}>3 Stars</option>
      <option value={2}>2 Stars</option>
      <option value={1}>1 Star</option>
    </select>

    <textarea
      placeholder="Write your review..."
      value={comment}
      onChange={(e) =>
        setComment(e.target.value)
      }
      required
    />

    <button type="submit">
      Submit Review
    </button>
  </form>
</div>


          </div>

        <div className="book-details-info">
          <h1>{book.title}</h1>

        <div className="book-rating">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={
        star <= userRating
          ? "star-filled"
          : "star-empty"
      }
      onClick={() => handleRating(star)}
    >
      ★
    </span>
  ))}




          <span className="rating-number">
            {averageRating}
          </span>
        </div>
          <p>
            <strong>Author:</strong> {book.author}
          </p>

          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>

          <p>
            <strong>Language:</strong> {book.language}
          </p>

          <p>
            <strong>Pages:</strong> {book.pages}
          </p>

          <p>
            <strong>Category:</strong> {book.category}
          </p>

          <p>
            <strong>Sub Category:</strong> {book.subCategory}
          </p>

          <p>
            <strong>Year:</strong> {book.yearOfPublish}
          </p>

         
          <p>
            <strong>Description:</strong>
          </p>

          <p>{book.description}</p>

        

        <div className="reviews-section">
  <h2>Reviews</h2>

  <div className="reviews-grid">
    {book.reviews?.map((review) => (
      <div
        key={review._id}
        className="review-card"
      >
        <div className="review-stars">
          {"★".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>

        <p className="review-comment">
          {review.comment}
        </p>

        <p className="review-user">
          {review.userName}
        </p>


      </div>

     ))}

    
  </div>
</div>

<div className="suggested-books-section">
  <h2>Suggested Books</h2>

  <div className="suggested-books-grid">
  {suggestedBooks?.map((book) => (
    <div
      key={book._id}
      className="suggested-book-card"
      onClick={() => navigate(`/book/${book._id}`)}
    >
      {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="book-image"
              />
            )}

      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  ))}
  
</div>
 
</div>

<div className="all-books-section">
  <h2>More Books</h2>

  <div className="suggested-books-grid">
    {allBooks.map((book) => (
      <div
        key={book._id}
        className="suggested-book-card"
        onClick={() => navigate(`/book/${book._id}`)}
      >
        {book.coverImage && (
          <img
            src={book.coverImage}
            alt={book.title}
            className="suggested-book-image"
          />
        )}

          <h3>{book.title}</h3>
         <p>{book.author}</p>
       </div>
  ))}
  
</div>
 
</div>   

        

        </div>

        

      </div>

 </div>
</div>
   
);
}

export default BookDetails;