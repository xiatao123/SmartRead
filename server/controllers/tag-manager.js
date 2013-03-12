var DataProvider = require('../db-provider').DataProvider;
var Utils = require('../server_utils');

var TM = {};

var dp = new DataProvider();

TM.db = dp.db;
TM.tags =  TM.db.collection('tags');


module.exports = TM;

TM.findAll = function (callback){
    var startTime = new Date().getTime();
    TM.tags.find().sort({title:1}).toArray(function(err, items){
        Utils.logTime("Admin: Query hot tags", startTime);
        if(callback){
            callback(null, items);
        }
        Utils.logTime("Admin: Total FindAll time spent", startTime);
    });
};