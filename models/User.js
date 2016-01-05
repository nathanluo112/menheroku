var Mongoose = require('mongoose');

exports.UserSchema = new Mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});