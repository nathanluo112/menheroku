exports.index = function(Post) {
  return function(req, res) {
    Post.find({}, 'title', function(error, posts) {
      res.json({posts: posts});
    });
  };
};

exports.create = function(Post) {
  return function(req, res) {
    var post = new Post(req.body);
    post.save(function(error, post) {
      if (error || !post) {
        res.json({error: error});
      } else {
        Post.findOne({_id: post._id}, 'title', function(error, post) {
          res.json({post : post});
        });
      }
    });
  };
};

exports.show = function(Post) {
  return function(req, res) {
    Post.findOne({_id: req.params.id}, function(error, post) {
      if (error || !post) {
        res.json({error: error});
      } else {
        res.json({post: post});
      }
    })
  }
};

exports.update = function(Post) {
  return function(req, res) {
    Post.findOne({_id: req.params.id}, function(error, post) {
      if (error || !post) {
        res.json({error: error});
      } else {
        post.title = req.body.title;
        post.body = req.body.body;
        post.save(function(error, post) {
          if (error) {
            res.json({error: error});
          } else {
            res.json({post: post});
          }
        });
      }
    })
  }
};

exports.delete = function(Post) {
  return function(req, res) {
    Post.findOne({_id: req.params.id}, function(error, post) {
      if (error || !post) {
        res.json({error: error});
      } else {
        post.remove(function(){
          res.json({status: "OK"});
        });
      }
    });
  };
};