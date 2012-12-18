var SR = SR || {};

SR.AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "posts"	: "list",
        "posts/page/:page"	: "list",
        "posts/add"         : "addPost",
        "posts/:id"         : "postDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new SR.HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new SR.HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
        $.backstretch("../css/img/bg2.jpg");
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var postList = new SR.PostCollection();
        postList.fetch({success: function(){
            $("#content").html(new SR.PostListView({model: postList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
        $('.backstretch').remove();
    },

    postDetails: function (id) {
        var post = new SR.Post({_id: id});
        post.fetch({success: function(){
            $("#content").html(new SR.PostView({model: post}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addPost: function() {
        var post = new SR.Post();
        $('#content').html(new SR.PostView({model: post}).el);
        this.headerView.selectMenuItem('add-menu');
        $('.backstretch').remove();
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new SR.AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
        $('.backstretch').remove();
    }

});

SR.utils.loadTemplate(['HomeView', 'HeaderView', 'PostView', 'PostListItemView', 'AboutView','PostModalView'], function() {
    SR.app = new SR.AppRouter();
    Backbone.history.start();
});