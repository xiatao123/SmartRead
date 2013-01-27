var SR = SR || {};
SR.Signup = SR.Signup || {};

(function($, ns){
    SR.SignupView = Backbone.View.extend({

        initialize:function (email) {
            this.render(email);
        },

        render:function (email) {
            $(this.el).html(this.template({email: email}));
            return this;
        },

        bindSignupjQueryForm: function(){
            var button, buttonLabel;

            var av = new AccountValidator();

            $('#signup-form').ajaxForm({
                beforeSubmit : function(formData, jqForm, options){
                    if(av.validateForm()){
                        button = jqForm.find('button:submit');
                        buttonLabel = jqForm.find('button:submit').text();
                        SR.utils.disableButton(jqForm.find('button:submit'),"努力加载中。。");
                        return true;
                    }else{
                        return false;
                    }
                },
                success	: function(data, status, xhr, $form){
                    SR.app.navigate("stories", {trigger: true});
                    SR.utils.enableButton(button ,buttonLabel);
                    SR.hideNotification();

                },
                error : function(e){
                    SR.utils.enableButton(button ,buttonLabel);
                    if(e.responseText === "email-not-invited-yet"){
                        av.showInvalidEmailNotInvited();
                    }else if(e.responseText === "email-not-found-in-invite"){
                        av.showInvalidEmailNotFound();
                    }else if(e.responseText === "email-taken"){
                        av.showInvalidEmail();
                    }else if(e.responseText === "username-taken"){
                        av.showInvalidUserName();
                    }else{
                        SR.utils.showSystemError();
                    }
                },
                resetForm: true
            });
        }

    });

})(jQuery, SR.Signup);