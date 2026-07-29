const express = require("express");
const upload = require("../middlewares/upload.middleware");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/auth.middleware");
const { 
    createBook, 
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    rateBook,
} = require("../controllers/book.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  upload.single("coverImage"),
  createBook
);
router.get("/", getAllBooks);
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

module.exports = router;