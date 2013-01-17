var Utils = {};

module.exports = Utils;

Utils.log = function(data){
    console.log("*****: ", data);
};

Utils.stringTrim =  function(str){
    var newStr = str.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
    return newStr;
};