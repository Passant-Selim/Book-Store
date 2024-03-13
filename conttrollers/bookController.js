const Book = require("../models/bookModel");
const AppError = require("../utils/AppError");

// add book
const addBook = async (req, res, next) => {
  const { title, author, publishYear } = req.body;
  try {
    if (
      typeof title !== "string" ||
      typeof author !== "string" ||
      typeof publishYear !== "number"
    ) {
      return next(new AppError("Send all required fields", 400));
    }

    const newBook = {
      title,
      author,
      publishYear,
    };
    const book = new Book(newBook);
    await book.save();

    return res.status(201).send(book);
  } catch (error) {
    return next(new AppError("Server error", 500));
  }
};

// get all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    if (!books) {
      return next(new AppError("No books found", 404));
    }

    return res.status(200).send(books);
  } catch (error) {
    return next(new AppError("Server error", 500));
  }
};

// get one book
const getOneBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    const oneBook = await Book.findById(id);
    if (!oneBook) {
      return next(new AppError("No book found", 404));
    }

    return res.status(200).send(oneBook);
  } catch (error) {
    return next(new AppError("Server error", 500));
  }
};

// update book
const updateBook = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return next(new AppError("No book found", 404));
    }

    const newBook = await Book.findByIdAndUpdate(id, req.body);
    await newBook.save();
    return res.status(200).send(newBook);
  } catch (error) {
    return next(new AppError("Server error", 500));
  }
};

// delete book
const deleteBook = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return next(new AppError("No book found", 404));
    }

    const book = await Book.findByIdAndDelete(id);
    return res.status(200).send("Book deleted successfully");
  } catch (error) {
    return next(new AppError("Server error", 500));
  }
};

module.exports = { addBook, getAllBooks, getOneBook, updateBook, deleteBook };
