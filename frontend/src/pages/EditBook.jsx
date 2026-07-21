import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [existingCover, setExistingCover] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);

        const book = response.data.data;

        setTitle(book.title);
        setAuthor(book.author);
        setPrice(book.price);
        setCategory(book.category);
        setExistingCover(book.coverImage || "");
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("author", author);
      formData.append("price", price);
      formData.append("category", category);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const response = await api.put(`/books/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // If backend returns updated book, update preview
      if (response && response.data && response.data.data) {
        const updated = response.data.data;
        if (updated.coverImage) setExistingCover(updated.coverImage);
      }

      alert("Book Updated Successfully");

      // navigate back to list and include update flag so list can refetch
      navigate("/", { state: { updatedAt: Date.now() } });
    } catch (error) {
      console.log(error);
      alert("Failed To Update Book");
    }
  };

 return (
  <div className="content">
    <div className="form-container edit-form-container">
      <h2>Edit Book</h2>


      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <br />
        <br />

        {existingCover && !coverImage && (
          <div>
            <p>Current cover:</p>
            <img
              src={existingCover}
              alt="current cover"
              className="book-image"
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />

        <br />
        <br />

        <button type="submit">Update Book</button>
      </form>
    </div>
    </div>
  );
}

export default EditBook;