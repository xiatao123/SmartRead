var SR = SR || {};

SR.AdminInviteUsersView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        var invites = this.model.models;
        $(this.el).html(this.template({
            action: this.model.toJSON()
        }));
        return this;
    },

    events: {
        "click .invite": "inviteUser"
    },

    inviteUser: function(evt){
        var email = $(evt.target).data('email');
        //disable button
        $(evt.target).attr("disabled", "disabled");

        var request = $.ajax({
            url: "email-invite",
            type: "POST",
            data: {email: email}
        });

        request.done(function(data) {
            $(evt.target).removeAttr("disabled");
            $(evt.target).parent().prev().text("true");
            SR.utils.showSuccess({message: "email has been sent out!"});

        });
        request.fail(function(jqXHR, textStatus) {
            $(evt.target).removeAttr("disabled");
            SR.utils.showSuccess({message: "failed to sent out the invitation email!"});
        });
    }
});