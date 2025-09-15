const express = require('express');
let books = require("./booksdb.js");
const regd_users = express.Router();

// Add/Edit a book review directly
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!books[isbn].reviews) {
        books[isbn].reviews = {};
    }

    // Use a fixed key "anonymous" since no login
    books[isbn].reviews["anonymous"] = review;

    return res.status(200).json({
        message: "Review added/modified successfully",
        reviews: books[isbn].reviews
    });
});

// Delete a book review directly
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;

    if (!books[isbn] || !books[isbn].reviews) {
        return res.status(404).json({ message: "Book or review not found" });
    }

    delete books[isbn].reviews["anonymous"];

    return res.status(200).json({
        message: "Review deleted successfully",
        reviews: books[isbn].reviews
    });
});

module.exports.authenticated = regd_users;
