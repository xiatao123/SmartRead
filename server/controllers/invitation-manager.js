var mongo = require('mongodb');

var bcrypt = require('bcrypt');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var dbPort = global.port;
var dbHost = global.host;
var dbName = global.dbname;

var moment = require('moment');

var IM = {};

IM.db = new Db(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}, {}));
IM.db.open(function(err, db){
    if(!err) {
        console.log("Connected to 'smartreaddb' database");
    }else{
        console.log(err);
    }

    IM.invites =  IM.db.collection('invites');
});

module.exports = IM;

IM.requireInvite = function(email, callback)
{
    IM.invites.findOne({email:email}, function(e, o) {
        if (o){
            callback('email-already-register');
        }else{
            IM.invites.insert({
                email: email,
                accountId: undefined,
                isInvited: false
            },function(err, result) {
                if (err) {
                    //TODO log it.
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }
    });
};

//List all of the entries from invites collection.
IM.getAllRecords = function(callback)
{
    IM.invites.find().toArray(
        function(e, res) {
            if (e){
                callback(e);
            }
            else{
                callback(null, res);
            }
        });
};


////List only the entries whos' invitation email not been sent out yet.
//IM.listOnlyUninviteUsers = function(){
//
//};


// auxiliary methods //

IM.getEmail = function(email, callback)
{
    IM.invites.findOne({email:email}, function(e, o){ callback(o); });
};

IM.update = function(newData, callback)
{
    IM.invites.findOne({email:newData.email}, function(e, o){
        o.email 	= newData.email;
        o.accountId 	= newData.accountId;
        o.isInvited 	= newData.isInvited;
        IM.invites.save(o); callback(o);
    });
};