var bcrypt = require('bcrypt');

var moment = require('moment');

var DataProvider = require('../db-provider').DataProvider;
var options = require('../db-settings');


var EventMgr = {};

var dp = new DataProvider(options);

EventMgr.db = dp.db;

EventMgr.events = EventMgr.db.collection("events");

module.exports = EventMgr;

EventMgr.insert = function(userId, userName, storyId, tags, callback){
    var createTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    EventMgr.events.insert({
        userId: userId,
        userName: userName,
        storyId: storyId,
        timespend: 300,
        tags: tags,
        createTime: createTime
    }, function(err, result){
        if (err) {
            //TODO log it.
            callback(err);
        } else {
            callback(null);
        }
    })
};

