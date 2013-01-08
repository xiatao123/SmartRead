function LoginValidator(){

}


LoginValidator.prototype.invalidLogin = function()
{
    $(".loginError").remove();
    $('#user-tf').before("<div class='loginError'>登录失败，用户名或密码不正确。</div>");
};

LoginValidator.prototype.validateForm = function()
{
    $(".loginError").remove();
    if ($('#user-tf').val() == ''){
        $('#user-tf').before("<div class='loginError'>请输入有效用户名。</div>");
    }	else if ($('#pass-tf').val() == ''){
        $('#pass-tf').before("<div class='loginError'>请输入有效密码。</div>");
    }	else{
        return true;
    }
    return false;
};

