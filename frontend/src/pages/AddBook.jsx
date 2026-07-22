import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [publisher, setPublisher] = useState("");
  const [yearOfPublish, setYearOfPublish] = useState("");
  const [pages, setPages] = useState("");
  const [language, setLanguage] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("author", author);
    formData.append("publisher",publisher);
    formData.append("yearOfPublish",yearOfPublish);
    formData.append("price", price);
    formData.append("pages",pages);
    formData.append("language",language);
    formData.append("category", category);
    formData.append("subCategory",subCategory);

    if (coverImage) {
      formData.append(
        "coverImage",
        coverImage
      );
    }

    try {
      await api.post(
        "/books",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Book Added Successfully");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Book");
    }
  };

  return (
    <div className="content">
      <div className="form-container add-form-container">
        <h2>Add Book</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
          />

          <br />
          <br />

          <input  
            type="text"  
            placeholder="Publisher"
            value={publisher}  
            onChange={(e) =>
              setPublisher(e.target.value)
               }
            />
            
            <br />
            <br />

          <input
            type="number"
            placeholder="Year of Publish"
            value={yearOfPublish}
            onChange={(e) =>
              setYearOfPublish(e.target.value)
             }
          />

           <br />
           <br />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <br />
          <br />

          <input
            type="number"
            placeholder="Number of Pages"
            value={pages}
            onChange={(e) =>
              setPages(e.target.value)
            }
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Language"
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          />

          <br />
          <br />


          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Sub Category"
            value={subCategory}
            onChange={(e) =>
              setSubCategory(e.target.value)
            }
          />

          <br />
          <br />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCoverImage(
                e.target.files[0]
              )
            }
          />

          <br />
          <br />

          <button type="submit">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;