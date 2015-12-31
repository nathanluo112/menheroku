var Mongoose = require('mongoose');

exports.PostSchema = new Mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  created_at: {type: Date, default: Date.now}
})