const express = require('express');
const axios = require('axios'); // Install axios via npm
let books = require("./booksdb.js");
const public_users = express.Router();

/**
 * Simulate an async fetch function for books
 */
const fetchBooks = () => {
    return new Promise((resolve, reject) => {
        if (books) resolve(books);
        else reject("No books available");
    });
};

// Task 10: Get all books
public_users.get('/', async (req, res) => {
    try {
        const allBooks = await fetchBooks();
        return res.send(JSON.stringify(allBooks, null, 4));
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

// Task 11: Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const allBooks = await fetchBooks();
        const book = allBooks[isbn];
        if (book) return res.send(JSON.stringify(book, null, 4));
        else return res.status(404).json({ message: "Book not found" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

// Task 12: Get book by Author
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const allBooks = await fetchBooks();
        const result = Object.values(allBooks).filter(b => b.author === author);
        if (result.length > 0) return res.send(JSON.stringify(result, null, 4));
        else return res.status(404).json({ message: "No books found for this author" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

// Task 13: Get book by Title
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const allBooks = await fetchBooks();
        const result = Object.values(allBooks).filter(b => b.title === title);
        if (result.length > 0) return res.send(JSON.stringify(result, null, 4));
        else return res.status(404).json({ message: "No books found with this title" });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
});

module.exports.general = public_users;
