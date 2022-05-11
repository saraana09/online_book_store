const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const authorSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  books: {type: Schema.Types.ObjectId, ref: 'Books'}
})

const Authors = mongoose.model('Authors', authorSchema);

module.exports = Authors;