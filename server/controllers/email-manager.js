var ES = require('../email-settings');
var EM = {};
module.exports = EM;

var HOST = process.env.NODE_ENV === "production" ? "http://smartread.herokuapp.com" : "http://localhost:3000";

EM.server = require("emailjs/email").server.connect({

    host 	    : ES.host,
    user 	    : ES.user,
    password    : ES.password,
    ssl		    : true

});

EM.dispatchResetPasswordLink = function(account, callback)
{
    EM.server.send({
        from         : ES.sender,
        to           : account.email,
        subject      : '密码重新设置',
        text         : 'something went wrong... :(',
        attachment   : EM.composeResetPasswordEmail(account)
    }, callback );
};

EM.composeResetPasswordEmail = function(o)
{
    var link = HOST + '/reset-password?e='+o.email+'&p='+o.pass;
    var html = "<html><body>";
    html += "你好 "+o.name+",<br><br>";
    html += "你的用户名 :: <b>"+o.user+"</b><br><br>";
    html += "<a href='"+link+"'>请你点击这个链接重新设置密码。</a><br><br>";
    html += "谢谢,<br>";
    html += "Smart Read Group";
    html += "</body></html>";
    return  [{data:html, alternative:true}];
};

EM.dispatchSignupLink = function(email, callback)
{
    EM.server.send({
        from         : ES.sender,
        to           : email,
        subject      : '悦读注册通知',
        text         : 'something went wrong... :(',
        attachment   : EM.composeSignupEmail(email)
    }, callback );
};

EM.composeSignupEmail = function(email)
{
    var link = HOST + '/#signup/'+email;
    var html = "<html><body>";
    html += "你好,<br><br>";
    html += "欢迎你申请尝试悦读网，希望它能伴随你成长！</b><br><br>";
    html += "<a href='"+link+"'>请你点击此链接开始注册体验网站。</a><br><br>";
    html += "谢谢,<br>";
    html += "Smart Read Group";
    html += "</body></html>";
    return  [{data:html, alternative:true}];
};