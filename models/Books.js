const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },  
  genre: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  availability: { type: Boolean, required: true, default: true },
  quantity: { type: Number }
})

const Books = mongoose.model('Books', productSchema);

module.exports = Books;