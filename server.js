
const express = require('express');

const app = express();

app.use(express.json());
let books = [
    {
        id: 1,
        title: "Wings of Fire",
        author: "APJ Abdul Kalam",
        category: "Biography"
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction"
    },
    {
        id: 3,
        title: "Clean Code",
        author: "Robert Martin",
        category: "Programming"
    }
];
app.post('/books', (req, res) => {
    const { id, title, author, category } = req.body;

    if (!id || !title || !author || !category) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (books.some(book => book.id === Number(id))) {
        return res.status(409).json({
            message: "Book ID already exists"
        });
    }

    const newBook = {
        id: Number(id),
        title,
        author,
        category
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});
app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(
        b => b.id === Number(req.params.id)
    );

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});
app.put('/books/:id', (req, res) => {
    const book = books.find(
        b => b.id === Number(req.params.id)
    );

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, category } = req.body;

    if (!title || !author || !category) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    book.title = title;
    book.author = author;
    book.category = category;

    res.json({
        message: "Book updated successfully",
        book
    });
});
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(
        b => b.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});0
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
