app.controller('BlogController', ['$scope', '$http', function($scope, $http) {
  $scope.DEFAULT = 0;
  $scope.NEWFORM = 1;
  $scope.EDITFORM = 2;
  $scope.DETAIL = 3;
  $scope.posts;
  $scope.mode = $scope.DEFAULT;

  $scope.update = function() {
    $http.get('/posts').then(function(data){
      $scope.posts = data.data.posts;
    });
  };

  $scope.update();

  $scope.addPost = function(post){
    $http.post('/posts', post).then(function(data) {
      $scope.posts.push(data.data.post);
      // $scope.update();
      post.title = "";
      post.body = "";
    });
  };

  $scope.edit = function(post) {
    $http.get('/posts/' + post._id).then(function(data) {
      $scope.postToEdit = data.data.post;
      $scope.mode = $scope.EDITFORM;
    });
  }

  $scope.editPost = function(post) {
    $http.put('/posts/' + post._id, post).then(function(data) {
      $scope.update();
      $scope.mode = $scope.DEFAULT;
    });
  }

  $scope.newPostForm = function() {
    $scope.mode = $scope.NEWFORM;
  }

  $scope.delete = function(post) {
    $http.delete('/posts/' + post._id).then(function(){
      $scope.posts = $scope.posts.filter(function(obj) {
        return obj != post;
      });
    });
  }

  $scope.get = function(post) {
    $http.get('/posts/' + post._id).then(function(data) {
      $scope.displayPost = data.data.post;
      $scope.displayPost.body
      $scope.mode = $scope.DETAIL;
    });
  }

}]);