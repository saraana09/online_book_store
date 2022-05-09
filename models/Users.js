const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
  favorites: [
    { type: Schema.Types.ObjectId, ref: 'Books' } // Many to Many relationship
  ],
  cart: [
    { type: Schema.Types.ObjectId, ref: 'Books' } // One to Many Relationship
  ]
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;