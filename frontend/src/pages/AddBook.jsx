import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddBook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [mrp, setMrp] = useState("");
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
    formData.append("description", description);
    formData.append("author", author);
    formData.append("publisher",publisher);
    formData.append("yearOfPublish",yearOfPublish);
    formData.append("mrp", mrp)
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
          <div className="row-fields">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="half-input"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="half-input"
              rows={4}
            />
          </div>

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
            placeholder="MRP"
            value={mrp}
            onChange={(e) =>
              setMrp(e.target.value)
            }
          />

          <br />
          <br />

          <input
            type="number"
            placeholder="Selling Price"
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

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >
            <option value="">
              Select Language
            </option>
            <option value="English">
              English
            </option>
            <option value="Hindi">
              Hindi
            </option>
            <option value="Bengali">
              Bengali
            </option>
            <option value="Spanish">
              Spanish
            </option>
            </select>

          <br />
          <br />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              Select Category
            </option>
            <option value="Guide">
              Guide
            </option>
            <option value="Business">
              Business
            </option>
            <option value="Science">
              Science
            </option>
            <option value="Story">
              Story
            </option>
            </select>
          

          <br />
          <br />

          <select
            value={subCategory}
            onChange={(e) =>
              setSubCategory(e.target.value)
            }
          >
            <option value="">
              Select Sub Category
            </option>
            <option value="Programming">
              Programming
            </option>
            <option value="Productivity">
              Productivity
            </option>
            <option value="Fiction">
              Fiction
            </option>
            <option value="Biography">
              Biography
            </option>
            </select>

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