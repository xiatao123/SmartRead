var SR = SR || {};

SR.HomeView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

//    events: {
//        "click .login"   : "login"
//    },

    bindLogonjQueryForm: function(){
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
                return true;
            },
            success	: function(data, status, xhr, $form){
                $('#loginModal').hide();
                SR.app.navigate("posts", {trigger: true});
            },
            error : function(e){
//                lv.showLoginError('Login Failure', 'Please check your username and/or password');
            },
            resetForm: true
        });
    },

    bindInvitejQueryForm: function(){
        $('#invite-form').ajaxForm({
            beforeSubmit : function(formData, jqForm, options){
//                if (lv.validateForm() == false){
//                    return false;
//                } 	else{
//                    // append 'remember-me' option to formData to write local cookie //
//                    formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
//                    return true;
//                }
//                formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
                return true;
            },
            success	: function(data, status, xhr, $form){
//                $('#loginModal').hide();
                  alert("We will send you an email invite soon!");
//                SR.app.navigate("posts", {trigger: true});
            },
            error : function(e){
                alert("some problem with our server, please try again!");
//                lv.showLoginError('Login Failure', 'Please check your username and/or password');
            },
            resetForm: true
        });
    }

//    bindjQueryForm1: function(){
//            $('#login-form').submit(function() {
//                // inside event callbacks 'this' is the DOM element so we first
//                // wrap it in a jQuery object and then invoke ajaxSubmit
//                $(this).ajaxSubmit({
//                    beforeSubmit : function(formData, jqForm, options){
//                        //                if (lv.validateForm() == false){
//                        //                    return false;
//                        //                } 	else{
//                        //                    // append 'remember-me' option to formData to write local cookie //
//                        //                    formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
//                        //                    return true;
//                        //                }
//                        formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
//                        return true;
//                    },
//                    success	: function(data, status, xhr, $form){
//                        SR.app.navigate("posts", {trigger: true});
//                        return false;
//                    },
//                    error : function(e){
//                        //                lv.showLoginError('Login Failure', 'Please check your username and/or password');
//                    }
//                });
//
//                // !!! Important !!!
//                // always return false to prevent standard browser submit and page navigation
//                return false;
//            });
//    }

});