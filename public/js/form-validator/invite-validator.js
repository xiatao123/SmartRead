function InviteValidator(){
}

InviteValidator.prototype.validateEmail = function(e)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(e);
};


InviteValidator.prototype.invalidLogin = function()
{
    $(".loginError").remove();
    $('#user-tf').before("<div class='loginError'>登录失败，用户名或密码不正确。</div>");
};

InviteValidator.prototype.validateForm = function()
{
    SR.utils.hideNotification();
    if($('#inputEmail').val() === ''){
        SR.utils.showError({message: "请输入邮箱。"});
    }else if(this.validateEmail($('#inputEmail').val()) !== true ){
        SR.utils.showError({message: "这不是正确的邮箱格式。请输入有效邮箱。"});
    }else{
        return true;
    }
    return false;
};

