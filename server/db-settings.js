if(process.env.NODE_ENV === "production"){
    console.log("use production db settings");
    module.exports = {
        host: 'linus.mongohq.com',
        port: 10064,
        db: 'smartreaddb',
        username: 'smartread',
        password: 'yuedu2012'
    };
}else{
    console.log("use dev db settings");
    module.exports = {
        host: 'localhost',
        port: 27017,
        db: 'smartreaddb',
        username: '',
        password: ''
    };
}
