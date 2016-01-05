var Mongoose = require('mongoose');

exports.PostGroupSchema = new Mongoose.Schema({
  name: {type: String, required: true},
  posts: [{type: Mongoose.Schema.ObjectId, ref: "Post"}]
})