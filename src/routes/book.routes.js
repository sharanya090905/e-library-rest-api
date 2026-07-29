const express = require("express");
const upload = require("../middlewares/upload.middleware");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/auth.middleware");
const { 
    createBook, 
    getAllBooks,
    getBookById,
    updateBook,
    getSuggestedBooks,
    deleteBook,
    rateBook,
    addReview,
} = require("../controllers/book.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("coverImage"),
  createBook
);
router.get("/", getAllBooks);
router.get("/:id/suggestions", getSuggestedBooks);
router.get("/:id", getBookById);
router.patch(
  "/:id",
  authenticate,
  upload.single("coverImage"),
  updateBook
);


router.delete("/:id", authenticate, deleteBook);
router.post(
  "/:id/rate",
  authenticate,
  rateBook
);

router.post(
  "/:id/review",
  authenticate,
  addReview
);

module.exports = router;