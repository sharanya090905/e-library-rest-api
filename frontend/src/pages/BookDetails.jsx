import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);

        setBook(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="content">
    <div className="container">
      <div className="book-details-page">

        <div className="book-details-image">
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="book-details-image"
             />
            )}
          </div>

        <div className="book-details-info">
          <h1>{book.title}</h1>

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
            <strong>MRP:</strong> ₹{book.mrp}
          </p>

          <p>
            <strong>Price:</strong> ₹{book.price}
          </p>

          <p>
            <strong>Description:</strong>
          </p>

          <p>{book.description}</p>
        </div>

      </div>
    </div>
</div>
   
);
}

export default BookDetails;