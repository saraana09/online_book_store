const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const authorSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  books: {type: Schema.Types.ObjectId, ref: 'Books'}
})

const User = mongoose.model('Authors', userSchema);

module.exports = Authors;