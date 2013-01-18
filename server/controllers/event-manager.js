var bcrypt = require('bcrypt');

var moment = require('moment');

var DataProvider = require('../db-provider').DataProvider;

var EventMgr = {};

var dp = new DataProvider();

EventMgr.db = dp.db;

EventMgr.events = EventMgr.db.collection("events");

module.exports = EventMgr;

EventMgr.insert = function(userId, userName, storyId, tags, callback){
    var createTime = new Date().getTime();
//    var createTimeUTC = moment();
//    console.log("createTime", createTime.getTime());
//    console.log("createTime moment", createTimeUTC.unix());
//    console.log("createTime moment", createTimeUTC.valueOf());
//    console.log("createTime in long", new Date().getTime());
//    console.log("createTime in Date", new Date());

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
            console.log("failed to update event table: ", err);
            callback(err);
        } else {
            callback(null);
        }
    })
};

