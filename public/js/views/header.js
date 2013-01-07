var SR = SR || {};

SR.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var request = $.ajax({
            url: "session",
            type: "GET",
            dataType: "json"
        });

        var account={},
            that = this;
        request.done(function(data) {
            account['user'] = data;
            $(that.el).html(that.template(account));
            return that;
        });
        request.fail(function(jqXHR, textStatus) {
            account['user'] = undefined;
            $(that.el).html(that.template(account));
            return that;
        });
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

});