var PM = require('./controllers/post-manager');
var AM = require('./controllers/account-manager');
var Utils = require('./server_utils');

module.exports = function(app) {

    app.get('/posts', function(req, res){
        authenticate(req, res, function(){
            PM.findAll(req, res);
        });
    });


    app.get('/posts/:id', PM.findById);
    app.post('/posts', PM.addPost);
    app.put('/posts/:id', PM.updatePost);
    app.delete('/posts/:id', PM.deletePost);

    app.post('/login', function(req, res){
        AM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
            if (!o){
                console.log("*****",req.param('user'));
                res.send(e, 400);
            }	else{
                console.log("*****","login success");
                req.session.user = o;
                if (req.param('remember-me') == 'true'){
                    res.cookie('user', o.user, { maxAge: 900000 });
                    res.cookie('pass', o.pass, { maxAge: 900000 });
                }
                res.send(200, o);
            }
        });
    });

    app.get('/', function(req, res){
        // check if the user's credentials are saved in a cookie //
        if (req.cookies.user === undefined || req.cookies.pass === undefined){
            console.log("no******", req.cookies.user);
            res.render('login', { locals: { title: 'Hello - Please Login To Your Account' }});
        }	else{
            console.log("yes******", req.cookies.user);
            // attempt automatic login //
            AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
                if (o != null){
                    console.log("auto******", o);
                    req.session.user = o;
                    res.redirect('/home');
                }	else{
                    console.log("auto****** log back in");
                    res.render('login', { locals: { title: 'Hello - Please Login To Your Account' }});
                }
            });
        }
    });


    app.get('*', function(req, res) {
        res.send("oops! page not found", 404);

    });

};

function authenticate(req, res, callback){
    if(req.session.user != null){
        console.log("****6", req.session.user);
        callback();
        return;
    }

    if (req.cookies.user === undefined || req.cookies.pass === undefined){
        Utils.log("1");
        res.send(401,"unauthorized");
    }	else{
        Utils.log(2);
        // attempt automatic login //
        AM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
            Utils.log(3);
            if (o != null){
                Utils.log(4);
                req.session.user = o;
                callback();
            }	else{
                Utils.log(5);
                res.send(401,"unauthorized");
            }
        });
    }
}
