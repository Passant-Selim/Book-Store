const mongoose = require("mongoose");

const {Schema} = mongoose;

const bookSchema = new Schema ({

    title: {
        type: String,
        required: true,
      },
    author: {
        type: String,
        required: true,
      },
    publishYear: {
        type: Number,
        required: true,
      },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;