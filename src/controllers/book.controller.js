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

        const averageRating =
          book.ratings.length > 0
            ? (
                book.ratings.reduce(
                  (sum, item) => sum + item.rating,
                  0
                ) / book.ratings.length
              ).toFixed(1)
            : 0;

        res.status(200).json({
          success: true,
          data: book,
          averageRating,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSuggestedBooks = async (req, res) => {
  try {
    const currentBook = await Book.findById(req.params.id);

    if (!currentBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const suggestedBooks = await Book.find({
      category: currentBook.category,
      _id: { $ne: currentBook._id },
    }).limit(6);

    res.status(200).json({
      success: true,
      data: suggestedBooks,
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
    console.log("updateBook req.body", req.body);
    console.log("updateBook req.file", req.file);

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.coverImage = req.file.path;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });

  } catch (error) {
    console.log(error);

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

const rateBook = async (req, res) => {
  try {
    const { rating } = req.body;

    const userId = req.user.sub;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const existingRating = book.ratings.find(
      (item) => item.userId === userId
    );

    if (existingRating) {
      existingRating.rating = rating;
    } else {
      book.ratings.push({
        userId,
        rating,
      });
    }

    await book.save();

    res.status(200).json({
      success: true,
      message: "Rating saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;

    const userId = req.user.sub;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const userName =
      req.body.userName || "Anonymous";

    book.reviews.push({
      userId,
      userName,
      comment,
      rating,
    });

    await book.save();

    res.status(200).json({
      success: true,
      message: "Review added successfully",
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
  getSuggestedBooks,
  updateBook,
  deleteBook,
  rateBook,
  addReview,
  
};
