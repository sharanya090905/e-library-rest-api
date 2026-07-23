const express = require("express");
const upload = require("../middlewares/upload.middleware");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/auth.middleware");
const { 
    createBook, 
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
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
router.put(
  "/:id",
  upload.single("coverImage"),
  authenticate,
  updateBook
);
router.delete("/:id", authenticate, deleteBook);
module.exports = router;