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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);

        const book = response.data.data;

        setTitle(book.title);
        setAuthor(book.author);
        setPrice(book.price);
        setCategory(book.category);
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
      await api.put(
        `/books/${id}`,
        {
          title,
          author,
          price,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Updated Successfully");

      navigate("/");
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

        <button type="submit">
          Update Book
        </button>
      </form>
    </div>
    </div>
  );
}

export default EditBook;