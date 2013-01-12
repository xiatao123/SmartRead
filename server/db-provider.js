var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

module.exports = {

    DataProvider : function(options, callback) {
        //store this for later use
        var _parent = this;

        //connect to the db
        this.db = new Db(
            options.db,
            new Server(
                options.host,
                options.port,
                {auto_reconnect: true},
                {}
            )
        );

        //open the db connection and then authenticate
        this.db.open(function(err) {
            if(options.username !== undefined && options.username.length > 0){
                _parent.db.authenticate(
                    options.username,
                    options.password,
                    function(err) {
                        if (err) {
                            console.log(err);
                        }else{
                            console.log("Connected to 'smartreaddb' database");
                            if(callback){
                                callback();
                            }
                        }
                    }
                );
            }else{
                if (err) {
                    console.log(err);
                }else{
                    console.log("Connected to 'smartreaddb' database");
                    if(callback){
                        callback.call(_parent);
                    }
                }
            }
        });
    }

//    DataProvider.prototype.close : function()

};