const Book = require("../models/book.model");


const createBook = async (req, res) => {
  try {
    console.log(req.file);   

    console.log("User ID:", req.user.sub);

const book = await Book.create({
  ...req.body,
  coverImage: req.file ? req.file.path : "",
  createdBy: req.user.sub,
});

    console.log("REQ USER:", req.user);
    console.log("REQ BODY:", req.body);
    console.log(book);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllBooks = async (req, res) => {
  try {
    const search = req.query.search || "";

const books = await Book.find({
  title: {
    $regex: search,
    $options: "i",
  },
});

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        res.status(200).json({
            success: true,
            data: book,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateBook = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("ID:", req.params.id);

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.coverImage = req.file.path;
    }

    const updatedBook =
      await Book.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(
      req.params.id
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
     console.log("Book owner:", book.createdBy);
     console.log("Logged in user:", req.user.sub);
    if (
      book.createdBy !== req.user.sub
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only delete your own books",
      });
    }

    await Book.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
