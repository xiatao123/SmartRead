var _ = require('underscore');
var DataProvider = require('../db-provider').DataProvider;
var Utils = require('../server_utils');

var BSON = require('mongodb').BSONPure;

var PM = {};

var dp = new DataProvider();

PM.db = dp.db;
PM.posts =  PM.db.collection('posts');
PM.topStories =  PM.db.collection('top_stories');
PM.userStories =  PM.db.collection('user_stories');


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
    console.log("user: ", req.session.user.user);
    PM.userStories.findOne({user: req.session.user.user}, function(err, item) {
        if(item === null){
            PM.topStories.find().sort({score:-1,pubDate:-1}).limit(300).toArray(function(err, items) {
                _.each(items, function(value, index){
                    value['pubDate'] = Utils.getTimeAgo(value['pubDate']);
                });
                res.send(items);
            });
        }else{
//            console.log("index : ", item.index);
//            console.log("index : ", item.list);
            var ids = _.map(item.index, function(score, storyId){ return new BSON.ObjectID(storyId); });
//            console.log("ids : ", ids);
            PM.topStories.find({_id: {$in: ids}}).sort({pubDate: -1}).limit(300).toArray(function(err, items) {
                _.each(items, function(value, index){
                    value['pubDate'] = Utils.getTimeAgo(value['pubDate']);
                    value['score'] = item.index[value['_id']];
//                    console.log(value['_id']);
                });
                res.send(items);
            });
        }
    });


//    PM.posts.find().sort({score:-1,pubDate:-1}).limit(500).toArray(function(err, items) {
////    PM.topStories.find().sort({score:-1,pubDate:-1}).limit(500).toArray(function(err, items) {
//        _.each(items, function(value, index){
//            value['pubDate'] = Utils.getTimeAgo(value['pubDate']);
//        });
//        res.send(items);
//    });
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