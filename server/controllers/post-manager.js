var _ = require('underscore');
var DataProvider = require('../db-provider').DataProvider;
var Utils = require('../server_utils');

var BSON = require('mongodb').BSONPure;

var PM = {};

var dp = new DataProvider();

PM.db = dp.db;
PM.posts =  PM.db.collection('posts');
PM.topStories =  PM.db.collection('top_stories');


module.exports = PM;

PM.findById = function(storyId, callback) {
    PM.topStories.findOne({'_id':new BSON.ObjectID(storyId)}, function(err, item) {
        if (err){
            callback('story-not-found');
        }	else{
            callback(null, item);
        }
    });
};

PM.findAll = function(req, res) {
    PM.topStories.find().sort({score:-1,pubDate:-1}).limit(48).toArray(function(err, items) {
//    PM.posts.find({},{source:1,name:1,link:1,pubDate:1,guid:1,author:1,tags:1,picture:1,source:1}).sort({pubDate:-1}).toArray(function(err, items) {
        _.each(items, function(value, index){
            value['pubDate'] = Utils.getTimeAgo(value['pubDate']);
        });
        res.send(items);
    });
};

//PM.addPost = function(req, res) {
//    var post = req.body;
//    console.log('Adding post: ' + JSON.stringify(post));
//    PM.posts.insert(post, {safe:true}, function(err, result) {
//        if (err) {
//            res.send({'error':'An error has occurred'});
//        } else {
//            console.log('Success: ' + JSON.stringify(result[0]));
//            res.send(result[0]);
//        }
//    });
//};
//
//PM.updatePost = function(req, res) {
//    var id = req.params.id;
//    var post = req.body;
//    delete post._id;
//    console.log('Updating post: ' + id);
//    console.log(JSON.stringify(post));
//    PM.posts.update({'_id':new BSON.ObjectID(id)}, post, {safe:true}, function(err, result) {
//        if (err) {
//            console.log('Error updating post: ' + err);
//            res.send({'error':'An error has occurred'});
//        } else {
//            console.log('' + result + ' document(s) updated');
//            res.send(post);
//        }
//    });
//};
//
//PM.deletePost = function(req, res) {
//    var id = req.params.id;
//    console.log('Deleting post: ' + id);
//    PM.posts.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
//        if (err) {
//            res.send({'error':'An error has occurred - ' + err});
//        } else {
//            console.log('' + result + ' document(s) deleted');
//            res.send(req.body);
//        }
//    });
//};