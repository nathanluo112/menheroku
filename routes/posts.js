function truncate(str) {
  return str.slice(0, str.indexOf('</p>'));
}

exports.index = function(Post) {
  return function(req, res) {
    Post.find({}, 'title', 'body', function(error, posts) {
      // for (var i = 0; i < posts.length; i++) {
      //   posts[i].body = truncate(posts[i].body);
      // }
      res.json({posts: posts});
    });
  };
};

exports.create = function(Post, PostGroup) {
  return function(req, res) {
    var post = new Post(req.body);
    post.save(function(error, post) {
      if (error || !post) {
        res.json({error: error});
      } else {
        PostGroup.findOrCreate({name: "main"}, function(error, group){
          post.postGroups.push(group._id);
          post.save();
          group.posts.push(post._id);
          group.save();
          Post.find({
            '_id': { $in: group.posts}
          }, function(err, docs){
            console.log(docs);
          });
          res.json({post: post});
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

exports.query = function(PostGroup, Post) {
  return function(req, res) {

  };
};