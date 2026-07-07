const express = require("express");

const bookRoutes = require("./routes/book.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

module.exports = app;