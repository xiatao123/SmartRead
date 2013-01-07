
function AccountValidator(){

// build array maps of the form inputs & control groups //

    this.formFields = [$('#name-tf'), $('#email-tf'), $('#user-tf'), $('#pass-tf'), $('#vpass-tf')];
    this.controlGroups = [$('#name-cg'), $('#email-cg'), $('#user-cg'), $('#pass-cg'), $('#vpass-cg')];

    this.validateName = function(s)
    {
        return s.length >= 2;
    };

    this.validatePassword = function(s)
    {
        // if user is logged in and hasn't changed their password, return ok
        if ($('#userId').val() && s===''){
            return true;
        }	else{
            return s.length >= 6;
        }
    };

    this.validateVerifiedPassword = function(s,vs)
    {
        return s === vs;
    };

    this.validateEmail = function(e)
    {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
    };

    this.showErrors = function(a)
    {
        var msg = "<h4>请更正以下的错误:</h4>";
        for (var i=0; i < a.length; i++){
            msg += '<li>'+a[i]+'</li>'
        }
        SR.utils.showError({message: msg});

    };

}

AccountValidator.prototype.showInvalidEmail = function()
{
    this.controlGroups[1].addClass('error');
    this.showErrors(['抱歉，这个邮箱已经被使用。']);
};

AccountValidator.prototype.showInvalidUserName = function()
{
    this.controlGroups[2].addClass('error');
    this.showErrors(['抱歉，这个用户名已经被使用。']);
};

AccountValidator.prototype.showInvalidEmailNotInvited = function()
{
    this.controlGroups[1].addClass('error');
    this.showErrors(['谢谢申请，请耐心等待邀请邮件。']);
};

AccountValidator.prototype.showInvalidEmailNotFound = function()
{
    this.controlGroups[1].addClass('error');
    this.showErrors(['抱歉，请到主页申请体验！']);
};

AccountValidator.prototype.validateForm = function()
{
    var e = [];
    SR.utils.hideNotification();
    for (var i=0; i < this.controlGroups.length; i++){
        this.controlGroups[i].removeClass('error');
    }
    if (this.validateName(this.formFields[0].val()) == false) {
        this.controlGroups[0].addClass('error'); e.push('请输入昵称,至少2个字符。');
    }
    if (this.validateEmail(this.formFields[1].val()) == false) {
        this.controlGroups[1].addClass('error'); e.push('请输入正确邮箱');
    }
    if (this.validateName(this.formFields[2].val()) == false) {
        this.controlGroups[2].addClass('error');
        e.push('请输入登陆名');
    }
    if (this.validatePassword(this.formFields[3].val()) == false) {
        this.controlGroups[3].addClass('error');
        e.push('密码至少6个字符');
    }
    if (this.validateVerifiedPassword(this.formFields[3].val(),this.formFields[4].val()) == false) {
        this.controlGroups[4].addClass('error');
        e.push('密码和确认密码不匹配。');
    }

    if (e.length) this.showErrors(e);
    return e.length === 0;
};