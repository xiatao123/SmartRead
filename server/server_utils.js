var Utils = {};

var moment = require('moment');
moment.lang('zh-cn');

module.exports = Utils;

Utils.log = function(data){
    console.log("*****: ", data);
};

Utils.stringTrim =  function(str){
    var newStr = str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
    return newStr;
};

Utils.getTimeAgo = function(date){
    return moment(date).fromNow();
};