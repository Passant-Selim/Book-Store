const express = require("express");
const router = express.Router();

const {addBook, getAllBooks, getOneBook, updateBook, deleteBook} = require("../conttrollers/bookController");

router.post("/", addBook);
router.get("/", getAllBooks);
router.get("/:id", getOneBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);


module.exports = router;