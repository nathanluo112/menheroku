var express = require('express'),
    bodyParser = require('body-parser'),
    router = require("./routes/index"),
    posts = require("./routes/posts");

var app = express();

// setup database
var Mongoose = require('mongoose');
var dbUri = process.env.MONGODB_URI || "localhost"
var db = Mongoose.createConnection(dbUri, process.env.MONGODB_NAME || 'simpleblog');

var PostSchema = require('./models/Post').PostSchema;
var Post = db.model('posts', PostSchema);

// setup app dependencies
app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', router.index());
app.get('/posts', posts.index(Post));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


