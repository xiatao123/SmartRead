var SR = SR || {};


SR.setUserCache = function(user){
    SR.user = user;
};

SR.clearUserCache = function(){
    SR.user = undefined;
};

SR.getUserCache = function(){
    return SR.user;
};

SR.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.options.data));
    },

    events: {
        "click .openModal"   : "openModal",
        "click .logout"   : "logout"
    },

    openModal: function(evt){
        evt.preventDefault();
        $('#loginModal').modal({backdrop:false});
        $('#user-tf').focus();
    },

    logout: function(evt){
        var request = $.ajax({
            url: "logout",
            type: "POST",
            dataType: "json"
        });

        request.done(function(data) {
            SR.clearUserCache();
            var navTo = "home";
            //hack to navigate to same URL with a refresh.
            if(Backbone.history.fragment === "home"){
                navTo = "";
            }
            SR.app.navigate(navTo,{trigger: true});
        });
    },

    selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

//    setHeader: function(){
//        var request = $.ajax({
//            url: "session",
//            type: "GET",
//            dataType: "json"
//        });
//
//        var account={},
//            that = this;
//        request.done(function(data) {
//            account['user'] = data;
//            $(that.el).html(that.template(account));
//            return that;
//        });
//        request.fail(function(jqXHR, textStatus) {
//            account['user'] = undefined;
//            $(that.el).html(that.template(account));
//            return that;
//        });
//    }

});