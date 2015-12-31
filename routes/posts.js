exports.index = function(Post) {
  return function(req, res) {
    Post.find({}, function(error, posts) {
      res.json({posts: posts});
    });
  };
};