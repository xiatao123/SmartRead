var SR = SR || {};

SR.HomeView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    bindLogonjQueryForm: function(){
        var lv = new LoginValidator();

        $('#login-form').ajaxForm({
            beforeSubmit : function(formData, jqForm, options){
                if (lv.validateForm() === false){
                    return false;
                } 	else{
                    // append 'remember-me' option to formData to write local cookie //
                    formData.push({name:'remember-me', value:$("input:checkbox:checked").length == 1})
                    return true;
                }
            },
            success	: function(data, status, xhr, $form){
                $('#loginModal').hide();
                SR.app.navigate("posts", {trigger: true});
            },
            error : function(e){
                if(e.responseText === "user-not-found" || e.responseText === "invalid-password"){
                    lv.invalidLogin();
                }else{
                    SR.utils.showSystemError();
                }


            },
            resetForm: true
        });
    },

    bindInvitejQueryForm: function(){
        var iv = new InviteValidator();

        $('#invite-form').ajaxForm({
            beforeSubmit : function(formData, jqForm, options){
                if (iv.validateForm() == false){
                    return false;
                }
                return true;
            },
            success	: function(data, status, xhr, $form){
                SR.utils.showNotification({message: "欢迎申请悦读体验，我们会尽快并通知您！"});
            },
            error : function(e){
                if(e.responseText === "email-already-register"){
                    SR.utils.showError({message: "您的邮箱此前已经申请过体验，我们会尽快处理并通知您。"});
                }else{
                    SR.utils.showSystemError();
                }
            },
            resetForm: true
        });
    }
});