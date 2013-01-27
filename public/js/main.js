var SR = SR || {};

SR.AppRouter = Backbone.Router.extend({

    routes: {
        ""                      : "list",
        "home"                  : "home",
        "signup/:email"         : "signup",
        "stories"	            : "list",
        "stories/page/:page"	: "list",
        "stories/add"           : "addPost",
        "stories/:id"           : "postDetails",
        "categories/:name"     : "listCategory",
        "admin-invite"          : "adminInviteList",
        "about"                 : "about"
    },

    initialize: function () {
//        this.headerView = new SR.HeaderView();
//        $('.header').html(this.headerView.el);
    },

    renderHeader: function(){
        this.headerView = new SR.HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
//        this.headerView = new SR.HeaderView();
//        $('.header').html(this.headerView.el);

        this.renderHeader();
        if (!this.homeView) {
            this.homeView = new SR.HomeView();
        }
        $('#content').html(this.homeView.el);
        this.homeView.bindLogonjQueryForm();
        this.homeView.bindInvitejQueryForm();

        this.headerView.selectMenuItem('home-menu');
        $.backstretch("../css/img/bg2.jpg");
//        $('body').addClass("homeView");
    },

    signup: function(email){
        this.renderHeader();
        if(!this.signupView){
            this.signupView = new SR.SignupView(decodeURIComponent(email));
        }
        $('#content').html(this.signupView.el);

        $('#name-tf').focus();
        this.signupView.bindSignupjQueryForm();

        $('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
        $('.modal-alert .modal-header h3').text('Success!');
        $('.modal-alert .modal-body p').html('Your account has been created.</br>Click OK to return to the login page.');

        $.backstretch("../css/img/bg2.jpg");
    },

	list: function(page) {
//        this.headerView = new SR.HeaderView();
//        $('.header').html(this.headerView.el);
        this.renderHeader();

        var p = page ? parseInt(page, 10) : 1;
        var postList = new SR.PostCollection();
        postList.fetch({
            success: function(model, response, options){
                $("#content").html(new SR.PostListView({model: postList, page: p}).el);

                SR.utils.hideNotification();
//                SR.app.headerView.selectMenuItem('dropdown-menu');
                $.backstretch("../css/img/paper.jpg");

            },
            error: function(model, xhr, options){
                if(xhr.status === 401){
                    SR.app.navigate("home", {trigger: true});
                }
            }

        });
    },

    listCategory: function(name){
        this.renderHeader();

        var postList = new SR.PostCollection();
        postList.fetch({
            data: $.param({ category: name}),
            success: function(model, response, options){
                $("#content").html(new SR.PostListView({model: postList}).el);
                $("#categoryName").html(SR.utils.getCategoryMapping()[name] + ' <b class="caret">');
            },
            error: function(model, xhr, options){
                if(xhr.status === 401){
                    SR.app.navigate("home", {trigger: true});
                }
            }
        });

    },

//    postDetails: function (id) {
//        var post = new SR.Post({_id: id});
//        post.fetch({success: function(){
//            $("#content").html(new SR.PostView({model: post}).el);
//        }});
//        this.headerView.selectMenuItem();
//    },

	addPost: function() {
        var post = new SR.Post();
        $('#content').html(new SR.PostView({model: post}).el);
        this.headerView.selectMenuItem('add-menu');
        $('.backstretch').remove();
	},

    about: function () {
        this.renderHeader();

        if (!this.aboutView) {
            this.aboutView = new SR.AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
        $('.backstretch').remove();
//        $('body').removeClass();
    },

    //admin functions.
    adminInviteList: function(){
        this.renderHeader();
        var inviteList = new SR.InviteCollection();
        inviteList.fetch({
            success: function(model, response, options){
                $("#content").html(new SR.AdminInviteUsersView({model: inviteList}).el);
            },
            error: function(model, xhr, options){
                if(xhr.status === 401){
                    SR.app.navigate("", {trigger: true});
                }
            }

        });
        $('.backstretch').remove();
    }

});

SR.utils.loadTemplate(['HomeView', 'HeaderView', 'PostView', 'PostListItemView', 'AboutView','PostModalView','SignupView','AdminInviteUsersView'], function() {
    SR.app = new SR.AppRouter();
    Backbone.history.start();
});