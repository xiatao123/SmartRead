var SR = SR || {};

SR.HomeView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    events: {
        "click .login"   : "login"
    },

    login: function(e){
        $('#login-form').ajaxForm({
            beforeSubmit : function(formData, jqForm, options){
//                if (lv.validateForm() == false){
//                    return false;
//                } 	else{
//                    // append 'remember-me' option to formData to write local cookie //
//                    formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
//                    return true;
//                }
                formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
                alert("hit here");
                return true;
            },
            success	: function(data, status, xhr, $form){
                SR.app.navigate("posts", {trigger: true});
            },
            error : function(e){
//                lv.showLoginError('Login Failure', 'Please check your username and/or password');
            }
        });
//        return false;
    }

});