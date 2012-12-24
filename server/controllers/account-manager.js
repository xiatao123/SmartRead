var mongo = require('mongodb');

var bcrypt = require('bcrypt');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var dbPort = global.port;
var dbHost = global.host;
var dbName = global.dbname;

var moment = require('moment');

var AM = {};

AM.db = new Db(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}, {}));
AM.db.open(function(err, db){
    if(!err) {
        console.log("Connected to 'smartreaddb' database");
        AM.db.collection('accounts', {safe:true}, function(err, collection) {
            if (err) {
                populateDB();
            }
        });
    }else{
        console.log(err);
    }

    AM.accounts =  AM.db.collection('accounts');
});

module.exports = AM;

AM.autoLogin = function(user, pass, callback){
    AM.accounts.findOne({user:user}, function(e, o) {
        if (o){
            o.pass == pass ? callback(o) : callback(null);
        }	else{
            callback(null);
        }
    });
};

AM.manualLogin = function(user, pass, callback)
{
    AM.accounts.findOne({user:user}, function(e, o) {
        if (o == null){
            callback('user-not-found');
        }	else{
            bcrypt.compare(pass, o.pass, function(err, res) {
                if (res){
                    callback(null, o);
                }	else{
                    callback('invalid-password');
                }
            });
        }
    });
};

// record insertion, update & deletion methods //

AM.signup = function(newData, callback)
{
    AM.accounts.findOne({user:newData.user}, function(e, o) {
        if (o){
            callback('username-taken');
        }	else{
            AM.accounts.findOne({email:newData.email}, function(e, o) {
                if (o){
                    callback('email-taken');
                }	else{
                    AM.saltAndHash(newData.pass, function(hash){
                        newData.pass = hash;
                        // append date stamp when record was created //
                        newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                        AM.accounts.insert(newData, callback(null));
                    });
                }
            });
        }
    });
};

AM.update = function(newData, callback)
{
    AM.accounts.findOne({user:newData.user}, function(e, o){
        o.name 		= newData.name;
        o.email 	= newData.email;
        o.country 	= newData.country;
        if (newData.pass == ''){
            AM.accounts.save(o); callback(o);
        }	else{
            AM.saltAndHash(newData.pass, function(hash){
                o.pass = hash;
                AM.accounts.save(o); callback(o);
            });
        }
    });
};

AM.setPassword = function(email, newPass, callback)
{
    AM.accounts.findOne({email:email}, function(e, o){
        AM.saltAndHash(newPass, function(hash){
            o.pass = hash;
            AM.accounts.save(o); callback(o);
        });
    });
};

AM.validateLink = function(email, passHash, callback)
{
    AM.accounts.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
        callback(o ? 'ok' : null);
    });
};

AM.saltAndHash = function(pass, callback)
{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(pass, salt, function(err, hash) {
            callback(hash);
        });
    });
};

AM.delete = function(id, callback)
{
    AM.accounts.remove({_id: this.getObjectId(id)}, callback);
};

// auxiliary methods //

AM.getEmail = function(email, callback)
{
    AM.accounts.findOne({email:email}, function(e, o){ callback(o); });
};

AM.getObjectId = function(id)
{
    return AM.accounts.db.bson_serializer.ObjectID.createFromHexString(id)
};

AM.getAllRecords = function(callback)
{
    AM.accounts.find().toArray(
        function(e, res) {
            if (e) callback(e)
            else callback(null, res)
        });
};

AM.delAllRecords = function(id, callback)
{
    AM.accounts.remove(); // reset accounts collection for testing //
};

// just for testing - these are not actually being used //

AM.findById = function(id, callback)
{
    AM.accounts.findOne({_id: this.getObjectId(id)},
        function(e, res) {
            if (e) callback(e)
            else callback(null, res)
        });
};


AM.findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
    AM.accounts.find( { $or : a } ).toArray(
        function(e, results) {
            if (e) callback(e)
            else callback(null, results)
        });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var accounts = [
        {
            name: "Frank Wang",
            email: "frankyanwang@gmail.com",
            user: "frankwang",
            pass: "abc123",
            date: new Date()
        },
        {
            name: "Leon QI",
            email: "leon.qi@gmail.com",
            user: "leonqi",
            pass: "abc123",
            date: new Date()
        }];

//        collection.insert(accounts, {safe:true}, function(err, result) {});

    accounts.forEach(function(account){
        AM.saltAndHash(account.pass, function(hash){
            console.log(account);
            account.pass = hash;
            // append date stamp when record was created //
            account.date = moment().format('MMMM Do YYYY, h:mm:ss a');
            AM.db.collection('accounts', function(err, collection) {
                collection.insert(account, function(error, result){});
            });
        });
    });
};
