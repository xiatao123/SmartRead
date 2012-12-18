var express = require('express'),
    path = require('path'),
    http = require('http'),
    post = require('./routes/posts');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/posts', post.findAll);
app.get('/posts/:id', post.findById);
app.post('/posts', post.addPost);
app.put('/posts/:id', post.updatePost);
app.delete('/posts/:id', post.deletePost);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
